"""Controlled outbound transport for the FK-D12 AI adapter (frappe-free).

Security properties (frozen):
- HTTPS only, TLS verification mandatory (never disabled);
- fixed/allowlisted host; the URL is not derived from source or model output;
- redirects rejected;
- bounded timeout and response-size cap;
- proxy environment variables are NOT honoured unless explicitly enabled;
- errors are normalized to the D12-A taxonomy; retry is a bounded D12-B concern.

Uses only the standard library (``urllib``/``ssl``) — no third-party dependency.
"""

from __future__ import annotations

import json
import random
import socket
import ssl
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from typing import Protocol, runtime_checkable

from .config import ProviderConfig
from .errors import (
    AIProviderError,
    AuthenticationError,
    AuthorizationBillingError,
    InvalidRequestError,
    MalformedResponseError,
    ProviderTimeoutError,
    ProviderUnavailableError,
    RateLimitError,
    RedirectRefusedError,
)

_RETRYABLE = (RateLimitError, ProviderUnavailableError, ProviderTimeoutError)

_STATUS_MAP: dict[int, type[AIProviderError]] = {
    400: InvalidRequestError,
    401: AuthenticationError,
    402: AuthorizationBillingError,
    403: AuthorizationBillingError,
    422: InvalidRequestError,
    429: RateLimitError,
    500: ProviderUnavailableError,
    502: ProviderUnavailableError,
    503: ProviderUnavailableError,
}


@dataclass
class TransportResponse:
    """Raw transport-level response (never authoritative CRM data)."""

    status: int
    headers: dict[str, str] = field(default_factory=dict)
    body: bytes = b""
    elapsed: float = 0.0

    def json(self) -> object:
        try:
            return json.loads(self.body.decode("utf-8"))
        except (ValueError, UnicodeDecodeError) as exc:
            raise MalformedResponseError("Provider response is not valid JSON") from exc


@runtime_checkable
class Transport(Protocol):
    """Provider-neutral transport contract (injectable for offline tests)."""

    def request(self, *, url: str, headers: dict[str, str], body: bytes) -> TransportResponse: ...


class _NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    """Refuse to follow redirects (returns None so urllib raises HTTPError)."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001
        return None


class HTTPTransport:
    """Standard-library HTTP(S) transport with the frozen security controls."""

    def __init__(self, config: ProviderConfig) -> None:
        if not config.verify_tls:
            raise ValueError("TLS verification must not be disabled")
        self.config = config
        context = ssl.create_default_context()
        # Frozen decision: do NOT honour proxy env vars unless explicitly enabled.
        # An empty proxy map disables environment/proxy inheritance in urllib.
        self._proxy_handler = (
            urllib.request.ProxyHandler() if config.use_proxy_env else urllib.request.ProxyHandler({})
        )
        self._opener = urllib.request.build_opener(
            self._proxy_handler,
            urllib.request.HTTPSHandler(context=context),
            _NoRedirectHandler(),
        )

    def _check_size(self, raw: bytes) -> bytes:
        if len(raw) > self.config.max_response_bytes:
            raise MalformedResponseError("Provider response exceeds size limit")
        return raw

    def _assert_approved_url(self, url: str) -> None:
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme != self.config.allowed_scheme:
            raise InvalidRequestError("Blocked outbound scheme: {0}".format(parsed.scheme))
        if parsed.hostname not in self.config.allowed_hosts:
            raise InvalidRequestError("Blocked outbound host: {0}".format(parsed.hostname))
        if parsed.port not in (None, self.config.allowed_port):
            raise InvalidRequestError("Blocked outbound port: {0}".format(parsed.port))

    def request(self, *, url: str, headers: dict[str, str], body: bytes) -> TransportResponse:
        self._assert_approved_url(url)
        req = urllib.request.Request(url, data=body, headers=headers, method="POST")
        started = time.monotonic()
        try:
            with self._opener.open(req, timeout=self.config.read_timeout) as resp:
                raw = self._check_size(resp.read(self.config.max_response_bytes + 1))
                return TransportResponse(
                    status=getattr(resp, "status", resp.getcode()),
                    headers=dict(resp.headers),
                    body=raw,
                    elapsed=time.monotonic() - started,
                )
        except urllib.error.HTTPError as exc:
            raise self._map_http_error(exc.code) from exc
        except (socket.timeout, TimeoutError) as exc:
            raise ProviderTimeoutError("Provider request timed out") from exc
        except urllib.error.URLError as exc:
            raise self._map_url_error(exc) from exc

    @staticmethod
    def _map_http_error(status: int) -> AIProviderError:
        if 300 <= status < 400:
            # D12-F: redirects are refused and NON-retryable.
            return RedirectRefusedError("Redirect refused (status {0})".format(status))
        error_cls = _STATUS_MAP.get(status, ProviderUnavailableError)
        return error_cls("Provider HTTP status {0}".format(status))

    @staticmethod
    def _map_url_error(exc: urllib.error.URLError) -> AIProviderError:
        reason = getattr(exc, "reason", None)
        if isinstance(reason, ssl.SSLError):
            return ProviderUnavailableError("TLS failure")
        if isinstance(reason, (socket.timeout, TimeoutError)) or "timed out" in str(reason).lower():
            return ProviderTimeoutError("Provider request timed out")
        return ProviderUnavailableError("Connection failure")


class RetryingTransport:
    """Bounded retry wrapper around any :class:`Transport` (D12-B/D12-F boundary).

    DS6 (approved): bounded retry with maximum TOTAL attempts (default 3 =
    1 initial + 2 retries) and capped exponential backoff with full jitter.
    Injectable so tests never sleep or call the network.
    """

    def __init__(
        self,
        transport: Transport,
        *,
        max_attempts: int = 3,
        backoff_seconds: float = 1.0,
        backoff_cap: float = 8.0,
        jitter: bool = True,
        retry_on: tuple[type[AIProviderError], ...] = _RETRYABLE,
        sleep=time.sleep,
        uniform=random.uniform,
    ) -> None:
        if max_attempts < 1:
            raise ValueError("max_attempts must be >= 1")
        if backoff_seconds < 0 or backoff_cap < 0:
            raise ValueError("backoff values must be >= 0")
        self.transport = transport
        self.max_attempts = max_attempts
        self.backoff_seconds = backoff_seconds
        self.backoff_cap = backoff_cap
        self.jitter = jitter
        self.retry_on = retry_on
        self._sleep = sleep
        self._uniform = uniform

    def _delay(self, attempt: int) -> float:
        # ``attempt`` is the 1-based number of the attempt that just failed.
        delay = min(self.backoff_cap, self.backoff_seconds * (2 ** (attempt - 1)))
        if self.jitter and delay > 0:
            delay *= self._uniform(0.5, 1.0)
        return delay

    def request(self, *, url: str, headers: dict[str, str], body: bytes) -> TransportResponse:
        attempt = 0
        while True:
            attempt += 1
            try:
                return self.transport.request(url=url, headers=headers, body=body)
            except self.retry_on:
                if attempt >= self.max_attempts:
                    raise
                self._sleep(self._delay(attempt))
