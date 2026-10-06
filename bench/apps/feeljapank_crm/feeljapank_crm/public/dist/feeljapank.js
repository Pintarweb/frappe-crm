//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, c = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, l = (n, r, o) => (o = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n));
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function u(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var d = {}, f = [], p = () => {}, m = () => !1, h = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), g = (e) => e.startsWith("onUpdate:"), _ = Object.assign, v = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, y = Object.prototype.hasOwnProperty, b = (e, t) => y.call(e, t), x = Array.isArray, S = (e) => te(e) === "[object Map]", C = (e) => te(e) === "[object Set]", w = (e) => te(e) === "[object Date]", T = (e) => te(e) === "[object RegExp]", E = (e) => typeof e == "function", D = (e) => typeof e == "string", O = (e) => typeof e == "symbol", k = (e) => typeof e == "object" && !!e, A = (e) => (k(e) || E(e)) && E(e.then) && E(e.catch), ee = Object.prototype.toString, te = (e) => ee.call(e), ne = (e) => te(e).slice(8, -1), re = (e) => te(e) === "[object Object]", ie = (e) => D(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ae = /* @__PURE__ */ u(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), oe = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, j = /-\w/g, M = oe((e) => e.replace(j, (e) => e.slice(1).toUpperCase())), se = /\B([A-Z])/g, ce = oe((e) => e.replace(se, "-$1").toLowerCase()), le = oe((e) => e.charAt(0).toUpperCase() + e.slice(1)), ue = oe((e) => e ? `on${le(e)}` : ""), de = (e, t) => !Object.is(e, t), fe = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, pe = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, me = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, he = (e) => {
	let t = D(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, ge, _e = () => ge ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}, ve = /* @__PURE__ */ u("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function ye(e) {
	if (x(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = D(r) ? Ce(r) : ye(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (D(e) || k(e)) return e;
}
var be = /;(?![^(]*\))/g, xe = /:([^]+)/, Se = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Ce(e) {
	let t = {};
	return e.replace(Se, (e) => e.startsWith("/*") ? "" : e).split(be).forEach((e) => {
		if (e) {
			let n = e.split(xe);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function we(e) {
	let t = "";
	if (D(e)) t = e;
	else if (x(e)) for (let n = 0; n < e.length; n++) {
		let r = we(e[n]);
		r && (t += r + " ");
	}
	else if (k(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
function Te(e) {
	if (!e) return null;
	let { class: t, style: n } = e;
	return t && !D(t) && (e.class = we(t)), n && (e.style = ye(n)), e;
}
var Ee = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", De = /* @__PURE__ */ u(Ee);
Ee + "";
function Oe(e) {
	return !!e || e === "";
}
function ke(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = Ne(e[i], t[i], n);
	return r;
}
function Ae(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && Ne(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function je(e, t, n) {
	let r = S(e), i = S(t);
	if (r || i || (r = C(e), i = C(t), r || i)) return r && i ? Ae(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !Ne(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function Me(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function Ne(e, t, n) {
	if (e === t) return !0;
	let r = w(e), i = w(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = O(e), i = O(t), r || i ? e === t : (r = x(e), i = x(t), r || i ? r && i ? Me(e, t, n, ke) : !1 : (r = k(e), i = k(t), r || i ? !r || !i ? !1 : Me(e, t, n, je) : String(e) === String(t))));
}
function Pe(e, t) {
	return e.findIndex((e) => Ne(e, t));
}
var Fe = (e) => !!(e && e.__v_isRef === !0), N = (e) => D(e) ? e : e == null ? "" : x(e) || k(e) && (e.toString === ee || !E(e.toString)) ? Fe(e) ? N(e.value) : JSON.stringify(e, Ie, 2) : String(e), Ie = (e, t) => Fe(t) ? Ie(e, t.value) : S(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Le(t, r) + " =>"] = n, e), {}) } : C(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Le(e)) } : O(t) ? Le(t) : k(t) && !x(t) && !re(t) ? String(t) : t, Le = (e, t = "") => O(e) ? `Symbol(${e.description ?? t})` : e;
function Re(e) {
	return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
//#endregion
//#region node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var ze, Be = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && ze && (ze.active ? (this.parent = ze, this.index = (ze.scopes || (ze.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = ze;
			try {
				return ze = this, e();
			} finally {
				ze = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = ze, ze = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (ze === this) ze = this.prevScope;
			else {
				let e = ze;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Ve(e) {
	return new Be(e);
}
function He() {
	return ze;
}
function Ue(e, t = !1) {
	ze && ze.cleanups.push(e);
}
var P, We = /* @__PURE__ */ new WeakSet(), Ge = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ze && (ze.active ? ze.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, We.has(this) && (We.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ye(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, ut(this), Qe(this);
		let e = P, t = ot;
		P = this, ot = !0;
		try {
			return this.fn();
		} finally {
			$e(this), P = e, ot = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) nt(e);
			this.deps = this.depsTail = void 0, ut(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? We.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		et(this) && this.run();
	}
	get dirty() {
		return et(this);
	}
}, Ke = 0, qe, Je;
function Ye(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Je, Je = e;
		return;
	}
	e.next = qe, qe = e;
}
function Xe() {
	Ke++;
}
function Ze() {
	if (--Ke > 0) return;
	if (Je) {
		let e = Je;
		for (Je = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; qe;) {
		let t = qe;
		for (qe = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Qe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function $e(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), nt(r), rt(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function et(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (tt(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function tt(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === dt) || (e.globalVersion = dt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !et(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = P, r = ot;
	P = e, ot = !0;
	try {
		Qe(e);
		let n = e.fn(e._value);
		(t.version === 0 || de(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		P = n, ot = r, $e(e), e.flags &= -3;
	}
}
function nt(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) nt(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function rt(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
function it(e, t) {
	e.effect instanceof Ge && (e = e.effect.fn);
	let n = new Ge(e);
	t && _(n, t);
	try {
		n.run();
	} catch (e) {
		throw n.stop(), e;
	}
	let r = n.run.bind(n);
	return r.effect = n, r;
}
function at(e) {
	e.effect.stop();
}
var ot = !0, st = [];
function ct() {
	st.push(ot), ot = !1;
}
function lt() {
	let e = st.pop();
	ot = e === void 0 || e;
}
function ut(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = P;
		P = void 0;
		try {
			t();
		} finally {
			P = e;
		}
	}
}
var dt = 0, ft = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, pt = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!P || !ot || P === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== P) t = this.activeLink = new ft(P, this), P.deps ? (t.prevDep = P.depsTail, P.depsTail.nextDep = t, P.depsTail = t) : P.deps = P.depsTail = t, mt(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = P.depsTail, t.nextDep = void 0, P.depsTail.nextDep = t, P.depsTail = t, P.deps === t && (P.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, dt++, this.notify(e);
	}
	notify(e) {
		Xe();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ze();
		}
	}
};
function mt(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) mt(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var ht = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ Symbol(""), _t = /* @__PURE__ */ Symbol(""), vt = /* @__PURE__ */ Symbol("");
function yt(e, t, n) {
	if (ot && P) {
		let t = ht.get(e);
		t || ht.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new pt()), r.map = t, r.key = n), r.track();
	}
}
function bt(e, t, n, r, i, a) {
	let o = ht.get(e);
	if (!o) {
		dt++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Xe(), t === "clear") o.forEach(s);
	else {
		let i = x(e), a = i && ie(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === vt || !O(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(vt)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(gt)), S(e) && s(o.get(_t)));
				break;
			case "delete":
				i || (s(o.get(gt)), S(e) && s(o.get(_t)));
				break;
			case "set": S(e) && s(o.get(gt));
		}
	}
	Ze();
}
function xt(e, t) {
	let n = ht.get(e);
	return n && n.get(t);
}
function St(e) {
	let t = /* @__PURE__ */ F(e);
	return t === e || (yt(t, "iterate", vt), /* @__PURE__ */ dn(e)) ? t : /* @__PURE__ */ un(e) ? /* @__PURE__ */ ln(e) ? t.map((e) => hn(mn(e))) : t.map(hn) : t.map(mn);
}
function Ct(e) {
	return yt(e = /* @__PURE__ */ F(e), "iterate", vt), e;
}
function wt(e, t) {
	return /* @__PURE__ */ un(e) ? hn(/* @__PURE__ */ ln(e) ? mn(t) : t) : mn(t);
}
var Tt = {
	__proto__: null,
	[Symbol.iterator]() {
		return Et(this, Symbol.iterator, (e) => wt(this, e));
	},
	concat(...e) {
		return St(this).concat(...e.map((e) => x(e) ? St(e) : e));
	},
	entries() {
		return Et(this, "entries", (e) => (e[1] = wt(this, e[1]), e));
	},
	every(e, t) {
		return Ot(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return Ot(this, "filter", e, t, (e) => e.map((e) => wt(this, e)), arguments);
	},
	find(e, t) {
		return Ot(this, "find", e, t, (e) => wt(this, e), arguments);
	},
	findIndex(e, t) {
		return Ot(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return Ot(this, "findLast", e, t, (e) => wt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return Ot(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return Ot(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return At(this, "includes", e);
	},
	indexOf(...e) {
		return At(this, "indexOf", e);
	},
	join(e) {
		return St(this).join(e);
	},
	lastIndexOf(...e) {
		return At(this, "lastIndexOf", e);
	},
	map(e, t) {
		return Ot(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return jt(this, "pop");
	},
	push(...e) {
		return jt(this, "push", e);
	},
	reduce(e, ...t) {
		return kt(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return kt(this, "reduceRight", e, t);
	},
	shift() {
		return jt(this, "shift");
	},
	some(e, t) {
		return Ot(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return jt(this, "splice", e);
	},
	toReversed() {
		return St(this).toReversed();
	},
	toSorted(e) {
		return St(this).toSorted(e);
	},
	toSpliced(...e) {
		return St(this).toSpliced(...e);
	},
	unshift(...e) {
		return jt(this, "unshift", e);
	},
	values() {
		return Et(this, "values", (e) => wt(this, e));
	}
};
function Et(e, t, n) {
	let r = Ct(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ dn(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var Dt = Array.prototype;
function Ot(e, t, n, r, i, a) {
	let o = Ct(e), s = o !== e && !/* @__PURE__ */ dn(e), c = o[t];
	if (c !== Dt[t]) {
		let t = c.apply(e, a);
		return s ? mn(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, wt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function kt(e, t, n, r) {
	let i = Ct(e), a = i !== e && !/* @__PURE__ */ dn(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = wt(e, t)), n.call(this, t, wt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? wt(e, c) : c;
}
function At(e, t, n) {
	let r = /* @__PURE__ */ F(e);
	yt(r, "iterate", vt);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ fn(n[0]) ? (n[0] = /* @__PURE__ */ F(n[0]), r[t](...n)) : i;
}
function jt(e, t, n = []) {
	ct(), Xe();
	let r = (/* @__PURE__ */ F(e))[t].apply(e, n);
	return Ze(), lt(), r;
}
var Mt = /* @__PURE__ */ u("__proto__,__v_isRef,__isVue"), Nt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(O));
function Pt(e) {
	O(e) || (e = String(e));
	let t = /* @__PURE__ */ F(this);
	return yt(t, "has", e), t.hasOwnProperty(e);
}
var Ft = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? tn : en : i ? $t : Qt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = x(e);
		if (!r) {
			let e;
			if (a && (e = Tt[t])) return e;
			if (t === "hasOwnProperty") return Pt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ I(e) ? e : n);
		if ((O(t) ? Nt.has(t) : Mt(t)) || (r || yt(e, "get", t), i)) return o;
		if (/* @__PURE__ */ I(o)) {
			let e = a && ie(t) ? o : o.value;
			return r && k(e) ? /* @__PURE__ */ on(e) : e;
		}
		return k(o) ? r ? /* @__PURE__ */ on(o) : /* @__PURE__ */ rn(o) : o;
	}
}, It = class extends Ft {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = x(e) && ie(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ un(i);
			if (!/* @__PURE__ */ dn(n) && !/* @__PURE__ */ un(n) && (i = /* @__PURE__ */ F(i), n = /* @__PURE__ */ F(n)), !a && /* @__PURE__ */ I(i) && !/* @__PURE__ */ I(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : b(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ I(e) ? e : r);
		return e === /* @__PURE__ */ F(r) && s && (o ? de(n, i) && bt(e, "set", t, n, i) : bt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = b(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && bt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!O(t) || !Nt.has(t)) && yt(e, "has", t), n;
	}
	ownKeys(e) {
		return yt(e, "iterate", x(e) ? "length" : gt), Reflect.ownKeys(e);
	}
}, Lt = class extends Ft {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, Rt = /* @__PURE__ */ new It(), zt = /* @__PURE__ */ new Lt(), Bt = /* @__PURE__ */ new It(!0), Vt = /* @__PURE__ */ new Lt(!0), Ht = (e) => e, Ut = (e) => Reflect.getPrototypeOf(e);
function Wt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ F(i), o = S(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? Ht : t ? hn : mn;
		return !t && yt(a, "iterate", c ? _t : gt), _(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [u(e[0]), u(e[1])] : u(e),
				done: t
			};
		} });
	};
}
function Gt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Kt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ F(r), a = /* @__PURE__ */ F(n);
			e || (de(n, a) && yt(i, "get", n), yt(i, "get", a));
			let { has: o } = Ut(i), s = t ? Ht : e ? hn : mn;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && yt(/* @__PURE__ */ F(t), "iterate", gt), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ F(n), i = /* @__PURE__ */ F(t);
			return e || (de(t, i) && yt(r, "has", t), yt(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ F(a), s = t ? Ht : e ? hn : mn;
			return !e && yt(o, "iterate", gt), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return _(n, e ? {
		add: Gt("add"),
		set: Gt("set"),
		delete: Gt("delete"),
		clear: Gt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ F(this), r = Ut(n), i = /* @__PURE__ */ F(e), a = !t && !/* @__PURE__ */ dn(e) && !/* @__PURE__ */ un(e) ? i : e;
			return r.has.call(n, a) || de(e, a) && r.has.call(n, e) || de(i, a) && r.has.call(n, i) || (n.add(a), bt(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ dn(n) && !/* @__PURE__ */ un(n) && (n = /* @__PURE__ */ F(n));
			let r = /* @__PURE__ */ F(this), { has: i, get: a } = Ut(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ F(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? de(n, s) && bt(r, "set", e, n, s) : bt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ F(this), { has: n, get: r } = Ut(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ F(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && bt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ F(this), t = e.size !== 0, n = e.clear();
			return t && bt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Wt(r, e, t);
	}), n;
}
function qt(e, t) {
	let n = Kt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(b(n, r) && r in t ? n : t, r, i);
}
var Jt = { get: /* @__PURE__ */ qt(!1, !1) }, Yt = { get: /* @__PURE__ */ qt(!1, !0) }, Xt = { get: /* @__PURE__ */ qt(!0, !1) }, Zt = { get: /* @__PURE__ */ qt(!0, !0) }, Qt = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), en = /* @__PURE__ */ new WeakMap(), tn = /* @__PURE__ */ new WeakMap();
function nn(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function rn(e) {
	return /* @__PURE__ */ un(e) ? e : cn(e, !1, Rt, Jt, Qt);
}
// @__NO_SIDE_EFFECTS__
function an(e) {
	return cn(e, !1, Bt, Yt, $t);
}
// @__NO_SIDE_EFFECTS__
function on(e) {
	return cn(e, !0, zt, Xt, en);
}
// @__NO_SIDE_EFFECTS__
function sn(e) {
	return cn(e, !0, Vt, Zt, tn);
}
function cn(e, t, n, r, i) {
	if (!k(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = nn(ne(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function ln(e) {
	return /* @__PURE__ */ un(e) ? /* @__PURE__ */ ln(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function un(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function dn(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function fn(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ F(t) : e;
}
function pn(e) {
	return !b(e, "__v_skip") && Object.isExtensible(e) && pe(e, "__v_skip", !0), e;
}
var mn = (e) => k(e) ? /* @__PURE__ */ rn(e) : e, hn = (e) => k(e) ? /* @__PURE__ */ on(e) : e;
// @__NO_SIDE_EFFECTS__
function I(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function L(e) {
	return _n(e, !1);
}
// @__NO_SIDE_EFFECTS__
function gn(e) {
	return _n(e, !0);
}
function _n(e, t) {
	return /* @__PURE__ */ I(e) ? e : new vn(e, t);
}
var vn = class {
	constructor(e, t) {
		this.dep = new pt(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ F(e), this._value = t ? e : mn(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ dn(e) || /* @__PURE__ */ un(e);
		e = n ? e : /* @__PURE__ */ F(e), de(e, t) && (this._rawValue = e, this._value = n ? e : mn(e), this.dep.trigger());
	}
};
function yn(e) {
	e.dep && e.dep.trigger();
}
function R(e) {
	return /* @__PURE__ */ I(e) ? e.value : e;
}
function bn(e) {
	return E(e) ? e() : R(e);
}
var xn = {
	get: (e, t, n) => t === "__v_raw" ? e : R(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ I(i) && !/* @__PURE__ */ I(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Sn(e) {
	return /* @__PURE__ */ ln(e) ? e : new Proxy(e, xn);
}
var Cn = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new pt(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function wn(e) {
	return new Cn(e);
}
// @__NO_SIDE_EFFECTS__
function Tn(e) {
	let t = x(e) ? Array(e.length) : {};
	for (let n in e) t[n] = kn(e, n);
	return t;
}
var En = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = O(t) ? t : String(t), this._raw = /* @__PURE__ */ F(e);
		let r = !0, i = e;
		if (!x(e) || O(this._key) || !ie(this._key)) do
			r = !/* @__PURE__ */ fn(i) || /* @__PURE__ */ dn(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = R(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ I(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ I(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return xt(this._raw, this._key);
	}
}, Dn = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function On(e, t, n) {
	return /* @__PURE__ */ I(e) ? e : E(e) ? new Dn(e) : k(e) && arguments.length > 1 ? kn(e, t, n) : /* @__PURE__ */ L(e);
}
function kn(e, t, n) {
	return new En(e, t, n);
}
var An = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new pt(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = dt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && P !== this) return Ye(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return tt(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function jn(e, t, n = !1) {
	let r, i;
	return E(e) ? r = e : (r = e.get, i = e.set), new An(r, i, n);
}
var Mn = {
	GET: "get",
	HAS: "has",
	ITERATE: "iterate"
}, Nn = {
	SET: "set",
	ADD: "add",
	DELETE: "delete",
	CLEAR: "clear"
}, Pn = {}, Fn = /* @__PURE__ */ new WeakMap(), In = void 0;
function Ln() {
	return In;
}
function Rn(e, t = !1, n = In) {
	if (n) {
		let t = Fn.get(n);
		t || Fn.set(n, t = []), t.push(e);
	}
}
function zn(e, t, n = d) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => i ? e : /* @__PURE__ */ dn(e) || i === !1 || i === 0 ? Bn(e, 1) : Bn(e), u, f, m, h, g = !1, _ = !1;
	if (/* @__PURE__ */ I(e) ? (f = () => e.value, g = /* @__PURE__ */ dn(e)) : /* @__PURE__ */ ln(e) ? (f = () => l(e), g = !0) : x(e) ? (_ = !0, g = e.some((e) => /* @__PURE__ */ ln(e) || /* @__PURE__ */ dn(e)), f = () => e.map((e) => {
		if (/* @__PURE__ */ I(e)) return e.value;
		if (/* @__PURE__ */ ln(e)) return l(e);
		if (E(e)) return c ? c(e, 2) : e();
	})) : f = E(e) ? t ? c ? () => c(e, 2) : e : () => {
		if (m) {
			ct();
			try {
				m();
			} finally {
				lt();
			}
		}
		let t = In;
		In = u;
		try {
			return c ? c(e, 3, [h]) : e(h);
		} finally {
			In = t;
		}
	} : p, t && i) {
		let e = f, t = i === !0 ? Infinity : i;
		f = () => Bn(e(), t);
	}
	let y = He(), b = () => {
		u.stop(), y && y.active && v(y.effects, u);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return b(), n;
		};
	}
	let S = _ ? Array(e.length).fill(Pn) : Pn, C = (e) => {
		if (u.flags & 1 && (u.dirty || e)) {
			if (t) {
				let n = u.run();
				if (e || i || g || (_ ? n.some((e, t) => de(e, S[t])) : de(n, S))) {
					m && m();
					let e = In;
					In = u;
					try {
						let e = [
							n,
							S === Pn ? void 0 : _ && S[0] === Pn ? [] : S,
							h
						];
						S = n, c ? c(t, 3, e) : t(...e);
					} finally {
						In = e;
					}
				}
			} else u.run();
		}
	};
	return s && s(C), u = new Ge(f), u.scheduler = o ? () => o(C, !1) : C, h = (e) => Rn(e, !1, u), m = u.onStop = () => {
		let e = Fn.get(u);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			Fn.delete(u);
		}
	}, t ? r ? C(!0) : S = u.run() : o ? o(C.bind(null, !0), !0) : u.run(), b.pause = u.pause.bind(u), b.resume = u.resume.bind(u), b.stop = b, b;
}
function Bn(e, t = Infinity, n) {
	if (t <= 0 || !k(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ I(e)) Bn(e.value, t, n);
	else if (x(e)) for (let r = 0; r < e.length; r++) Bn(e[r], t, n);
	else if (C(e) || S(e)) e.forEach((e) => {
		Bn(e, t, n);
	});
	else if (re(e)) {
		for (let r in e) Bn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Bn(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var Vn = [];
function Hn(e) {
	Vn.push(e);
}
function Un() {
	Vn.pop();
}
function Wn(e, t) {}
var Gn = {
	SETUP_FUNCTION: 0,
	0: "SETUP_FUNCTION",
	RENDER_FUNCTION: 1,
	1: "RENDER_FUNCTION",
	NATIVE_EVENT_HANDLER: 5,
	5: "NATIVE_EVENT_HANDLER",
	COMPONENT_EVENT_HANDLER: 6,
	6: "COMPONENT_EVENT_HANDLER",
	VNODE_HOOK: 7,
	7: "VNODE_HOOK",
	DIRECTIVE_HOOK: 8,
	8: "DIRECTIVE_HOOK",
	TRANSITION_HOOK: 9,
	9: "TRANSITION_HOOK",
	APP_ERROR_HANDLER: 10,
	10: "APP_ERROR_HANDLER",
	APP_WARN_HANDLER: 11,
	11: "APP_WARN_HANDLER",
	FUNCTION_REF: 12,
	12: "FUNCTION_REF",
	ASYNC_COMPONENT_LOADER: 13,
	13: "ASYNC_COMPONENT_LOADER",
	SCHEDULER: 14,
	14: "SCHEDULER",
	COMPONENT_UPDATE: 15,
	15: "COMPONENT_UPDATE",
	APP_UNMOUNT_CLEANUP: 16,
	16: "APP_UNMOUNT_CLEANUP"
}, Kn = {
	sp: "serverPrefetch hook",
	bc: "beforeCreate hook",
	c: "created hook",
	bm: "beforeMount hook",
	m: "mounted hook",
	bu: "beforeUpdate hook",
	u: "updated",
	bum: "beforeUnmount hook",
	um: "unmounted hook",
	a: "activated hook",
	da: "deactivated hook",
	ec: "errorCaptured hook",
	rtc: "renderTracked hook",
	rtg: "renderTriggered hook",
	0: "setup function",
	1: "render function",
	2: "watcher getter",
	3: "watcher callback",
	4: "watcher cleanup function",
	5: "native event handler",
	6: "component event handler",
	7: "vnode hook",
	8: "directive hook",
	9: "transition hook",
	10: "app errorHandler",
	11: "app warnHandler",
	12: "ref function",
	13: "async component loader",
	14: "scheduler flush",
	15: "component update",
	16: "app unmount cleanup function"
};
function qn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Yn(e, t, n);
	}
}
function Jn(e, t, n, r) {
	if (E(e)) {
		let i = qn(e, t, n, r);
		return i && A(i) && i.catch((e) => {
			Yn(e, t, n);
		}), i;
	}
	if (x(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Jn(e[a], t, n, r));
		return i;
	}
}
function Yn(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || d;
	if (t) {
		let r = t.parent, i = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			ct(), qn(a, null, 10, [
				e,
				i,
				o
			]), lt();
			return;
		}
	}
	Xn(e, n, i, r, o);
}
function Xn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var Zn = [], Qn = -1, $n = [], er = null, tr = 0, nr = /* @__PURE__ */ Promise.resolve(), rr = null;
function ir(e) {
	let t = rr || nr;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function ar(e) {
	let t = Qn + 1, n = Zn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = Zn[r], a = dr(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function or(e) {
	if (!(e.flags & 1)) {
		let t = dr(e), n = Zn[Zn.length - 1];
		!n || !(e.flags & 2) && t >= dr(n) ? Zn.push(e) : Zn.splice(ar(t), 0, e), e.flags |= 1, sr();
	}
}
function sr() {
	rr ||= nr.then(fr);
}
function cr(e) {
	if (!x(e)) er && e.id === -1 ? er.splice(tr + 1, 0, e) : e.flags & 1 || ($n.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) $n.push(e[t]);
	sr();
}
function lr(e, t, n = Qn + 1) {
	for (; n < Zn.length; n++) {
		let t = Zn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			Zn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function ur(e) {
	if ($n.length) {
		let e = [...new Set($n)].sort((e, t) => dr(e) - dr(t));
		if ($n.length = 0, er) {
			for (let t = 0; t < e.length; t++) er.push(e[t]);
			return;
		}
		for (er = e, tr = 0; tr < er.length; tr++) {
			let e = er[tr];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		er = null, tr = 0;
	}
}
var dr = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function fr(e) {
	try {
		for (Qn = 0; Qn < Zn.length; Qn++) {
			let e = Zn[Qn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), qn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; Qn < Zn.length; Qn++) {
			let e = Zn[Qn];
			e && (e.flags &= -2);
		}
		Qn = -1, Zn.length = 0, ur(e), rr = null, (Zn.length || $n.length) && fr(e);
	}
}
var pr, mr = [];
function hr(e, t) {
	pr = e, pr ? (pr.enabled = !0, mr.forEach(({ event: e, args: t }) => pr.emit(e, ...t)), mr = []) : typeof window < "u" && window.HTMLElement && !(window.navigator?.userAgent)?.includes("jsdom") ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
		hr(e, t);
	}), setTimeout(() => {
		pr || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, mr = []);
	}, 3e3)) : mr = [];
}
var gr = null, _r = null;
function vr(e) {
	let t = gr;
	return gr = e, _r = e && e.type.__scopeId || null, t;
}
function yr(e) {
	_r = e;
}
function br() {
	_r = null;
}
var xr = (e) => z;
function z(e, t = gr, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && vs(-1);
		let i = vr(t), a = ms.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = ms.length; e > a; e--) gs();
			vr(i), r._d && vs(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Sr(e, t) {
	if (gr === null) return e;
	let n = ec(gr), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = d] = t[e];
		i && (E(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && Bn(a), r.push({
			dir: i,
			instance: n,
			value: a,
			oldValue: void 0,
			arg: o,
			modifiers: s
		}));
	}
	return e;
}
function Cr(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (ct(), Jn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), lt());
	}
}
function wr(e, t) {
	if (Ls) {
		let n = Ls.provides, r = Ls.parent && Ls.parent.provides;
		r === n && (n = Ls.provides = Object.create(r)), n[e] = t;
	}
}
function Tr(e, t, n = !1) {
	let r = Q();
	if (r || so) {
		let i = so ? so._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && E(t) ? t.call(r && r.proxy) : t;
	}
}
function Er() {
	return !!(Q() || so);
}
var Dr = /* @__PURE__ */ Symbol.for("v-scx"), Or = () => Tr(Dr);
function kr(e, t) {
	return Nr(e, null, t);
}
function Ar(e, t) {
	return Nr(e, null, { flush: "post" });
}
function jr(e, t) {
	return Nr(e, null, { flush: "sync" });
}
function Mr(e, t, n) {
	return Nr(e, t, n);
}
function Nr(e, t, n = d) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = _({}, n), c = t && r || !t && a !== "post", l;
	if (Us) {
		if (a === "sync") {
			let e = Or();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = p, e.resume = p, e.pause = p, e;
		}
	}
	let u = Ls;
	s.call = (e, t, n) => Jn(e, u, t, n);
	let f = !1;
	a === "post" ? s.scheduler = (e) => {
		Vo(e, u && u.suspense);
	} : a !== "sync" && (f = !0, s.scheduler = (e, t) => {
		t ? e() : or(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), f && (e.flags |= 2, u && (e.id = u.uid, e.i = u));
	};
	let m = zn(e, t, s);
	return Us && (l ? l.push(m) : c && m()), m;
}
function Pr(e, t, n) {
	let r = this.proxy, i = D(e) ? e.includes(".") ? Fr(r, e) : () => r[e] : e.bind(r, r), a;
	E(t) ? a = t : (a = t.handler, n = t);
	let o = Bs(this), s = Nr(i, a.bind(r), n);
	return o(), s;
}
function Fr(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Ir = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ Symbol("_vte"), Rr = (e) => e.__isTeleport, zr = (e) => e && (e.disabled || e.disabled === ""), Br = (e) => e && (e.defer || e.defer === ""), Vr = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Hr = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Ur = (e, t) => {
	let n = e && e.to;
	return D(n) ? t ? t(n) : null : n;
}, Wr = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = zr(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = zr(e.props), r = e.target = Ur(e.props, m), a = Yr(r, e, h, p);
			r && (o !== "svg" && Vr(r) ? o = "svg" : o !== "mathml" && Hr(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), Jr(e, !1)));
		}, S = (e) => {
			let t = () => {
				if (Ir.get(e) === t) {
					if (Ir.delete(e), zr(e.props)) {
						let t = _(e.el) || n;
						b(e, t, e.anchor), Jr(e, !0);
					}
					x(e);
				}
			};
			Ir.set(e, t), Vo(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), Br(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), Jr(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Ir.get(e);
			if (u) {
				u.flags |= 8, Ir.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = zr(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || Vr(p) ? o = "svg" : (o === "mathml" || Hr(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Jo(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Gr(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = Ur(t.props, m);
				e && (t.target = e, Gr(t, e, null, l, 0));
			} else g && Gr(t, p, h, l, 1);
			Jr(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = zr(f), m = a || !p, h = Ir.get(e);
		if (h && (h.flags |= 8, Ir.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, m, !!i.dynamicChildren);
		}
	},
	move: Gr,
	hydrate: Kr
};
function Gr(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Ir.has(e) && (!d || zr(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function Kr(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = Ur(t.props, c), h = zr(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || Yr(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || Yr(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), Jr(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var qr = Wr;
function Jr(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function Yr(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Lr] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var Xr = /* @__PURE__ */ Symbol("_leaveCb"), Zr = /* @__PURE__ */ Symbol("_enterCb");
function Qr() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return ra(() => {
		e.isMounted = !0;
	}), oa(() => {
		e.isUnmounting = !0;
	}), e;
}
var $r = [Function, Array], ei = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: $r,
	onEnter: $r,
	onAfterEnter: $r,
	onEnterCancelled: $r,
	onBeforeLeave: $r,
	onLeave: $r,
	onAfterLeave: $r,
	onLeaveCancelled: $r,
	onBeforeAppear: $r,
	onAppear: $r,
	onAfterAppear: $r,
	onAppearCancelled: $r
}, ti = (e) => {
	let t = e.subTree;
	return t.component ? ti(t.component) : t;
}, ni = {
	name: "BaseTransition",
	props: ei,
	setup(e, { slots: t }) {
		let n = Q(), r = Qr();
		return () => {
			let i = t.default && ui(t.default(), !0), a = i && i.length ? ri(i) : n.subTree ? Z() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ F(e), { mode: s } = o;
			if (r.isLeaving) return si(a);
			let c = ci(a);
			if (!c) return si(a);
			let l = oi(c, o, r, n, (e) => l = e);
			c.type !== W && li(c, l);
			let u = n.subTree && ci(n.subTree);
			if (u && u.type !== W && !xs(u, c) && ti(n).type !== W) {
				let e = oi(u, o, r, n);
				if (li(u, e), s === "out-in" && c.type !== W) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, si(a);
				s === "in-out" && c.type !== W ? e.delayLeave = (e, t, n) => {
					let i = ai(r, u);
					i[String(u.key)] = u, e[Xr] = () => {
						t(), e[Xr] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function ri(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== W) {
			t = n;
			break;
		}
	}
	return t;
}
var ii = ni;
function ai(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function oi(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: f, onLeave: p, onAfterLeave: m, onLeaveCancelled: h, onBeforeAppear: g, onAppear: _, onAfterAppear: v, onAppearCancelled: y } = t, b = String(e.key), S = ai(n, e), C = (e, t) => {
		e && Jn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), x(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, T = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) {
				if (a) r = g || c;
				else return;
			}
			t[Xr] && t[Xr](!0);
			let i = S[b];
			i && xs(e, i) && i.el[Xr] && i.el[Xr](), C(r, [t]);
		},
		enter(t) {
			if (S[b] === e) return;
			let r = l, i = u, o = d;
			if (!n.isMounted) {
				if (a) r = _ || l, i = v || u, o = y || d;
				else return;
			}
			let s = !1;
			t[Zr] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[Zr] = void 0);
			};
			let c = t[Zr].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Zr] && t[Zr](!0), n.isUnmounting) return r();
			C(f, [t]);
			let a = !1;
			t[Xr] = (n) => {
				a || (a = !0, r(), C(n ? h : m, [t]), t[Xr] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Xr].bind(null, !1);
			S[i] = e, p ? w(p, [t, o]) : o();
		},
		clone(e) {
			let a = oi(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return T;
}
function si(e) {
	if (Gi(e)) return e = Ds(e), e.children = null, e;
}
function ci(e) {
	if (!Gi(e)) return Rr(e.type) && e.children ? ri(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && E(n.default)) return n.default();
	}
}
function li(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		li(Rr(n.type) && ci(n) || n, t);
	} else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ui(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === U ? (o.patchFlag & 128 && i++, r = r.concat(ui(o.children, t, s))) : (t || o.type !== W) && r.push(s == null ? o : Ds(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
// @__NO_SIDE_EFFECTS__
function B(e, t) {
	return E(e) ? /* @__PURE__ */ _({ name: e.name }, t, { setup: e }) : e;
}
function di() {
	let e = Q();
	return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function fi(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function pi(e) {
	let t = Q(), n = /* @__PURE__ */ gn(null);
	if (t) {
		let r = t.refs === d ? t.refs = {} : t.refs;
		Object.defineProperty(r, e, {
			enumerable: !0,
			get: () => n.value,
			set: (e) => n.value = e
		});
	}
	return n;
}
function mi(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var hi = /* @__PURE__ */ new WeakMap();
function gi(e, t, n, r, i = !1) {
	if (x(e)) {
		e.forEach((e, a) => gi(e, t && (x(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Hi(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && gi(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? ec(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === d ? s.refs = {} : s.refs, f = s.setupState, p = /* @__PURE__ */ F(f), h = f === d ? m : (e) => !mi(u, e) && b(p, e), g = (e, t) => !(t && mi(u, t));
	if (l != null && l !== c) {
		if (_i(t), D(l)) u[l] = null, h(l) && (f[l] = null);
		else if (/* @__PURE__ */ I(l)) {
			let e = t;
			g(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (E(c)) qn(c, s, 12, [o, u]);
	else {
		let t = D(c), r = /* @__PURE__ */ I(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? h(c) ? f[c] : u[c] : g(c) || !e.k ? c.value : u[e.k];
					if (i) x(n) && v(n, a);
					else if (x(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], h(c) && (f[c] = u[c]);
					else {
						let t = [a];
						g(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, h(c) && (f[c] = o)) : r && (g(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), hi.delete(e);
				};
				t.id = -1, hi.set(e, t), Vo(t, n);
			} else _i(e), s();
		}
	}
}
function _i(e) {
	let t = hi.get(e);
	t && (t.flags |= 8, hi.delete(e));
}
var vi = !1, yi = () => {
	vi ||= (console.error("Hydration completed but contains mismatches."), !0);
}, bi = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", xi = (e) => e.namespaceURI.includes("MathML"), Si = (e) => {
	if (e.nodeType === 1) {
		if (bi(e)) return "svg";
		if (xi(e)) return "mathml";
	}
}, Ci = (e) => e.nodeType === 8;
function wi(e) {
	let { mt: t, p: n, o: { patchProp: r, createText: i, nextSibling: a, parentNode: o, remove: s, insert: c, createComment: l } } = e, u = (e, t) => {
		if (!t.hasChildNodes()) {
			n(null, e, t), ur(), t._vnode = e;
			return;
		}
		d(t.firstChild, e, null, null, null), ur(), t._vnode = e;
	}, d = (n, r, s, l, u, h = !1) => {
		h ||= !!r.dynamicChildren;
		let b = Ci(n) && n.data === "[", x = () => g(n, r, s, l, u, b), { type: S, ref: C, shapeFlag: w, patchFlag: T } = r, E = n.nodeType;
		r.el = n, T === -2 && (h = !1, r.dynamicChildren = null);
		let D = null;
		switch (S) {
			case fs:
				E === 3 ? (n.data !== r.children && (yi(), n.data = r.children), D = a(n)) : r.children === "" ? (c(r.el = i(""), o(n), n), D = n) : D = x();
				break;
			case W:
				y(n) ? (D = a(n), v(r.el = n.content.firstChild, n, s)) : D = E !== 8 || b ? x() : a(n);
				break;
			case ps:
				if (b && (n = a(n), E = n.nodeType), E === 1 || E === 3) {
					D = n;
					let e = !r.children.length;
					for (let t = 0; t < r.staticCount; t++) e && (r.children += D.nodeType === 1 ? D.outerHTML : D.data), t === r.staticCount - 1 && (r.anchor = D), D = a(D);
					return b ? a(D) : D;
				}
				x();
				break;
			case U:
				D = b ? m(n, r, s, l, u, h) : x();
				break;
			default: if (w & 1) D = (E !== 1 || r.type.toLowerCase() !== n.tagName.toLowerCase()) && !y(n) ? x() : f(n, r, s, l, u, h);
			else if (w & 6) {
				r.slotScopeIds = u;
				let e = o(n);
				if (D = b ? _(n) : Ci(n) && n.data === "teleport start" ? _(n, n.data, "teleport end") : a(n), t(r, e, null, s, l, Si(e), h), (Hi(r) || r.component.asyncDep) && !r.component.subTree) {
					let t;
					b ? (t = Y(ps), t.anchor = D ? D.previousSibling : e.lastChild) : t = n.nodeType === 3 ? X("") : Y(n.nodeType === 8 ? W : "div"), t.el = n, r.component.subTree = t;
				}
			} else w & 64 ? D = E === 8 ? r.type.hydrate(n, r, s, l, u, h, e, p) : x() : w & 128 && (D = r.type.hydrate(n, r, s, l, Si(o(n)), u, h, e, d));
		}
		return C != null && gi(C, null, l, r), D;
	}, f = (e, t, n, i, a, o) => {
		o ||= !!t.dynamicChildren;
		let { type: c, dynamicProps: l, props: u, patchFlag: d, shapeFlag: f, dirs: m, transition: g } = t, _ = c === "input" || c === "option", b = !!l;
		if (_ || b || d !== -1) {
			m && Cr(t, null, n, "created");
			let c = !1;
			if (y(e)) {
				c = qo(null, g) && n && n.vnode.props && n.vnode.props.appear;
				let r = e.content.firstChild;
				if (c) {
					let e = r.getAttribute("class");
					e && (r.$cls = e), g.beforeEnter(r);
				}
				v(r, e, n), t.el = e = r;
			}
			if (f & 16 && !(u && (u.innerHTML || u.textContent))) {
				let r = p(e.firstChild, t, e, n, i, a, o);
				for (r && !ki(e, 1) && yi(); r;) {
					let e = r;
					r = r.nextSibling, s(e);
				}
			} else if (f & 8) {
				let n = t.children;
				n[0] === "\n" && (e.tagName === "PRE" || e.tagName === "TEXTAREA") && (n = n.slice(1));
				let { textContent: r } = e;
				r !== n && r !== n.replace(/\r\n|\r/g, "\n") && (ki(e, 0) || yi(), e.textContent = t.children);
			}
			if (u) {
				if (_ || b || !o || d & 48) {
					let t = e.tagName.includes("-"), i = e.namespaceURI.includes("svg") ? "svg" : e.namespaceURI.includes("MathML") ? "mathml" : void 0;
					for (let a in u) if (_ && (a.endsWith("value") || a === "indeterminate") || h(a) && !ae(a) || a[0] === "." || t && !ae(a) || l && l.includes(a)) {
						if (Ei(e, a, u[a])) continue;
						r(e, a, null, u[a], i, n);
					}
				} else if (u.onClick) r(e, "onClick", null, u.onClick, void 0, n);
				else if (d & 4 && /* @__PURE__ */ ln(u.style)) for (let e in u.style) u.style[e];
			}
			let x;
			(x = u && u.onVnodeBeforeMount) && Ns(x, n, t), m && Cr(t, null, n, "beforeMount"), ((x = u && u.onVnodeMounted) || m || c) && ls(() => {
				x && Ns(x, n, t), c && g.enter(e), m && Cr(t, null, n, "mounted");
			}, i);
		}
		return e.nextSibling;
	}, p = (e, t, r, o, s, l, u) => {
		u ||= !!t.dynamicChildren;
		let f = t.children, p = f.length, m = !1;
		for (let t = 0; t < p; t++) {
			let h = u ? f[t] : f[t] = ks(f[t]), g = h.type === fs;
			e ? (g && !u && t + 1 < p && ks(f[t + 1]).type === fs && (c(i(e.data.slice(h.children.length)), r, a(e)), e.data = h.children), e = d(e, h, o, s, l, u)) : g && !h.children ? c(h.el = i(""), r) : (m || (m = !0, ki(r, 1) || yi()), n(null, h, r, null, o, s, Si(r), l));
		}
		return e;
	}, m = (e, t, n, r, i, s) => {
		let { slotScopeIds: u } = t;
		u && (i = i ? i.concat(u) : u);
		let d = o(e), f = p(a(e), t, d, n, r, i, s);
		return f && Ci(f) && f.data === "]" ? a(t.anchor = f) : (yi(), c(t.anchor = l("]"), d, f), f);
	}, g = (e, t, r, i, c, l) => {
		if (ji(e, t) || yi(), t.el = null, l) {
			let t = _(e);
			for (;;) {
				let n = a(e);
				if (n && n !== t) s(n);
				else break;
			}
		}
		let u = a(e), d = o(e);
		return s(e), n(null, t, d, u, r, i, Si(d), c), r && (r.vnode.el = t.el, So(r, t.el)), u;
	}, _ = (e, t = "[", n = "]") => {
		let r = 0;
		for (; e;) if (e = a(e), e && Ci(e) && (e.data === t && r++, e.data === n)) {
			if (r === 0) return a(e);
			r--;
		}
		return e;
	}, v = (e, t, n) => {
		let r = t.parentNode;
		r && r.replaceChild(e, t);
		let i = n;
		for (; i;) i.vnode.el === t && (i.vnode.el = i.subTree.el = e), i = i.parent;
	}, y = (e) => e.nodeType === 1 && e.tagName === "TEMPLATE";
	return [u, d];
}
var Ti = /* @__PURE__ */ new Set([
	"src",
	"srcset",
	"href",
	"poster"
]);
function Ei(e, t, n) {
	return Ti.has(t) ? e.getAttribute(t) === (n == null ? null : `${n}`) : !1;
}
var Di = "data-allow-mismatch", Oi = {
	0: "text",
	1: "children",
	2: "class",
	3: "style",
	4: "attribute"
};
function ki(e, t) {
	if (t === 0 || t === 1) for (; e && !e.hasAttribute(Di);) e = e.parentElement;
	return Ai(e && e.getAttribute(Di), t);
}
function Ai(e, t) {
	if (e == null) return !1;
	if (e === "") return !0;
	{
		let n = e.split(",");
		return t === 0 && n.includes("children") ? !0 : n.includes(Oi[t]);
	}
}
function ji(e, t) {
	return ki(e.parentElement, 1) || Mi(e) || Ni(t);
}
function Mi(e) {
	return e.nodeType === 1 && Ai(e.getAttribute(Di), 1);
}
function Ni({ props: e }) {
	let t = e && e[Di];
	return typeof t == "string" && Ai(t, 1);
}
var Pi = _e().requestIdleCallback || ((e) => setTimeout(e, 1)), Fi = _e().cancelIdleCallback || ((e) => clearTimeout(e)), Ii = (e = 1e4) => (t) => {
	let n = Pi(t, { timeout: e });
	return () => Fi(n);
};
function Li(e) {
	let { top: t, left: n, bottom: r, right: i } = e.getBoundingClientRect(), { innerHeight: a, innerWidth: o } = window;
	return (t > 0 && t < a || r > 0 && r < a) && (n > 0 && n < o || i > 0 && i < o);
}
var Ri = (e) => (t, n) => {
	let r = new IntersectionObserver((e) => {
		for (let n of e) if (n.isIntersecting) {
			r.disconnect(), t();
			break;
		}
	}, e);
	return n((e) => {
		if (e instanceof Element) {
			if (Li(e)) return t(), r.disconnect(), !1;
			r.observe(e);
		}
	}), () => r.disconnect();
}, zi = (e) => (t) => {
	if (e) {
		let n = matchMedia(e);
		if (n.matches) t();
		else return n.addEventListener("change", t, { once: !0 }), () => n.removeEventListener("change", t);
	}
}, Bi = (e = []) => (t, n) => {
	D(e) && (e = [e]);
	let r = !1, i = (e) => {
		r || (r = !0, a(), t(), e.target.dispatchEvent(new e.constructor(e.type, e)));
	}, a = () => {
		n((t) => {
			for (let n of e) t.removeEventListener(n, i);
		});
	};
	return n((t) => {
		for (let n of e) t.addEventListener(n, i, { once: !0 });
	}), a;
};
function Vi(e, t) {
	if (Ci(e) && e.data === "[") {
		let n = 1, r = e.nextSibling;
		for (; r;) {
			if (r.nodeType === 1) {
				if (t(r) === !1) break;
			} else if (Ci(r)) {
				if (r.data === "]") {
					if (--n === 0) break;
				} else r.data === "[" && n++;
			}
			r = r.nextSibling;
		}
	} else t(e);
}
var Hi = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function Ui(e) {
	E(e) && (e = { loader: e });
	let { loader: t, loadingComponent: n, errorComponent: r, delay: i = 200, hydrate: a, timeout: o, suspensible: s = !0, onError: c } = e, l = null, u, d = 0, f = () => (d++, l = null, p()), p = () => {
		let e;
		return l || (e = l = t().catch((e) => {
			if (e = e instanceof Error ? e : Error(String(e)), c) return new Promise((t, n) => {
				c(e, () => t(f()), () => n(e), d + 1);
			});
			throw e;
		}).then((t) => e !== l && l ? l : (t && (t.__esModule || t[Symbol.toStringTag] === "Module") && (t = t.default), u = t, t)));
	};
	return /* @__PURE__ */ B({
		name: "AsyncComponentWrapper",
		__asyncLoader: p,
		__asyncHydrate(e, t, n) {
			let r = e.isConnected, i = !1;
			(t.bu ||= []).push(() => i = !0);
			let o = () => {
				i || !e.parentNode || r && !e.isConnected || n();
			}, s = a ? () => {
				let n = a(o, (t) => Vi(e, t));
				n && (t.bum ||= []).push(n);
			} : o;
			u ? s() : p().then(() => !t.isUnmounted && s());
		},
		get __asyncResolved() {
			return u;
		},
		setup() {
			let e = Ls;
			if (fi(e), u) return () => Wi(u, e);
			let t = (t) => {
				l = null, Yn(t, e, 13, !r);
			};
			if (s && e.suspense || Us) return p().then((t) => () => Wi(t, e)).catch((e) => (t(e), () => r ? Y(r, { error: e }) : null));
			let a = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(), d = /* @__PURE__ */ L(!!i), f, m;
			return sa(() => {
				f != null && clearTimeout(f), m != null && clearTimeout(m);
			}), i && (m = setTimeout(() => {
				e.isUnmounted || (d.value = !1);
			}, i)), o != null && (f = setTimeout(() => {
				if (!e.isUnmounted && !a.value && !c.value) {
					let e = /* @__PURE__ */ Error(`Async component timed out after ${o}ms.`);
					t(e), c.value = e;
				}
			}, o)), p().then(() => {
				e.isUnmounted || (a.value = !0, e.parent && Gi(e.parent.vnode) && e.parent.update());
			}).catch((n) => {
				if (e.isUnmounted) {
					l = null;
					return;
				}
				t(n), c.value = n;
			}), () => {
				if (a.value && u) return Wi(u, e);
				if (c.value && r) return Y(r, { error: c.value });
				if (n && !d.value) return Wi(n, e);
			};
		}
	});
}
function Wi(e, t) {
	let { ref: n, props: r, children: i, ce: a } = t.vnode, o = Y(e, r, i);
	return o.ref = n, o.ce = a, delete t.vnode.ce, o;
}
var Gi = (e) => e.type.__isKeepAlive, Ki = {
	name: "KeepAlive",
	__isKeepAlive: !0,
	props: {
		include: [
			String,
			RegExp,
			Array
		],
		exclude: [
			String,
			RegExp,
			Array
		],
		max: [String, Number]
	},
	setup(e, { slots: t }) {
		let n = Q(), r = n.ctx;
		if (!r.renderer) return () => {
			let e = t.default && t.default();
			return e && e.length === 1 ? e[0] : e;
		};
		let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = null, s = n.suspense, { renderer: { p: c, m: l, um: u, o: { createElement: d } } } = r, f = d("div");
		r.activate = (e, t, n, r, i) => {
			let a = e.component;
			l(e, t, n, 0, s), c(a.vnode, e, t, n, a, s, r, e.slotScopeIds, i), Vo(() => {
				a.isDeactivated = !1, a.a && fe(a.a);
				let t = e.props && e.props.onVnodeMounted;
				t && Ns(t, a.parent, e);
			}, s);
		}, r.deactivate = (e) => {
			let t = e.component;
			Zo(t.m), Zo(t.a), l(e, f, null, 1, s), Vo(() => {
				t.da && fe(t.da);
				let n = e.props && e.props.onVnodeUnmounted;
				n && Ns(n, t.parent, e), t.isDeactivated = !0;
			}, s);
		};
		function p(e) {
			Qi(e), u(e, n, s, !0);
		}
		function m(e) {
			i.forEach((t, n) => {
				let r = tc(Hi(t) ? t.type.__asyncResolved || {} : t.type);
				r && !e(r) && h(n);
			});
		}
		function h(e) {
			let t = i.get(e);
			t && (!o || !xs(t, o)) ? p(t) : o && Qi(o), i.delete(e), a.delete(e);
		}
		Mr(() => [e.include, e.exclude], ([e, t]) => {
			e && m((t) => qi(e, t)), t && m((e) => !qi(t, e));
		}, {
			flush: "post",
			deep: !0
		});
		let g = null, _ = () => {
			g != null && ($o(n.subTree.type) ? Vo(() => {
				let e = $i(n.subTree);
				e.component && i.set(g, e);
			}, n.subTree.suspense) : i.set(g, $i(n.subTree)));
		};
		return ra(_), aa(_), oa(() => {
			i.forEach((e) => {
				let { subTree: t, suspense: r } = n, i = $i(t);
				if (e.type === i.type && e.key === i.key) {
					Qi(i);
					let e = i.component.da;
					e && Vo(e, r);
					return;
				}
				p(e);
			});
		}), () => {
			if (g = null, !t.default) return o = null;
			let n = t.default(), r = n[0];
			if (n.length > 1) return o = null, n;
			if (!bs(r) || !(r.shapeFlag & 4) && !(r.shapeFlag & 128)) return o = null, r;
			let s = $i(r);
			if (s.type === W) return o = null, s;
			let c = s.type, l = tc(Hi(s) ? s.type.__asyncResolved || {} : c), { include: u, exclude: d, max: f } = e;
			if (u && (!l || !qi(u, l)) || d && l && qi(d, l)) return s.shapeFlag &= -257, o = s, r;
			let p = s.key == null ? c : s.key, m = i.get(p);
			return s.el && (s = Ds(s), r.shapeFlag & 128 && (r.ssContent = s)), g = p, m ? (s.el = m.el, s.component = m.component, s.transition && li(s, s.transition), s.shapeFlag |= 512, a.delete(p), a.add(p)) : (a.add(p), f && a.size > parseInt(f, 10) && h(a.values().next().value)), s.shapeFlag |= 256, o = s, $o(r.type) ? r : s;
		};
	}
};
function qi(e, t) {
	return x(e) ? e.some((e) => qi(e, t)) : D(e) ? e.split(",").includes(t) : T(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function Ji(e, t) {
	Xi(e, "a", t);
}
function Yi(e, t) {
	Xi(e, "da", t);
}
function Xi(e, t, n = Ls) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (ea(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Gi(e.parent.vnode) && Zi(r, t, n, e), e = e.parent;
	}
}
function Zi(e, t, n, r) {
	let i = ea(t, e, r, !0);
	sa(() => {
		v(r[t], i);
	}, n);
}
function Qi(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function $i(e) {
	return e.shapeFlag & 128 ? e.ssContent : e;
}
function ea(e, t, n = Ls, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			ct();
			let i = Bs(n), a = Jn(t, n, e, r);
			return i(), lt(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var ta = (e) => (t, n = Ls) => {
	(!Us || e === "sp") && ea(e, (...e) => t(...e), n);
}, na = ta("bm"), ra = ta("m"), ia = ta("bu"), aa = ta("u"), oa = ta("bum"), sa = ta("um"), ca = ta("sp"), la = ta("rtg"), ua = ta("rtc");
function da(e, t = Ls) {
	ea("ec", e, t);
}
var fa = "components", pa = "directives";
function ma(e, t) {
	return va(fa, e, !0, t) || e;
}
var ha = /* @__PURE__ */ Symbol.for("v-ndc");
function ga(e) {
	return D(e) ? va(fa, e, !1) || e : e || ha;
}
function _a(e) {
	return va(pa, e);
}
function va(e, t, n = !0, r = !1) {
	let i = gr || Ls;
	if (i) {
		let n = i.type;
		if (e === fa) {
			let e = tc(n, !1);
			if (e && (e === t || e === M(t) || e === le(M(t)))) return n;
		}
		let a = ya(i[e] || n[e], t) || ya(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function ya(e, t) {
	return e && (e[t] || e[M(t)] || e[le(M(t))]);
}
function V(e, t, n, r) {
	let i, a = n && n[r], o = x(e);
	if (o || D(e)) {
		let n = o && /* @__PURE__ */ ln(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ dn(e), s = /* @__PURE__ */ un(e), e = Ct(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? hn(mn(e[n])) : mn(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (k(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
function ba(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (x(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn;
		else r && (e[r.name] = r.key ? (...e) => {
			let t = r.fn(...e);
			return t && (t.key = r.key), t;
		} : r.fn);
	}
	return e;
}
function H(e, t, n, r, i, a) {
	if (n ??= {}, gr.ce || gr.parent && Hi(gr.parent) && gr.parent.ce) {
		let e = a != null && n.key == null ? _({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), G(), q(U, null, [Y("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let s = ms.length;
	G();
	let c;
	try {
		let i = o && xa(o(n)), s = n.key || a || i && i.key;
		c = q(U, { key: (s && !O(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = ms.length; e > s; e--) gs();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), c;
}
function xa(e) {
	return e.some((e) => !bs(e) || !(e.type === W || e.type === U && !xa(e.children))) ? e : null;
}
function Sa(e, t) {
	let n = {};
	for (let r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : ue(r)] = e[r];
	return n;
}
var Ca = (e) => e ? Hs(e) ? ec(e) : Ca(e.parent) : null, wa = /* @__PURE__ */ _(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Ca(e.parent),
	$root: (e) => Ca(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Ja(e),
	$forceUpdate: (e) => e.f ||= () => {
		or(e.update);
	},
	$nextTick: (e) => e.n ||= ir.bind(e.proxy),
	$watch: (e) => Pr.bind(e)
}), Ta = (e, t) => e !== d && !e.__isScriptSetup && b(e, t), Ea = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: c } = e;
		if (t[0] !== "$") {
			let e = o[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return a[t];
			}
			else if (Ta(r, t)) return o[t] = 1, r[t];
			else if (i !== d && b(i, t)) return o[t] = 2, i[t];
			else if (b(a, t)) return o[t] = 3, a[t];
			else if (n !== d && b(n, t)) return o[t] = 4, n[t];
			else Ua && (o[t] = 0);
		}
		let l = wa[t], u, f;
		if (l) return t === "$attrs" && yt(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== d && b(n, t)) return o[t] = 4, n[t];
		if (f = c.config.globalProperties, b(f, t)) return f[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Ta(i, t) ? (i[t] = n, !0) : r !== d && b(r, t) ? (r[t] = n, !0) : b(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== d && s[0] !== "$" && b(e, s) || Ta(t, s) || b(a, s) || b(r, s) || b(wa, s) || b(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? b(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
}, Da = /* @__PURE__ */ _({}, Ea, {
	get(e, t) {
		if (t !== Symbol.unscopables) return Ea.get(e, t, e);
	},
	has(e, t) {
		return t[0] !== "_" && !ve(t);
	}
});
function Oa() {
	return null;
}
function ka() {
	return null;
}
function Aa(e) {}
function ja(e) {}
function Ma() {
	return null;
}
function Na() {}
function Pa(e, t) {
	return null;
}
function Fa() {
	return La("useSlots").slots;
}
function Ia() {
	return La("useAttrs").attrs;
}
function La(e) {
	let t = Q();
	return t.setupContext ||= $s(t);
}
function Ra(e) {
	return x(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function za(e, t) {
	let n = Ra(e);
	for (let e in t) {
		if (e.startsWith("__skip")) continue;
		let r = n[e];
		r ? x(r) || E(r) ? r = n[e] = {
			type: r,
			default: t[e]
		} : r.default = t[e] : r === null && (r = n[e] = { default: t[e] }), r && t[`__skip_${e}`] && (r.skipFactory = !0);
	}
	return n;
}
function Ba(e, t) {
	return !e || !t ? e || t : x(e) && x(t) ? e.concat(t) : _({}, Ra(e), Ra(t));
}
function Va(e, t) {
	let n = {};
	for (let r in e) t.includes(r) || Object.defineProperty(n, r, {
		enumerable: !0,
		get: () => e[r]
	});
	return n;
}
function Ha(e) {
	let t = Q(), n = Us, r = e();
	Vs(), n && zs(!1);
	let i = () => {
		Bs(t), n && zs(!0);
	}, a = () => {
		Q() !== t && t.scope.off(), Vs(), n && zs(!1);
	};
	return A(r) && (r = r.catch((e) => {
		throw i(), Promise.resolve().then(() => Promise.resolve().then(a)), e;
	})), [r, () => {
		i(), Promise.resolve().then(a);
	}];
}
var Ua = !0;
function Wa(e) {
	let t = Ja(e), n = e.proxy, r = e.ctx;
	Ua = !1, t.beforeCreate && Ka(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: f, beforeUpdate: m, updated: h, activated: g, deactivated: _, beforeDestroy: v, beforeUnmount: y, destroyed: b, unmounted: S, render: C, renderTracked: w, renderTriggered: T, errorCaptured: D, serverPrefetch: O, expose: A, inheritAttrs: ee, components: te, directives: ne, filters: re } = t;
	if (l && Ga(l, r, null), o) for (let e in o) {
		let t = o[e];
		E(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		k(t) && (e.data = /* @__PURE__ */ rn(t));
	}
	if (Ua = !0, a) for (let e in a) {
		let t = a[e], i = $({
			get: E(t) ? t.bind(n, n) : E(t.get) ? t.get.bind(n, n) : p,
			set: !E(t) && E(t.set) ? t.set.bind(n) : p
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) qa(s[e], r, n, e);
	if (c) {
		let e = E(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			wr(t, e[t]);
		});
	}
	u && Ka(u, e, "c");
	function ie(e, t) {
		x(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (ie(na, d), ie(ra, f), ie(ia, m), ie(aa, h), ie(Ji, g), ie(Yi, _), ie(da, D), ie(ua, w), ie(la, T), ie(oa, y), ie(sa, S), ie(ca, O), x(A)) {
		if (A.length) {
			let t = e.exposed ||= {};
			A.forEach((e) => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: (t) => n[e] = t,
					enumerable: !0
				});
			});
		} else e.exposed ||= {};
	}
	C && e.render === p && (e.render = C), ee != null && (e.inheritAttrs = ee), te && (e.components = te), ne && (e.directives = ne), O && fi(e);
}
function Ga(e, t, n = p) {
	x(e) && (e = $a(e));
	for (let n in e) {
		let r = e[n], i;
		i = k(r) ? "default" in r ? Tr(r.from || n, r.default, !0) : Tr(r.from || n) : Tr(r), /* @__PURE__ */ I(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Ka(e, t, n) {
	Jn(x(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function qa(e, t, n, r) {
	let i = r.includes(".") ? Fr(n, r) : () => n[r];
	if (D(e)) {
		let n = t[e];
		E(n) && Mr(i, n);
	} else if (E(e)) Mr(i, e.bind(n));
	else if (k(e)) {
		if (x(e)) e.forEach((e) => qa(e, t, n, r));
		else {
			let r = E(e.handler) ? e.handler.bind(n) : t[e.handler];
			E(r) && Mr(i, r, e);
		}
	}
}
function Ja(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ya(c, e, o, !0)), Ya(c, t, o)), k(t) && a.set(t, c), c;
}
function Ya(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ya(e, a, n, !0), i && i.forEach((t) => Ya(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Xa[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Xa = {
	data: Za,
	props: no,
	emits: no,
	methods: to,
	computed: to,
	beforeCreate: eo,
	created: eo,
	beforeMount: eo,
	mounted: eo,
	beforeUpdate: eo,
	updated: eo,
	beforeDestroy: eo,
	beforeUnmount: eo,
	destroyed: eo,
	unmounted: eo,
	activated: eo,
	deactivated: eo,
	errorCaptured: eo,
	serverPrefetch: eo,
	components: to,
	directives: to,
	watch: ro,
	provide: Za,
	inject: Qa
};
function Za(e, t) {
	return t ? e ? function() {
		return _(E(e) ? e.call(this, this) : e, E(t) ? t.call(this, this) : t);
	} : t : e;
}
function Qa(e, t) {
	return to($a(e), $a(t));
}
function $a(e) {
	if (x(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function eo(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function to(e, t) {
	return e ? _(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function no(e, t) {
	return e ? x(e) && x(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : _(/* @__PURE__ */ Object.create(null), Ra(e), Ra(t ?? {})) : t;
}
function ro(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = _(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = eo(e[r], t[r]);
	return n;
}
function io() {
	return {
		app: null,
		config: {
			isNativeTag: m,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var ao = 0;
function oo(e, t) {
	return function(n, r = null) {
		E(n) || (n = _({}, n)), r != null && !k(r) && (r = null);
		let i = io(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: ao++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: sc,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && E(e.install) ? (a.add(e), e.install(c, ...t)) : E(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || Y(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, ec(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Jn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = so;
				so = c;
				try {
					return e();
				} finally {
					so = t;
				}
			}
		};
		return c;
	};
}
var so = null;
function co(e, t, n = d) {
	let r = Q(), i = M(t), a = ce(t), o = lo(e, i), s = wn((o, s) => {
		let c, l = d, u;
		return jr(() => {
			let t = e[i];
			de(c, t) && (c = t, s());
		}), {
			get() {
				return o(), n.get ? n.get(c) : c;
			},
			set(e) {
				let o = n.set ? n.set(e) : e;
				if (!de(o, c) && !(l !== d && de(e, l))) return;
				let f = r.vnode.props, p = !!(f && (t in f || i in f || a in f) && (`onUpdate:${t}` in f || `onUpdate:${i}` in f || `onUpdate:${a}` in f));
				p || (c = e, s()), r.emit(`update:${t}`, o), de(e, l) && (de(e, o) && !de(o, u) || p && l !== d && !de(o, c)) && s(), l = e, u = o;
			}
		};
	});
	return s[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? o || d : s,
				done: !1
			} : { done: !0 };
		} };
	}, s;
}
var lo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${M(t)}Modifiers`] || e[`${ce(t)}Modifiers`];
function uo(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || d, i = n, a = t.startsWith("update:"), o = a && lo(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => D(e) ? e.trim() : e)), o.number && (i = i.map(me)));
	let s, c = r[s = ue(t)] || r[s = ue(M(t))];
	!c && a && (c = r[s = ue(ce(t))]), c && Jn(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, Jn(l, e, 6, i);
	}
}
var fo = /* @__PURE__ */ new WeakMap();
function po(e, t, n = !1) {
	let r = n ? fo : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!E(e)) {
		let r = (e) => {
			let n = po(e, t, !0);
			n && (s = !0, _(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (k(e) && r.set(e, null), null) : (x(a) ? a.forEach((e) => o[e] = null) : _(o, a), k(e) && r.set(e, o), o);
}
function mo(e, t) {
	return !e || !h(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), b(e, t[0].toLowerCase() + t.slice(1)) || b(e, ce(t)) || b(e, t));
}
function ho(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, _ = vr(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = ks(l.call(t, e, u, d, p, f, m)), y = s;
		} else {
			let e = t;
			v = ks(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), y = t.props ? s : _o(s);
		}
	} catch (t) {
		ms.length = 0, Yn(t, e, 1), v = Y(W);
	}
	let b = v;
	if (y && h !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(g) && (y = vo(y, a)), b = Ds(b, y, !1, !0));
	}
	return n.dirs && (b = Ds(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && li(Rr(b.type) && ci(b) || b, n.transition), v = b, vr(_), v;
}
function go(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (bs(r)) {
			if (r.type !== W || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var _o = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || h(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, vo = (e, t) => {
	let n = {};
	for (let r in e) (!g(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function yo(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? bo(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (xo(o, r, n) && !mo(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || bo(r, o, l) : !!o;
	return !1;
}
function bo(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (xo(t, e, a) && !mo(n, a)) return !0;
	}
	return !1;
}
function xo(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && k(r) && k(i) ? !Ne(r, i) : r !== i;
}
function So({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Co = {}, wo = () => Object.create(Co), To = (e) => Object.getPrototypeOf(e) === Co;
function Eo(e, t, n, r = !1) {
	let i = {}, a = wo();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Oo(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ an(i) : e.type.props ? i : a, e.attrs = a;
}
function Do(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ F(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (mo(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) {
					if (b(a, o)) u !== a[o] && (a[o] = u, l = !0);
					else {
						let t = M(o);
						i[t] = ko(c, s, t, u, e, !1);
					}
				} else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Oo(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !b(t, a) && ((r = ce(a)) === a || !b(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = ko(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !b(t, e)) && (delete a[e], l = !0);
	}
	l && bt(e.attrs, "set", "");
}
function Oo(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (ae(c)) continue;
		let l = t[c], u;
		i && b(i, u = M(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : mo(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ F(n), r = s || d;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = ko(i, t, s, r[s], e, !b(r, s));
		}
	}
	return o;
}
function ko(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = b(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && E(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Bs(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === ce(n)) && (r = !0));
	}
	return r;
}
var Ao = /* @__PURE__ */ new WeakMap();
function jo(e, t, n = !1) {
	let r = n ? Ao : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!E(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = jo(e, t, !0);
			_(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return k(e) && r.set(e, f), f;
	if (x(a)) for (let e = 0; e < a.length; e++) {
		let t = M(a[e]);
		Mo(t) && (o[t] = d);
	}
	else if (a) for (let e in a) {
		let t = M(e);
		if (Mo(t)) {
			let n = a[e], r = o[t] = x(n) || E(n) ? { type: n } : _({}, n), i = r.type, c = !1, l = !0;
			if (x(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = E(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				}
				n === "String" && (l = !1);
			}
			else c = E(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || b(r, "default")) && s.push(t);
		}
	}
	let l = [o, s];
	return k(e) && r.set(e, l), l;
}
function Mo(e) {
	return e[0] !== "$" && !ae(e);
}
var No = (e) => e === "_" || e === "_ctx" || e === "$stable", Po = (e) => x(e) ? e.map(ks) : [ks(e)], Fo = (e, t, n) => {
	if (t._n) return t;
	let r = z((...e) => Po(t(...e)), n);
	return r._c = !1, r;
}, Io = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (No(n)) continue;
		let i = e[n];
		if (E(i)) t[n] = Fo(n, i, r);
		else if (i != null) {
			let e = Po(i);
			t[n] = () => e;
		}
	}
}, Lo = (e, t) => {
	let n = Po(t);
	e.slots.default = () => n;
}, Ro = (e, t, n) => {
	for (let r in t) (n || !No(r)) && (e[r] = t[r]);
}, zo = (e, t, n) => {
	let r = e.slots = wo();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Ro(r, t, n), n && pe(r, "_", e, !0)) : Io(t, r);
	} else t && Lo(e, t);
}, Bo = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = d;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Ro(i, t, n) : (a = !t.$stable, Io(t, i)), o = t;
	} else t && (Lo(e, t), o = { default: 1 });
	if (a) for (let e in i) !No(e) && o[e] == null && delete i[e];
}, Vo = ls;
function Ho(e) {
	return Wo(e);
}
function Uo(e) {
	return Wo(e, wi);
}
function Wo(e, t) {
	let n = _e();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: m, nextSibling: h, setScopeId: g = p, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !xs(e, t) && (r = he(e), le(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === f && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case fs:
				y(e, t, n, r);
				break;
			case W:
				b(e, t, n, r);
				break;
			case ps:
				e ?? x(t, n, r, o);
				break;
			case U:
				ee(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? te(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, ye);
		}
		u != null && i ? gi(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && gi(e.ref, null, a, e, !0);
	}, y = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && l(n, t.children);
		}
	}, b = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = h(e), r(e, n, i), e = a;
		r(t, n, i);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), i(e), e = n;
		i(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) T(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), O(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, T = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && D(e.children, f, null, i, s, Go(e, c), l, d), _ && Cr(e, null, i, "created"), E(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !ae(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && Ns(p, i, e);
		}
		_ && Cr(e, null, i, "beforeMount");
		let v = qo(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && Vo(() => {
			try {
				p && Ns(p, i, e), v && g.enter(f), _ && Cr(e, null, i, "mounted");
			} finally {}
		}, s);
	}, E = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || $o(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				E(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? As(e[l]) : ks(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, O = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: f, dirs: p } = t;
		l |= e.patchFlag & 16;
		let m = e.props || d, h = t.props || d, g;
		if (n && Ko(n, !1), (g = h.onVnodeBeforeUpdate) && Ns(g, n, t, e), p && Cr(t, e, n, "beforeUpdate"), n && Ko(n, !0), f && (!e.dynamicChildren || e.dynamicChildren.length !== f.length) && (l = 0, s = !1, f = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && u(c, ""), f ? k(e.dynamicChildren, f, c, n, r, Go(t, i), o) : s || j(e, t, c, null, n, r, Go(t, i), o, !1), l > 0) {
			if (l & 16) A(c, m, h, n, i);
			else if (l & 2 && m.class !== h.class && a(c, "class", null, h.class, i), l & 4 && a(c, "style", m.style, h.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = m[r], s = h[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && f == null && A(c, m, h, n, i);
		((g = h.onVnodeUpdated) || p) && Vo(() => {
			g && Ns(g, n, t, e), p && Cr(t, e, n, "updated");
		}, r);
	}, k = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el && (c.type === U || !xs(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
			v(c, l, u, null, r, i, a, o, !0);
		}
	}, A = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== d) for (let o in t) !ae(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (ae(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, ee = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), D(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (k(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Jo(e, t, !0)) : j(e, t, n, f, a, o, c, l, u);
	}, te = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : ne(t, n, r, i, a, o, c) : re(e, t, c);
	}, ne = (e, t, n, r, i, a, o) => {
		let s = e.component = Is(e, r, i);
		if (Gi(e) && (s.ctx.renderer = ye), Ws(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ie, o), !e.el) {
				let r = s.subTree = Y(W);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ie(s, e, t, n, i, a, o);
	}, re = (e, t, n) => {
		let r = t.component = e.component;
		if (yo(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, oe(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, r.vnode = t;
	}, ie = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Xo(e);
					if (n) {
						t && (t.el = c.el, oe(e, t, o)), n.asyncDep.then(() => {
							Vo(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Ko(e, !1), t ? (t.el = c.el, oe(e, t, o)) : t = c, n && fe(n), (d = t.props && t.props.onVnodeBeforeUpdate) && Ns(d, s, t, c), Ko(e, !0);
				let f = ho(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), he(p), e, i, a), t.el = f.el, u === null && So(e, f.el), r && Vo(r, i), (d = t.props && t.props.onVnodeUpdated) && Vo(() => Ns(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Hi(t);
				if (Ko(e, !1), l && fe(l), !m && (o = c && c.onVnodeBeforeMount) && Ns(o, d, t), Ko(e, !0), s && xe) {
					let t = () => {
						e.subTree = ho(e), xe(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = ho(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && Vo(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					Vo(() => Ns(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Hi(d.vnode) && d.vnode.shapeFlag & 256) && e.a && Vo(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Ge(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => or(u), Ko(e, !0), l();
	}, oe = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Do(e, t.props, r, n), Bo(e, t.children, n), ct(), lr(e), lt();
	}, j = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				se(l, f, n, r, i, a, o, s, c);
				return;
			}
			if (p & 256) {
				M(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && me(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? se(l, f, n, r, i, a, o, s, c) : me(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && D(f, n, r, i, a, o, s, c));
	}, M = (e, t, n, r, i, a, o, s, c) => {
		e ||= f, t ||= f;
		let l = e.length, u = t.length, d = Math.min(l, u), p = 0;
		for (; p < d; p++) {
			let r = t[p] = c ? As(t[p]) : ks(t[p]);
			v(e[p], r, n, null, i, a, o, s, c);
		}
		l > u ? me(e, i, a, !0, !1, d) : D(t, n, r, i, a, o, s, c, d);
	}, se = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, p = u - 1;
		for (; l <= d && l <= p;) {
			let r = e[l], u = t[l] = c ? As(t[l]) : ks(t[l]);
			if (xs(r, u)) v(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= p;) {
			let r = e[d], l = t[p] = c ? As(t[p]) : ks(t[p]);
			if (xs(r, l)) v(r, l, n, null, i, a, o, s, c);
			else break;
			d--, p--;
		}
		if (l > d) {
			if (l <= p) {
				let e = p + 1, d = e < u ? t[e].el : r;
				for (; l <= p;) v(null, t[l] = c ? As(t[l]) : ks(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > p) for (; l <= d;) le(e[l], i, a, !0), l++;
		else {
			let m = l, h = l, g = /* @__PURE__ */ new Map();
			for (l = h; l <= p; l++) {
				let e = t[l] = c ? As(t[l]) : ks(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (l = 0; l < b; l++) C[l] = 0;
			for (l = m; l <= d; l++) {
				let r = e[l];
				if (y >= b) {
					le(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && xs(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? le(r, i, a, !0) : (C[u - h] = l + 1, u >= S ? S = u : x = !0, v(r, t[u], n, null, i, a, o, s, c), y++);
			}
			let w = x ? Yo(C) : f;
			for (_ = w.length - 1, l = b - 1; l >= 0; l--) {
				let e = h + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || Qo(f) : r;
				C[l] === 0 ? v(null, d, n, p, i, a, o, s, c) : x && (_ < 0 || l !== w[_] ? ce(d, n, p, 2) : _--);
			}
		}
	}, ce = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			ce(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, ye);
			return;
		}
		if (c === U) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) ce(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === ps) {
			S(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) {
			if (a === 0) l.persisted && !s[Xr] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), Vo(() => l.enter(s), o));
			else {
				let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? i(s) : r(s, t, n);
				}, d = () => {
					let e = s._isLeaving || !!s[Xr];
					s._isLeaving && s[Xr](!0), l.persisted && !e ? u() : a(s, () => {
						u(), c && c();
					});
				};
				o ? o(s, u, d) : d();
			}
		} else r(s, t, n);
	}, le = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (ct(), gi(s, null, n, e, !0), lt()), p != null && (!e.ctx || e.ctx === t) && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Hi(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && Ns(_, t, e), u & 6) pe(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Cr(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ye, r) : l && !l.hasOnce && (a !== U || d > 0 && d & 64) ? me(l, t, n, !1, !0) : (a === U && d & 384 || !i && u & 16) && me(c, t, n), r && ue(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && Vo(() => {
			_ && Ns(_, t, e), h && Cr(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, ue = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === U) {
			de(n, r);
			return;
		}
		if (t === ps) {
			C(e), a && !a.persisted && a.afterLeave && a.afterLeave();
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, de = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), i(e), e = n;
		i(t);
	}, pe = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Zo(c), Zo(l), r && fe(r), i.stop(), a ? (a.flags |= 8, le(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, le(o, e, t, n)), s && Vo(s, t), Vo(() => {
			e.isUnmounted = !0;
		}, t);
	}, me = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) le(e[o], t, n, r, i);
	}, he = (e) => {
		if (e.shapeFlag & 6) return he(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Lr];
		return n ? h(n) : t;
	}, ge = !1, ve = (e, t, n) => {
		let r;
		e == null ? t._vnode && (le(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ge ||= (ge = !0, lr(r), ur(), !1);
	}, ye = {
		p: v,
		um: le,
		m: ce,
		r: ue,
		mt: ne,
		mc: D,
		pc: j,
		pbc: k,
		n: he,
		o: e
	}, be, xe;
	return t && ([be, xe] = t(ye)), {
		render: ve,
		hydrate: be,
		createApp: oo(ve, be)
	};
}
function Go({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ko({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function qo(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Jo(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (x(r) && x(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = As(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Jo(t, a)), a.type === fs && (a.patchFlag === -1 && (a = i[e] = As(a)), a.el = t.el), a.type === W && !a.el && (a.el = t.el);
	}
}
function Yo(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Xo(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Xo(t);
}
function Zo(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Qo(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Qo(t.subTree) : null;
}
var $o = (e) => e.__isSuspense, es = 0, ts = {
	name: "Suspense",
	__isSuspense: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		if (e == null) rs(t, n, r, i, a, o, s, c, l);
		else {
			if (a && a.deps > 0 && !e.suspense.isInFallback && !a.isHydrating) {
				t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
				return;
			}
			is(e, t, n, r, i, o, s, c, l);
		}
	},
	hydrate: os,
	normalize: ss
};
function ns(e, t) {
	let n = e.props && e.props[t];
	E(n) && n();
}
function rs(e, t, n, r, i, a, o, s, c) {
	let { p: l, o: { createElement: u } } = c, d = u("div"), f = e.suspense = as(e, i, r, t, d, n, a, o, s, c);
	l(null, f.pendingBranch = e.ssContent, d, null, r, f, a, o), f.deps > 0 ? (ns(e, "onPending"), ns(e, "onFallback"), l(null, e.ssFallback, t, n, r, null, a, o), us(f, e.ssFallback)) : f.resolve(!1, !0);
}
function is(e, t, n, r, i, a, o, s, { p: c, um: l, o: { createElement: u } }) {
	let d = t.suspense = e.suspense;
	d.vnode = t, t.el = e.el;
	let f = t.ssContent, p = t.ssFallback, { activeBranch: m, pendingBranch: h, isInFallback: g, isHydrating: _ } = d;
	if (h) d.pendingBranch = f, xs(h, f) ? (d.deps++, c(h, f, _ ? n : d.hiddenContainer, null, i, d, a, o, s), d.deps--, d.deps <= 0 ? d.resolve() : g && !_ && !d.isFallbackMountPending && (c(m, p, n, r, i, null, a, o, s), us(d, p))) : (d.pendingId = es++, _ ? (d.isHydrating = !1, d.activeBranch = h) : l(h, i, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = u("div"), g ? (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : d.isFallbackMountPending || (c(m, p, n, r, i, null, a, o, s), us(d, p))) : m && xs(m, f) ? (c(m, f, n, r, i, d, a, o, s), d.resolve(!0)) : (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 && d.resolve()));
	else if (m && xs(m, f)) c(m, f, n, r, i, d, a, o, s), us(d, f);
	else if (ns(t, "onPending"), d.pendingBranch = f, d.pendingId = f.shapeFlag & 512 ? f.component.suspenseId : es++, c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0) d.resolve();
	else {
		let { timeout: e, pendingId: t } = d;
		e > 0 ? setTimeout(() => {
			d.pendingId === t && d.fallback(p);
		}, e) : e === 0 && d.fallback(p);
	}
}
function as(e, t, n, r, i, a, o, s, c, l, u = !1) {
	let { p: d, m: f, um: p, n: m, o: { parentNode: h, remove: g } } = l, _, v = ds(e);
	v && t && t.pendingBranch && (_ = t.pendingId, t.deps++);
	let y = e.props ? he(e.props.timeout) : void 0, b = a, x = {
		vnode: e,
		parent: t,
		parentComponent: n,
		namespace: o,
		container: r,
		hiddenContainer: i,
		deps: 0,
		pendingId: es++,
		timeout: typeof y == "number" ? y : -1,
		activeBranch: null,
		isFallbackMountPending: !1,
		pendingBranch: null,
		isInFallback: !u,
		isHydrating: u,
		isUnmounted: !1,
		effects: [],
		resolve(e = !1, n = !1) {
			let { vnode: r, activeBranch: i, pendingBranch: o, pendingId: s, effects: c, parentComponent: l, container: u, isInFallback: d } = x, g = !1;
			if (x.isHydrating) x.isHydrating = !1;
			else if (!e) {
				g = i && o.transition && o.transition.mode === "out-in";
				let e = !1;
				g && (i.transition.afterLeave = () => {
					s === x.pendingId && (f(o, u, a === b && !e ? m(i) : a, 0), cr(c), d && r.ssFallback && (r.ssFallback.el = null));
				}), i && !x.isFallbackMountPending && (h(i.el) === u && (a = m(i), e = !0), p(i, l, x, !0), !g && d && r.ssFallback && Vo(() => r.ssFallback.el = null, x)), g || f(o, u, a, 0);
			}
			x.isFallbackMountPending = !1, us(x, o), x.pendingBranch = null, x.isInFallback = !1;
			let y = x.parent, S = !1;
			for (; y;) {
				if (y.pendingBranch) {
					for (let e = 0; e < c.length; e++) y.effects.push(c[e]);
					S = !0;
					break;
				}
				y = y.parent;
			}
			!S && !g && cr(c), x.effects = [], v && t && t.pendingBranch && _ === t.pendingId && (_ = void 0, t.deps--, t.deps === 0 && !n && t.resolve()), ns(r, "onResolve");
		},
		fallback(e) {
			if (!x.pendingBranch) return;
			let { vnode: t, activeBranch: n, parentComponent: r, container: i, namespace: a } = x;
			ns(t, "onFallback");
			let o = m(n), l = () => {
				if (x.isFallbackMountPending = !1, !x.isInFallback) return;
				let e = x.vnode.ssFallback;
				d(null, e, i, o, r, null, a, s, c), us(x, e);
			}, u = e.transition && e.transition.mode === "out-in";
			u && (x.isFallbackMountPending = !0, n.transition.afterLeave = l), x.isInFallback = !0, p(n, r, null, !0), u || l();
		},
		move(e, t, n) {
			x.activeBranch && f(x.activeBranch, e, t, n), x.container = e;
		},
		next() {
			return x.activeBranch && m(x.activeBranch);
		},
		registerDep(e, t, n) {
			let r = !!x.pendingBranch;
			r && x.deps++;
			let i = e.vnode.el;
			e.asyncDep.catch((t) => {
				Yn(t, e, 0);
			}).then((a) => {
				if (e.isUnmounted || x.isUnmounted || x.pendingId !== e.suspenseId) return;
				if (Vs(), i && !e.scope.active) {
					r && --x.deps === 0 && x.resolve();
					return;
				}
				e.asyncResolved = !0;
				let { vnode: s } = e;
				Ks(e, a, !1), i && (s.el = i);
				let c = !i && e.subTree.el;
				t(e, s, h(i || e.subTree.el), i ? null : m(e.subTree), x, o, n), c && (s.placeholder = null, g(c)), So(e, s.el), r && --x.deps === 0 && x.resolve();
			});
		},
		unmount(e, t) {
			x.isUnmounted = !0, x.activeBranch && p(x.activeBranch, n, e, t), x.pendingBranch && p(x.pendingBranch, n, e, t);
		}
	};
	return x;
}
function os(e, t, n, r, i, a, o, s, c) {
	let l = t.suspense = as(t, r, n, e.parentNode, document.createElement("div"), null, i, a, o, s, !0), u = c(e, l.pendingBranch = t.ssContent, n, l, a, o);
	return l.deps === 0 && l.resolve(!1, !0), u;
}
function ss(e) {
	let { shapeFlag: t, children: n } = e, r = t & 32;
	e.ssContent = cs(r ? n.default : n), e.ssFallback = r ? cs(n.fallback) : Y(W);
}
function cs(e) {
	let t;
	if (E(e)) {
		let n = _s && e._c;
		n && (e._d = !1, G()), e = e(), n && (e._d = !0, t = hs, gs());
	}
	return x(e) && (e = go(e)), e = ks(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((t) => t !== e)), e;
}
function ls(e, t) {
	t && t.pendingBranch ? x(e) ? t.effects.push(...e) : t.effects.push(e) : cr(e);
}
function us(e, t) {
	e.activeBranch = t;
	let { vnode: n, parentComponent: r } = e, i = t.el;
	for (; !i && t.component;) t = t.component.subTree, i = t.el;
	n.el = i, r && r.subTree === n && (r.vnode.el = i, So(r, i));
}
function ds(e) {
	let t = e.props && e.props.suspensible;
	return t != null && t !== !1;
}
var U = /* @__PURE__ */ Symbol.for("v-fgt"), fs = /* @__PURE__ */ Symbol.for("v-txt"), W = /* @__PURE__ */ Symbol.for("v-cmt"), ps = /* @__PURE__ */ Symbol.for("v-stc"), ms = [], hs = null;
function G(e = !1) {
	ms.push(hs = e ? null : []);
}
function gs() {
	ms.pop(), hs = ms[ms.length - 1] || null;
}
var _s = 1;
function vs(e, t = !1) {
	_s += e, e < 0 && hs && t && (hs.hasOnce = !0);
}
function ys(e) {
	return e.dynamicChildren = _s > 0 ? hs || f : null, gs(), _s > 0 && hs && hs.push(e), e;
}
function K(e, t, n, r, i, a) {
	return ys(J(e, t, n, r, i, a, !0));
}
function q(e, t, n, r, i) {
	return ys(Y(e, t, n, r, i, !0));
}
function bs(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function xs(e, t) {
	return e.type === t.type && e.key === t.key;
}
function Ss(e) {}
var Cs = ({ key: e }) => e ?? null, ws = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : D(e) || /* @__PURE__ */ I(e) || E(e) ? {
	i: gr,
	r: e,
	k: t,
	f: !!n
} : e);
function J(e, t = null, n = null, r = 0, i = null, a = e === U ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Cs(t),
		ref: t && ws(t),
		scopeId: _r,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: gr
	};
	return s ? (js(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= D(n) ? 8 : 16), _s > 0 && !o && hs && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && hs.push(c), c;
}
var Y = Ts;
function Ts(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === ha) && (e = W), bs(e)) {
		let r = Ds(e, t, !0);
		return n && js(r, n), _s > 0 && !a && hs && (r.shapeFlag & 6 ? hs[hs.indexOf(e)] = r : hs.push(r)), r.patchFlag = -2, r;
	}
	if (nc(e) && (e = e.__vccOpts), t) {
		t = Es(t);
		let { class: e, style: n } = t;
		e && !D(e) && (t.class = we(e)), k(n) && (/* @__PURE__ */ fn(n) && !x(n) && (n = _({}, n)), t.style = ye(n));
	}
	let o = D(e) ? 1 : $o(e) ? 128 : Rr(e) ? 64 : k(e) ? 4 : E(e) ? 2 : 0;
	return J(e, t, n, r, i, o, a, !0);
}
function Es(e) {
	return e ? /* @__PURE__ */ fn(e) || To(e) ? _({}, e) : e : null;
}
function Ds(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? Ms(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Cs(l),
		ref: t && t.ref ? n && a ? x(a) ? a.concat(ws(t)) : [a, ws(t)] : ws(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== U ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Ds(e.ssContent),
		ssFallback: e.ssFallback && Ds(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && li(u, c.clone(u)), u;
}
function X(e = " ", t = 0) {
	return Y(fs, null, e, t);
}
function Os(e, t) {
	let n = Y(ps, null, e);
	return n.staticCount = t, n;
}
function Z(e = "", t = !1) {
	return t ? (G(), q(W, null, e)) : Y(W, null, e);
}
function ks(e) {
	return e == null || typeof e == "boolean" ? Y(W) : x(e) ? Y(U, null, e.slice()) : bs(e) ? As(e) : Y(fs, null, String(e));
}
function As(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ds(e);
}
function js(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (x(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), js(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !To(t) ? t._ctx = gr : r === 3 && gr && (gr.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (E(t)) {
		if (r & 65) {
			js(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: gr
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [X(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function Ms(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = we([t.class, r.class]));
		else if (e === "style") t.style = ye([t.style, r.style]);
		else if (h(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(x(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !g(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function Ns(e, t, n, r = null) {
	Jn(e, t, 7, [n, r]);
}
var Ps = io(), Fs = 0;
function Is(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || Ps, a = {
		uid: Fs++,
		vnode: e,
		type: r,
		parent: t,
		appContext: i,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Be(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(i.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: jo(r, i),
		emitsOptions: po(r, i),
		emit: null,
		emitted: null,
		propsDefaults: d,
		inheritAttrs: r.inheritAttrs,
		ctx: d,
		data: d,
		props: d,
		attrs: d,
		slots: d,
		refs: d,
		setupState: d,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = uo.bind(null, a), e.ce && e.ce(a), a;
}
var Ls = null, Q = () => Ls || gr, Rs, zs;
{
	let e = _e(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Rs = t("__VUE_INSTANCE_SETTERS__", (e) => Ls = e), zs = t("__VUE_SSR_SETTERS__", (e) => Us = e);
}
var Bs = (e) => {
	let t = Ls;
	return Rs(e), e.scope.on(), () => {
		e.scope.off(), Rs(t);
	};
}, Vs = () => {
	Ls && Ls.scope.off(), Rs(null);
};
function Hs(e) {
	return e.vnode.shapeFlag & 4;
}
var Us = !1;
function Ws(e, t = !1, n = !1) {
	t && zs(t);
	let { props: r, children: i } = e.vnode, a = Hs(e);
	Eo(e, r, a, t), zo(e, i, n || t);
	let o = a ? Gs(e, t) : void 0;
	return t && zs(!1), o;
}
function Gs(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ea);
	let { setup: r } = n;
	if (r) {
		ct();
		let n = e.setupContext = r.length > 1 ? $s(e) : null, i = Bs(e), a = qn(r, e, 0, [e.props, n]), o = A(a);
		if (lt(), i(), (o || e.sp) && !Hi(e) && fi(e), o) {
			if (a.then(Vs, Vs), t) return a.then((n) => {
				zs(!0);
				try {
					Ks(e, n, t);
				} finally {
					zs(!1);
				}
			}).catch((t) => {
				Yn(t, e, 0);
			});
			e.asyncDep = a;
		} else Ks(e, a, t);
	} else Zs(e, t);
}
function Ks(e, t, n) {
	E(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : k(t) && (e.setupState = Sn(t)), Zs(e, n);
}
var qs, Js;
function Ys(e) {
	qs = e, Js = (e) => {
		e.render._rc && (e.withProxy = new Proxy(e.ctx, Da));
	};
}
var Xs = () => !qs;
function Zs(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && qs && !r.render) {
			let t = r.template || Ja(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r, s = _(_({
					isCustomElement: n,
					delimiters: a
				}, i), o);
				r.render = qs(t, s);
			}
		}
		e.render = r.render || p, Js && Js(e);
	}
	{
		let t = Bs(e);
		ct();
		try {
			Wa(e);
		} finally {
			lt(), t();
		}
	}
}
var Qs = { get(e, t) {
	return yt(e, "get", ""), e[t];
} };
function $s(e) {
	return {
		attrs: new Proxy(e.attrs, Qs),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function ec(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Sn(pn(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in wa) return wa[n](e);
		},
		has(e, t) {
			return t in e || t in wa;
		}
	}) : e.proxy;
}
function tc(e, t = !0) {
	return E(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function nc(e) {
	return E(e) && "__vccOpts" in e;
}
var $ = (e, t) => /* @__PURE__ */ jn(e, t, Us);
function rc(e, t, n) {
	try {
		vs(-1);
		let r = arguments.length;
		return r === 2 ? k(t) && !x(t) ? bs(t) ? Y(e, null, [t]) : Y(e, t) : Y(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && bs(n) && (n = [n]), Y(e, t, n));
	} finally {
		vs(1);
	}
}
function ic() {}
function ac(e, t, n, r) {
	let i = n[r];
	if (i && oc(i, e)) return i;
	let a = t();
	return a.memo = e.slice(), a.cacheIndex = r, n[r] = a;
}
function oc(e, t) {
	let n = e.memo;
	if (n.length != t.length) return !1;
	for (let e = 0; e < n.length; e++) if (de(n[e], t[e])) return !1;
	return _s > 0 && hs && hs.push(e), !0;
}
var sc = "3.5.43", cc = p, lc = Kn, uc = pr, dc = hr, fc = {
	createComponentInstance: Is,
	setupComponent: Ws,
	renderComponentRoot: ho,
	setCurrentRenderingInstance: vr,
	isVNode: bs,
	normalizeVNode: ks,
	getComponentPublicInstance: ec,
	ensureValidVNode: xa,
	pushWarningContext: Hn,
	popWarningContext: Un
}, pc = void 0, mc = typeof window < "u" && window.trustedTypes;
if (mc) try {
	pc = /* @__PURE__ */ mc.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var hc = pc ? (e) => pc.createHTML(e) : (e) => e, gc = "http://www.w3.org/2000/svg", _c = "http://www.w3.org/1998/Math/MathML", vc = typeof document < "u" ? document : null, yc = vc && /* @__PURE__ */ vc.createElement("template"), bc = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? vc.createElementNS(gc, e) : t === "mathml" ? vc.createElementNS(_c, e) : n ? vc.createElement(e, { is: n }) : vc.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => vc.createTextNode(e),
	createComment: (e) => vc.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => vc.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			yc.innerHTML = hc(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = yc.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, xc = "transition", Sc = "animation", Cc = /* @__PURE__ */ Symbol("_vtc"), wc = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, Tc = /* @__PURE__ */ _({}, ei, wc), Ec = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = Tc, e))((e, { slots: t }) => rc(ii, kc(e), t)), Dc = (e, t = []) => {
	x(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Oc = (e) => e ? x(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function kc(e) {
	let t = {};
	for (let n in e) n in wc || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: c = a, appearActiveClass: l = o, appearToClass: u = s, leaveFromClass: d = `${n}-leave-from`, leaveActiveClass: f = `${n}-leave-active`, leaveToClass: p = `${n}-leave-to` } = e, m = Ac(i), h = m && m[0], g = m && m[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, E = (e, t, n, r) => {
		e._enterCancelled = r, Nc(e, t ? u : s), Nc(e, t ? l : o), n && n();
	}, D = (e, t) => {
		e._isLeaving = !1, Nc(e, d), Nc(e, p), Nc(e, f), t && t();
	}, O = (e) => (t, n) => {
		let i = e ? w : y, o = () => E(t, e, n);
		Dc(i, [t, o]), Pc(() => {
			Nc(t, e ? c : a), Mc(t, e ? u : s), Oc(i) || Ic(t, r, h, o);
		});
	};
	return _(t, {
		onBeforeEnter(e) {
			Dc(v, [e]), Mc(e, a), Mc(e, o);
		},
		onBeforeAppear(e) {
			Dc(C, [e]), Mc(e, c), Mc(e, l);
		},
		onEnter: O(!1),
		onAppear: O(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => D(e, t);
			Mc(e, d), e._enterCancelled ? (Mc(e, f), Bc(e)) : (Bc(e), Mc(e, f)), Pc(() => {
				e._isLeaving && (Nc(e, d), Mc(e, p), Oc(x) || Ic(e, r, g, n));
			}), Dc(x, [e, n]);
		},
		onEnterCancelled(e) {
			E(e, !1, void 0, !0), Dc(b, [e]);
		},
		onAppearCancelled(e) {
			E(e, !0, void 0, !0), Dc(T, [e]);
		},
		onLeaveCancelled(e) {
			D(e), Dc(S, [e]);
		}
	});
}
function Ac(e) {
	if (e == null) return null;
	if (k(e)) return [jc(e.enter), jc(e.leave)];
	{
		let t = jc(e);
		return [t, t];
	}
}
function jc(e) {
	return he(e);
}
function Mc(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[Cc] || (e[Cc] = /* @__PURE__ */ new Set())).add(t);
}
function Nc(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[Cc];
	n && (n.delete(t), n.size || (e[Cc] = void 0));
}
function Pc(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Fc = 0;
function Ic(e, t, n, r) {
	let i = e._endId = ++Fc, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Lc(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function Lc(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${xc}Delay`), a = r(`${xc}Duration`), o = Rc(i, a), s = r(`${Sc}Delay`), c = r(`${Sc}Duration`), l = Rc(s, c), u = null, d = 0, f = 0;
	t === xc ? o > 0 && (u = xc, d = o, f = a.length) : t === Sc ? l > 0 && (u = Sc, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? xc : Sc : null, f = u ? u === xc ? a.length : c.length : 0);
	let p = u === xc && /\b(?:transform|all)(?:,|$)/.test(r(`${xc}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function Rc(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => zc(t) + zc(e[n])));
}
function zc(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Bc(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Vc(e, t, n) {
	let r = e[Cc];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Hc = /* @__PURE__ */ Symbol("_vod"), Uc = /* @__PURE__ */ Symbol("_vsh"), Wc = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[Hc] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Gc(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), Gc(e, !0), r.enter(e)) : r.leave(e, () => {
			Gc(e, !1);
		}) : Gc(e, t));
	},
	beforeUnmount(e, { value: t }) {
		Gc(e, t);
	}
};
function Gc(e, t) {
	e.style.display = t ? e[Hc] : "none", e[Uc] = !t;
}
function Kc() {
	Wc.getSSRProps = ({ value: e }) => {
		if (!e) return { style: { display: "none" } };
	};
}
var qc = /* @__PURE__ */ Symbol("");
function Jc(e) {
	let t = Q();
	if (!t) return;
	let n = t.ut = (n = e(t.proxy)) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e) => Xc(e, n));
	}, r = () => {
		let r = e(t.proxy);
		t.ce ? Xc(t.ce, r) : Yc(t.subTree, r), n(r);
	};
	ia(() => {
		cr(r);
	}), ra(() => {
		Mr(r, p, { flush: "post" });
		let e = new MutationObserver(r);
		e.observe(t.subTree.el.parentNode, { childList: !0 }), sa(() => e.disconnect());
	});
}
function Yc(e, t) {
	if (e.shapeFlag & 128) {
		let n = e.suspense;
		e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
			Yc(n.activeBranch, t);
		});
	}
	for (; e.component;) e = e.component.subTree;
	if (e.shapeFlag & 1 && e.el) Xc(e.el, t);
	else if (e.type === U) e.children.forEach((e) => Yc(e, t));
	else if (e.type === ps) {
		let { el: n, anchor: r } = e;
		for (; n && (Xc(n, t), n !== r);) n = n.nextSibling;
	}
}
function Xc(e, t) {
	if (e.nodeType === 1) {
		let n = e.style, r = "";
		for (let e in t) {
			let i = Re(t[e]);
			n.setProperty(`--${e}`, i), r += `--${e}: ${i};`;
		}
		n[qc] = r;
	}
}
var Zc = /(?:^|;)\s*display\s*:/;
function Qc(e, t, n) {
	let r = e.style, i = D(n), a = !1;
	if (n && !i) {
		if (t) {
			if (D(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? el(r, t, "");
			}
			else for (let e in t) n[e] ?? el(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? el(r, i, "") : il(e, i, !D(t) && t ? t[i] : void 0, o) || el(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[qc];
			e && (n += ";" + e), r.cssText = n, a = Zc.test(n);
		}
	} else t && e.removeAttribute("style");
	Hc in e && (e[Hc] = a ? r.display : "", e[Uc] && (r.display = "none"));
}
var $c = /\s*!important$/;
function el(e, t, n) {
	if (x(n)) n.forEach((n) => el(e, t, n));
	else if (n ??= "", t.startsWith("--")) $c.test(n) ? e.setProperty(t, n.replace($c, ""), "important") : e.setProperty(t, n);
	else {
		let r = rl(e, t);
		$c.test(n) ? e.setProperty(ce(r), n.replace($c, ""), "important") : e[r] = n;
	}
}
var tl = [
	"Webkit",
	"Moz",
	"ms"
], nl = {};
function rl(e, t) {
	let n = nl[t];
	if (n) return n;
	let r = M(t);
	if (r !== "filter" && r in e) return nl[t] = r;
	r = le(r);
	for (let n = 0; n < tl.length; n++) {
		let i = tl[n] + r;
		if (i in e) return nl[t] = i;
	}
	return t;
}
function il(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && D(r) && n === r;
}
var al = "http://www.w3.org/1999/xlink";
function ol(e, t, n, r, i, a = De(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(al, t.slice(6, t.length)) : e.setAttributeNS(al, t, n) : n == null || a && !Oe(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : O(n) ? String(n) : n);
}
function sl(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? hc(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = Oe(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function cl(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function ll(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var ul = /* @__PURE__ */ Symbol("_vei");
function dl(e, t, n, r, i = null) {
	let a = e[ul] || (e[ul] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = ml(t);
		r ? cl(e, n, a[t] = vl(r, i), s) : o && (ll(e, n, o, s), a[t] = void 0);
	}
}
var fl = /(Once|Passive|Capture)$/, pl = /^on:?(?:Once|Passive|Capture)$/;
function ml(e) {
	let t, n;
	for (; (n = e.match(fl)) && !pl.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : ce(e.slice(2)), t];
}
var hl = 0, gl = /* @__PURE__ */ Promise.resolve(), _l = () => hl ||= (gl.then(() => hl = 0), Date.now());
function vl(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (x(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Jn(e, t, 5, a);
			}
		} else Jn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = _l(), n;
}
var yl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, bl = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Vc(e, r, o) : t === "style" ? Qc(e, n, r) : h(t) ? g(t) || dl(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : xl(e, t, r, o)) ? (sl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ol(e, t, r, o, a, t !== "value")) : e._isVueCE && (Sl(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !D(r))) ? sl(e, M(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ol(e, t, r, o));
};
function xl(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && yl(t) && E(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return yl(t) && D(n) ? !1 : t in e;
}
function Sl(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = M(t);
	return Array.isArray(n) ? n.some((e) => M(e) === r) : Object.keys(n).some((e) => M(e) === r);
}
var Cl = {};
// @__NO_SIDE_EFFECTS__
function wl(e, t, n) {
	let r = /* @__PURE__ */ B(e, t);
	re(r) && (r = _({}, r, t));
	class i extends Dl {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var Tl = /* @__NO_SIDE_EFFECTS__ */ ((e, t) => /* @__PURE__ */ wl(e, t, yu)), El = typeof HTMLElement < "u" ? HTMLElement : class {}, Dl = class e extends El {
	constructor(e, t = {}, n = vu) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== vu ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(_({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
	}
	connectedCallback() {
		if (!this.isConnected) return;
		!this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
		let t = this;
		for (; t &&= t.assignedSlot || t.parentNode || t.host;) if (t instanceof e) {
			this._parent = t;
			break;
		}
		this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
			if (this._pendingResolve = void 0, this.isConnected) return this._resolveDef();
		}) : this._resolveDef());
	}
	_setParent(e = this._parent) {
		e && (this._instance.parent = e._instance, this._inheritParentContext(e));
	}
	_inheritParentContext(e = this._parent) {
		e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
	}
	disconnectedCallback() {
		this._connected = !1, ir(() => {
			this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), void 0));
		});
	}
	_processMutations(e) {
		for (let t of e) this._setAttr(t.attributeName);
	}
	_resolveDef() {
		if (this._pendingResolve) return this._pendingResolve;
		for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
		this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
		let e = (e, t = !1) => {
			this._resolved = !0, this._pendingResolve = void 0;
			let { props: n, styles: r } = e, i;
			if (n && !x(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = he(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[M(e)] = !0);
			}
			this._numberProps = i, this._resolveProps(e), this.shadowRoot && this._applyStyles(r), this._mount(e);
		}, t = this._def.__asyncLoader;
		if (t) return this._pendingResolve = t().then((t) => {
			t.configureApp = this._def.configureApp, e(this._def = t, !0);
		}), this._pendingResolve;
		e(this._def);
	}
	_mount(e) {
		this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
		let t = this._instance && this._instance.exposed;
		if (t) for (let e in t) b(this, e) || Object.defineProperty(this, e, { get: () => R(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = x(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(M)) Object.defineProperty(this, e, {
			get() {
				return this._getProp(e);
			},
			set(t) {
				this._setProp(e, t, !0, !this._patching);
			}
		});
	}
	_setAttr(e) {
		if (e.startsWith("data-v-")) return;
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : Cl, r = M(e);
		t && this._numberProps && this._numberProps[r] && (n = he(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === Cl ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(ce(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(ce(e), t + "") : t || this.removeAttribute(ce(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), gu(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = Y(this._def, _(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, re(t[0]) ? _({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), ce(e) !== e && t(ce(e), n);
			}, this._setParent();
		}), t;
	}
	_applyStyles(e, t, n) {
		if (!e) return;
		if (t) {
			if (t === this._def || this._styleChildren.has(t)) return;
			this._styleChildren.add(t);
		}
		let r = this._nonce, i = this.shadowRoot, a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(i), o = null;
		for (let s = e.length - 1; s >= 0; s--) {
			let c = document.createElement("style");
			r && c.setAttribute("nonce", r), c.textContent = e[s], i.insertBefore(c, o || a), o = c, s === 0 && (n || this._styleAnchors.set(this._def, c), t && this._styleAnchors.set(t, c));
		}
	}
	_getStyleAnchor(e) {
		if (!e) return null;
		let t = this._styleAnchors.get(e);
		return t && t.parentNode === this.shadowRoot ? t : (t && this._styleAnchors.delete(e), null);
	}
	_getRootStyleInsertionAnchor(e) {
		for (let t = 0; t < e.childNodes.length; t++) {
			let n = e.childNodes[t];
			if (!(n instanceof HTMLStyleElement)) return n;
		}
		return null;
	}
	_parseSlots() {
		let e = this._slots = {}, t;
		for (; t = this.firstChild;) {
			let n = t.nodeType === 1 && t.getAttribute("slot") || "default";
			(e[n] || (e[n] = [])).push(t), this.removeChild(t);
		}
	}
	_renderSlots() {
		let e = this._getSlots(), t = this._instance.type.__scopeId;
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.getAttribute("name") || "default", a = this._slots[i], o = r.parentNode;
			if (a) for (let e of a) {
				if (t && e.nodeType === 1) {
					let n = t + "-s", r = document.createTreeWalker(e, 1);
					e.setAttribute(n, "");
					let i;
					for (; i = r.nextNode();) i.setAttribute(n, "");
				}
				o.insertBefore(e, r);
			}
			else for (; r.firstChild;) o.insertBefore(r.firstChild, r);
			o.removeChild(r);
		}
	}
	_getSlots() {
		let e = [this];
		this._teleportTargets && e.push(...this._teleportTargets);
		let t = /* @__PURE__ */ new Set();
		for (let n of e) {
			let e = n.querySelectorAll("slot");
			for (let n = 0; n < e.length; n++) t.add(e[n]);
		}
		return Array.from(t);
	}
	_injectChildStyle(e, t) {
		this._applyStyles(e.styles, e, t);
	}
	_beginPatch() {
		this._patching = !0, this._dirty = !1;
	}
	_endPatch() {
		this._patching = !1, this._dirty && this._instance && this._update();
	}
	_hasShadowRoot() {
		return this._def.shadowRoot !== !1;
	}
	_removeChildStyle(e) {}
};
function Ol(e) {
	let t = Q();
	return t && t.ce || null;
}
function kl() {
	let e = Ol();
	return e && e.shadowRoot;
}
function Al(e = "$style") {
	{
		let t = Q();
		if (!t) return d;
		let n = t.type.__cssModules;
		return n && n[e] || d;
	}
}
var jl = /* @__PURE__ */ new WeakMap(), Ml = /* @__PURE__ */ new WeakMap(), Nl = /* @__PURE__ */ Symbol("_moveCb"), Pl = /* @__PURE__ */ Symbol("_enterCb"), Fl = /* @__PURE__ */ ((e) => (delete e.props.mode, e))({
	name: "TransitionGroup",
	props: /* @__PURE__ */ _({}, Tc, {
		tag: String,
		moveClass: String
	}),
	setup(e, { slots: t }) {
		let n = Q(), r = Qr(), i, a;
		return aa(() => {
			if (!i.length) return;
			let t = e.moveClass || `${e.name || "v"}-move`;
			if (!Bl(i[0].el, n.vnode.el, t)) {
				i = [];
				return;
			}
			i.forEach(Il), i.forEach(Ll);
			let r = i.filter(Rl);
			Bc(n.vnode.el), r.forEach((e) => {
				let n = e.el, r = n.style;
				Mc(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
				let i = n[Nl] = (e) => {
					e && e.target !== n || (!e || e.propertyName.endsWith("transform")) && (n.removeEventListener("transitionend", i), n[Nl] = null, Nc(n, t));
				};
				n.addEventListener("transitionend", i);
			}), i = [];
		}), () => {
			let o = /* @__PURE__ */ F(e), s = kc(o), c = o.tag || U;
			if (i = [], a) for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.el && t.el instanceof Element && !t.el[Uc] && (i.push(t), li(t, oi(t, s, r, n)), jl.set(t, zl(t.el)));
			}
			a = t.default ? ui(t.default()) : [];
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.key != null && li(t, oi(t, s, r, n));
			}
			return Y(c, null, a);
		};
	}
});
function Il(e) {
	let t = e.el;
	t[Nl] && t[Nl](), t[Pl] && t[Pl]();
}
function Ll(e) {
	Ml.set(e, zl(e.el));
}
function Rl(e) {
	let t = jl.get(e), n = Ml.get(e), r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		let t = e.el, n = t.style, a = t.getBoundingClientRect(), o = 1, s = 1;
		return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), (!Number.isFinite(o) || o === 0) && (o = 1), (!Number.isFinite(s) || s === 0) && (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r / o}px,${i / s}px)`, n.transitionDuration = "0s", e;
	}
}
function zl(e) {
	let t = e.getBoundingClientRect();
	return {
		left: t.left,
		top: t.top
	};
}
function Bl(e, t, n) {
	let r = e.cloneNode(), i = e[Cc];
	i && i.forEach((e) => {
		e.split(/\s+/).forEach((e) => e && r.classList.remove(e));
	}), n.split(/\s+/).forEach((e) => e && r.classList.add(e)), r.style.display = "none";
	let a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(r);
	let { hasTransform: o } = Lc(r);
	return a.removeChild(r), o;
}
var Vl = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return x(t) ? (e) => fe(t, e) : t;
};
function Hl(e) {
	e.target.composing = !0;
}
function Ul(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Wl = /* @__PURE__ */ Symbol("_assign"), Gl = /* @__PURE__ */ Symbol("_initialValue");
function Kl(e, t, n) {
	return t && (e = e.trim()), n && (e = me(e)), e;
}
var ql = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[Gl] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Gl] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[Wl] = Vl(i);
		let a = r || i.props && i.props.type === "number";
		cl(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Wl](Kl(e.value, n, a));
		}), (n || a) && cl(e, "change", () => {
			e.value = Kl(e.value, n, a);
		}), t || (cl(e, "compositionstart", Hl), cl(e, "compositionend", Ul), cl(e, "change", Ul));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[Gl];
		delete e[Gl], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[Wl](Kl(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Wl] = Vl(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? me(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Jl = {
	deep: !0,
	created(e, t, n) {
		e[Wl] = Vl(n), cl(e, "change", () => {
			let t = e._modelValue, n = eu(e), r = e.checked, i = e[Wl];
			if (x(t)) {
				let e = Pe(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (C(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(tu(e, r));
		});
	},
	mounted: Yl,
	beforeUpdate(e, t, n) {
		e[Wl] = Vl(n), Yl(e, t, n);
	}
};
function Yl(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (x(t)) i = Pe(t, r.props.value) > -1;
	else if (C(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Ne(t, tu(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Xl = {
	created(e, { value: t }, n) {
		e.checked = Ne(t, n.props.value), e[Wl] = Vl(n), cl(e, "change", () => {
			e[Wl](eu(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[Wl] = Vl(r), t !== n && (e.checked = Ne(t, r.props.value));
	}
}, Zl = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, cl(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? me(eu(e)) : eu(e)), r = e.multiple, i = r ? C(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? x(i) ? t.slice() : t : i];
			try {
				e[Wl](i);
			} finally {
				ir(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[Wl] = Vl(r);
	},
	mounted(e, { value: t }) {
		$l(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[Wl] = Vl(n);
	},
	updated(e, { value: t }) {
		let n = e._pendingValue;
		e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Ql(t, n[1], n[0])) && $l(e, t);
	}
};
function Ql(e, t, n) {
	if (!n || x(e)) return Ne(e, t);
	if (C(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function $l(e, t) {
	let n = e.multiple, r = x(t);
	if (!n || r || C(t)) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = eu(a);
			if (n) {
				if (r) {
					let e = typeof o;
					a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : Pe(t, o) > -1;
				} else a.selected = t.has(o);
			} else if (Ne(eu(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function eu(e) {
	return "_value" in e ? e._value : e.value;
}
function tu(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var nu = {
	created(e, t, n) {
		iu(e, t, n, null, "created");
	},
	mounted(e, t, n) {
		iu(e, t, n, null, "mounted");
	},
	beforeUpdate(e, t, n, r) {
		iu(e, t, n, r, "beforeUpdate");
	},
	updated(e, t, n, r) {
		iu(e, t, n, r, "updated");
	}
};
function ru(e, t) {
	switch (e) {
		case "SELECT": return Zl;
		case "TEXTAREA": return ql;
		default: switch (t) {
			case "checkbox": return Jl;
			case "radio": return Xl;
			default: return ql;
		}
	}
}
function iu(e, t, n, r, i) {
	let a = ru(e.tagName, n.props && n.props.type)[i];
	a && a(e, t, n, r);
}
function au() {
	ql.getSSRProps = ({ value: e }) => ({ value: e }), Xl.getSSRProps = ({ value: e }, t) => {
		if (t.props && Ne(t.props.value, e)) return { checked: !0 };
	}, Jl.getSSRProps = ({ value: e }, t) => {
		if (x(e)) {
			if (t.props && Pe(e, t.props.value) > -1) return { checked: !0 };
		} else if (C(e)) {
			if (t.props && e.has(t.props.value)) return { checked: !0 };
		} else if (e) return { checked: !0 };
	}, nu.getSSRProps = (e, t) => {
		if (typeof t.type != "string") return;
		let n = ru(t.type.toUpperCase(), t.props && t.props.type);
		if (n.getSSRProps) return n.getSSRProps(e, t);
	};
}
var ou = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], su = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => ou.some((n) => e[`${n}Key`] && !t.includes(n))
}, cu = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = su[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, lu = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, uu = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = ce(n.key);
		if (t.some((e) => e === r || lu[e] === r)) return e(n);
	}));
}, du = /* @__PURE__ */ _({ patchProp: bl }, bc), fu, pu = !1;
function mu() {
	return fu ||= Ho(du);
}
function hu() {
	return fu = pu ? fu : Uo(du), pu = !0, fu;
}
var gu = ((...e) => {
	mu().render(...e);
}), _u = ((...e) => {
	hu().hydrate(...e);
}), vu = ((...e) => {
	let t = mu().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = xu(e);
		if (!r) return;
		let i = t._component;
		!E(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, bu(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
}), yu = ((...e) => {
	let t = hu().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let t = xu(e);
		if (t) return n(t, !0, bu(t));
	}, t;
});
function bu(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function xu(e) {
	return D(e) ? document.querySelector(e) : e;
}
var Su = !1, Cu = () => {
	Su || (Su = !0, au(), Kc());
}, wu = /* @__PURE__ */ s({
	BaseTransition: () => ii,
	BaseTransitionPropsValidators: () => ei,
	Comment: () => W,
	DeprecationTypes: () => null,
	EffectScope: () => Be,
	ErrorCodes: () => Gn,
	ErrorTypeStrings: () => lc,
	Fragment: () => U,
	KeepAlive: () => Ki,
	ReactiveEffect: () => Ge,
	Static: () => ps,
	Suspense: () => ts,
	Teleport: () => qr,
	Text: () => fs,
	TrackOpTypes: () => Mn,
	Transition: () => Ec,
	TransitionGroup: () => Fl,
	TriggerOpTypes: () => Nn,
	VueElement: () => Dl,
	assertNumber: () => Wn,
	callWithAsyncErrorHandling: () => Jn,
	callWithErrorHandling: () => qn,
	camelize: () => M,
	capitalize: () => le,
	cloneVNode: () => Ds,
	compatUtils: () => null,
	compile: () => Tu,
	computed: () => $,
	createApp: () => vu,
	createBlock: () => q,
	createCommentVNode: () => Z,
	createElementBlock: () => K,
	createElementVNode: () => J,
	createHydrationRenderer: () => Uo,
	createPropsRestProxy: () => Va,
	createRenderer: () => Ho,
	createSSRApp: () => yu,
	createSlots: () => ba,
	createStaticVNode: () => Os,
	createTextVNode: () => X,
	createVNode: () => Y,
	customRef: () => wn,
	defineAsyncComponent: () => Ui,
	defineComponent: () => B,
	defineCustomElement: () => wl,
	defineEmits: () => ka,
	defineExpose: () => Aa,
	defineModel: () => Na,
	defineOptions: () => ja,
	defineProps: () => Oa,
	defineSSRCustomElement: () => Tl,
	defineSlots: () => Ma,
	devtools: () => uc,
	effect: () => it,
	effectScope: () => Ve,
	getCurrentInstance: () => Q,
	getCurrentScope: () => He,
	getCurrentWatcher: () => Ln,
	getTransitionRawChildren: () => ui,
	guardReactiveProps: () => Es,
	h: () => rc,
	handleError: () => Yn,
	hasInjectionContext: () => Er,
	hydrate: () => _u,
	hydrateOnIdle: () => Ii,
	hydrateOnInteraction: () => Bi,
	hydrateOnMediaQuery: () => zi,
	hydrateOnVisible: () => Ri,
	initCustomFormatter: () => ic,
	initDirectivesForSSR: () => Cu,
	inject: () => Tr,
	isMemoSame: () => oc,
	isProxy: () => fn,
	isReactive: () => ln,
	isReadonly: () => un,
	isRef: () => I,
	isRuntimeOnly: () => Xs,
	isShallow: () => dn,
	isVNode: () => bs,
	markRaw: () => pn,
	mergeDefaults: () => za,
	mergeModels: () => Ba,
	mergeProps: () => Ms,
	nextTick: () => ir,
	nodeOps: () => bc,
	normalizeClass: () => we,
	normalizeProps: () => Te,
	normalizeStyle: () => ye,
	onActivated: () => Ji,
	onBeforeMount: () => na,
	onBeforeUnmount: () => oa,
	onBeforeUpdate: () => ia,
	onDeactivated: () => Yi,
	onErrorCaptured: () => da,
	onMounted: () => ra,
	onRenderTracked: () => ua,
	onRenderTriggered: () => la,
	onScopeDispose: () => Ue,
	onServerPrefetch: () => ca,
	onUnmounted: () => sa,
	onUpdated: () => aa,
	onWatcherCleanup: () => Rn,
	openBlock: () => G,
	patchProp: () => bl,
	popScopeId: () => br,
	provide: () => wr,
	proxyRefs: () => Sn,
	pushScopeId: () => yr,
	queuePostFlushCb: () => cr,
	reactive: () => rn,
	readonly: () => on,
	ref: () => L,
	registerRuntimeCompiler: () => Ys,
	render: () => gu,
	renderList: () => V,
	renderSlot: () => H,
	resolveComponent: () => ma,
	resolveDirective: () => _a,
	resolveDynamicComponent: () => ga,
	resolveFilter: () => null,
	resolveTransitionHooks: () => oi,
	setBlockTracking: () => vs,
	setDevtoolsHook: () => dc,
	setTransitionHooks: () => li,
	shallowReactive: () => an,
	shallowReadonly: () => sn,
	shallowRef: () => gn,
	ssrContextKey: () => Dr,
	ssrUtils: () => fc,
	stop: () => at,
	toDisplayString: () => N,
	toHandlerKey: () => ue,
	toHandlers: () => Sa,
	toRaw: () => F,
	toRef: () => On,
	toRefs: () => Tn,
	toValue: () => bn,
	transformVNodeArgs: () => Ss,
	triggerRef: () => yn,
	unref: () => R,
	useAttrs: () => Ia,
	useCssModule: () => Al,
	useCssVars: () => Jc,
	useHost: () => Ol,
	useId: () => di,
	useModel: () => co,
	useSSRContext: () => Or,
	useShadowRoot: () => kl,
	useSlots: () => Fa,
	useTemplateRef: () => pi,
	useTransitionState: () => Qr,
	vModelCheckbox: () => Jl,
	vModelDynamic: () => nu,
	vModelRadio: () => Xl,
	vModelSelect: () => Zl,
	vModelText: () => ql,
	vShow: () => Wc,
	version: () => sc,
	warn: () => cc,
	watch: () => Mr,
	watchEffect: () => kr,
	watchPostEffect: () => Ar,
	watchSyncEffect: () => jr,
	withAsyncContext: () => Ha,
	withCtx: () => z,
	withDefaults: () => Pa,
	withDirectives: () => Sr,
	withKeys: () => uu,
	withMemo: () => ac,
	withModifiers: () => cu,
	withScopeId: () => xr
}), Tu = () => {};
//#endregion
//#region node_modules/reka-ui/dist/shared/createContext.js
function Eu(e, t) {
	let n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
	return [(t) => {
		let n = Tr(r, t);
		if (n || n === null) return n;
		throw Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
	}, (e) => (wr(r, e), e)];
}
//#endregion
//#region node_modules/reka-ui/dist/shared/handleAndDispatchCustomEvent.js
function Du(e, t, n) {
	let r = n.originalEvent.target, i = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i);
}
//#endregion
//#region node_modules/reka-ui/dist/shared/nullish.js
function Ou(e) {
	return e == null;
}
//#endregion
//#region node_modules/@vueuse/shared/dist/index.js
function ku(e, t) {
	return He() ? (Ue(e, t), !0) : !1;
}
function Au() {
	let e = /* @__PURE__ */ new Set(), t = (t) => {
		e.delete(t);
	};
	return {
		on: (n) => {
			e.add(n);
			let r = () => t(n);
			return ku(r), { off: r };
		},
		off: t,
		trigger: (...t) => Promise.all(Array.from(e).map((e) => e(...t))),
		clear: () => {
			e.clear();
		}
	};
}
var ju = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var Mu = (e) => e !== void 0, Nu = Object.prototype.toString, Pu = (e) => Nu.call(e) === "[object Object]";
function Fu(e) {
	return Array.isArray(e) ? e : [e];
}
function Iu(e, t = 1e4) {
	return wn((n, r) => {
		let i = bn(e), a, o = () => setTimeout(() => {
			i = bn(e), r();
		}, bn(t));
		return ku(() => {
			clearTimeout(a);
		}), {
			get() {
				return n(), i;
			},
			set(e) {
				i = e, r(), clearTimeout(a), a = o();
			}
		};
	});
}
function Lu(e, t, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, a = /* @__PURE__ */ gn(!1), o;
	function s() {
		o &&= (clearTimeout(o), void 0);
	}
	function c() {
		a.value = !1, s();
	}
	function l(...n) {
		i && e(), s(), a.value = !0, o = setTimeout(() => {
			a.value = !1, o = void 0, e(...n);
		}, bn(t));
	}
	return r && (a.value = !0, ju && l()), ku(c), {
		isPending: /* @__PURE__ */ sn(a),
		start: l,
		stop: c
	};
}
function Ru(e, t, n) {
	return Mr(e, t, {
		...n,
		immediate: !0
	});
}
//#endregion
//#region node_modules/reka-ui/node_modules/@vueuse/core/dist/index.js
var zu = ju ? window : void 0;
ju && window.document, ju && window.navigator, ju && window.location;
function Bu(e) {
	let t = bn(e);
	return t?.$el ?? t;
}
function Vu(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = $(() => {
		let t = Fu(bn(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return Ru(() => [
		n.value?.map((e) => Bu(e)) ?? [zu].filter((e) => e != null),
		Fu(bn(n.value ? e[1] : e[0])),
		Fu(R(n.value ? e[2] : e[1])),
		bn(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = Pu(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
function Hu() {
	let e = /* @__PURE__ */ gn(!1), t = Q();
	return t && ra(() => {
		e.value = !0;
	}, t), e;
}
function Uu(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Wu(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = zu, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = Uu(t);
	return Vu(i, a, (e) => {
		e.repeat && bn(s) || c(e) && n(e);
	}, o);
}
function Gu(e) {
	return JSON.parse(JSON.stringify(e));
}
function Ku(e, t, n, r = {}) {
	var i, a;
	let { clone: o = !1, passive: s = !1, eventName: c, deep: l = !1, defaultValue: u, shouldEmit: d } = r, f = Q(), p = n || f?.emit || (f == null || (i = f.$emit) == null ? void 0 : i.bind(f)) || (f == null || (a = f.proxy) == null || (a = a.$emit) == null ? void 0 : a.bind(f?.proxy)), m = c;
	t ||= "modelValue", m ||= `update:${t.toString()}`;
	let h = (e) => o ? typeof o == "function" ? o(e) : Gu(e) : e, g = () => Mu(e[t]) ? h(e[t]) : u, _ = (e) => {
		d ? d(e) && p(m, e) : p(m, e);
	};
	if (s) {
		let n = /* @__PURE__ */ L(g()), r = !1;
		return Mr(() => e[t], (e) => {
			r || (r = !0, n.value = h(e), ir(() => r = !1));
		}), Mr(n, (n) => {
			!r && (n !== e[t] || l) && _(n);
		}, { deep: l }), n;
	}
	return $({
		get() {
			return g();
		},
		set(e) {
			_(e);
		}
	});
}
//#endregion
//#region node_modules/reka-ui/dist/shared/renderSlotFragments.js
function qu(e) {
	return e ? e.flatMap((e) => e.type === U ? qu(e.children) : [e]) : [];
}
//#endregion
//#region node_modules/reka-ui/dist/ConfigProvider/ConfigProvider.js
var [Ju, Yu] = /*#__PURE__*/ Eu("ConfigProvider"), Xu = /*#__PURE__*/ rn({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
});
//#endregion
//#region node_modules/defu/dist/defu.mjs
function Zu(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Qu(e, t, n = ".", r) {
	if (!Zu(t)) return Qu(e, {}, n, r);
	let i = { ...t };
	for (let t of Object.keys(e)) {
		if (t === "__proto__" || t === "constructor") continue;
		let a = e[t];
		a != null && (r && r(i, t, a, n) || (i[t] = Array.isArray(a) && Array.isArray(i[t]) ? [...a, ...i[t]] : Zu(a) && Zu(i[t]) ? Qu(a, i[t], (n ? `${n}.` : "") + t.toString(), r) : a));
	}
	return i;
}
function $u(e) {
	return (...t) => t.reduce((t, n) => Qu(t, n, "", e), {});
}
var ed = $u();
//#endregion
//#region node_modules/reka-ui/dist/shared/useDirection.js
function td(e) {
	let t = Ju({ dir: /* @__PURE__ */ L("ltr") });
	return $(() => e?.value || t.dir?.value || "ltr");
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useEmitAsProps.js
function nd(e) {
	let t = Q(), n = t?.type.emits, r = {};
	return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((t) => {
		r[ue(M(t))] = (...n) => e(t, ...n);
	}), r;
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useForwardExpose.js
function rd() {
	let e = Q(), t = /* @__PURE__ */ L(), n = $(() => r());
	aa(() => {
		n.value !== r() && yn(t);
	});
	function r() {
		return t.value && "$el" in t.value && ["#text", "#comment"].includes(t.value.$el.nodeName) ? t.value.$el.nextElementSibling : Bu(t);
	}
	let i = Object.assign({}, e.exposed), a = {};
	for (let t in e.props) Object.defineProperty(a, t, {
		enumerable: !0,
		configurable: !0,
		get: () => e.props[t]
	});
	if (Object.keys(i).length > 0) for (let e in i) Object.defineProperty(a, e, {
		enumerable: !0,
		configurable: !0,
		get: () => i[e]
	});
	Object.defineProperty(a, "$el", {
		enumerable: !0,
		configurable: !0,
		get: () => e.vnode.el
	}), e.exposed = a;
	function o(n) {
		if (t.value = n, n && (Object.defineProperty(a, "$el", {
			enumerable: !0,
			configurable: !0,
			get: () => n instanceof Element ? n : n.$el
		}), !(n instanceof Element) && !Object.hasOwn(n, "$el"))) {
			let t = n.$.exposed, r = Object.assign({}, a);
			for (let e in t) Object.defineProperty(r, e, {
				enumerable: !0,
				configurable: !0,
				get: () => t[e]
			});
			e.exposed = r;
		}
	}
	return {
		forwardRef: o,
		currentRef: t,
		currentElement: n
	};
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useForwardProps.js
function id(e) {
	let t = Q(), n = Object.keys(t?.type.props ?? {}).reduce((e, n) => {
		let r = (t?.type.props[n]).default;
		return r !== void 0 && (e[n] = r), e;
	}, {}), r = /* @__PURE__ */ On(e);
	return $(() => {
		let e = {}, i = t?.vnode.props ?? {};
		return Object.keys(i).forEach((t) => {
			e[M(t)] = i[t];
		}), Object.keys({
			...n,
			...e
		}).reduce((e, t) => (r.value[t] !== void 0 && (e[t] = r.value[t]), e), {});
	});
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useForwardPropsEmits.js
function ad(e, t) {
	let n = id(e), r = t ? nd(t) : {};
	return $(() => ({
		...n.value,
		...r
	}));
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useGraceArea.js
function od(e, t) {
	let n = Iu(!1, 300);
	ku(() => {
		n.value = !1;
	});
	let r = /* @__PURE__ */ L(null), i = Au();
	function a() {
		r.value = null, n.value = !1;
	}
	function o(e, t) {
		if (!t) return;
		let i = e.currentTarget, a = {
			x: e.clientX,
			y: e.clientY
		}, o = cd(a, sd(a, i.getBoundingClientRect()), 1), s = ld(t.getBoundingClientRect()), c = dd([...o, ...s]);
		r.value = c, n.value = !0;
	}
	return kr((n) => {
		if (e.value && t.value) {
			let r = e.value, i = t.value, a = (e) => o(e, i), s = (e) => o(e, r);
			r.addEventListener("pointerleave", a), i.addEventListener("pointerleave", s), n(() => {
				r.removeEventListener("pointerleave", a), i.removeEventListener("pointerleave", s);
			});
		}
	}), kr((n) => {
		if (r.value) {
			let o = (n) => {
				if (!r.value || !(n.target instanceof Element)) return;
				let o = n.target, s = {
					x: n.clientX,
					y: n.clientY
				}, c = e.value?.contains(o) || t.value?.contains(o), l = !ud(s, r.value), u = !!o.closest("[data-grace-area-trigger]");
				c ? a() : (l || u) && (a(), i.trigger());
			}, s = e.value?.ownerDocument;
			s?.addEventListener("pointermove", o), n(() => s?.removeEventListener("pointermove", o));
		}
	}), {
		isPointerInTransit: n,
		onPointerExit: i.on
	};
}
function sd(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function cd(e, t, n = 5) {
	let r = [];
	switch (t) {
		case "top":
			r.push({
				x: e.x - n,
				y: e.y + n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "bottom":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y - n
			});
			break;
		case "left":
			r.push({
				x: e.x + n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "right": r.push({
			x: e.x - n,
			y: e.y - n
		}, {
			x: e.x - n,
			y: e.y + n
		});
	}
	return r;
}
function ld(e) {
	let { top: t, right: n, bottom: r, left: i } = e;
	return [
		{
			x: i,
			y: t
		},
		{
			x: n,
			y: t
		},
		{
			x: n,
			y: r
		},
		{
			x: i,
			y: r
		}
	];
}
function ud(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function dd(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), fd(t);
}
function fd(e) {
	if (e.length <= 1) return e.slice();
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (; t.length >= 2;) {
			let e = t.at(-1), n = t[t.length - 2];
			if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
			else break;
		}
		t.push(r);
	}
	t.pop();
	let n = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let r = e[t];
		for (; n.length >= 2;) {
			let e = n.at(-1), t = n[n.length - 2];
			if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
			else break;
		}
		n.push(r);
	}
	return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useId.js
var pd = 0;
function md(e, t = "reka") {
	if (e) return e;
	let n, r = Ju({ useId: void 0 });
	return n = r.useId ? r.useId() : "useId" in wu ? di?.() : `${++pd}`, t ? `${t}-${n}` : n;
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useSize.js
function hd(e) {
	let t = /* @__PURE__ */ L(), n = $(() => t.value?.width ?? 0), r = $(() => t.value?.height ?? 0), i;
	return ra(() => {
		let n = Bu(e);
		n ? (t.value = {
			width: n.offsetWidth,
			height: n.offsetHeight
		}, i = new ResizeObserver((e) => {
			if (!Array.isArray(e) || !e.length) return;
			let r = e[0], i, a;
			if ("borderBoxSize" in r) {
				let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
				i = t.inlineSize, a = t.blockSize;
			} else i = n.offsetWidth, a = n.offsetHeight;
			t.value = {
				width: i,
				height: a
			};
		}), i.observe(n, { box: "border-box" })) : t.value = void 0;
	}), sa(() => {
		i?.disconnect(), i = void 0;
	}), {
		width: n,
		height: r
	};
}
//#endregion
//#region node_modules/reka-ui/dist/shared/useStateMachine.js
function gd(e, t) {
	let n = /* @__PURE__ */ L(e);
	function r(e) {
		return t[n.value][e] ?? n.value;
	}
	return {
		state: n,
		dispatch: (e) => {
			n.value = r(e);
		}
	};
}
//#endregion
//#region node_modules/reka-ui/dist/Presence/usePresence.js
function _d(e, t) {
	let n = /* @__PURE__ */ L({}), r = /* @__PURE__ */ L("none"), i = /* @__PURE__ */ L(e), a = e.value ? "mounted" : "unmounted", o, s = t.value?.ownerDocument.defaultView ?? zu, { state: c, dispatch: l } = gd(a, {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	}), u = (e) => {
		if (ju) {
			let n = new CustomEvent(e, {
				bubbles: !1,
				cancelable: !1
			});
			t.value?.dispatchEvent(n);
		}
	};
	Mr(e, async (e, i) => {
		let a = i !== e;
		if (await ir(), a) {
			let a = r.value, o = vd(t.value);
			e ? (l("MOUNT"), u("enter"), o === "none" && u("after-enter")) : o === "none" || o === "undefined" || n.value?.display === "none" ? (l("UNMOUNT"), u("leave"), u("after-leave")) : i && a !== o ? (l("ANIMATION_OUT"), u("leave")) : (l("UNMOUNT"), u("after-leave"));
		}
	}, { immediate: !0 });
	let d = (e) => {
		if (e.target !== t.value) return;
		let n = vd(t.value), r = n.includes(CSS.escape(e.animationName)), a = c.value === "mounted" ? "enter" : "leave";
		if (r && (u(`after-${a}`), l("ANIMATION_END"), !i.value)) {
			let e = t.value.style.animationFillMode;
			t.value.style.animationFillMode = "forwards", o = s?.setTimeout(() => {
				t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = e);
			});
		}
		n === "none" && l("ANIMATION_END");
	}, f = (e) => {
		e.target === t.value && (r.value = vd(t.value));
	}, p = Mr(t, (e, t) => {
		e ? (n.value = getComputedStyle(e), e.addEventListener("animationstart", f), e.addEventListener("animationcancel", d), e.addEventListener("animationend", d)) : (l("ANIMATION_END"), o !== void 0 && s?.clearTimeout(o), t?.removeEventListener("animationstart", f), t?.removeEventListener("animationcancel", d), t?.removeEventListener("animationend", d));
	}, { immediate: !0 }), m = Mr(c, () => {
		let e = vd(t.value);
		r.value = c.value === "mounted" ? e : "none";
	});
	return sa(() => {
		p(), m(), t.value && (t.value.removeEventListener("animationstart", f), t.value.removeEventListener("animationcancel", d), t.value.removeEventListener("animationend", d)), o !== void 0 && s?.clearTimeout(o);
	}), { isPresent: $(() => ["mounted", "unmountSuspended"].includes(c.value)) };
}
function vd(e) {
	return e && getComputedStyle(e).animationName || "none";
}
//#endregion
//#region node_modules/reka-ui/dist/Presence/Presence.js
var yd = /*#__PURE__*/ B({
	name: "Presence",
	props: {
		present: {
			type: Boolean,
			required: !0
		},
		forceMount: { type: Boolean }
	},
	slots: {},
	setup(e, { slots: t, expose: n }) {
		let { present: r, forceMount: i } = /* @__PURE__ */ Tn(e), a = /* @__PURE__ */ L(), { isPresent: o } = _d(r, a);
		n({ present: o });
		let s = t.default({ present: o.value });
		s = qu(s || []);
		let c = Q();
		if (s && s?.length > 1) {
			let e = c?.parent?.type.name ? `<${c.parent.type.name} />` : "component";
			throw Error([
				`Detected an invalid children for \`${e}\` for  \`Presence\` component.`,
				"",
				"Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
				"You can apply a few solutions:",
				["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((e) => `  - ${e}`).join("\n")
			].join("\n"));
		}
		return () => i.value || r.value || o.value ? rc(t.default({ present: o.value })[0], { ref: (e) => {
			let t = Bu(e);
			return t?.hasAttribute === void 0 || (t?.hasAttribute("data-reka-popper-content-wrapper") ? a.value = t.firstElementChild : a.value = t), t;
		} }) : null;
	}
}), bd = /*#__PURE__*/ B({
	name: "PrimitiveSlot",
	inheritAttrs: !1,
	setup(e, { attrs: t, slots: n }) {
		return () => {
			if (!n.default) return null;
			let e = qu(n.default()), r = e.findIndex((e) => e.type !== W);
			if (r === -1) return e;
			let i = e[r];
			delete i.props?.ref;
			let a = i.props ? Ms(t, i.props) : t, o = Ds({
				...i,
				props: {}
			}, a);
			return e.length === 1 ? o : (e[r] = o, e);
		};
	}
}), xd = [
	"area",
	"img",
	"input"
], Sd = /*#__PURE__*/ B({
	name: "Primitive",
	inheritAttrs: !1,
	props: {
		asChild: {
			type: Boolean,
			default: !1
		},
		as: {
			type: [String, Object],
			default: "div"
		}
	},
	setup(e, { attrs: t, slots: n }) {
		let r = e.asChild ? "template" : e.as;
		return typeof r == "string" && xd.includes(r) ? () => rc(r, t) : r === "template" ? () => rc(bd, t, { default: n.default }) : () => rc(e.as, t, { default: n.default });
	}
}), Cd = "dismissableLayer.pointerDownOutside", wd = "dismissableLayer.focusOutside";
function Td(e, t) {
	if (!(t instanceof Element)) return !1;
	if (e.contains(t)) return !0;
	let n = t.closest("[data-dismissable-layer]"), r = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), i = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function Ed(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, i = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ L(() => {});
	return kr((o) => {
		if (!ju || !bn(n)) return;
		let s = async (n) => {
			let o = n.target;
			if (t?.value && o) {
				if (Td(t.value, o)) {
					r.removeEventListener("click", a.value), i.value = !1;
					return;
				}
				if (n.target && !i.value) {
					let t = { originalEvent: n };
					function i() {
						Du(Cd, e, t);
					}
					n.pointerType === "touch" ? (r.removeEventListener("click", a.value), a.value = i, r.addEventListener("click", a.value, { once: !0 })) : i();
				} else r.removeEventListener("click", a.value);
				i.value = !1;
			}
		}, c = window.setTimeout(() => {
			r.addEventListener("pointerdown", s);
		}, 0);
		o(() => {
			window.clearTimeout(c), r.removeEventListener("pointerdown", s), r.removeEventListener("click", a.value);
		});
	}), { onPointerDownCapture: () => {
		bn(n) && (i.value = !0);
	} };
}
function Dd(e, t, n = !0) {
	let r = t?.value?.ownerDocument ?? globalThis?.document, i = /* @__PURE__ */ L(!1);
	return kr((a) => {
		if (!ju || !bn(n)) return;
		let o = async (n) => {
			if (!t?.value) return;
			await ir(), await ir();
			let r = n.target;
			t.value && r && !Td(t.value, r) && n.target && !i.value && Du(wd, e, { originalEvent: n });
		};
		r.addEventListener("focusin", o), a(() => r.removeEventListener("focusin", o));
	}), {
		onFocusCapture: () => {
			bn(n) && (i.value = !0);
		},
		onBlurCapture: () => {
			bn(n) && (i.value = !1);
		}
	};
}
//#endregion
//#region node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var Od = /* @__PURE__ */ B({
	__name: "DismissableLayer",
	props: {
		disableOutsidePointerEvents: {
			type: Boolean,
			required: !1,
			default: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		present: {
			type: Boolean,
			required: !1,
			default: !0
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"dismiss"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { forwardRef: i, currentElement: a } = rd(), o = $(() => a.value?.ownerDocument ?? globalThis.document), s = $(() => Xu.layersRoot), c = $(() => a.value ? Array.from(s.value).indexOf(a.value) : -1), l = $(() => Xu.layersWithOutsidePointerEventsDisabled.size > 0), u = $(() => {
			let e = Array.from(s.value), [t] = [...Xu.layersWithOutsidePointerEventsDisabled].slice(-1), n = e.indexOf(t);
			return c.value >= n;
		}), d = Ed(async (e) => {
			let t = [...Xu.branches].some((t) => t?.contains(e.target));
			n.present && u.value && !t && (r("pointerDownOutside", e), r("interactOutside", e), await ir(), e.defaultPrevented || r("dismiss"));
		}, a, () => n.present), f = Dd((e) => {
			let t = [...Xu.branches].some((t) => t?.contains(e.target));
			n.present && !t && (r("focusOutside", e), r("interactOutside", e), e.defaultPrevented || r("dismiss"));
		}, a);
		return Wu("Escape", (e) => {
			n.present && c.value === s.value.size - 1 && (r("escapeKeyDown", e), e.defaultPrevented || r("dismiss"));
		}), Mr([
			a,
			() => n.disableOutsidePointerEvents,
			() => n.present
		], ([e, t, n], r, i) => {
			e && n && t && (Xu.layersWithOutsidePointerEventsDisabled.size === 0 && (Xu.originalBodyPointerEvents = o.value.body.style.pointerEvents, o.value.body.style.pointerEvents = "none"), Xu.layersWithOutsidePointerEventsDisabled.add(e), i(() => {
				Xu.layersWithOutsidePointerEventsDisabled.delete(e), Xu.layersWithOutsidePointerEventsDisabled.size === 0 && !Ou(Xu.originalBodyPointerEvents) && (o.value.body.style.pointerEvents = Xu.originalBodyPointerEvents);
			}));
		}, { immediate: !0 }), Mr([a, () => n.present], ([e, t], n, r) => {
			e && t && (s.value.add(e), r(() => {
				s.value.delete(e);
			}));
		}, { immediate: !0 }), kr((e) => {
			e(() => {
				a.value && (s.value.delete(a.value), Xu.layersWithOutsidePointerEventsDisabled.delete(a.value));
			});
		}), (e, t) => (G(), q(R(Sd), {
			ref: R(i),
			"as-child": e.asChild,
			as: e.as,
			"data-dismissable-layer": "",
			style: ye({ pointerEvents: l.value ? u.value ? "auto" : "none" : void 0 }),
			onFocusCapture: R(f).onFocusCapture,
			onBlurCapture: R(f).onBlurCapture,
			onPointerdownCapture: R(d).onPointerDownCapture
		}, {
			default: z(() => [H(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as-child",
			"as",
			"style",
			"onFocusCapture",
			"onBlurCapture",
			"onPointerdownCapture"
		]));
	}
}), kd = /* @__PURE__ */ B({
	__name: "Teleport",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let t = e, n = Ju({}), r = $(() => t.to ?? n.teleportTo?.value ?? "body"), i = Hu();
		return (e, t) => R(i) || e.forceMount ? (G(), q(qr, {
			key: 0,
			to: r.value,
			disabled: e.disabled,
			defer: e.defer
		}, [H(e.$slots, "default")], 8, [
			"to",
			"disabled",
			"defer"
		])) : Z("v-if", !0);
	}
}), Ad = /* @__PURE__ */ B({
	__name: "VisuallyHidden",
	props: {
		feature: {
			type: String,
			required: !1,
			default: "focusable"
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "span"
		}
	},
	setup(e) {
		return (e, t) => (G(), q(R(Sd), {
			as: e.as,
			"as-child": e.asChild,
			"aria-hidden": e.feature === "focusable" || e.feature === "fully-hidden" ? "true" : void 0,
			"data-hidden": e.feature === "fully-hidden" ? "" : void 0,
			tabindex: e.feature === "fully-hidden" ? "-1" : void 0,
			style: {
				position: "absolute",
				border: 0,
				width: "1px",
				height: "1px",
				padding: 0,
				margin: "-1px",
				overflow: "hidden",
				clip: "rect(0, 0, 0, 0)",
				clipPath: "inset(50%)",
				whiteSpace: "nowrap",
				wordWrap: "normal",
				top: "-1px",
				left: "-1px"
			}
		}, {
			default: z(() => [H(e.$slots, "default")]),
			_: 3
		}, 8, [
			"as",
			"as-child",
			"aria-hidden",
			"data-hidden",
			"tabindex"
		]));
	}
}), [jd, Md] = /*#__PURE__*/ Eu("PopperRoot"), Nd = /* @__PURE__ */ B({
	inheritAttrs: !1,
	__name: "PopperRoot",
	setup(e) {
		let t = /* @__PURE__ */ L();
		return Md({
			anchor: t,
			onAnchorChange: (e) => t.value = e
		}), (e, t) => H(e.$slots, "default");
	}
}), Pd = /* @__PURE__ */ B({
	__name: "PopperAnchor",
	props: {
		reference: {
			type: null,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	},
	setup(e) {
		let t = e, { forwardRef: n, currentElement: r } = rd(), i = jd();
		return Ar(() => {
			i.onAnchorChange(t.reference ?? r.value);
		}), (e, t) => (G(), q(R(Sd), {
			ref: R(n),
			as: e.as,
			"as-child": e.asChild
		}, {
			default: z(() => [H(e.$slots, "default")]),
			_: 3
		}, 8, ["as", "as-child"]));
	}
}), Fd = {
	key: 0,
	d: "M0 0L6 6L12 0"
}, Id = {
	key: 1,
	d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
}, Ld = /* @__PURE__ */ B({
	__name: "Arrow",
	props: {
		width: {
			type: Number,
			required: !1,
			default: 10
		},
		height: {
			type: Number,
			required: !1,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "svg"
		}
	},
	setup(e) {
		let t = e;
		return rd(), (e, n) => (G(), q(R(Sd), Ms(t, {
			width: e.width,
			height: e.height,
			viewBox: e.asChild ? void 0 : "0 0 12 6",
			preserveAspectRatio: e.asChild ? void 0 : "none"
		}), {
			default: z(() => [H(e.$slots, "default", {}, () => [e.rounded ? (G(), K("path", Id)) : (G(), K("path", Fd))])]),
			_: 3
		}, 16, [
			"width",
			"height",
			"viewBox",
			"preserveAspectRatio"
		]));
	}
});
//#endregion
//#region node_modules/reka-ui/dist/Popper/utils.js
function Rd(e) {
	return e !== null;
}
function zd(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Bd(n), u = {
				start: e.dir === "rtl" ? "100%" : "0%",
				center: "50%",
				end: e.dir === "rtl" ? "0%" : "100%"
			}[l], d = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[l], f = (i.arrow?.x ?? 0) + o / 2, p = (i.arrow?.y ?? 0) + s / 2, m = "", h = "";
			return c === "bottom" ? (m = a ? u : `${f}px`, h = `${-s}px`) : c === "top" ? (m = a ? u : `${f}px`, h = `${r.floating.height + s}px`) : c === "right" ? (m = `${-s}px`, h = a ? d : `${p}px`) : c === "left" && (m = `${r.floating.width + s}px`, h = a ? d : `${p}px`), { data: {
				x: m,
				y: h
			} };
		}
	};
}
function Bd(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Vd = [
	"top",
	"right",
	"bottom",
	"left"
], Hd = Math.min, Ud = Math.max, Wd = Math.round, Gd = Math.floor, Kd = (e) => ({
	x: e,
	y: e
}), qd = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Jd(e, t, n) {
	return Ud(e, Hd(t, n));
}
function Yd(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Xd(e) {
	return e.split("-")[0];
}
function Zd(e) {
	return e.split("-")[1];
}
function Qd(e) {
	return e === "x" ? "y" : "x";
}
function $d(e) {
	return e === "y" ? "height" : "width";
}
function ef(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function tf(e) {
	return Qd(ef(e));
}
function nf(e, t, n) {
	n === void 0 && (n = !1);
	let r = Zd(e), i = tf(e), a = $d(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = ff(o)), [o, ff(o)];
}
function rf(e) {
	let t = ff(e);
	return [
		af(e),
		t,
		af(t)
	];
}
function af(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var of = ["left", "right"], sf = ["right", "left"], cf = ["top", "bottom"], lf = ["bottom", "top"];
function uf(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? sf : of : t ? of : sf;
		case "left":
		case "right": return t ? cf : lf;
		default: return [];
	}
}
function df(e, t, n, r) {
	let i = Zd(e), a = uf(Xd(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(af)))), a;
}
function ff(e) {
	let t = Xd(e);
	return qd[t] + e.slice(t.length);
}
function pf(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function mf(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : pf(e);
}
function hf(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function gf(e, t, n) {
	let { reference: r, floating: i } = e, a = ef(t), o = tf(t), s = $d(o), c = Xd(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = Zd(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function _f(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Yd(t, e), p = mf(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = hf(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = hf(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var vf = 50, yf = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: _f
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = gf(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < vf && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = gf(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, bf = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Yd(e, t) || {};
		if (l == null) return {};
		let d = mf(u), f = {
			x: n,
			y: r
		}, p = tf(i), m = $d(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = Hd(d[_], T), D = Hd(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = Jd(E, k, O), ee = !c.arrow && Zd(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, te = ee ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + te,
			data: {
				[p]: A,
				centerOffset: k - A - te,
				...ee && { alignmentOffset: te }
			},
			reset: ee
		};
	}
}), xf = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Yd(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Xd(r), _ = ef(o), v = Xd(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [ff(o)] : rf(o)), x = p !== "none";
			!d && x && b.push(...df(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = nf(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === ef(t) || T.every((e) => ef(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = ef(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Sf(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Cf(e) {
	return Vd.some((t) => e[t] >= 0);
}
var wf = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Yd(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Sf(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Cf(e)
					} };
				}
				case "escaped": {
					let e = Sf(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Cf(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Tf = /*#__PURE__*/ new Set(["left", "top"]);
async function Ef(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Xd(n), s = Zd(n), c = ef(n) === "y", l = Tf.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Yd(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Df = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Ef(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Of = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = Yd(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = ef(i), p = Qd(f), m = u[p], h = u[f], g = (e, t) => Jd(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, kf = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Yd(e, t), u = {
				x: n,
				y: r
			}, d = ef(i), f = Qd(d), p = u[f], m = u[d], h = Yd(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Tf.has(Xd(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Af = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Yd(e, t), c = await i.detectOverflow(t, s), l = Xd(n), u = Zd(n), d = ef(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = Hd(p - c[m], g), y = Hd(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * Ud(c.left, c.right) : S = p - 2 * Ud(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function jf() {
	return typeof window < "u";
}
function Mf(e) {
	return Ff(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Nf(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Pf(e) {
	return ((Ff(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Ff(e) {
	return jf() ? e instanceof Node || e instanceof Nf(e).Node : !1;
}
function If(e) {
	return jf() ? e instanceof Element || e instanceof Nf(e).Element : !1;
}
function Lf(e) {
	return jf() ? e instanceof HTMLElement || e instanceof Nf(e).HTMLElement : !1;
}
function Rf(e) {
	return !jf() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Nf(e).ShadowRoot;
}
function zf(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Xf(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Bf(e) {
	return /^(table|td|th)$/.test(Mf(e));
}
function Vf(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Hf = /transform|translate|scale|rotate|perspective|filter/, Uf = /paint|layout|strict|content/, Wf = (e) => !!e && e !== "none", Gf;
function Kf(e) {
	let t = If(e) ? Xf(e) : e;
	return Wf(t.transform) || Wf(t.translate) || Wf(t.scale) || Wf(t.rotate) || Wf(t.perspective) || !Jf() && (Wf(t.backdropFilter) || Wf(t.filter)) || Hf.test(t.willChange || "") || Uf.test(t.contain || "");
}
function qf(e) {
	let t = Qf(e);
	for (; Lf(t) && !Yf(t);) {
		if (Kf(t)) return t;
		if (Vf(t)) return null;
		t = Qf(t);
	}
	return null;
}
function Jf() {
	return Gf ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Gf;
}
function Yf(e) {
	return /^(html|body|#document)$/.test(Mf(e));
}
function Xf(e) {
	return Nf(e).getComputedStyle(e);
}
function Zf(e) {
	return If(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Qf(e) {
	if (Mf(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Rf(e) && e.host || Pf(e);
	return Rf(t) ? t.host : t;
}
function $f(e) {
	let t = Qf(e);
	return Yf(t) ? (e.ownerDocument || e).body : Lf(t) && zf(t) ? t : $f(t);
}
function ep(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = $f(e), i = r === e.ownerDocument?.body, a = Nf(r);
	if (i) {
		let e = tp(a);
		return t.concat(a, a.visualViewport || [], zf(r) ? r : [], e && n ? ep(e) : []);
	}
	return t.concat(r, ep(r, [], n));
}
function tp(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function np(e) {
	let t = Xf(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Lf(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Wd(n) !== a || Wd(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function rp(e) {
	return If(e) ? e : e.contextElement;
}
function ip(e) {
	let t = rp(e);
	if (!Lf(t)) return Kd(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = np(t), o = (a ? Wd(n.width) : n.width) / r, s = (a ? Wd(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var ap = /*#__PURE__*/ Kd(0);
function op(e) {
	let t = Nf(e);
	return !Jf() || !t.visualViewport ? ap : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function sp(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === Nf(e);
}
function cp(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = rp(e), o = Kd(1);
	t && (r ? If(r) && (o = ip(r)) : o = ip(e));
	let s = sp(a, n, r) ? op(a) : Kd(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = Nf(a), t = If(r) ? Nf(r) : r, n = e, i = tp(n);
		for (; i && t !== n;) {
			let e = ip(i), t = i.getBoundingClientRect(), r = Xf(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Nf(i), i = tp(n);
		}
	}
	return hf({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function lp(e, t) {
	let n = Zf(e).scrollLeft;
	return t ? t.left + n : cp(Pf(e)).left + n;
}
function up(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - lp(e, n),
		y: n.top + t.scrollTop
	};
}
function dp(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Pf(r), s = t ? Vf(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Kd(1), u = Kd(0), d = Lf(r);
	if ((d || !a) && ((Mf(r) !== "body" || zf(o)) && (c = Zf(r)), d)) {
		let e = cp(r);
		l = ip(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? up(o, c) : Kd(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function fp(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function pp(e) {
	let t = Zf(e), n = e.ownerDocument.body, r = Ud(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = Ud(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + lp(e), o = -t.scrollTop;
	return Xf(n).direction === "rtl" && (a += Ud(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var mp = 25;
function hp(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = Nf(e), a = Pf(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Jf() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (lp(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= mp && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function gp(e, t) {
	let n = cp(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = ip(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function _p(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = hp(e, n, t);
	else if (t === "document") r = pp(Pf(e));
	else if (If(t)) r = gp(t, n);
	else {
		let n = op(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return hf(r);
}
function vp(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = ep(e, [], !1).filter((e) => If(e) && Mf(e) !== "body"), i = null, a = Xf(e).position === "fixed", o = a ? Qf(e) : e;
	for (; If(o) && !Yf(o);) {
		let e = Xf(o), t = Kf(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Qf(o);
	}
	return t.set(e, r), r;
}
function yp(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Vf(t) ? [] : vp(t, this._c) : [].concat(n), r], o = _p(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = _p(t, a[e], i);
		s = Ud(n.top, s), c = Hd(n.right, c), l = Hd(n.bottom, l), u = Ud(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function bp(e) {
	let { width: t, height: n } = np(e);
	return {
		width: t,
		height: n
	};
}
function xp(e, t, n) {
	let r = Lf(t), i = Pf(t), a = n === "fixed", o = cp(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Kd(0);
	if ((r || !a) && ((Mf(t) !== "body" || zf(i)) && (s = Zf(t)), r)) {
		let e = cp(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = lp(i));
	let l = i && !r && !a ? up(i, s) : Kd(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Sp(e) {
	return Xf(e).position === "static";
}
function Cp(e, t) {
	if (!Lf(e) || Xf(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Pf(e) === n && (n = n.ownerDocument.body), n;
}
function wp(e, t) {
	let n = Nf(e);
	if (Vf(e)) return n;
	if (!Lf(e)) {
		let t = Qf(e);
		for (; t && !Yf(t);) {
			if (If(t) && !Sp(t)) return t;
			t = Qf(t);
		}
		return n;
	}
	let r = Cp(e, t);
	for (; r && Bf(r) && Sp(r);) r = Cp(r, t);
	return r && Yf(r) && Sp(r) && !Kf(r) ? n : r || qf(e) || n;
}
var Tp = async function(e) {
	let t = this.getOffsetParent || wp, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: xp(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Ep(e) {
	return Xf(e).direction === "rtl";
}
var Dp = {
	convertOffsetParentRelativeRectToViewportRelativeRect: dp,
	getDocumentElement: Pf,
	getClippingRect: yp,
	getOffsetParent: wp,
	getElementRects: Tp,
	getClientRects: fp,
	getDimensions: bp,
	getScale: ip,
	isElement: If,
	isRTL: Ep
};
function Op(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function kp(e, t, n) {
	let r = null, i, a = Pf(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Gd(d), h = Gd(a.clientWidth - (u + f)), g = Gd(a.clientHeight - (d + p)), _ = Gd(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Ud(0, Hd(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Op(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = Nf(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Ap(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = rp(e), u = i || a ? [...l ? ep(l) : [], ...t ? ep(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? kp(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? cp(e) : null;
	c && g();
	function g() {
		let t = cp(e);
		h && !Op(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var jp = Df, Mp = Of, Np = xf, Pp = Af, Fp = wf, Ip = bf, Lp = kf, Rp = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Dp,
		...i.platform,
		_c: r
	};
	return yf(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function zp(e) {
	return typeof e == "object" && !!e && "$el" in e;
}
function Bp(e) {
	if (zp(e)) {
		let t = e.$el;
		return Ff(t) && Mf(t) === "#comment" ? null : t;
	}
	return e;
}
function Vp(e) {
	return typeof e == "function" ? e() : R(e);
}
function Hp(e) {
	return {
		name: "arrow",
		options: e,
		fn(t) {
			let n = Bp(Vp(e.element));
			return n == null ? {} : Ip({
				element: n,
				padding: e.padding
			}).fn(t);
		}
	};
}
function Up(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Wp(e, t) {
	let n = Up(e);
	return Math.round(t * n) / n;
}
function Gp(e, t, n) {
	n === void 0 && (n = {});
	let r = n.whileElementsMounted, i = $(() => Vp(n.open) ?? !0), a = $(() => Vp(n.middleware)), o = $(() => Vp(n.placement) ?? "bottom"), s = $(() => Vp(n.strategy) ?? "absolute"), c = $(() => Vp(n.transform) ?? !0), l = $(() => Bp(e.value)), u = $(() => Bp(t.value)), d = /* @__PURE__ */ L(0), f = /* @__PURE__ */ L(0), p = /* @__PURE__ */ L(s.value), m = /* @__PURE__ */ L(o.value), h = /* @__PURE__ */ gn({}), g = /* @__PURE__ */ L(!1), _ = $(() => {
		let e = {
			position: p.value,
			left: "0",
			top: "0"
		};
		if (!u.value) return e;
		let t = Wp(u.value, d.value), n = Wp(u.value, f.value);
		return c.value ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...Up(u.value) >= 1.5 && { willChange: "transform" }
		} : {
			position: p.value,
			left: t + "px",
			top: n + "px"
		};
	}), v;
	function y() {
		if (l.value == null || u.value == null) return;
		let e = i.value;
		Rp(l.value, u.value, {
			middleware: a.value,
			placement: o.value,
			strategy: s.value
		}).then((t) => {
			d.value = t.x, f.value = t.y, p.value = t.strategy, m.value = t.placement, h.value = t.middlewareData, g.value = e !== !1;
		});
	}
	function b() {
		typeof v == "function" && (v(), v = void 0);
	}
	function x() {
		if (b(), r === void 0) {
			y();
			return;
		}
		if (l.value != null && u.value != null) {
			v = r(l.value, u.value, y);
			return;
		}
	}
	function S() {
		i.value || (g.value = !1);
	}
	return Mr([
		a,
		o,
		s,
		i
	], y, { flush: "sync" }), Mr([l, u], x, { flush: "sync" }), Mr(i, S, { flush: "sync" }), He() && Ue(b), {
		x: /* @__PURE__ */ sn(d),
		y: /* @__PURE__ */ sn(f),
		strategy: /* @__PURE__ */ sn(p),
		placement: /* @__PURE__ */ sn(m),
		middlewareData: /* @__PURE__ */ sn(h),
		isPositioned: /* @__PURE__ */ sn(g),
		floatingStyles: _,
		update: y
	};
}
//#endregion
//#region node_modules/reka-ui/dist/Popper/PopperContent.js
var Kp = ["dir"], qp = {
	side: "bottom",
	sideOffset: 0,
	sideFlip: !0,
	align: "center",
	alignOffset: 0,
	alignFlip: !0,
	arrowPadding: 0,
	hideShiftedArrow: !0,
	avoidCollisions: !0,
	collisionBoundary: () => [],
	collisionPadding: 0,
	sticky: "partial",
	hideWhenDetached: !1,
	positionStrategy: "fixed",
	updatePositionStrategy: "optimized",
	prioritizePosition: !1
}, [Jp, Yp] = /*#__PURE__*/ Eu("PopperContent"), Xp = /* @__PURE__ */ B({
	inheritAttrs: !1,
	__name: "PopperContent",
	props: /* @__PURE__ */ za({
		memoDependencies: {
			type: Array,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		sideFlip: {
			type: Boolean,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		alignFlip: {
			type: Boolean,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		hideShiftedArrow: {
			type: Boolean,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: !1
		},
		prioritizePosition: {
			type: Boolean,
			required: !1
		},
		reference: {
			type: null,
			required: !1
		},
		dir: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		}
	}, { ...qp }),
	emits: ["placed"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = jd(), { forwardRef: a, currentElement: o } = rd(), s = td($(() => n.dir)), c = /* @__PURE__ */ L(), l = /* @__PURE__ */ L(), { width: u, height: d } = hd(l), f = $(() => n.side + (n.align === "center" ? "" : `-${n.align}`)), p = $(() => typeof n.collisionPadding == "number" ? n.collisionPadding : {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			...n.collisionPadding
		}), m = $(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), h = $(() => ({
			padding: p.value,
			boundary: m.value.filter(Rd),
			altBoundary: m.value.length > 0
		})), g = $(() => ({
			mainAxis: n.sideFlip,
			crossAxis: n.alignFlip
		})), _ = $(() => [
			jp({
				mainAxis: n.sideOffset + d.value,
				alignmentAxis: n.alignOffset
			}),
			n.prioritizePosition && n.avoidCollisions && Np({
				...h.value,
				...g.value
			}),
			n.avoidCollisions && Mp({
				mainAxis: !0,
				crossAxis: !!n.prioritizePosition,
				limiter: n.sticky === "partial" ? Lp() : void 0,
				...h.value
			}),
			!n.prioritizePosition && n.avoidCollisions && Np({
				...h.value,
				...g.value
			}),
			Pp({
				...h.value,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--reka-popper-available-width", `${n}px`), o.setProperty("--reka-popper-available-height", `${r}px`), o.setProperty("--reka-popper-anchor-width", `${i}px`), o.setProperty("--reka-popper-anchor-height", `${a}px`);
				}
			}),
			l.value && Hp({
				element: l.value,
				padding: n.arrowPadding
			}),
			zd({
				arrowWidth: u.value,
				arrowHeight: d.value,
				dir: s.value
			}),
			n.hideWhenDetached && Fp({
				strategy: "referenceHidden",
				...h.value
			})
		]), { floatingStyles: v, placement: y, isPositioned: b, middlewareData: x, update: S } = Gp($(() => n.reference ?? i.anchor.value), c, {
			strategy: n.positionStrategy,
			placement: f,
			whileElementsMounted: (...e) => Ap(...e, {
				layoutShift: !n.disableUpdateOnLayoutShift,
				animationFrame: n.updatePositionStrategy === "always"
			}),
			middleware: _
		}), C = $(() => Bd(y.value)[0]), w = $(() => Bd(y.value)[1]);
		Ar(() => {
			b.value && r("placed");
		});
		let T = $(() => {
			let e = x.value.arrow?.centerOffset !== 0;
			return n.hideShiftedArrow && e;
		}), E = /* @__PURE__ */ L("");
		return kr(() => {
			o.value && (E.value = window.getComputedStyle(o.value).zIndex);
		}), Yp({
			placedSide: C,
			onArrowChange: (e) => l.value = e,
			arrowX: $(() => x.value.arrow?.x ?? 0),
			arrowY: $(() => x.value.arrow?.y ?? 0),
			shouldHideArrow: T
		}), (e, t) => (G(), K("div", {
			ref_key: "floatingRef",
			ref: c,
			"data-reka-popper-content-wrapper": "",
			dir: R(s),
			style: ye({
				...R(v),
				transform: R(b) ? R(v).transform : "translate(0, -200%)",
				minWidth: "max-content",
				zIndex: E.value,
				"--reka-popper-transform-origin": [R(x).transformOrigin?.x, R(x).transformOrigin?.y].join(" "),
				...R(x).hide?.referenceHidden && {
					visibility: "hidden",
					pointerEvents: "none"
				}
			})
		}, [n.memoDependencies ? ac([
			n.asChild,
			n.as,
			C.value,
			w.value,
			R(b),
			...Object.values(e.$attrs),
			...n.memoDependencies
		], () => (G(), q(R(Sd), Ms({
			key: 0,
			ref: R(a)
		}, e.$attrs, {
			"as-child": n.asChild,
			as: n.as,
			"data-side": C.value,
			"data-align": w.value,
			style: { animation: R(b) ? void 0 : "none" }
		}), {
			default: z(() => [H(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"style"
		])), t, 0) : (G(), q(R(Sd), Ms({
			key: 1,
			ref: R(a)
		}, e.$attrs, {
			"as-child": n.asChild,
			as: n.as,
			"data-side": C.value,
			"data-align": w.value,
			dir: R(s),
			style: { animation: R(b) ? void 0 : "none" }
		}), {
			default: z(() => [H(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as-child",
			"as",
			"data-side",
			"data-align",
			"dir",
			"style"
		]))], 12, Kp));
	}
}), Zp = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Qp = /* @__PURE__ */ B({
	inheritAttrs: !1,
	__name: "PopperArrow",
	props: {
		width: {
			type: Number,
			required: !1
		},
		height: {
			type: Number,
			required: !1
		},
		rounded: {
			type: Boolean,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "svg"
		}
	},
	setup(e) {
		let { forwardRef: t } = rd(), n = Jp(), r = $(() => Zp[n.placedSide.value]);
		return (e, i) => (G(), K("span", {
			ref: (e) => {
				R(n).onArrowChange(e ?? void 0);
			},
			style: ye({
				position: "absolute",
				left: R(n).arrowX?.value ? `${R(n).arrowX?.value}px` : void 0,
				top: R(n).arrowY?.value ? `${R(n).arrowY?.value}px` : void 0,
				[r.value]: 0,
				transformOrigin: {
					top: "",
					right: "0 0",
					bottom: "center 0",
					left: "100% 0"
				}[R(n).placedSide.value],
				transform: {
					top: "translateY(100%)",
					right: "translateY(50%) rotate(90deg) translateX(-50%)",
					bottom: "rotate(180deg)",
					left: "translateY(50%) rotate(-90deg) translateX(50%)"
				}[R(n).placedSide.value],
				visibility: R(n).shouldHideArrow.value ? "hidden" : void 0
			})
		}, [Y(Ld, Ms(e.$attrs, {
			ref: R(t),
			style: { display: "block" },
			as: e.as,
			"as-child": e.asChild,
			rounded: e.rounded,
			width: e.width,
			height: e.height
		}), {
			default: z(() => [H(e.$slots, "default")]),
			_: 3
		}, 16, [
			"as",
			"as-child",
			"rounded",
			"width",
			"height"
		])], 4));
	}
}), $p = /* @__PURE__ */ B({
	__name: "TooltipArrow",
	props: {
		width: {
			type: Number,
			required: !1,
			default: 10
		},
		height: {
			type: Number,
			required: !1,
			default: 5
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "svg"
		}
	},
	setup(e) {
		let t = e;
		return rd(), (e, n) => (G(), q(R(Qp), Te(Es(t)), {
			default: z(() => [H(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), [em, tm] = /*#__PURE__*/ Eu("TooltipProvider"), nm = /* @__PURE__ */ B({
	inheritAttrs: !1,
	__name: "TooltipProvider",
	props: {
		delayDuration: {
			type: Number,
			required: !1,
			default: 700
		},
		skipDelayDuration: {
			type: Number,
			required: !1,
			default: 300
		},
		disableHoverableContent: {
			type: Boolean,
			required: !1,
			default: !1
		},
		disableClosingTrigger: {
			type: Boolean,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: !1,
			default: !1
		},
		content: {
			type: Object,
			required: !1
		}
	},
	setup(e) {
		let { delayDuration: t, skipDelayDuration: n, disableHoverableContent: r, disableClosingTrigger: i, ignoreNonKeyboardFocus: a, disabled: o, content: s } = /* @__PURE__ */ Tn(e);
		rd();
		let c = /* @__PURE__ */ L(!0), l = /* @__PURE__ */ L(!1), { start: u, stop: d } = Lu(() => {
			c.value = !0;
		}, n, { immediate: !1 });
		return tm({
			isOpenDelayed: c,
			delayDuration: t,
			onOpen() {
				d(), c.value = !1;
			},
			onClose() {
				u();
			},
			isPointerInTransitRef: l,
			disableHoverableContent: r,
			disableClosingTrigger: i,
			disabled: o,
			ignoreNonKeyboardFocus: a,
			content: s
		}), (e, t) => H(e.$slots, "default");
	}
}), rm = "tooltip.open", [im, am] = /*#__PURE__*/ Eu("TooltipRoot"), om = /* @__PURE__ */ B({
	__name: "TooltipRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: !1,
			default: !1
		},
		open: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		delayDuration: {
			type: Number,
			required: !1,
			default: void 0
		},
		disableHoverableContent: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		disableClosingTrigger: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: !1,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(e, { emit: t }) {
		let n = e, r = t;
		rd();
		let i = em(), a = $(() => n.disableHoverableContent ?? i.disableHoverableContent.value), o = $(() => n.disableClosingTrigger ?? i.disableClosingTrigger.value), s = $(() => n.disabled ?? i.disabled.value), c = $(() => n.delayDuration ?? i.delayDuration.value), l = $(() => n.ignoreNonKeyboardFocus ?? i.ignoreNonKeyboardFocus.value), u = Ku(n, "open", r, {
			defaultValue: n.defaultOpen,
			passive: n.open === void 0
		});
		Mr(u, (e) => {
			i.onClose && (e ? (i.onOpen(), document.dispatchEvent(new CustomEvent(rm))) : i.onClose());
		});
		let d = /* @__PURE__ */ L(!1), f = /* @__PURE__ */ L(), p = $(() => u.value ? d.value ? "delayed-open" : "instant-open" : "closed"), { start: m, stop: h } = Lu(() => {
			d.value = !0, u.value = !0;
		}, c, { immediate: !1 });
		function g() {
			h(), d.value = !1, u.value = !0;
		}
		function _() {
			h(), u.value = !1;
		}
		function v() {
			m();
		}
		return am({
			contentId: "",
			open: u,
			stateAttribute: p,
			trigger: f,
			onTriggerChange(e) {
				f.value = e;
			},
			onTriggerEnter() {
				i.isOpenDelayed.value ? v() : g();
			},
			onTriggerLeave() {
				a.value ? _() : h();
			},
			onOpen: g,
			onClose: _,
			disableHoverableContent: a,
			disableClosingTrigger: o,
			disabled: s,
			ignoreNonKeyboardFocus: l
		}), (e, t) => (G(), q(R(Nd), null, {
			default: z(() => [H(e.$slots, "default", { open: R(u) })]),
			_: 3
		}));
	}
}), sm = /* @__PURE__ */ B({
	__name: "TooltipContentImpl",
	props: {
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		as: {
			type: null,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1,
			default: void 0
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = im(), a = em(), { forwardRef: o, currentElement: s } = rd(), c = $(() => n.ariaLabel || s.value?.textContent), l = $(() => {
			let { ariaLabel: e, ...t } = n;
			return ed(t, a.content.value ?? {}, {
				side: "top",
				sideOffset: 0,
				align: "center",
				avoidCollisions: !0,
				collisionBoundary: [],
				collisionPadding: 0,
				arrowPadding: 0,
				sticky: "partial",
				hideWhenDetached: !1
			});
		});
		return ra(() => {
			Vu(window, "scroll", (e) => {
				e.target?.contains(i.trigger.value) && i.onClose();
			}, { capture: !0 }), Vu(document, rm, i.onClose);
		}), (e, t) => (G(), q(R(Od), {
			"as-child": "",
			"disable-outside-pointer-events": !1,
			onEscapeKeyDown: t[0] ||= (e) => r("escapeKeyDown", e),
			onPointerDownOutside: t[1] ||= (e) => {
				R(i).disableClosingTrigger.value && R(i).trigger.value?.contains(e.target) && e.preventDefault(), r("pointerDownOutside", e);
			},
			onFocusOutside: t[2] ||= cu(() => {}, ["prevent"]),
			onDismiss: t[3] ||= (e) => R(i).onClose()
		}, {
			default: z(() => [Y(R(Xp), Ms({
				ref: R(o),
				"data-state": R(i).stateAttribute.value
			}, {
				...e.$attrs,
				...l.value
			}, { style: {
				"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
				"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
				"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: z(() => [H(e.$slots, "default"), Y(R(Ad), {
					id: R(i).contentId,
					role: "tooltip"
				}, {
					default: z(() => [X(N(c.value), 1)]),
					_: 1
				}, 8, ["id"])]),
				_: 3
			}, 16, ["data-state"])]),
			_: 3
		}));
	}
}), cm = /* @__PURE__ */ B({
	__name: "TooltipContentHoverable",
	props: {
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	setup(e) {
		let t = id(e), { forwardRef: n, currentElement: r } = rd(), { trigger: i, onClose: a } = im(), o = em(), { isPointerInTransit: s, onPointerExit: c } = od(i, r);
		return o.isPointerInTransitRef = s, c(() => {
			a();
		}), Vu(r, "pointermove", (e) => {
			let t = r.value;
			t && e.pointerType !== "touch" && t.ownerDocument.elementsFromPoint?.(e.clientX, e.clientY).some((e) => {
				if (t.contains(e)) return !1;
				let n = e.closest("[data-grace-area-trigger]");
				return !!n && n !== i.value;
			}) && a();
		}), (e, r) => (G(), q(sm, Ms({ ref: R(n) }, R(t)), {
			default: z(() => [H(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), lm = /* @__PURE__ */ B({
	__name: "TooltipContent",
	props: {
		forceMount: {
			type: Boolean,
			required: !1
		},
		ariaLabel: {
			type: String,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1
		},
		side: {
			type: null,
			required: !1
		},
		sideOffset: {
			type: Number,
			required: !1
		},
		align: {
			type: null,
			required: !1
		},
		alignOffset: {
			type: Number,
			required: !1
		},
		avoidCollisions: {
			type: Boolean,
			required: !1
		},
		collisionBoundary: {
			type: null,
			required: !1
		},
		collisionPadding: {
			type: [Number, Object],
			required: !1
		},
		arrowPadding: {
			type: Number,
			required: !1
		},
		sticky: {
			type: String,
			required: !1
		},
		hideWhenDetached: {
			type: Boolean,
			required: !1
		},
		positionStrategy: {
			type: String,
			required: !1
		},
		updatePositionStrategy: {
			type: String,
			required: !1
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = im(), a = ad(n, r), { forwardRef: o } = rd();
		return (e, t) => (G(), q(R(yd), { present: e.forceMount || R(i).open.value }, {
			default: z(() => [(G(), q(ga(R(i).disableHoverableContent.value ? sm : cm), Ms({ ref: R(o) }, R(a)), {
				default: z(() => [H(e.$slots, "default")]),
				_: 3
			}, 16))]),
			_: 3
		}, 8, ["present"]));
	}
}), um = /* @__PURE__ */ B({
	__name: "TooltipPortal",
	props: {
		to: {
			type: null,
			required: !1
		},
		disabled: {
			type: Boolean,
			required: !1
		},
		defer: {
			type: Boolean,
			required: !1
		},
		forceMount: {
			type: Boolean,
			required: !1
		}
	},
	setup(e) {
		let t = e;
		return (e, n) => (G(), q(R(kd), Te(Es(t)), {
			default: z(() => [H(e.$slots, "default")]),
			_: 3
		}, 16));
	}
}), dm = /* @__PURE__ */ B({
	__name: "TooltipTrigger",
	props: {
		reference: {
			type: null,
			required: !1
		},
		asChild: {
			type: Boolean,
			required: !1
		},
		as: {
			type: null,
			required: !1,
			default: "button"
		}
	},
	setup(e) {
		let t = e, n = im(), r = em();
		n.contentId ||= md(void 0, "reka-tooltip-content");
		let { forwardRef: i, currentElement: a } = rd(), o = /* @__PURE__ */ L(!1), s = /* @__PURE__ */ L(!1), c = $(() => n.disabled.value ? {} : {
			click: h,
			focus: p,
			pointermove: d,
			pointerleave: f,
			pointerdown: u,
			blur: m
		});
		Mr(a, (e) => {
			n.onTriggerChange(e);
		}, { immediate: !0 });
		function l() {
			setTimeout(() => {
				o.value = !1;
			}, 1);
		}
		function u() {
			n.open && !n.disableClosingTrigger.value && n.onClose(), o.value = !0, document.addEventListener("pointerup", l, { once: !0 });
		}
		function d(e) {
			e.pointerType !== "touch" && !s.value && !r.isPointerInTransitRef.value && (n.onTriggerEnter(), s.value = !0);
		}
		function f() {
			n.onTriggerLeave(), s.value = !1;
		}
		function p(e) {
			o.value || (!n.ignoreNonKeyboardFocus.value || e.target.matches?.(":focus-visible")) && n.onOpen();
		}
		function m() {
			n.onClose();
		}
		function h() {
			n.disableClosingTrigger.value || n.onClose();
		}
		return (e, r) => (G(), q(R(Pd), {
			"as-child": "",
			reference: e.reference ?? R(a)
		}, {
			default: z(() => [Y(R(Sd), Ms({
				ref: R(i),
				"aria-describedby": R(n).open.value ? R(n).contentId : void 0,
				"data-state": R(n).stateAttribute.value,
				as: e.as,
				"as-child": t.asChild,
				"data-grace-area-trigger": ""
			}, Sa(c.value)), {
				default: z(() => [H(e.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-describedby",
				"data-state",
				"as",
				"as-child"
			])]),
			_: 3
		}, 8, ["reference"]));
	}
}), fm = () => {}, pm = Array.isArray;
function mm(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t);
}
function hm(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (var n in e) if (!gm(e[n], t[n])) return !1;
	return !0;
}
function gm(e, t) {
	return pm(e) ? _m(e, t) : pm(t) ? _m(t, e) : e?.valueOf() === t?.valueOf();
}
function _m(e, t) {
	return pm(t) ? e.length === t.length && e.every((e, n) => e === t[n]) : e.length === 1 && e[0] === t;
}
var vm = /* @__PURE__ */ function(e) {
	return e[e.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e[e.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e[e.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e[e.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e[e.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e;
}({});
vm.MATCHER_NOT_FOUND, vm.NAVIGATION_GUARD_REDIRECT, vm.NAVIGATION_ABORTED, vm.NAVIGATION_CANCELLED, vm.NAVIGATION_DUPLICATED;
var ym = Symbol(""), bm = Symbol("");
(/* @__PURE__ */ (function(e) {
	return e[e.Static = 0] = "Static", e[e.Param = 1] = "Param", e[e.Group = 2] = "Group", e;
})({})).Static;
function xm(e) {
	let t = Tr(ym), n = Tr(bm), r = $(() => {
		let n = R(e.to);
		return t.resolve(n);
	}), i = $(() => {
		let { matched: e } = r.value, { length: t } = e, i = e[t - 1], a = n.matched;
		if (!i || !a.length) return -1;
		let o = a.findIndex(mm.bind(null, i));
		if (o > -1) return o;
		let s = Em(e[t - 2]);
		return t > 1 && Em(i) === s && a[a.length - 1].path !== s ? a.findIndex(mm.bind(null, e[t - 2])) : o;
	}), a = $(() => i.value > -1 && Tm(n.params, r.value.params)), o = $(() => i.value > -1 && i.value === n.matched.length - 1 && hm(n.params, r.value.params));
	function s(n = {}) {
		if (wm(n)) {
			let n = t[R(e.replace) ? "replace" : "push"](R(e.to)).catch(fm);
			return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => n), n;
		}
		return Promise.resolve();
	}
	return {
		route: r,
		href: $(() => r.value.href),
		isActive: a,
		isExactActive: o,
		navigate: s
	};
}
function Sm(e) {
	return e.length === 1 ? e[0] : e;
}
var Cm = /* @__PURE__ */ B({
	name: "RouterLink",
	compatConfig: { MODE: 3 },
	props: {
		to: {
			type: [String, Object],
			required: !0
		},
		replace: Boolean,
		activeClass: String,
		exactActiveClass: String,
		custom: Boolean,
		ariaCurrentValue: {
			type: String,
			default: "page"
		},
		viewTransition: Boolean
	},
	useLink: xm,
	setup(e, { slots: t }) {
		let n = /* @__PURE__ */ rn(xm(e)), { options: r } = Tr(ym), i = $(() => ({
			[Dm(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
			[Dm(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
		}));
		return () => {
			let r = t.default && Sm(t.default(n));
			return e.custom ? r : rc("a", {
				"aria-current": n.isExactActive ? e.ariaCurrentValue : null,
				href: n.href,
				onClick: n.navigate,
				class: i.value
			}, r);
		};
	}
});
function wm(e) {
	if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && (e.button === void 0 || e.button === 0)) {
		if (e.currentTarget && e.currentTarget.getAttribute) {
			let t = e.currentTarget.getAttribute("target");
			if (/\b_blank\b/i.test(t)) return;
		}
		return e.preventDefault && e.preventDefault(), !0;
	}
}
function Tm(e, t) {
	for (let n in t) {
		let r = t[n], i = e[n];
		if (typeof r == "string") {
			if (r !== i) return !1;
		} else if (!pm(i) || i.length !== r.length || r.some((e, t) => e.valueOf() !== i[t].valueOf())) return !1;
	}
	return !0;
}
function Em(e) {
	return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
var Dm = (e, t, n) => e ?? t ?? n, Om = /* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	(function(n, r) {
		typeof e == "object" && typeof t == "object" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : typeof e == "object" ? e.feather = r() : n.feather = r();
	})(typeof self < "u" ? self : e, function() {
		return (function(e) {
			var t = {};
			function n(r) {
				if (t[r]) return t[r].exports;
				var i = t[r] = {
					i: r,
					l: !1,
					exports: {}
				};
				return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
			}
			return n.m = e, n.c = t, n.d = function(e, t, r) {
				n.o(e, t) || Object.defineProperty(e, t, {
					configurable: !1,
					enumerable: !0,
					get: r
				});
			}, n.r = function(e) {
				Object.defineProperty(e, "__esModule", { value: !0 });
			}, n.n = function(e) {
				var t = e && e.__esModule ? function() {
					return e.default;
				} : function() {
					return e;
				};
				return n.d(t, "a", t), t;
			}, n.o = function(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t);
			}, n.p = "", n(n.s = 0);
		})({
			"./dist/icons.json": (function(e) {
				e.exports = {
					activity: "<polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"></polyline>",
					airplay: "<path d=\"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1\"></path><polygon points=\"12 15 17 21 7 21 12 15\"></polygon>",
					"alert-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"></line>",
					"alert-octagon": "<polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"></line>",
					"alert-triangle": "<path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"></line><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line>",
					"align-center": "<line x1=\"18\" y1=\"10\" x2=\"6\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"18\" y1=\"18\" x2=\"6\" y2=\"18\"></line>",
					"align-justify": "<line x1=\"21\" y1=\"10\" x2=\"3\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"21\" y1=\"18\" x2=\"3\" y2=\"18\"></line>",
					"align-left": "<line x1=\"17\" y1=\"10\" x2=\"3\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"17\" y1=\"18\" x2=\"3\" y2=\"18\"></line>",
					"align-right": "<line x1=\"21\" y1=\"10\" x2=\"7\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"21\" y1=\"18\" x2=\"7\" y2=\"18\"></line>",
					anchor: "<circle cx=\"12\" cy=\"5\" r=\"3\"></circle><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"8\"></line><path d=\"M5 12H2a10 10 0 0 0 20 0h-3\"></path>",
					aperture: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"14.31\" y1=\"8\" x2=\"20.05\" y2=\"17.94\"></line><line x1=\"9.69\" y1=\"8\" x2=\"21.17\" y2=\"8\"></line><line x1=\"7.38\" y1=\"12\" x2=\"13.12\" y2=\"2.06\"></line><line x1=\"9.69\" y1=\"16\" x2=\"3.95\" y2=\"6.06\"></line><line x1=\"14.31\" y1=\"16\" x2=\"2.83\" y2=\"16\"></line><line x1=\"16.62\" y1=\"12\" x2=\"10.88\" y2=\"21.94\"></line>",
					archive: "<polyline points=\"21 8 21 21 3 21 3 8\"></polyline><rect x=\"1\" y=\"3\" width=\"22\" height=\"5\"></rect><line x1=\"10\" y1=\"12\" x2=\"14\" y2=\"12\"></line>",
					"arrow-down-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"8 12 12 16 16 12\"></polyline><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line>",
					"arrow-down-left": "<line x1=\"17\" y1=\"7\" x2=\"7\" y2=\"17\"></line><polyline points=\"17 17 7 17 7 7\"></polyline>",
					"arrow-down-right": "<line x1=\"7\" y1=\"7\" x2=\"17\" y2=\"17\"></line><polyline points=\"17 7 17 17 7 17\"></polyline>",
					"arrow-down": "<line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line><polyline points=\"19 12 12 19 5 12\"></polyline>",
					"arrow-left-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 8 8 12 12 16\"></polyline><line x1=\"16\" y1=\"12\" x2=\"8\" y2=\"12\"></line>",
					"arrow-left": "<line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"></line><polyline points=\"12 19 5 12 12 5\"></polyline>",
					"arrow-right-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 16 16 12 12 8\"></polyline><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>",
					"arrow-right": "<line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><polyline points=\"12 5 19 12 12 19\"></polyline>",
					"arrow-up-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"16 12 12 8 8 12\"></polyline><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"8\"></line>",
					"arrow-up-left": "<line x1=\"17\" y1=\"17\" x2=\"7\" y2=\"7\"></line><polyline points=\"7 17 7 7 17 7\"></polyline>",
					"arrow-up-right": "<line x1=\"7\" y1=\"17\" x2=\"17\" y2=\"7\"></line><polyline points=\"7 7 17 7 17 17\"></polyline>",
					"arrow-up": "<line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"5\"></line><polyline points=\"5 12 12 5 19 12\"></polyline>",
					"at-sign": "<circle cx=\"12\" cy=\"12\" r=\"4\"></circle><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94\"></path>",
					award: "<circle cx=\"12\" cy=\"8\" r=\"7\"></circle><polyline points=\"8.21 13.89 7 23 12 20 17 23 15.79 13.88\"></polyline>",
					"bar-chart-2": "<line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"></line><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"></line><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"></line>",
					"bar-chart": "<line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"10\"></line><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"4\"></line><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"16\"></line>",
					"battery-charging": "<path d=\"M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19\"></path><line x1=\"23\" y1=\"13\" x2=\"23\" y2=\"11\"></line><polyline points=\"11 6 7 12 13 12 9 18\"></polyline>",
					battery: "<rect x=\"1\" y=\"6\" width=\"18\" height=\"12\" rx=\"2\" ry=\"2\"></rect><line x1=\"23\" y1=\"13\" x2=\"23\" y2=\"11\"></line>",
					"bell-off": "<path d=\"M13.73 21a2 2 0 0 1-3.46 0\"></path><path d=\"M18.63 13A17.89 17.89 0 0 1 18 8\"></path><path d=\"M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14\"></path><path d=\"M18 8a6 6 0 0 0-9.33-5\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>",
					bell: "<path d=\"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9\"></path><path d=\"M13.73 21a2 2 0 0 1-3.46 0\"></path>",
					bluetooth: "<polyline points=\"6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5\"></polyline>",
					bold: "<path d=\"M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z\"></path><path d=\"M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z\"></path>",
					"book-open": "<path d=\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\"></path><path d=\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\"></path>",
					book: "<path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"></path><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"></path>",
					bookmark: "<path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"></path>",
					box: "<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"></polyline><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"></line>",
					briefcase: "<rect x=\"2\" y=\"7\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"></rect><path d=\"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"></path>",
					calendar: "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>",
					"camera-off": "<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line><path d=\"M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56\"></path>",
					camera: "<path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z\"></path><circle cx=\"12\" cy=\"13\" r=\"4\"></circle>",
					cast: "<path d=\"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6\"></path><line x1=\"2\" y1=\"20\" x2=\"2.01\" y2=\"20\"></line>",
					"check-circle": "<path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"></path><polyline points=\"22 4 12 14.01 9 11.01\"></polyline>",
					"check-square": "<polyline points=\"9 11 12 14 22 4\"></polyline><path d=\"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11\"></path>",
					check: "<polyline points=\"20 6 9 17 4 12\"></polyline>",
					"chevron-down": "<polyline points=\"6 9 12 15 18 9\"></polyline>",
					"chevron-left": "<polyline points=\"15 18 9 12 15 6\"></polyline>",
					"chevron-right": "<polyline points=\"9 18 15 12 9 6\"></polyline>",
					"chevron-up": "<polyline points=\"18 15 12 9 6 15\"></polyline>",
					"chevrons-down": "<polyline points=\"7 13 12 18 17 13\"></polyline><polyline points=\"7 6 12 11 17 6\"></polyline>",
					"chevrons-left": "<polyline points=\"11 17 6 12 11 7\"></polyline><polyline points=\"18 17 13 12 18 7\"></polyline>",
					"chevrons-right": "<polyline points=\"13 17 18 12 13 7\"></polyline><polyline points=\"6 17 11 12 6 7\"></polyline>",
					"chevrons-up": "<polyline points=\"17 11 12 6 7 11\"></polyline><polyline points=\"17 18 12 13 7 18\"></polyline>",
					chrome: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"21.17\" y1=\"8\" x2=\"12\" y2=\"8\"></line><line x1=\"3.95\" y1=\"6.06\" x2=\"8.54\" y2=\"14\"></line><line x1=\"10.88\" y1=\"21.94\" x2=\"15.46\" y2=\"14\"></line>",
					circle: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>",
					clipboard: "<path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"></path><rect x=\"8\" y=\"2\" width=\"8\" height=\"4\" rx=\"1\" ry=\"1\"></rect>",
					clock: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 6 12 12 16 14\"></polyline>",
					"cloud-drizzle": "<line x1=\"8\" y1=\"19\" x2=\"8\" y2=\"21\"></line><line x1=\"8\" y1=\"13\" x2=\"8\" y2=\"15\"></line><line x1=\"16\" y1=\"19\" x2=\"16\" y2=\"21\"></line><line x1=\"16\" y1=\"13\" x2=\"16\" y2=\"15\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"17\"></line><path d=\"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25\"></path>",
					"cloud-lightning": "<path d=\"M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9\"></path><polyline points=\"13 11 9 17 15 17 11 23\"></polyline>",
					"cloud-off": "<path d=\"M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>",
					"cloud-rain": "<line x1=\"16\" y1=\"13\" x2=\"16\" y2=\"21\"></line><line x1=\"8\" y1=\"13\" x2=\"8\" y2=\"21\"></line><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"23\"></line><path d=\"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25\"></path>",
					"cloud-snow": "<path d=\"M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25\"></path><line x1=\"8\" y1=\"16\" x2=\"8.01\" y2=\"16\"></line><line x1=\"8\" y1=\"20\" x2=\"8.01\" y2=\"20\"></line><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"></line><line x1=\"12\" y1=\"22\" x2=\"12.01\" y2=\"22\"></line><line x1=\"16\" y1=\"16\" x2=\"16.01\" y2=\"16\"></line><line x1=\"16\" y1=\"20\" x2=\"16.01\" y2=\"20\"></line>",
					cloud: "<path d=\"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z\"></path>",
					code: "<polyline points=\"16 18 22 12 16 6\"></polyline><polyline points=\"8 6 2 12 8 18\"></polyline>",
					codepen: "<polygon points=\"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2\"></polygon><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"15.5\"></line><polyline points=\"22 8.5 12 15.5 2 8.5\"></polyline><polyline points=\"2 15.5 12 8.5 22 15.5\"></polyline><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"8.5\"></line>",
					codesandbox: "<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path><polyline points=\"7.5 4.21 12 6.81 16.5 4.21\"></polyline><polyline points=\"7.5 19.79 7.5 14.6 3 12\"></polyline><polyline points=\"21 12 16.5 14.6 16.5 19.79\"></polyline><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"></polyline><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"></line>",
					coffee: "<path d=\"M18 8h1a4 4 0 0 1 0 8h-1\"></path><path d=\"M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z\"></path><line x1=\"6\" y1=\"1\" x2=\"6\" y2=\"4\"></line><line x1=\"10\" y1=\"1\" x2=\"10\" y2=\"4\"></line><line x1=\"14\" y1=\"1\" x2=\"14\" y2=\"4\"></line>",
					columns: "<path d=\"M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18\"></path>",
					command: "<path d=\"M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z\"></path>",
					compass: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"></polygon>",
					copy: "<rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>",
					"corner-down-left": "<polyline points=\"9 10 4 15 9 20\"></polyline><path d=\"M20 4v7a4 4 0 0 1-4 4H4\"></path>",
					"corner-down-right": "<polyline points=\"15 10 20 15 15 20\"></polyline><path d=\"M4 4v7a4 4 0 0 0 4 4h12\"></path>",
					"corner-left-down": "<polyline points=\"14 15 9 20 4 15\"></polyline><path d=\"M20 4h-7a4 4 0 0 0-4 4v12\"></path>",
					"corner-left-up": "<polyline points=\"14 9 9 4 4 9\"></polyline><path d=\"M20 20h-7a4 4 0 0 1-4-4V4\"></path>",
					"corner-right-down": "<polyline points=\"10 15 15 20 20 15\"></polyline><path d=\"M4 4h7a4 4 0 0 1 4 4v12\"></path>",
					"corner-right-up": "<polyline points=\"10 9 15 4 20 9\"></polyline><path d=\"M4 20h7a4 4 0 0 0 4-4V4\"></path>",
					"corner-up-left": "<polyline points=\"9 14 4 9 9 4\"></polyline><path d=\"M20 20v-7a4 4 0 0 0-4-4H4\"></path>",
					"corner-up-right": "<polyline points=\"15 14 20 9 15 4\"></polyline><path d=\"M4 20v-7a4 4 0 0 1 4-4h12\"></path>",
					cpu: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\" ry=\"2\"></rect><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"></rect><line x1=\"9\" y1=\"1\" x2=\"9\" y2=\"4\"></line><line x1=\"15\" y1=\"1\" x2=\"15\" y2=\"4\"></line><line x1=\"9\" y1=\"20\" x2=\"9\" y2=\"23\"></line><line x1=\"15\" y1=\"20\" x2=\"15\" y2=\"23\"></line><line x1=\"20\" y1=\"9\" x2=\"23\" y2=\"9\"></line><line x1=\"20\" y1=\"14\" x2=\"23\" y2=\"14\"></line><line x1=\"1\" y1=\"9\" x2=\"4\" y2=\"9\"></line><line x1=\"1\" y1=\"14\" x2=\"4\" y2=\"14\"></line>",
					"credit-card": "<rect x=\"1\" y=\"4\" width=\"22\" height=\"16\" rx=\"2\" ry=\"2\"></rect><line x1=\"1\" y1=\"10\" x2=\"23\" y2=\"10\"></line>",
					crop: "<path d=\"M6.13 1L6 16a2 2 0 0 0 2 2h15\"></path><path d=\"M1 6.13L16 6a2 2 0 0 1 2 2v15\"></path>",
					crosshair: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"22\" y1=\"12\" x2=\"18\" y2=\"12\"></line><line x1=\"6\" y1=\"12\" x2=\"2\" y2=\"12\"></line><line x1=\"12\" y1=\"6\" x2=\"12\" y2=\"2\"></line><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"18\"></line>",
					database: "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"></ellipse><path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\"></path><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\"></path>",
					delete: "<path d=\"M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z\"></path><line x1=\"18\" y1=\"9\" x2=\"12\" y2=\"15\"></line><line x1=\"12\" y1=\"9\" x2=\"18\" y2=\"15\"></line>",
					disc: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>",
					"divide-circle": "<line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"16\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line><circle cx=\"12\" cy=\"12\" r=\"10\"></circle>",
					"divide-square": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"16\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line>",
					divide: "<circle cx=\"12\" cy=\"6\" r=\"2\"></circle><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><circle cx=\"12\" cy=\"18\" r=\"2\"></circle>",
					"dollar-sign": "<line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"23\"></line><path d=\"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"></path>",
					"download-cloud": "<polyline points=\"8 17 12 21 16 17\"></polyline><line x1=\"12\" y1=\"12\" x2=\"12\" y2=\"21\"></line><path d=\"M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29\"></path>",
					download: "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"7 10 12 15 17 10\"></polyline><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"></line>",
					dribbble: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32\"></path>",
					droplet: "<path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"></path>",
					"edit-2": "<path d=\"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z\"></path>",
					"edit-3": "<path d=\"M12 20h9\"></path><path d=\"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z\"></path>",
					edit: "<path d=\"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"></path><path d=\"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\"></path>",
					"external-link": "<path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path><polyline points=\"15 3 21 3 21 9\"></polyline><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line>",
					"eye-off": "<path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>",
					eye: "<path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>",
					facebook: "<path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\"></path>",
					"fast-forward": "<polygon points=\"13 19 22 12 13 5 13 19\"></polygon><polygon points=\"2 19 11 12 2 5 2 19\"></polygon>",
					feather: "<path d=\"M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z\"></path><line x1=\"16\" y1=\"8\" x2=\"2\" y2=\"22\"></line><line x1=\"17.5\" y1=\"15\" x2=\"9\" y2=\"15\"></line>",
					figma: "<path d=\"M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z\"></path><path d=\"M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z\"></path><path d=\"M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z\"></path><path d=\"M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z\"></path><path d=\"M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z\"></path>",
					"file-minus": "<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"9\" y1=\"15\" x2=\"15\" y2=\"15\"></line>",
					"file-plus": "<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"12\"></line><line x1=\"9\" y1=\"15\" x2=\"15\" y2=\"15\"></line>",
					"file-text": "<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"></line><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"></line><polyline points=\"10 9 9 9 8 9\"></polyline>",
					file: "<path d=\"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z\"></path><polyline points=\"13 2 13 9 20 9\"></polyline>",
					film: "<rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"2.18\" ry=\"2.18\"></rect><line x1=\"7\" y1=\"2\" x2=\"7\" y2=\"22\"></line><line x1=\"17\" y1=\"2\" x2=\"17\" y2=\"22\"></line><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><line x1=\"2\" y1=\"7\" x2=\"7\" y2=\"7\"></line><line x1=\"2\" y1=\"17\" x2=\"7\" y2=\"17\"></line><line x1=\"17\" y1=\"17\" x2=\"22\" y2=\"17\"></line><line x1=\"17\" y1=\"7\" x2=\"22\" y2=\"7\"></line>",
					filter: "<polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"></polygon>",
					flag: "<path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\"></path><line x1=\"4\" y1=\"22\" x2=\"4\" y2=\"15\"></line>",
					"folder-minus": "<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path><line x1=\"9\" y1=\"14\" x2=\"15\" y2=\"14\"></line>",
					"folder-plus": "<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path><line x1=\"12\" y1=\"11\" x2=\"12\" y2=\"17\"></line><line x1=\"9\" y1=\"14\" x2=\"15\" y2=\"14\"></line>",
					folder: "<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>",
					framer: "<path d=\"M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7\"></path>",
					frown: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M16 16s-1.5-2-4-2-4 2-4 2\"></path><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>",
					gift: "<polyline points=\"20 12 20 22 4 22 4 12\"></polyline><rect x=\"2\" y=\"7\" width=\"20\" height=\"5\"></rect><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"7\"></line><path d=\"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z\"></path><path d=\"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z\"></path>",
					"git-branch": "<line x1=\"6\" y1=\"3\" x2=\"6\" y2=\"15\"></line><circle cx=\"18\" cy=\"6\" r=\"3\"></circle><circle cx=\"6\" cy=\"18\" r=\"3\"></circle><path d=\"M18 9a9 9 0 0 1-9 9\"></path>",
					"git-commit": "<circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"1.05\" y1=\"12\" x2=\"7\" y2=\"12\"></line><line x1=\"17.01\" y1=\"12\" x2=\"22.96\" y2=\"12\"></line>",
					"git-merge": "<circle cx=\"18\" cy=\"18\" r=\"3\"></circle><circle cx=\"6\" cy=\"6\" r=\"3\"></circle><path d=\"M6 21V9a9 9 0 0 0 9 9\"></path>",
					"git-pull-request": "<circle cx=\"18\" cy=\"18\" r=\"3\"></circle><circle cx=\"6\" cy=\"6\" r=\"3\"></circle><path d=\"M13 6h3a2 2 0 0 1 2 2v7\"></path><line x1=\"6\" y1=\"9\" x2=\"6\" y2=\"21\"></line>",
					github: "<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>",
					gitlab: "<path d=\"M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z\"></path>",
					globe: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><path d=\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"></path>",
					grid: "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"></rect>",
					"hard-drive": "<line x1=\"22\" y1=\"12\" x2=\"2\" y2=\"12\"></line><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path><line x1=\"6\" y1=\"16\" x2=\"6.01\" y2=\"16\"></line><line x1=\"10\" y1=\"16\" x2=\"10.01\" y2=\"16\"></line>",
					hash: "<line x1=\"4\" y1=\"9\" x2=\"20\" y2=\"9\"></line><line x1=\"4\" y1=\"15\" x2=\"20\" y2=\"15\"></line><line x1=\"10\" y1=\"3\" x2=\"8\" y2=\"21\"></line><line x1=\"16\" y1=\"3\" x2=\"14\" y2=\"21\"></line>",
					headphones: "<path d=\"M3 18v-6a9 9 0 0 1 18 0v6\"></path><path d=\"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z\"></path>",
					heart: "<path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"></path>",
					"help-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"></path><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line>",
					hexagon: "<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path>",
					home: "<path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path><polyline points=\"9 22 9 12 15 12 15 22\"></polyline>",
					image: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"></circle><polyline points=\"21 15 16 10 5 21\"></polyline>",
					inbox: "<polyline points=\"22 12 16 12 14 15 10 15 8 12 2 12\"></polyline><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path>",
					info: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line>",
					instagram: "<rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\" ry=\"5\"></rect><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"></path><line x1=\"17.5\" y1=\"6.5\" x2=\"17.51\" y2=\"6.5\"></line>",
					italic: "<line x1=\"19\" y1=\"4\" x2=\"10\" y2=\"4\"></line><line x1=\"14\" y1=\"20\" x2=\"5\" y2=\"20\"></line><line x1=\"15\" y1=\"4\" x2=\"9\" y2=\"20\"></line>",
					key: "<path d=\"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4\"></path>",
					layers: "<polygon points=\"12 2 2 7 12 12 22 7 12 2\"></polygon><polyline points=\"2 17 12 22 22 17\"></polyline><polyline points=\"2 12 12 17 22 12\"></polyline>",
					layout: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"></line><line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"></line>",
					"life-buoy": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"4.93\" y1=\"4.93\" x2=\"9.17\" y2=\"9.17\"></line><line x1=\"14.83\" y1=\"14.83\" x2=\"19.07\" y2=\"19.07\"></line><line x1=\"14.83\" y1=\"9.17\" x2=\"19.07\" y2=\"4.93\"></line><line x1=\"14.83\" y1=\"9.17\" x2=\"18.36\" y2=\"5.64\"></line><line x1=\"4.93\" y1=\"19.07\" x2=\"9.17\" y2=\"14.83\"></line>",
					"link-2": "<path d=\"M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3\"></path><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>",
					link: "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"></path>",
					linkedin: "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>",
					list: "<line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"></line><line x1=\"3\" y1=\"6\" x2=\"3.01\" y2=\"6\"></line><line x1=\"3\" y1=\"12\" x2=\"3.01\" y2=\"12\"></line><line x1=\"3\" y1=\"18\" x2=\"3.01\" y2=\"18\"></line>",
					loader: "<line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"6\"></line><line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"22\"></line><line x1=\"4.93\" y1=\"4.93\" x2=\"7.76\" y2=\"7.76\"></line><line x1=\"16.24\" y1=\"16.24\" x2=\"19.07\" y2=\"19.07\"></line><line x1=\"2\" y1=\"12\" x2=\"6\" y2=\"12\"></line><line x1=\"18\" y1=\"12\" x2=\"22\" y2=\"12\"></line><line x1=\"4.93\" y1=\"19.07\" x2=\"7.76\" y2=\"16.24\"></line><line x1=\"16.24\" y1=\"7.76\" x2=\"19.07\" y2=\"4.93\"></line>",
					lock: "<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path>",
					"log-in": "<path d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\"></path><polyline points=\"10 17 15 12 10 7\"></polyline><line x1=\"15\" y1=\"12\" x2=\"3\" y2=\"12\"></line>",
					"log-out": "<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"></path><polyline points=\"16 17 21 12 16 7\"></polyline><line x1=\"21\" y1=\"12\" x2=\"9\" y2=\"12\"></line>",
					mail: "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>",
					"map-pin": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>",
					map: "<polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"></polygon><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"></line><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"></line>",
					"maximize-2": "<polyline points=\"15 3 21 3 21 9\"></polyline><polyline points=\"9 21 3 21 3 15\"></polyline><line x1=\"21\" y1=\"3\" x2=\"14\" y2=\"10\"></line><line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"></line>",
					maximize: "<path d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3\"></path>",
					meh: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"8\" y1=\"15\" x2=\"16\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>",
					menu: "<line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line>",
					"message-circle": "<path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z\"></path>",
					"message-square": "<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path>",
					"mic-off": "<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line><path d=\"M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6\"></path><path d=\"M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23\"></path><line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line><line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>",
					mic: "<path d=\"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z\"></path><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"></path><line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line><line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>",
					"minimize-2": "<polyline points=\"4 14 10 14 10 20\"></polyline><polyline points=\"20 10 14 10 14 4\"></polyline><line x1=\"14\" y1=\"10\" x2=\"21\" y2=\"3\"></line><line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"></line>",
					minimize: "<path d=\"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3\"></path>",
					"minus-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>",
					"minus-square": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>",
					minus: "<line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>",
					monitor: "<rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"></rect><line x1=\"8\" y1=\"21\" x2=\"16\" y2=\"21\"></line><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"></line>",
					moon: "<path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"></path>",
					"more-horizontal": "<circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"19\" cy=\"12\" r=\"1\"></circle><circle cx=\"5\" cy=\"12\" r=\"1\"></circle>",
					"more-vertical": "<circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"12\" cy=\"5\" r=\"1\"></circle><circle cx=\"12\" cy=\"19\" r=\"1\"></circle>",
					"mouse-pointer": "<path d=\"M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z\"></path><path d=\"M13 13l6 6\"></path>",
					move: "<polyline points=\"5 9 2 12 5 15\"></polyline><polyline points=\"9 5 12 2 15 5\"></polyline><polyline points=\"15 19 12 22 9 19\"></polyline><polyline points=\"19 9 22 12 19 15\"></polyline><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"></line>",
					music: "<path d=\"M9 18V5l12-2v13\"></path><circle cx=\"6\" cy=\"18\" r=\"3\"></circle><circle cx=\"18\" cy=\"16\" r=\"3\"></circle>",
					"navigation-2": "<polygon points=\"12 2 19 21 12 17 5 21 12 2\"></polygon>",
					navigation: "<polygon points=\"3 11 22 2 13 21 11 13 3 11\"></polygon>",
					octagon: "<polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon>",
					package: "<line x1=\"16.5\" y1=\"9.4\" x2=\"7.5\" y2=\"4.21\"></line><path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"></polyline><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"></line>",
					paperclip: "<path d=\"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48\"></path>",
					"pause-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"10\" y1=\"15\" x2=\"10\" y2=\"9\"></line><line x1=\"14\" y1=\"15\" x2=\"14\" y2=\"9\"></line>",
					pause: "<rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect>",
					"pen-tool": "<path d=\"M12 19l7-7 3 3-7 7-3-3z\"></path><path d=\"M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z\"></path><path d=\"M2 2l7.586 7.586\"></path><circle cx=\"11\" cy=\"11\" r=\"2\"></circle>",
					percent: "<line x1=\"19\" y1=\"5\" x2=\"5\" y2=\"19\"></line><circle cx=\"6.5\" cy=\"6.5\" r=\"2.5\"></circle><circle cx=\"17.5\" cy=\"17.5\" r=\"2.5\"></circle>",
					"phone-call": "<path d=\"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>",
					"phone-forwarded": "<polyline points=\"19 1 23 5 19 9\"></polyline><line x1=\"15\" y1=\"5\" x2=\"23\" y2=\"5\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>",
					"phone-incoming": "<polyline points=\"16 2 16 8 22 8\"></polyline><line x1=\"23\" y1=\"1\" x2=\"16\" y2=\"8\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>",
					"phone-missed": "<line x1=\"23\" y1=\"1\" x2=\"17\" y2=\"7\"></line><line x1=\"17\" y1=\"1\" x2=\"23\" y2=\"7\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>",
					"phone-off": "<path d=\"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91\"></path><line x1=\"23\" y1=\"1\" x2=\"1\" y2=\"23\"></line>",
					"phone-outgoing": "<polyline points=\"23 7 23 1 17 1\"></polyline><line x1=\"16\" y1=\"8\" x2=\"23\" y2=\"1\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>",
					phone: "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>",
					"pie-chart": "<path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\"></path><path d=\"M22 12A10 10 0 0 0 12 2v10z\"></path>",
					"play-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"10 8 16 12 10 16 10 8\"></polygon>",
					play: "<polygon points=\"5 3 19 12 5 21 5 3\"></polygon>",
					"plus-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>",
					"plus-square": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>",
					plus: "<line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>",
					pocket: "<path d=\"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z\"></path><polyline points=\"8 10 12 14 16 10\"></polyline>",
					power: "<path d=\"M18.36 6.64a9 9 0 1 1-12.73 0\"></path><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"12\"></line>",
					printer: "<polyline points=\"6 9 6 2 18 2 18 9\"></polyline><path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"></path><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\"></rect>",
					radio: "<circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14\"></path>",
					"refresh-ccw": "<polyline points=\"1 4 1 10 7 10\"></polyline><polyline points=\"23 20 23 14 17 14\"></polyline><path d=\"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15\"></path>",
					"refresh-cw": "<polyline points=\"23 4 23 10 17 10\"></polyline><polyline points=\"1 20 1 14 7 14\"></polyline><path d=\"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15\"></path>",
					repeat: "<polyline points=\"17 1 21 5 17 9\"></polyline><path d=\"M3 11V9a4 4 0 0 1 4-4h14\"></path><polyline points=\"7 23 3 19 7 15\"></polyline><path d=\"M21 13v2a4 4 0 0 1-4 4H3\"></path>",
					rewind: "<polygon points=\"11 19 2 12 11 5 11 19\"></polygon><polygon points=\"22 19 13 12 22 5 22 19\"></polygon>",
					"rotate-ccw": "<polyline points=\"1 4 1 10 7 10\"></polyline><path d=\"M3.51 15a9 9 0 1 0 2.13-9.36L1 10\"></path>",
					"rotate-cw": "<polyline points=\"23 4 23 10 17 10\"></polyline><path d=\"M20.49 15a9 9 0 1 1-2.12-9.36L23 10\"></path>",
					rss: "<path d=\"M4 11a9 9 0 0 1 9 9\"></path><path d=\"M4 4a16 16 0 0 1 16 16\"></path><circle cx=\"5\" cy=\"19\" r=\"1\"></circle>",
					save: "<path d=\"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z\"></path><polyline points=\"17 21 17 13 7 13 7 21\"></polyline><polyline points=\"7 3 7 8 15 8\"></polyline>",
					scissors: "<circle cx=\"6\" cy=\"6\" r=\"3\"></circle><circle cx=\"6\" cy=\"18\" r=\"3\"></circle><line x1=\"20\" y1=\"4\" x2=\"8.12\" y2=\"15.88\"></line><line x1=\"14.47\" y1=\"14.48\" x2=\"20\" y2=\"20\"></line><line x1=\"8.12\" y1=\"8.12\" x2=\"12\" y2=\"12\"></line>",
					search: "<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>",
					send: "<line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"13\"></line><polygon points=\"22 2 15 22 11 13 2 9 22 2\"></polygon>",
					server: "<rect x=\"2\" y=\"2\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"></rect><rect x=\"2\" y=\"14\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"></rect><line x1=\"6\" y1=\"6\" x2=\"6.01\" y2=\"6\"></line><line x1=\"6\" y1=\"18\" x2=\"6.01\" y2=\"18\"></line>",
					settings: "<circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>",
					"share-2": "<circle cx=\"18\" cy=\"5\" r=\"3\"></circle><circle cx=\"6\" cy=\"12\" r=\"3\"></circle><circle cx=\"18\" cy=\"19\" r=\"3\"></circle><line x1=\"8.59\" y1=\"13.51\" x2=\"15.42\" y2=\"17.49\"></line><line x1=\"15.41\" y1=\"6.51\" x2=\"8.59\" y2=\"10.49\"></line>",
					share: "<path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"></path><polyline points=\"16 6 12 2 8 6\"></polyline><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"15\"></line>",
					"shield-off": "<path d=\"M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18\"></path><path d=\"M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>",
					shield: "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path>",
					"shopping-bag": "<path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"></path><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><path d=\"M16 10a4 4 0 0 1-8 0\"></path>",
					"shopping-cart": "<circle cx=\"9\" cy=\"21\" r=\"1\"></circle><circle cx=\"20\" cy=\"21\" r=\"1\"></circle><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"></path>",
					shuffle: "<polyline points=\"16 3 21 3 21 8\"></polyline><line x1=\"4\" y1=\"20\" x2=\"21\" y2=\"3\"></line><polyline points=\"21 16 21 21 16 21\"></polyline><line x1=\"15\" y1=\"15\" x2=\"21\" y2=\"21\"></line><line x1=\"4\" y1=\"4\" x2=\"9\" y2=\"9\"></line>",
					sidebar: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"9\" y1=\"3\" x2=\"9\" y2=\"21\"></line>",
					"skip-back": "<polygon points=\"19 20 9 12 19 4 19 20\"></polygon><line x1=\"5\" y1=\"19\" x2=\"5\" y2=\"5\"></line>",
					"skip-forward": "<polygon points=\"5 4 15 12 5 20 5 4\"></polygon><line x1=\"19\" y1=\"5\" x2=\"19\" y2=\"19\"></line>",
					slack: "<path d=\"M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z\"></path><path d=\"M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"></path><path d=\"M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z\"></path><path d=\"M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z\"></path><path d=\"M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z\"></path><path d=\"M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z\"></path><path d=\"M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z\"></path><path d=\"M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z\"></path>",
					slash: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"></line>",
					sliders: "<line x1=\"4\" y1=\"21\" x2=\"4\" y2=\"14\"></line><line x1=\"4\" y1=\"10\" x2=\"4\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"3\"></line><line x1=\"20\" y1=\"21\" x2=\"20\" y2=\"16\"></line><line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"3\"></line><line x1=\"1\" y1=\"14\" x2=\"7\" y2=\"14\"></line><line x1=\"9\" y1=\"8\" x2=\"15\" y2=\"8\"></line><line x1=\"17\" y1=\"16\" x2=\"23\" y2=\"16\"></line>",
					smartphone: "<rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" ry=\"2\"></rect><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"></line>",
					smile: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M8 14s1.5 2 4 2 4-2 4-2\"></path><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>",
					speaker: "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" ry=\"2\"></rect><circle cx=\"12\" cy=\"14\" r=\"4\"></circle><line x1=\"12\" y1=\"6\" x2=\"12.01\" y2=\"6\"></line>",
					square: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>",
					star: "<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon>",
					"stop-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"></rect>",
					sun: "<circle cx=\"12\" cy=\"12\" r=\"5\"></circle><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line><line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"></line><line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"></line><line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"></line><line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"></line><line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"></line><line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"></line>",
					sunrise: "<path d=\"M17 18a5 5 0 0 0-10 0\"></path><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"9\"></line><line x1=\"4.22\" y1=\"10.22\" x2=\"5.64\" y2=\"11.64\"></line><line x1=\"1\" y1=\"18\" x2=\"3\" y2=\"18\"></line><line x1=\"21\" y1=\"18\" x2=\"23\" y2=\"18\"></line><line x1=\"18.36\" y1=\"11.64\" x2=\"19.78\" y2=\"10.22\"></line><line x1=\"23\" y1=\"22\" x2=\"1\" y2=\"22\"></line><polyline points=\"8 6 12 2 16 6\"></polyline>",
					sunset: "<path d=\"M17 18a5 5 0 0 0-10 0\"></path><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"2\"></line><line x1=\"4.22\" y1=\"10.22\" x2=\"5.64\" y2=\"11.64\"></line><line x1=\"1\" y1=\"18\" x2=\"3\" y2=\"18\"></line><line x1=\"21\" y1=\"18\" x2=\"23\" y2=\"18\"></line><line x1=\"18.36\" y1=\"11.64\" x2=\"19.78\" y2=\"10.22\"></line><line x1=\"23\" y1=\"22\" x2=\"1\" y2=\"22\"></line><polyline points=\"16 5 12 9 8 5\"></polyline>",
					table: "<path d=\"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18\"></path>",
					tablet: "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" ry=\"2\"></rect><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"></line>",
					tag: "<path d=\"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z\"></path><line x1=\"7\" y1=\"7\" x2=\"7.01\" y2=\"7\"></line>",
					target: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"6\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle>",
					terminal: "<polyline points=\"4 17 10 11 4 5\"></polyline><line x1=\"12\" y1=\"19\" x2=\"20\" y2=\"19\"></line>",
					thermometer: "<path d=\"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z\"></path>",
					"thumbs-down": "<path d=\"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17\"></path>",
					"thumbs-up": "<path d=\"M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3\"></path>",
					"toggle-left": "<rect x=\"1\" y=\"5\" width=\"22\" height=\"14\" rx=\"7\" ry=\"7\"></rect><circle cx=\"8\" cy=\"12\" r=\"3\"></circle>",
					"toggle-right": "<rect x=\"1\" y=\"5\" width=\"22\" height=\"14\" rx=\"7\" ry=\"7\"></rect><circle cx=\"16\" cy=\"12\" r=\"3\"></circle>",
					tool: "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"></path>",
					"trash-2": "<polyline points=\"3 6 5 6 21 6\"></polyline><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path><line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"></line><line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"></line>",
					trash: "<polyline points=\"3 6 5 6 21 6\"></polyline><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>",
					trello: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><rect x=\"7\" y=\"7\" width=\"3\" height=\"9\"></rect><rect x=\"14\" y=\"7\" width=\"3\" height=\"5\"></rect>",
					"trending-down": "<polyline points=\"23 18 13.5 8.5 8.5 13.5 1 6\"></polyline><polyline points=\"17 18 23 18 23 12\"></polyline>",
					"trending-up": "<polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"></polyline><polyline points=\"17 6 23 6 23 12\"></polyline>",
					triangle: "<path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path>",
					truck: "<rect x=\"1\" y=\"3\" width=\"15\" height=\"13\"></rect><polygon points=\"16 8 20 8 23 11 23 16 16 16 16 8\"></polygon><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"></circle><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"></circle>",
					tv: "<rect x=\"2\" y=\"7\" width=\"20\" height=\"15\" rx=\"2\" ry=\"2\"></rect><polyline points=\"17 2 12 7 7 2\"></polyline>",
					twitch: "<path d=\"M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7\"></path>",
					twitter: "<path d=\"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z\"></path>",
					type: "<polyline points=\"4 7 4 4 20 4 20 7\"></polyline><line x1=\"9\" y1=\"20\" x2=\"15\" y2=\"20\"></line><line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"20\"></line>",
					umbrella: "<path d=\"M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7\"></path>",
					underline: "<path d=\"M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3\"></path><line x1=\"4\" y1=\"21\" x2=\"20\" y2=\"21\"></line>",
					unlock: "<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 9.9-1\"></path>",
					"upload-cloud": "<polyline points=\"16 16 12 12 8 16\"></polyline><line x1=\"12\" y1=\"12\" x2=\"12\" y2=\"21\"></line><path d=\"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3\"></path><polyline points=\"16 16 12 12 8 16\"></polyline>",
					upload: "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"17 8 12 3 7 8\"></polyline><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"15\"></line>",
					"user-check": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><polyline points=\"17 11 19 13 23 9\"></polyline>",
					"user-minus": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><line x1=\"23\" y1=\"11\" x2=\"17\" y2=\"11\"></line>",
					"user-plus": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><line x1=\"20\" y1=\"8\" x2=\"20\" y2=\"14\"></line><line x1=\"23\" y1=\"11\" x2=\"17\" y2=\"11\"></line>",
					"user-x": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><line x1=\"18\" y1=\"8\" x2=\"23\" y2=\"13\"></line><line x1=\"23\" y1=\"8\" x2=\"18\" y2=\"13\"></line>",
					user: "<path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path><circle cx=\"12\" cy=\"7\" r=\"4\"></circle>",
					users: "<path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>",
					"video-off": "<path d=\"M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>",
					video: "<polygon points=\"23 7 16 12 23 17 23 7\"></polygon><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" ry=\"2\"></rect>",
					voicemail: "<circle cx=\"5.5\" cy=\"11.5\" r=\"4.5\"></circle><circle cx=\"18.5\" cy=\"11.5\" r=\"4.5\"></circle><line x1=\"5.5\" y1=\"16\" x2=\"18.5\" y2=\"16\"></line>",
					"volume-1": "<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"></path>",
					"volume-2": "<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><path d=\"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07\"></path>",
					"volume-x": "<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><line x1=\"23\" y1=\"9\" x2=\"17\" y2=\"15\"></line><line x1=\"17\" y1=\"9\" x2=\"23\" y2=\"15\"></line>",
					volume: "<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>",
					watch: "<circle cx=\"12\" cy=\"12\" r=\"7\"></circle><polyline points=\"12 9 12 12 13.5 13.5\"></polyline><path d=\"M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83\"></path>",
					"wifi-off": "<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line><path d=\"M16.72 11.06A10.94 10.94 0 0 1 19 12.55\"></path><path d=\"M5 12.55a10.94 10.94 0 0 1 5.17-2.39\"></path><path d=\"M10.71 5.05A16 16 0 0 1 22.58 9\"></path><path d=\"M1.42 9a15.91 15.91 0 0 1 4.7-2.88\"></path><path d=\"M8.53 16.11a6 6 0 0 1 6.95 0\"></path><line x1=\"12\" y1=\"20\" x2=\"12.01\" y2=\"20\"></line>",
					wifi: "<path d=\"M5 12.55a11 11 0 0 1 14.08 0\"></path><path d=\"M1.42 9a16 16 0 0 1 21.16 0\"></path><path d=\"M8.53 16.11a6 6 0 0 1 6.95 0\"></path><line x1=\"12\" y1=\"20\" x2=\"12.01\" y2=\"20\"></line>",
					wind: "<path d=\"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2\"></path>",
					"x-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line>",
					"x-octagon": "<polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line>",
					"x-square": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line>",
					x: "<line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>",
					youtube: "<path d=\"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z\"></path><polygon points=\"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02\"></polygon>",
					"zap-off": "<polyline points=\"12.41 6.75 13 2 10.57 4.92\"></polyline><polyline points=\"18.57 12.91 21 10 15.66 10\"></polyline><polyline points=\"8 8 3 14 12 14 11 22 16 16\"></polyline><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>",
					zap: "<polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"></polygon>",
					"zoom-in": "<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>",
					"zoom-out": "<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>"
				};
			}),
			"./node_modules/classnames/dedupe.js": (function(e, t, n) {
				var r, i;
				(function() {
					var n = (function() {
						function e() {}
						e.prototype = Object.create(null);
						function t(e, t) {
							for (var n = t.length, r = 0; r < n; ++r) s(e, t[r]);
						}
						var n = {}.hasOwnProperty;
						function r(e, t) {
							e[t] = !0;
						}
						function i(e, t) {
							for (var r in t) n.call(t, r) && (e[r] = !!t[r]);
						}
						var a = /\s+/;
						function o(e, t) {
							for (var n = t.split(a), r = n.length, i = 0; i < r; ++i) e[n[i]] = !0;
						}
						function s(e, n) {
							if (n) {
								var a = typeof n;
								a === "string" ? o(e, n) : Array.isArray(n) ? t(e, n) : a === "object" ? i(e, n) : a === "number" && r(e, n);
							}
						}
						function c() {
							var n = [...arguments], r = new e();
							t(r, n);
							var i = [];
							for (var a in r) r[a] && i.push(a);
							return i.join(" ");
						}
						return c;
					})();
					e !== void 0 && e.exports ? e.exports = n : (r = [], i = (function() {
						return n;
					}).apply(t, r), i !== void 0 && (e.exports = i));
				})();
			}),
			"./node_modules/core-js/es/array/from.js": (function(e, t, n) {
				n("./node_modules/core-js/modules/es.string.iterator.js"), n("./node_modules/core-js/modules/es.array.from.js"), e.exports = n("./node_modules/core-js/internals/path.js").Array.from;
			}),
			"./node_modules/core-js/internals/a-function.js": (function(e, t) {
				e.exports = function(e) {
					if (typeof e != "function") throw TypeError(String(e) + " is not a function");
					return e;
				};
			}),
			"./node_modules/core-js/internals/an-object.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/is-object.js");
				e.exports = function(e) {
					if (!r(e)) throw TypeError(String(e) + " is not an object");
					return e;
				};
			}),
			"./node_modules/core-js/internals/array-from.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/bind-context.js"), i = n("./node_modules/core-js/internals/to-object.js"), a = n("./node_modules/core-js/internals/call-with-safe-iteration-closing.js"), o = n("./node_modules/core-js/internals/is-array-iterator-method.js"), s = n("./node_modules/core-js/internals/to-length.js"), c = n("./node_modules/core-js/internals/create-property.js"), l = n("./node_modules/core-js/internals/get-iterator-method.js");
				e.exports = function(e) {
					var t = i(e), n = typeof this == "function" ? this : Array, u = arguments.length, d = u > 1 ? arguments[1] : void 0, f = d !== void 0, p = 0, m = l(t), h, g, _, v;
					if (f && (d = r(d, u > 2 ? arguments[2] : void 0, 2)), m != null && !(n == Array && o(m))) for (v = m.call(t), g = new n(); !(_ = v.next()).done; p++) c(g, p, f ? a(v, d, [_.value, p], !0) : _.value);
					else for (h = s(t.length), g = new n(h); h > p; p++) c(g, p, f ? d(t[p], p) : t[p]);
					return g.length = p, g;
				};
			}),
			"./node_modules/core-js/internals/array-includes.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/to-indexed-object.js"), i = n("./node_modules/core-js/internals/to-length.js"), a = n("./node_modules/core-js/internals/to-absolute-index.js");
				e.exports = function(e) {
					return function(t, n, o) {
						var s = r(t), c = i(s.length), l = a(o, c), u;
						if (e && n != n) {
							for (; c > l;) if (u = s[l++], u != u) return !0;
						} else for (; c > l; l++) if ((e || l in s) && s[l] === n) return e || l || 0;
						return !e && -1;
					};
				};
			}),
			"./node_modules/core-js/internals/bind-context.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/a-function.js");
				e.exports = function(e, t, n) {
					if (r(e), t === void 0) return e;
					switch (n) {
						case 0: return function() {
							return e.call(t);
						};
						case 1: return function(n) {
							return e.call(t, n);
						};
						case 2: return function(n, r) {
							return e.call(t, n, r);
						};
						case 3: return function(n, r, i) {
							return e.call(t, n, r, i);
						};
					}
					return function() {
						return e.apply(t, arguments);
					};
				};
			}),
			"./node_modules/core-js/internals/call-with-safe-iteration-closing.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/an-object.js");
				e.exports = function(e, t, n, i) {
					try {
						return i ? t(r(n)[0], n[1]) : t(n);
					} catch (t) {
						var a = e.return;
						throw a !== void 0 && r(a.call(e)), t;
					}
				};
			}),
			"./node_modules/core-js/internals/check-correctness-of-iteration.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/well-known-symbol.js")("iterator"), i = !1;
				try {
					var a = 0, o = {
						next: function() {
							return { done: !!a++ };
						},
						return: function() {
							i = !0;
						}
					};
					o[r] = function() {
						return this;
					}, Array.from(o, function() {
						throw 2;
					});
				} catch {}
				e.exports = function(e, t) {
					if (!t && !i) return !1;
					var n = !1;
					try {
						var a = {};
						a[r] = function() {
							return { next: function() {
								return { done: n = !0 };
							} };
						}, e(a);
					} catch {}
					return n;
				};
			}),
			"./node_modules/core-js/internals/classof-raw.js": (function(e, t) {
				var n = {}.toString;
				e.exports = function(e) {
					return n.call(e).slice(8, -1);
				};
			}),
			"./node_modules/core-js/internals/classof.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/classof-raw.js"), i = n("./node_modules/core-js/internals/well-known-symbol.js")("toStringTag"), a = r(function() {
					return arguments;
				}()) == "Arguments", o = function(e, t) {
					try {
						return e[t];
					} catch {}
				};
				e.exports = function(e) {
					var t, n, s;
					return e === void 0 ? "Undefined" : e === null ? "Null" : typeof (n = o(t = Object(e), i)) == "string" ? n : a ? r(t) : (s = r(t)) == "Object" && typeof t.callee == "function" ? "Arguments" : s;
				};
			}),
			"./node_modules/core-js/internals/copy-constructor-properties.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/has.js"), i = n("./node_modules/core-js/internals/own-keys.js"), a = n("./node_modules/core-js/internals/object-get-own-property-descriptor.js"), o = n("./node_modules/core-js/internals/object-define-property.js");
				e.exports = function(e, t) {
					for (var n = i(t), s = o.f, c = a.f, l = 0; l < n.length; l++) {
						var u = n[l];
						r(e, u) || s(e, u, c(t, u));
					}
				};
			}),
			"./node_modules/core-js/internals/correct-prototype-getter.js": (function(e, t, n) {
				e.exports = !n("./node_modules/core-js/internals/fails.js")(function() {
					function e() {}
					return e.prototype.constructor = null, Object.getPrototypeOf(new e()) !== e.prototype;
				});
			}),
			"./node_modules/core-js/internals/create-iterator-constructor.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/iterators-core.js").IteratorPrototype, i = n("./node_modules/core-js/internals/object-create.js"), a = n("./node_modules/core-js/internals/create-property-descriptor.js"), o = n("./node_modules/core-js/internals/set-to-string-tag.js"), s = n("./node_modules/core-js/internals/iterators.js"), c = function() {
					return this;
				};
				e.exports = function(e, t, n) {
					var l = t + " Iterator";
					return e.prototype = i(r, { next: a(1, n) }), o(e, l, !1, !0), s[l] = c, e;
				};
			}),
			"./node_modules/core-js/internals/create-property-descriptor.js": (function(e, t) {
				e.exports = function(e, t) {
					return {
						enumerable: !(e & 1),
						configurable: !(e & 2),
						writable: !(e & 4),
						value: t
					};
				};
			}),
			"./node_modules/core-js/internals/create-property.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/to-primitive.js"), i = n("./node_modules/core-js/internals/object-define-property.js"), a = n("./node_modules/core-js/internals/create-property-descriptor.js");
				e.exports = function(e, t, n) {
					var o = r(t);
					o in e ? i.f(e, o, a(0, n)) : e[o] = n;
				};
			}),
			"./node_modules/core-js/internals/define-iterator.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/export.js"), i = n("./node_modules/core-js/internals/create-iterator-constructor.js"), a = n("./node_modules/core-js/internals/object-get-prototype-of.js"), o = n("./node_modules/core-js/internals/object-set-prototype-of.js"), s = n("./node_modules/core-js/internals/set-to-string-tag.js"), c = n("./node_modules/core-js/internals/hide.js"), l = n("./node_modules/core-js/internals/redefine.js"), u = n("./node_modules/core-js/internals/well-known-symbol.js"), d = n("./node_modules/core-js/internals/is-pure.js"), f = n("./node_modules/core-js/internals/iterators.js"), p = n("./node_modules/core-js/internals/iterators-core.js"), m = p.IteratorPrototype, h = p.BUGGY_SAFARI_ITERATORS, g = u("iterator"), _ = "keys", v = "values", y = "entries", b = function() {
					return this;
				};
				e.exports = function(e, t, n, u, p, x, S) {
					i(n, t, u);
					var C = function(e) {
						if (e === p && O) return O;
						if (!h && e in E) return E[e];
						switch (e) {
							case _: return function() {
								return new n(this, e);
							};
							case v: return function() {
								return new n(this, e);
							};
							case y: return function() {
								return new n(this, e);
							};
						}
						return function() {
							return new n(this);
						};
					}, w = t + " Iterator", T = !1, E = e.prototype, D = E[g] || E["@@iterator"] || p && E[p], O = !h && D || C(p), k = t == "Array" && E.entries || D, A, ee, te;
					if (k && (A = a(k.call(new e())), m !== Object.prototype && A.next && (!d && a(A) !== m && (o ? o(A, m) : typeof A[g] != "function" && c(A, g, b)), s(A, w, !0, !0), d && (f[w] = b))), p == v && D && D.name !== v && (T = !0, O = function() {
						return D.call(this);
					}), (!d || S) && E[g] !== O && c(E, g, O), f[t] = O, p) {
						if (ee = {
							values: C(v),
							keys: x ? O : C(_),
							entries: C(y)
						}, S) for (te in ee) (h || T || !(te in E)) && l(E, te, ee[te]);
						else r({
							target: t,
							proto: !0,
							forced: h || T
						}, ee);
					}
					return ee;
				};
			}),
			"./node_modules/core-js/internals/descriptors.js": (function(e, t, n) {
				e.exports = !n("./node_modules/core-js/internals/fails.js")(function() {
					return Object.defineProperty({}, "a", { get: function() {
						return 7;
					} }).a != 7;
				});
			}),
			"./node_modules/core-js/internals/document-create-element.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/global.js"), i = n("./node_modules/core-js/internals/is-object.js"), a = r.document, o = i(a) && i(a.createElement);
				e.exports = function(e) {
					return o ? a.createElement(e) : {};
				};
			}),
			"./node_modules/core-js/internals/enum-bug-keys.js": (function(e, t) {
				e.exports = [
					"constructor",
					"hasOwnProperty",
					"isPrototypeOf",
					"propertyIsEnumerable",
					"toLocaleString",
					"toString",
					"valueOf"
				];
			}),
			"./node_modules/core-js/internals/export.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/global.js"), i = n("./node_modules/core-js/internals/object-get-own-property-descriptor.js").f, a = n("./node_modules/core-js/internals/hide.js"), o = n("./node_modules/core-js/internals/redefine.js"), s = n("./node_modules/core-js/internals/set-global.js"), c = n("./node_modules/core-js/internals/copy-constructor-properties.js"), l = n("./node_modules/core-js/internals/is-forced.js");
				e.exports = function(e, t) {
					var n = e.target, u = e.global, d = e.stat, f, p = u ? r : d ? r[n] || s(n, {}) : (r[n] || {}).prototype, m, h, g, _;
					if (p) for (m in t) {
						if (g = t[m], e.noTargetGet ? (_ = i(p, m), h = _ && _.value) : h = p[m], f = l(u ? m : n + (d ? "." : "#") + m, e.forced), !f && h !== void 0) {
							if (typeof g == typeof h) continue;
							c(g, h);
						}
						(e.sham || h && h.sham) && a(g, "sham", !0), o(p, m, g, e);
					}
				};
			}),
			"./node_modules/core-js/internals/fails.js": (function(e, t) {
				e.exports = function(e) {
					try {
						return !!e();
					} catch {
						return !0;
					}
				};
			}),
			"./node_modules/core-js/internals/function-to-string.js": (function(e, t, n) {
				e.exports = n("./node_modules/core-js/internals/shared.js")("native-function-to-string", Function.toString);
			}),
			"./node_modules/core-js/internals/get-iterator-method.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/classof.js"), i = n("./node_modules/core-js/internals/iterators.js"), a = n("./node_modules/core-js/internals/well-known-symbol.js")("iterator");
				e.exports = function(e) {
					if (e != null) return e[a] || e["@@iterator"] || i[r(e)];
				};
			}),
			"./node_modules/core-js/internals/global.js": (function(e, t, n) {
				(function(t) {
					var n = "object", r = function(e) {
						return e && e.Math == Math && e;
					};
					e.exports = r(typeof globalThis == n && globalThis) || r(typeof window == n && window) || r(typeof self == n && self) || r(typeof t == n && t) || Function("return this")();
				}).call(this, n("./node_modules/webpack/buildin/global.js"));
			}),
			"./node_modules/core-js/internals/has.js": (function(e, t) {
				var n = {}.hasOwnProperty;
				e.exports = function(e, t) {
					return n.call(e, t);
				};
			}),
			"./node_modules/core-js/internals/hidden-keys.js": (function(e, t) {
				e.exports = {};
			}),
			"./node_modules/core-js/internals/hide.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/descriptors.js"), i = n("./node_modules/core-js/internals/object-define-property.js"), a = n("./node_modules/core-js/internals/create-property-descriptor.js");
				e.exports = r ? function(e, t, n) {
					return i.f(e, t, a(1, n));
				} : function(e, t, n) {
					return e[t] = n, e;
				};
			}),
			"./node_modules/core-js/internals/html.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/global.js").document;
				e.exports = r && r.documentElement;
			}),
			"./node_modules/core-js/internals/ie8-dom-define.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/descriptors.js"), i = n("./node_modules/core-js/internals/fails.js"), a = n("./node_modules/core-js/internals/document-create-element.js");
				e.exports = !r && !i(function() {
					return Object.defineProperty(a("div"), "a", { get: function() {
						return 7;
					} }).a != 7;
				});
			}),
			"./node_modules/core-js/internals/indexed-object.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/fails.js"), i = n("./node_modules/core-js/internals/classof-raw.js"), a = "".split;
				e.exports = r(function() {
					return !Object("z").propertyIsEnumerable(0);
				}) ? function(e) {
					return i(e) == "String" ? a.call(e, "") : Object(e);
				} : Object;
			}),
			"./node_modules/core-js/internals/internal-state.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/native-weak-map.js"), i = n("./node_modules/core-js/internals/global.js"), a = n("./node_modules/core-js/internals/is-object.js"), o = n("./node_modules/core-js/internals/hide.js"), s = n("./node_modules/core-js/internals/has.js"), c = n("./node_modules/core-js/internals/shared-key.js"), l = n("./node_modules/core-js/internals/hidden-keys.js"), u = i.WeakMap, d, f, p, m = function(e) {
					return p(e) ? f(e) : d(e, {});
				}, h = function(e) {
					return function(t) {
						var n;
						if (!a(t) || (n = f(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
						return n;
					};
				};
				if (r) {
					var g = new u(), _ = g.get, v = g.has, y = g.set;
					d = function(e, t) {
						return y.call(g, e, t), t;
					}, f = function(e) {
						return _.call(g, e) || {};
					}, p = function(e) {
						return v.call(g, e);
					};
				} else {
					var b = c("state");
					l[b] = !0, d = function(e, t) {
						return o(e, b, t), t;
					}, f = function(e) {
						return s(e, b) ? e[b] : {};
					}, p = function(e) {
						return s(e, b);
					};
				}
				e.exports = {
					set: d,
					get: f,
					has: p,
					enforce: m,
					getterFor: h
				};
			}),
			"./node_modules/core-js/internals/is-array-iterator-method.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/well-known-symbol.js"), i = n("./node_modules/core-js/internals/iterators.js"), a = r("iterator"), o = Array.prototype;
				e.exports = function(e) {
					return e !== void 0 && (i.Array === e || o[a] === e);
				};
			}),
			"./node_modules/core-js/internals/is-forced.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/fails.js"), i = /#|\.prototype\./, a = function(e, t) {
					var n = s[o(e)];
					return n == l ? !0 : n == c ? !1 : typeof t == "function" ? r(t) : !!t;
				}, o = a.normalize = function(e) {
					return String(e).replace(i, ".").toLowerCase();
				}, s = a.data = {}, c = a.NATIVE = "N", l = a.POLYFILL = "P";
				e.exports = a;
			}),
			"./node_modules/core-js/internals/is-object.js": (function(e, t) {
				e.exports = function(e) {
					return typeof e == "object" ? e !== null : typeof e == "function";
				};
			}),
			"./node_modules/core-js/internals/is-pure.js": (function(e, t) {
				e.exports = !1;
			}),
			"./node_modules/core-js/internals/iterators-core.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/object-get-prototype-of.js"), i = n("./node_modules/core-js/internals/hide.js"), a = n("./node_modules/core-js/internals/has.js"), o = n("./node_modules/core-js/internals/well-known-symbol.js"), s = n("./node_modules/core-js/internals/is-pure.js"), c = o("iterator"), l = !1, u = function() {
					return this;
				}, d, f, p;
				[].keys && (p = [].keys(), "next" in p ? (f = r(r(p)), f !== Object.prototype && (d = f)) : l = !0), d ??= {}, !s && !a(d, c) && i(d, c, u), e.exports = {
					IteratorPrototype: d,
					BUGGY_SAFARI_ITERATORS: l
				};
			}),
			"./node_modules/core-js/internals/iterators.js": (function(e, t) {
				e.exports = {};
			}),
			"./node_modules/core-js/internals/native-symbol.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/fails.js");
				e.exports = !!Object.getOwnPropertySymbols && !r(function() {
					return !String(Symbol());
				});
			}),
			"./node_modules/core-js/internals/native-weak-map.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/global.js"), i = n("./node_modules/core-js/internals/function-to-string.js"), a = r.WeakMap;
				e.exports = typeof a == "function" && /native code/.test(i.call(a));
			}),
			"./node_modules/core-js/internals/object-create.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/an-object.js"), i = n("./node_modules/core-js/internals/object-define-properties.js"), a = n("./node_modules/core-js/internals/enum-bug-keys.js"), o = n("./node_modules/core-js/internals/hidden-keys.js"), s = n("./node_modules/core-js/internals/html.js"), c = n("./node_modules/core-js/internals/document-create-element.js"), l = n("./node_modules/core-js/internals/shared-key.js")("IE_PROTO"), u = "prototype", d = function() {}, f = function() {
					var e = c("iframe"), t = a.length, n = "<", r = "script", i = ">", o = "java" + r + ":", l;
					for (e.style.display = "none", s.appendChild(e), e.src = String(o), l = e.contentWindow.document, l.open(), l.write(n + r + i + "document.F=Object" + n + "/" + r + i), l.close(), f = l.F; t--;) delete f[u][a[t]];
					return f();
				};
				e.exports = Object.create || function(e, t) {
					var n;
					return e === null ? n = f() : (d[u] = r(e), n = new d(), d[u] = null, n[l] = e), t === void 0 ? n : i(n, t);
				}, o[l] = !0;
			}),
			"./node_modules/core-js/internals/object-define-properties.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/descriptors.js"), i = n("./node_modules/core-js/internals/object-define-property.js"), a = n("./node_modules/core-js/internals/an-object.js"), o = n("./node_modules/core-js/internals/object-keys.js");
				e.exports = r ? Object.defineProperties : function(e, t) {
					a(e);
					for (var n = o(t), r = n.length, s = 0, c; r > s;) i.f(e, c = n[s++], t[c]);
					return e;
				};
			}),
			"./node_modules/core-js/internals/object-define-property.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/descriptors.js"), i = n("./node_modules/core-js/internals/ie8-dom-define.js"), a = n("./node_modules/core-js/internals/an-object.js"), o = n("./node_modules/core-js/internals/to-primitive.js"), s = Object.defineProperty;
				t.f = r ? s : function(e, t, n) {
					if (a(e), t = o(t, !0), a(n), i) try {
						return s(e, t, n);
					} catch {}
					if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
					return "value" in n && (e[t] = n.value), e;
				};
			}),
			"./node_modules/core-js/internals/object-get-own-property-descriptor.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/descriptors.js"), i = n("./node_modules/core-js/internals/object-property-is-enumerable.js"), a = n("./node_modules/core-js/internals/create-property-descriptor.js"), o = n("./node_modules/core-js/internals/to-indexed-object.js"), s = n("./node_modules/core-js/internals/to-primitive.js"), c = n("./node_modules/core-js/internals/has.js"), l = n("./node_modules/core-js/internals/ie8-dom-define.js"), u = Object.getOwnPropertyDescriptor;
				t.f = r ? u : function(e, t) {
					if (e = o(e), t = s(t, !0), l) try {
						return u(e, t);
					} catch {}
					if (c(e, t)) return a(!i.f.call(e, t), e[t]);
				};
			}),
			"./node_modules/core-js/internals/object-get-own-property-names.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/object-keys-internal.js"), i = n("./node_modules/core-js/internals/enum-bug-keys.js").concat("length", "prototype");
				t.f = Object.getOwnPropertyNames || function(e) {
					return r(e, i);
				};
			}),
			"./node_modules/core-js/internals/object-get-own-property-symbols.js": (function(e, t) {
				t.f = Object.getOwnPropertySymbols;
			}),
			"./node_modules/core-js/internals/object-get-prototype-of.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/has.js"), i = n("./node_modules/core-js/internals/to-object.js"), a = n("./node_modules/core-js/internals/shared-key.js"), o = n("./node_modules/core-js/internals/correct-prototype-getter.js"), s = a("IE_PROTO"), c = Object.prototype;
				e.exports = o ? Object.getPrototypeOf : function(e) {
					return e = i(e), r(e, s) ? e[s] : typeof e.constructor == "function" && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? c : null;
				};
			}),
			"./node_modules/core-js/internals/object-keys-internal.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/has.js"), i = n("./node_modules/core-js/internals/to-indexed-object.js"), a = n("./node_modules/core-js/internals/array-includes.js"), o = n("./node_modules/core-js/internals/hidden-keys.js"), s = a(!1);
				e.exports = function(e, t) {
					var n = i(e), a = 0, c = [], l;
					for (l in n) !r(o, l) && r(n, l) && c.push(l);
					for (; t.length > a;) r(n, l = t[a++]) && (~s(c, l) || c.push(l));
					return c;
				};
			}),
			"./node_modules/core-js/internals/object-keys.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/object-keys-internal.js"), i = n("./node_modules/core-js/internals/enum-bug-keys.js");
				e.exports = Object.keys || function(e) {
					return r(e, i);
				};
			}),
			"./node_modules/core-js/internals/object-property-is-enumerable.js": (function(e, t, n) {
				var r = {}.propertyIsEnumerable, i = Object.getOwnPropertyDescriptor;
				t.f = i && !r.call({ 1: 2 }, 1) ? function(e) {
					var t = i(this, e);
					return !!t && t.enumerable;
				} : r;
			}),
			"./node_modules/core-js/internals/object-set-prototype-of.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/validate-set-prototype-of-arguments.js");
				e.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
					var e = !1, t = {}, n;
					try {
						n = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set, n.call(t, []), e = t instanceof Array;
					} catch {}
					return function(t, i) {
						return r(t, i), e ? n.call(t, i) : t.__proto__ = i, t;
					};
				}() : void 0);
			}),
			"./node_modules/core-js/internals/own-keys.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/global.js"), i = n("./node_modules/core-js/internals/object-get-own-property-names.js"), a = n("./node_modules/core-js/internals/object-get-own-property-symbols.js"), o = n("./node_modules/core-js/internals/an-object.js"), s = r.Reflect;
				e.exports = s && s.ownKeys || function(e) {
					var t = i.f(o(e)), n = a.f;
					return n ? t.concat(n(e)) : t;
				};
			}),
			"./node_modules/core-js/internals/path.js": (function(e, t, n) {
				e.exports = n("./node_modules/core-js/internals/global.js");
			}),
			"./node_modules/core-js/internals/redefine.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/global.js"), i = n("./node_modules/core-js/internals/shared.js"), a = n("./node_modules/core-js/internals/hide.js"), o = n("./node_modules/core-js/internals/has.js"), s = n("./node_modules/core-js/internals/set-global.js"), c = n("./node_modules/core-js/internals/function-to-string.js"), l = n("./node_modules/core-js/internals/internal-state.js"), u = l.get, d = l.enforce, f = String(c).split("toString");
				i("inspectSource", function(e) {
					return c.call(e);
				}), (e.exports = function(e, t, n, i) {
					var c = i ? !!i.unsafe : !1, l = i ? !!i.enumerable : !1, u = i ? !!i.noTargetGet : !1;
					if (typeof n == "function" && (typeof t == "string" && !o(n, "name") && a(n, "name", t), d(n).source = f.join(typeof t == "string" ? t : "")), e === r) {
						l ? e[t] = n : s(t, n);
						return;
					}
					c ? !u && e[t] && (l = !0) : delete e[t], l ? e[t] = n : a(e, t, n);
				})(Function.prototype, "toString", function() {
					return typeof this == "function" && u(this).source || c.call(this);
				});
			}),
			"./node_modules/core-js/internals/require-object-coercible.js": (function(e, t) {
				e.exports = function(e) {
					if (e == null) throw TypeError("Can't call method on " + e);
					return e;
				};
			}),
			"./node_modules/core-js/internals/set-global.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/global.js"), i = n("./node_modules/core-js/internals/hide.js");
				e.exports = function(e, t) {
					try {
						i(r, e, t);
					} catch {
						r[e] = t;
					}
					return t;
				};
			}),
			"./node_modules/core-js/internals/set-to-string-tag.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/object-define-property.js").f, i = n("./node_modules/core-js/internals/has.js"), a = n("./node_modules/core-js/internals/well-known-symbol.js")("toStringTag");
				e.exports = function(e, t, n) {
					e && !i(e = n ? e : e.prototype, a) && r(e, a, {
						configurable: !0,
						value: t
					});
				};
			}),
			"./node_modules/core-js/internals/shared-key.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/shared.js"), i = n("./node_modules/core-js/internals/uid.js"), a = r("keys");
				e.exports = function(e) {
					return a[e] || (a[e] = i(e));
				};
			}),
			"./node_modules/core-js/internals/shared.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/global.js"), i = n("./node_modules/core-js/internals/set-global.js"), a = n("./node_modules/core-js/internals/is-pure.js"), o = "__core-js_shared__", s = r[o] || i(o, {});
				(e.exports = function(e, t) {
					return s[e] || (s[e] = t === void 0 ? {} : t);
				})("versions", []).push({
					version: "3.1.3",
					mode: a ? "pure" : "global",
					copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
				});
			}),
			"./node_modules/core-js/internals/string-at.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/to-integer.js"), i = n("./node_modules/core-js/internals/require-object-coercible.js");
				e.exports = function(e, t, n) {
					var a = String(i(e)), o = r(t), s = a.length, c, l;
					return o < 0 || o >= s ? n ? "" : void 0 : (c = a.charCodeAt(o), c < 55296 || c > 56319 || o + 1 === s || (l = a.charCodeAt(o + 1)) < 56320 || l > 57343 ? n ? a.charAt(o) : c : n ? a.slice(o, o + 2) : (c - 55296 << 10) + (l - 56320) + 65536);
				};
			}),
			"./node_modules/core-js/internals/to-absolute-index.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/to-integer.js"), i = Math.max, a = Math.min;
				e.exports = function(e, t) {
					var n = r(e);
					return n < 0 ? i(n + t, 0) : a(n, t);
				};
			}),
			"./node_modules/core-js/internals/to-indexed-object.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/indexed-object.js"), i = n("./node_modules/core-js/internals/require-object-coercible.js");
				e.exports = function(e) {
					return r(i(e));
				};
			}),
			"./node_modules/core-js/internals/to-integer.js": (function(e, t) {
				var n = Math.ceil, r = Math.floor;
				e.exports = function(e) {
					return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e);
				};
			}),
			"./node_modules/core-js/internals/to-length.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/to-integer.js"), i = Math.min;
				e.exports = function(e) {
					return e > 0 ? i(r(e), 9007199254740991) : 0;
				};
			}),
			"./node_modules/core-js/internals/to-object.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/require-object-coercible.js");
				e.exports = function(e) {
					return Object(r(e));
				};
			}),
			"./node_modules/core-js/internals/to-primitive.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/is-object.js");
				e.exports = function(e, t) {
					if (!r(e)) return e;
					var n, i;
					if (t && typeof (n = e.toString) == "function" && !r(i = n.call(e)) || typeof (n = e.valueOf) == "function" && !r(i = n.call(e)) || !t && typeof (n = e.toString) == "function" && !r(i = n.call(e))) return i;
					throw TypeError("Can't convert object to primitive value");
				};
			}),
			"./node_modules/core-js/internals/uid.js": (function(e, t) {
				var n = 0, r = Math.random();
				e.exports = function(e) {
					return `Symbol(${e === void 0 ? "" : e})_${(++n + r).toString(36)}`;
				};
			}),
			"./node_modules/core-js/internals/validate-set-prototype-of-arguments.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/is-object.js"), i = n("./node_modules/core-js/internals/an-object.js");
				e.exports = function(e, t) {
					if (i(e), !r(t) && t !== null) throw TypeError("Can't set " + String(t) + " as a prototype");
				};
			}),
			"./node_modules/core-js/internals/well-known-symbol.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/global.js"), i = n("./node_modules/core-js/internals/shared.js"), a = n("./node_modules/core-js/internals/uid.js"), o = n("./node_modules/core-js/internals/native-symbol.js"), s = r.Symbol, c = i("wks");
				e.exports = function(e) {
					return c[e] || (c[e] = o && s[e] || (o ? s : a)("Symbol." + e));
				};
			}),
			"./node_modules/core-js/modules/es.array.from.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/export.js"), i = n("./node_modules/core-js/internals/array-from.js");
				r({
					target: "Array",
					stat: !0,
					forced: !n("./node_modules/core-js/internals/check-correctness-of-iteration.js")(function(e) {
						Array.from(e);
					})
				}, { from: i });
			}),
			"./node_modules/core-js/modules/es.string.iterator.js": (function(e, t, n) {
				var r = n("./node_modules/core-js/internals/string-at.js"), i = n("./node_modules/core-js/internals/internal-state.js"), a = n("./node_modules/core-js/internals/define-iterator.js"), o = "String Iterator", s = i.set, c = i.getterFor(o);
				a(String, "String", function(e) {
					s(this, {
						type: o,
						string: String(e),
						index: 0
					});
				}, function() {
					var e = c(this), t = e.string, n = e.index, i;
					return n >= t.length ? {
						value: void 0,
						done: !0
					} : (i = r(t, n, !0), e.index += i.length, {
						value: i,
						done: !1
					});
				});
			}),
			"./node_modules/webpack/buildin/global.js": (function(e, t) {
				var n = (function() {
					return this;
				})();
				try {
					n = n || Function("return this")() || (0, eval)("this");
				} catch {
					typeof window == "object" && (n = window);
				}
				e.exports = n;
			}),
			"./src/default-attrs.json": (function(e) {
				e.exports = {
					xmlns: "http://www.w3.org/2000/svg",
					width: 24,
					height: 24,
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": 2,
					"stroke-linecap": "round",
					"stroke-linejoin": "round"
				};
			}),
			"./src/icon.js": (function(e, t, n) {
				Object.defineProperty(t, "__esModule", { value: !0 });
				var r = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
					}
					return e;
				}, i = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var r = t[n];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
						}
					}
					return function(t, n, r) {
						return n && e(t.prototype, n), r && e(t, r), t;
					};
				}(), a = s(n("./node_modules/classnames/dedupe.js")), o = s(n("./src/default-attrs.json"));
				function s(e) {
					return e && e.__esModule ? e : { default: e };
				}
				function c(e, t) {
					if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
				}
				var l = function() {
					function e(t, n) {
						var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
						c(this, e), this.name = t, this.contents = n, this.tags = i, this.attrs = r({}, o.default, { class: "feather feather-" + t });
					}
					return i(e, [{
						key: "toSvg",
						value: function() {
							var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
							return "<svg " + u(r({}, this.attrs, e, { class: (0, a.default)(this.attrs.class, e.class) })) + ">" + this.contents + "</svg>";
						}
					}, {
						key: "toString",
						value: function() {
							return this.contents;
						}
					}]), e;
				}();
				function u(e) {
					return Object.keys(e).map(function(t) {
						return t + "=\"" + e[t] + "\"";
					}).join(" ");
				}
				t.default = l;
			}),
			"./src/icons.js": (function(e, t, n) {
				Object.defineProperty(t, "__esModule", { value: !0 });
				var r = o(n("./src/icon.js")), i = o(n("./dist/icons.json")), a = o(n("./src/tags.json"));
				function o(e) {
					return e && e.__esModule ? e : { default: e };
				}
				t.default = Object.keys(i.default).map(function(e) {
					return new r.default(e, i.default[e], a.default[e]);
				}).reduce(function(e, t) {
					return e[t.name] = t, e;
				}, {});
			}),
			"./src/index.js": (function(e, t, n) {
				var r = o(n("./src/icons.js")), i = o(n("./src/to-svg.js")), a = o(n("./src/replace.js"));
				function o(e) {
					return e && e.__esModule ? e : { default: e };
				}
				e.exports = {
					icons: r.default,
					toSvg: i.default,
					replace: a.default
				};
			}),
			"./src/replace.js": (function(e, t, n) {
				Object.defineProperty(t, "__esModule", { value: !0 });
				var r = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
					}
					return e;
				}, i = o(n("./node_modules/classnames/dedupe.js")), a = o(n("./src/icons.js"));
				function o(e) {
					return e && e.__esModule ? e : { default: e };
				}
				function s() {
					var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
					if (typeof document > "u") throw Error("`feather.replace()` only works in a browser environment.");
					var t = document.querySelectorAll("[data-feather]");
					Array.from(t).forEach(function(t) {
						return c(t, e);
					});
				}
				function c(e) {
					var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = l(e), o = n["data-feather"];
					if (delete n["data-feather"], a.default[o] === void 0) {
						console.warn("feather: '" + o + "' is not a valid icon");
						return;
					}
					var s = a.default[o].toSvg(r({}, t, n, { class: (0, i.default)(t.class, n.class) })), c = new DOMParser().parseFromString(s, "image/svg+xml").querySelector("svg");
					e.parentNode.replaceChild(c, e);
				}
				function l(e) {
					return Array.from(e.attributes).reduce(function(e, t) {
						return e[t.name] = t.value, e;
					}, {});
				}
				t.default = s;
			}),
			"./src/tags.json": (function(e) {
				e.exports = {
					activity: [
						"pulse",
						"health",
						"action",
						"motion"
					],
					airplay: [
						"stream",
						"cast",
						"mirroring"
					],
					"alert-circle": [
						"warning",
						"alert",
						"danger"
					],
					"alert-octagon": [
						"warning",
						"alert",
						"danger"
					],
					"alert-triangle": [
						"warning",
						"alert",
						"danger"
					],
					"align-center": ["text alignment", "center"],
					"align-justify": ["text alignment", "justified"],
					"align-left": ["text alignment", "left"],
					"align-right": ["text alignment", "right"],
					anchor: [],
					archive: ["index", "box"],
					"at-sign": [
						"mention",
						"at",
						"email",
						"message"
					],
					award: ["achievement", "badge"],
					aperture: ["camera", "photo"],
					"bar-chart": [
						"statistics",
						"diagram",
						"graph"
					],
					"bar-chart-2": [
						"statistics",
						"diagram",
						"graph"
					],
					battery: ["power", "electricity"],
					"battery-charging": ["power", "electricity"],
					bell: [
						"alarm",
						"notification",
						"sound"
					],
					"bell-off": [
						"alarm",
						"notification",
						"silent"
					],
					bluetooth: ["wireless"],
					"book-open": ["read", "library"],
					book: [
						"read",
						"dictionary",
						"booklet",
						"magazine",
						"library"
					],
					bookmark: [
						"read",
						"clip",
						"marker",
						"tag"
					],
					box: ["cube"],
					briefcase: [
						"work",
						"bag",
						"baggage",
						"folder"
					],
					calendar: ["date"],
					camera: ["photo"],
					cast: ["chromecast", "airplay"],
					"chevron-down": ["expand"],
					"chevron-up": ["collapse"],
					circle: [
						"off",
						"zero",
						"record"
					],
					clipboard: ["copy"],
					clock: [
						"time",
						"watch",
						"alarm"
					],
					"cloud-drizzle": ["weather", "shower"],
					"cloud-lightning": ["weather", "bolt"],
					"cloud-rain": ["weather"],
					"cloud-snow": ["weather", "blizzard"],
					cloud: ["weather"],
					codepen: ["logo"],
					codesandbox: ["logo"],
					code: ["source", "programming"],
					coffee: [
						"drink",
						"cup",
						"mug",
						"tea",
						"cafe",
						"hot",
						"beverage"
					],
					columns: ["layout"],
					command: [
						"keyboard",
						"cmd",
						"terminal",
						"prompt"
					],
					compass: [
						"navigation",
						"safari",
						"travel",
						"direction"
					],
					copy: ["clone", "duplicate"],
					"corner-down-left": ["arrow", "return"],
					"corner-down-right": ["arrow"],
					"corner-left-down": ["arrow"],
					"corner-left-up": ["arrow"],
					"corner-right-down": ["arrow"],
					"corner-right-up": ["arrow"],
					"corner-up-left": ["arrow"],
					"corner-up-right": ["arrow"],
					cpu: ["processor", "technology"],
					"credit-card": [
						"purchase",
						"payment",
						"cc"
					],
					crop: ["photo", "image"],
					crosshair: ["aim", "target"],
					database: ["storage", "memory"],
					delete: ["remove"],
					disc: [
						"album",
						"cd",
						"dvd",
						"music"
					],
					"dollar-sign": [
						"currency",
						"money",
						"payment"
					],
					droplet: ["water"],
					edit: ["pencil", "change"],
					"edit-2": ["pencil", "change"],
					"edit-3": ["pencil", "change"],
					eye: ["view", "watch"],
					"eye-off": [
						"view",
						"watch",
						"hide",
						"hidden"
					],
					"external-link": ["outbound"],
					facebook: ["logo", "social"],
					"fast-forward": ["music"],
					figma: [
						"logo",
						"design",
						"tool"
					],
					"file-minus": [
						"delete",
						"remove",
						"erase"
					],
					"file-plus": [
						"add",
						"create",
						"new"
					],
					"file-text": [
						"data",
						"txt",
						"pdf"
					],
					film: ["movie", "video"],
					filter: ["funnel", "hopper"],
					flag: ["report"],
					"folder-minus": ["directory"],
					"folder-plus": ["directory"],
					folder: ["directory"],
					framer: [
						"logo",
						"design",
						"tool"
					],
					frown: [
						"emoji",
						"face",
						"bad",
						"sad",
						"emotion"
					],
					gift: [
						"present",
						"box",
						"birthday",
						"party"
					],
					"git-branch": ["code", "version control"],
					"git-commit": ["code", "version control"],
					"git-merge": ["code", "version control"],
					"git-pull-request": ["code", "version control"],
					github: ["logo", "version control"],
					gitlab: ["logo", "version control"],
					globe: [
						"world",
						"browser",
						"language",
						"translate"
					],
					"hard-drive": [
						"computer",
						"server",
						"memory",
						"data"
					],
					hash: [
						"hashtag",
						"number",
						"pound"
					],
					headphones: [
						"music",
						"audio",
						"sound"
					],
					heart: [
						"like",
						"love",
						"emotion"
					],
					"help-circle": ["question mark"],
					hexagon: [
						"shape",
						"node.js",
						"logo"
					],
					home: ["house", "living"],
					image: ["picture"],
					inbox: ["email"],
					instagram: ["logo", "camera"],
					key: [
						"password",
						"login",
						"authentication",
						"secure"
					],
					layers: ["stack"],
					layout: ["window", "webpage"],
					"life-buoy": [
						"help",
						"life ring",
						"support"
					],
					link: ["chain", "url"],
					"link-2": ["chain", "url"],
					linkedin: ["logo", "social media"],
					list: ["options"],
					lock: [
						"security",
						"password",
						"secure"
					],
					"log-in": [
						"sign in",
						"arrow",
						"enter"
					],
					"log-out": [
						"sign out",
						"arrow",
						"exit"
					],
					mail: ["email", "message"],
					"map-pin": [
						"location",
						"navigation",
						"travel",
						"marker"
					],
					map: [
						"location",
						"navigation",
						"travel"
					],
					maximize: ["fullscreen"],
					"maximize-2": [
						"fullscreen",
						"arrows",
						"expand"
					],
					meh: [
						"emoji",
						"face",
						"neutral",
						"emotion"
					],
					menu: [
						"bars",
						"navigation",
						"hamburger"
					],
					"message-circle": ["comment", "chat"],
					"message-square": ["comment", "chat"],
					"mic-off": [
						"record",
						"sound",
						"mute"
					],
					mic: [
						"record",
						"sound",
						"listen"
					],
					minimize: ["exit fullscreen", "close"],
					"minimize-2": [
						"exit fullscreen",
						"arrows",
						"close"
					],
					minus: ["subtract"],
					monitor: [
						"tv",
						"screen",
						"display"
					],
					moon: ["dark", "night"],
					"more-horizontal": ["ellipsis"],
					"more-vertical": ["ellipsis"],
					"mouse-pointer": ["arrow", "cursor"],
					move: ["arrows"],
					music: ["note"],
					navigation: ["location", "travel"],
					"navigation-2": ["location", "travel"],
					octagon: ["stop"],
					package: ["box", "container"],
					paperclip: ["attachment"],
					pause: ["music", "stop"],
					"pause-circle": [
						"music",
						"audio",
						"stop"
					],
					"pen-tool": ["vector", "drawing"],
					percent: ["discount"],
					"phone-call": ["ring"],
					"phone-forwarded": ["call"],
					"phone-incoming": ["call"],
					"phone-missed": ["call"],
					"phone-off": ["call", "mute"],
					"phone-outgoing": ["call"],
					phone: ["call"],
					play: ["music", "start"],
					"pie-chart": ["statistics", "diagram"],
					"play-circle": ["music", "start"],
					plus: ["add", "new"],
					"plus-circle": ["add", "new"],
					"plus-square": ["add", "new"],
					pocket: ["logo", "save"],
					power: ["on", "off"],
					printer: [
						"fax",
						"office",
						"device"
					],
					radio: ["signal"],
					"refresh-cw": ["synchronise", "arrows"],
					"refresh-ccw": ["arrows"],
					repeat: ["loop", "arrows"],
					rewind: ["music"],
					"rotate-ccw": ["arrow"],
					"rotate-cw": ["arrow"],
					rss: ["feed", "subscribe"],
					save: ["floppy disk"],
					scissors: ["cut"],
					search: [
						"find",
						"magnifier",
						"magnifying glass"
					],
					send: [
						"message",
						"mail",
						"email",
						"paper airplane",
						"paper aeroplane"
					],
					settings: [
						"cog",
						"edit",
						"gear",
						"preferences"
					],
					"share-2": ["network", "connections"],
					shield: ["security", "secure"],
					"shield-off": ["security", "insecure"],
					"shopping-bag": [
						"ecommerce",
						"cart",
						"purchase",
						"store"
					],
					"shopping-cart": [
						"ecommerce",
						"cart",
						"purchase",
						"store"
					],
					shuffle: ["music"],
					"skip-back": ["music"],
					"skip-forward": ["music"],
					slack: ["logo"],
					slash: ["ban", "no"],
					sliders: ["settings", "controls"],
					smartphone: ["cellphone", "device"],
					smile: [
						"emoji",
						"face",
						"happy",
						"good",
						"emotion"
					],
					speaker: ["audio", "music"],
					star: [
						"bookmark",
						"favorite",
						"like"
					],
					"stop-circle": ["media", "music"],
					sun: [
						"brightness",
						"weather",
						"light"
					],
					sunrise: [
						"weather",
						"time",
						"morning",
						"day"
					],
					sunset: [
						"weather",
						"time",
						"evening",
						"night"
					],
					tablet: ["device"],
					tag: ["label"],
					target: ["logo", "bullseye"],
					terminal: [
						"code",
						"command line",
						"prompt"
					],
					thermometer: [
						"temperature",
						"celsius",
						"fahrenheit",
						"weather"
					],
					"thumbs-down": [
						"dislike",
						"bad",
						"emotion"
					],
					"thumbs-up": [
						"like",
						"good",
						"emotion"
					],
					"toggle-left": [
						"on",
						"off",
						"switch"
					],
					"toggle-right": [
						"on",
						"off",
						"switch"
					],
					tool: ["settings", "spanner"],
					trash: [
						"garbage",
						"delete",
						"remove",
						"bin"
					],
					"trash-2": [
						"garbage",
						"delete",
						"remove",
						"bin"
					],
					triangle: ["delta"],
					truck: [
						"delivery",
						"van",
						"shipping",
						"transport",
						"lorry"
					],
					tv: ["television", "stream"],
					twitch: ["logo"],
					twitter: ["logo", "social"],
					type: ["text"],
					umbrella: ["rain", "weather"],
					unlock: ["security"],
					"user-check": ["followed", "subscribed"],
					"user-minus": [
						"delete",
						"remove",
						"unfollow",
						"unsubscribe"
					],
					"user-plus": [
						"new",
						"add",
						"create",
						"follow",
						"subscribe"
					],
					"user-x": [
						"delete",
						"remove",
						"unfollow",
						"unsubscribe",
						"unavailable"
					],
					user: ["person", "account"],
					users: ["group"],
					"video-off": [
						"camera",
						"movie",
						"film"
					],
					video: [
						"camera",
						"movie",
						"film"
					],
					voicemail: ["phone"],
					volume: [
						"music",
						"sound",
						"mute"
					],
					"volume-1": ["music", "sound"],
					"volume-2": ["music", "sound"],
					"volume-x": [
						"music",
						"sound",
						"mute"
					],
					watch: ["clock", "time"],
					"wifi-off": ["disabled"],
					wifi: [
						"connection",
						"signal",
						"wireless"
					],
					wind: ["weather", "air"],
					"x-circle": [
						"cancel",
						"close",
						"delete",
						"remove",
						"times",
						"clear"
					],
					"x-octagon": [
						"delete",
						"stop",
						"alert",
						"warning",
						"times",
						"clear"
					],
					"x-square": [
						"cancel",
						"close",
						"delete",
						"remove",
						"times",
						"clear"
					],
					x: [
						"cancel",
						"close",
						"delete",
						"remove",
						"times",
						"clear"
					],
					youtube: [
						"logo",
						"video",
						"play"
					],
					"zap-off": [
						"flash",
						"camera",
						"lightning"
					],
					zap: [
						"flash",
						"camera",
						"lightning"
					],
					"zoom-in": ["magnifying glass"],
					"zoom-out": ["magnifying glass"]
				};
			}),
			"./src/to-svg.js": (function(e, t, n) {
				Object.defineProperty(t, "__esModule", { value: !0 });
				var r = i(n("./src/icons.js"));
				function i(e) {
					return e && e.__esModule ? e : { default: e };
				}
				function a(e) {
					var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
					if (console.warn("feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead."), !e) throw Error("The required `key` (icon name) parameter is missing.");
					if (!r.default[e]) throw Error("No icon matching '" + e + "'. See the complete list of icons at https://feathericons.com");
					return r.default[e].toSvg(t);
				}
				t.default = a;
			}),
			0: (function(e, t, n) {
				n("./node_modules/core-js/es/array/from.js"), e.exports = n("./src/index.js");
			})
		});
	});
})))()), km = Object.keys(Om.default.icons), Am = {
	props: {
		name: {
			type: String,
			required: !0,
			validator(e) {
				let t = km.includes(e);
				return t || (console.groupCollapsed("[frappe-ui] name property for feather-icon must be one of "), console.dir(km), console.groupEnd()), t;
			}
		},
		color: {
			type: String,
			default: null
		},
		strokeWidth: {
			type: Number,
			default: 1.5
		}
	},
	render() {
		let e = Om.default.icons[this.name];
		return e ||= Om.default.icons.circle, rc("svg", Ms(e.attrs, {
			fill: "none",
			stroke: "currentColor",
			color: this.color,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			"stroke-width": this.strokeWidth,
			width: null,
			height: null,
			class: [e.attrs.class, "shrink-0"],
			innerHTML: e.contents
		}, this.$attrs));
	}
}, jm = /*@__PURE__*/ B({
	__name: "Spinner",
	props: {
		size: {},
		theme: {},
		track: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = {
			xs: {
				px: 12,
				thickness: 1.5,
				inset: .9
			},
			sm: {
				px: 14,
				thickness: 2,
				inset: 1.05
			},
			md: {
				px: 16,
				thickness: 2,
				inset: 1.2
			},
			lg: {
				px: 20,
				thickness: 2,
				inset: 1.5
			}
		}, r = $(() => t.theme == null ? null : {
			gray: "text-ink-gray-8",
			red: "text-ink-red-8"
		}[t.theme]), i = $(() => {
			let e = t.size == null ? void 0 : n[t.size];
			if (e) return {
				width: `${e.px}px`,
				height: `${e.px}px`,
				"--fui-spinner-thickness": `${e.thickness}px`,
				"--fui-spinner-mask-thickness": `${e.thickness}px`,
				"--fui-spinner-inset": `${e.inset}px`
			};
		});
		return (t, n) => (G(), K("svg", {
			class: we(["fui-spinner inline-block shrink-0", [r.value, { "fui-spinner--track": e.track }]]),
			width: "16",
			height: "16",
			role: "status",
			"aria-label": "Loading",
			style: ye(i.value)
		}, null, 6));
	}
}), Mm = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Nm = /*#__PURE__*/ Mm(jm, [["__scopeId", "data-v-ac615d09"]]), Pm = { class: "rounded bg-surface-gray-10 px-2 py-1 text-xs text-ink-base shadow-xl" }, Fm = /* @__PURE__ */ B({
	__name: "TooltipBubble",
	props: {
		side: { default: "top" },
		text: {},
		arrowClass: { default: "fill-surface-gray-10" }
	},
	setup(e) {
		return (t, n) => (G(), q(R(um), null, {
			default: z(() => [Y(R(lm), {
				side: e.side,
				"side-offset": 4,
				class: "z-[100]"
			}, {
				default: z(() => [H(t.$slots, "body", {}, () => [J("div", Pm, [H(t.$slots, "content", {}, () => [H(t.$slots, "default", {}, () => [X(N(e.text), 1)])])])]), Y(R($p), {
					class: we(e.arrowClass),
					width: 8,
					height: 4
				}, null, 8, ["class"])]),
				_: 3
			}, 8, ["side"])]),
			_: 3
		}));
	}
});
//#endregion
//#region node_modules/frappe-ui/src/utils/iconString.ts
function Im(e) {
	return typeof e == "string" && e.startsWith("lucide-");
}
function Lm(e) {
	return typeof e != "string" || !e || e.startsWith("lucide-") ? !1 : !/[a-zA-Z0-9]/.test(e);
}
function Rm(e) {
	return !(typeof e != "string" || !e || Im(e) || Lm(e));
}
function zm(e, t, n) {
	Rm(n) && (`${e}${t}`, `${n}`);
}
//#endregion
//#region node_modules/frappe-ui/src/components/Button/types.ts
var Bm = {
	type: [
		String,
		Object,
		Function
	],
	default: void 0
}, Vm = /* @__PURE__ */ B({
	name: "Button",
	inheritAttrs: !1,
	props: {
		theme: {
			type: String,
			default: "gray"
		},
		size: {
			type: String,
			default: "sm"
		},
		variant: {
			type: String,
			default: "subtle"
		},
		label: {
			type: String,
			default: void 0
		},
		icon: Bm,
		iconLeft: Bm,
		iconRight: Bm,
		tooltip: {
			type: String,
			default: void 0
		},
		loading: {
			type: Boolean,
			default: !1
		},
		loadingText: {
			type: String,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		route: {
			type: [String, Object],
			default: void 0
		},
		link: {
			type: String,
			default: void 0
		},
		type: {
			type: String,
			default: "button"
		}
	},
	slots: Object,
	setup(e, { attrs: t, slots: n, expose: r }) {
		kr(() => {
			zm("Button", "icon", e.icon), zm("Button", "iconLeft", e.iconLeft), zm("Button", "iconRight", e.iconRight);
		});
		let i = $(() => e.disabled || e.loading), a = $(() => !!e.tooltip?.length), o = em(null), s = $(() => {
			let e = n.default?.();
			if (!Array.isArray(e)) return !1;
			let t = e[0]?.type?.name;
			return typeof t == "string" && t.startsWith("lucide-");
		}), c = $(() => !!e.icon || !!n.icon || s.value), l = $(() => ({
			xs: "h-3.5",
			sm: "h-4",
			md: "h-4.5",
			lg: "h-5"
		})[e.size]), u = $(() => ({
			xs: "size-3.5",
			sm: "size-4",
			md: "size-4.5",
			lg: "size-5"
		})[e.size]), d = $(() => {
			let t = {
				gray: "text-ink-base bg-surface-gray-10 hover:bg-surface-gray-9 active:bg-surface-gray-8",
				blue: "text-ink-base bg-surface-blue-6 hover:bg-surface-blue-7 active:bg-surface-blue-8",
				green: "text-ink-base bg-surface-green-7 hover:bg-surface-green-8 active:bg-surface-green-9",
				red: "text-ink-base bg-surface-red-7 hover:bg-surface-red-8 active:bg-surface-red-9"
			}[e.theme], n = {
				gray: "text-ink-gray-8 bg-surface-gray-2 hover:bg-surface-gray-3 active:bg-surface-gray-4",
				blue: "text-ink-blue-6 bg-surface-blue-2 hover:bg-surface-blue-3 active:bg-surface-blue-4",
				green: "text-ink-green-9 bg-surface-green-2 hover:bg-surface-green-3 active:bg-surface-green-4",
				red: "text-ink-red-8 bg-surface-red-2 hover:bg-surface-red-3 active:bg-surface-red-4"
			}[e.theme], r = {
				gray: "text-ink-gray-8 bg-surface-base border border-outline-gray-2 hover:border-outline-gray-3 active:border-outline-gray-3 active:bg-surface-gray-4",
				blue: "text-ink-blue-6 bg-surface-base border border-outline-blue-1 hover:border-outline-blue-4 active:border-outline-blue-4 active:bg-surface-blue-4",
				green: "text-ink-green-9 bg-surface-base border border-outline-green-3 hover:border-outline-green-5 active:border-outline-green-5 active:bg-surface-green-4",
				red: "text-ink-red-8 bg-surface-base border border-outline-red-1 hover:border-outline-red-3 active:border-outline-red-3 active:bg-surface-red-3"
			}[e.theme], i = {
				gray: "text-ink-gray-8 bg-transparent hover:bg-surface-gray-3 active:bg-surface-gray-4",
				blue: "text-ink-blue-6 bg-transparent hover:bg-surface-blue-3 active:bg-surface-blue-4",
				green: "text-ink-green-9 bg-transparent hover:bg-surface-green-3 active:bg-surface-green-4",
				red: "text-ink-red-8 bg-transparent hover:bg-surface-red-3 active:bg-surface-red-4"
			}[e.theme], a = {
				gray: "",
				blue: "focus-visible:focus-ring-blue",
				green: "focus-visible:focus-ring-green",
				red: "focus-visible:focus-ring-red"
			}[e.theme], o = {
				subtle: n,
				solid: t,
				outline: r,
				ghost: i
			}[e.variant], s = {
				"gray-solid": "bg-surface-gray-2 text-ink-gray-4",
				"gray-subtle": "bg-surface-gray-2 text-ink-gray-4",
				"gray-outline": "bg-surface-gray-2 text-ink-gray-4 border border-outline-gray-2",
				"gray-ghost": "text-ink-gray-4",
				"blue-solid": "bg-surface-blue-4 text-ink-base",
				"blue-subtle": "bg-surface-blue-2 text-ink-blue-link",
				"blue-outline": "bg-surface-blue-2 text-ink-blue-link border border-outline-blue-1",
				"blue-ghost": "text-ink-blue-link",
				"green-solid": "bg-surface-green-2 text-ink-green-5",
				"green-subtle": "bg-surface-green-2 text-ink-green-5",
				"green-outline": "bg-surface-green-2 text-ink-green-5 border border-outline-green-3",
				"green-ghost": "text-ink-green-5",
				"red-solid": "bg-surface-red-2 text-ink-red-5",
				"red-subtle": "bg-surface-red-2 text-ink-red-5",
				"red-outline": "bg-surface-red-2 text-ink-red-5 border border-outline-red-1",
				"red-ghost": "text-ink-red-5"
			}[`${e.theme}-${e.variant}`], l = c.value ? {
				xs: "h-6 w-6 rounded-3",
				sm: "h-7 w-7 rounded-4",
				md: "h-8 w-8 rounded-4",
				lg: "h-10 w-10 rounded-5"
			}[e.size] : {
				xs: "h-6 text-xs px-1.5 rounded-3",
				sm: "h-7 text-base px-2 rounded-4",
				md: "h-8 text-base-medium px-2.5 rounded-4",
				lg: "h-10 text-lg-medium px-3 rounded-5"
			}[e.size];
			return [
				"inline-flex items-center justify-center gap-2 transition-colors shrink-0",
				e.disabled ? s : o,
				e.loading && !e.disabled ? "pointer-events-none" : "",
				a,
				l
			];
		}), f = /* @__PURE__ */ L();
		r({ rootRef: f });
		let p = $(() => !i.value && e.route ? {
			is: Cm,
			props: { to: e.route }
		} : !i.value && e.link ? {
			is: "a",
			props: {
				href: e.link,
				target: "_blank",
				rel: "noreferrer noopener"
			}
		} : {
			is: "button",
			props: {
				type: e.type,
				disabled: i.value
			}
		});
		function m(e, t) {
			return e ? typeof e == "string" ? e.startsWith("lucide-") ? rc("span", {
				class: [e, u.value],
				"aria-hidden": "true"
			}) : rc(Am, {
				name: e,
				class: l.value,
				...t ? { "aria-hidden": "true" } : {}
			}) : rc(e, { class: l.value }) : null;
		}
		function h() {
			return e.loading ? rc(Nm, { class: {
				"size-3.5": e.size === "xs",
				"size-4": e.size === "sm",
				"size-4.5": e.size === "md",
				"size-5": e.size === "lg"
			} }) : n.prefix ? n.prefix() : m(e.iconLeft, !0);
		}
		function g() {
			return e.loading && e.loadingText ? e.loadingText : c.value && !e.loading ? e.icon ? m(e.icon, !1) : n.icon ? n.icon() : s.value ? rc("div", { class: l.value }, n.default?.() ?? e.label) : null : rc("span", { class: ["truncate", { "sr-only": c.value }] }, n.default?.() ?? e.label);
		}
		function _() {
			return n.suffix ? n.suffix() : m(e.iconRight, !0);
		}
		return () => {
			let { class: n, ...r } = t, { is: i, props: s } = p.value, c = [
				h(),
				g(),
				_()
			], l = {
				...s,
				...r,
				class: [n, d.value],
				"aria-label": e.label ?? r["aria-label"],
				"aria-busy": e.loading || void 0,
				ref: f
			}, u = typeof i == "string" ? rc(i, l, c) : rc(i, l, { default: () => c });
			if (!a.value) return u;
			let m = rc(om, null, { default: () => [rc(dm, { asChild: !0 }, { default: () => u }), rc(Fm, { text: e.tooltip })] });
			return o ? m : rc(nm, null, { default: () => m });
		};
	}
}), Hm = { class: "p-4 max-w-[1100px]" }, Um = {
	key: 0,
	class: "p-6 border border-gray-300 rounded-lg"
}, Wm = { key: 1 }, Gm = { class: "fjk-sticky" }, Km = { class: "flex justify-between items-start mb-3" }, qm = { style: {
	margin: "0",
	"font-size": "32px",
	"font-weight": "800",
	"line-height": "1.15"
} }, Jm = { class: "text-gray-600 text-sm mt-1" }, Ym = { key: 0 }, Xm = { key: 1 }, Zm = { key: 2 }, Qm = {
	key: 0,
	class: "mb-3 rounded-md bg-red-100 px-3 py-2 text-red-800"
}, $m = {
	key: 1,
	class: "mb-2 text-gray-500"
}, eh = { class: "mb-3 flex gap-2" }, th = { class: "border border-gray-200 rounded-lg p-3 mb-3" }, nh = {
	key: 0,
	class: "mt-2 text-sm space-y-1"
}, rh = {
	key: 1,
	class: "mt-2 text-gray-500"
}, ih = { class: "mt-2 text-sm" }, ah = {
	key: 0,
	class: "text-gray-500"
}, oh = {
	key: 1,
	class: "ml-4 list-disc"
}, sh = {
	key: 0,
	class: "fjk-cue"
}, ch = { class: "border border-gray-200 rounded-lg p-3 mb-3" }, lh = {
	key: 0,
	class: "mt-2 text-sm space-y-2"
}, uh = {
	key: 0,
	class: "text-gray-500"
}, dh = {
	key: 1,
	class: "ml-4 list-disc"
}, fh = {
	key: 0,
	class: "text-gray-500"
}, ph = {
	key: 1,
	class: "ml-4 list-disc"
}, mh = {
	key: 0,
	class: "text-gray-500"
}, hh = {
	key: 1,
	class: "ml-4 list-disc"
}, gh = { key: 0 }, _h = { class: "ml-4 list-disc" }, vh = {
	key: 1,
	class: "mt-3 flex items-center gap-2"
}, yh = {
	key: 1,
	class: "border border-gray-200 rounded-lg p-3 mb-3"
}, bh = {
	key: 0,
	class: "mt-2 text-sm"
}, xh = { class: "text-gray-500" }, Sh = { class: "w-full border-collapse" }, Ch = { class: "py-1 pr-2 align-top text-gray-600" }, wh = { class: "py-1" }, Th = { class: "w-full border-collapse" }, Eh = {
	key: 0,
	class: "text-xs text-amber-700 mb-1"
}, Dh = { class: "font-medium border-b border-gray-200 pb-1" }, Oh = { class: "text-sm font-medium" }, kh = { class: "text-gray-500 font-normal" }, Ah = {
	key: 0,
	class: "text-xs text-gray-500 ml-1"
}, jh = {
	key: 0,
	class: "w-full text-xs mt-1 border-collapse"
}, Mh = {
	class: "align-top text-gray-600 pr-2",
	style: { width: "90px" }
}, Nh = { class: "py-0.5" }, Ph = {
	key: 0,
	class: "text-gray-400"
}, Fh = { key: 0 }, Ih = {
	key: 0,
	class: "fjk-cue"
}, Lh = {
	key: 1,
	class: "w-full text-xs mt-1 border-collapse"
}, Rh = {
	key: 0,
	class: "fjk-cue"
}, zh = {
	key: 0,
	class: "mt-2 text-xs"
}, Bh = {
	key: 0,
	class: "fjk-cue"
}, Vh = {
	key: 1,
	class: "mt-2 text-xs text-amber-700"
}, Hh = {
	key: 0,
	class: "text-xs text-gray-500 mt-1"
}, Uh = {
	key: 1,
	class: "w-full text-xs mt-1 border-collapse"
}, Wh = {
	key: 0,
	class: "fjk-cue"
}, Gh = { class: "mt-3" }, Kh = {
	key: 0,
	class: "text-xs text-gray-500 mt-1"
}, qh = { class: "text-sm font-medium" }, Jh = { class: "text-gray-500 font-normal" }, Yh = { key: 0 }, Xh = {
	key: 0,
	class: "fjk-cue"
}, Zh = { class: "w-full text-xs mt-1 border-collapse" }, Qh = {
	key: 0,
	class: "fjk-cue"
}, $h = { class: "text-xs mt-1 text-gray-600" }, eg = { class: "mt-3" }, tg = {
	key: 0,
	class: "text-xs text-gray-500 mt-1"
}, ng = { class: "text-sm font-medium" }, rg = { class: "text-gray-500 font-normal" }, ig = { key: 0 }, ag = {
	key: 0,
	class: "fjk-cue"
}, og = { class: "w-full text-xs mt-1 border-collapse" }, sg = {
	key: 0,
	class: "fjk-cue"
}, cg = { class: "text-xs mt-1 text-gray-600" }, lg = { class: "font-medium" }, ug = {
	key: 0,
	class: "text-gray-500"
}, dg = {
	key: 1,
	class: "w-full border-collapse"
}, fg = {
	key: 0,
	class: "fjk-cue"
}, pg = {
	key: 1,
	class: "text-gray-500"
}, mg = {
	key: 2,
	class: "w-full border-collapse"
}, hg = {
	key: 0,
	class: "fjk-cue"
}, gg = {
	key: 3,
	class: "text-gray-500"
}, _g = {
	key: 4,
	class: "w-full border-collapse"
}, vg = {
	key: 0,
	class: "fjk-cue"
}, yg = { class: "mt-1" }, bg = { class: "mt-1" }, xg = { class: "ml-4 list-disc" }, Sg = { class: "ml-4 list-disc" }, Cg = ["href"], wg = {
	key: 5,
	class: "text-gray-500"
}, Tg = {
	key: 1,
	class: "mt-2 text-gray-500"
}, Eg = {
	key: 0,
	class: "border border-gray-200 rounded-lg p-3 mb-3"
}, Dg = { class: "border border-gray-200 rounded-lg p-3 mb-3" }, Og = {
	key: 0,
	class: "mt-2"
}, kg = { key: 1 }, Ag = { key: 0 }, jg = { class: "w-full mt-2 border-collapse" }, Mg = { class: "flex gap-2 mt-2" }, Ng = { class: "border border-gray-200 rounded-lg p-3 mb-3" }, Pg = {
	key: 0,
	class: "flex gap-2 mt-2"
}, Fg = {
	key: 1,
	class: "text-gray-500 mt-1.5"
}, Ig = { class: "border border-gray-200 rounded-lg p-3" }, Lg = {
	key: 0,
	class: "flex gap-2 mt-2 items-center"
}, Rg = ["value"], zg = {
	key: 1,
	class: "text-gray-500 mt-1.5"
}, Bg = /*#__PURE__*/ Mm({
	__name: "App",
	setup(e) {
		function t() {
			return window.frappe && frappe.csrf_token || "";
		}
		async function n(e, n) {
			let r = await fetch("/api/method/" + e, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Frappe-CSRF-Token": t(),
					Accept: "application/json"
				},
				credentials: "same-origin",
				body: JSON.stringify(n || {})
			}), i = await r.json().catch(() => ({}));
			if (!r.ok) {
				let e = i && i._server_messages || i && i.exception || r.statusText;
				throw Error(typeof e == "string" ? e : JSON.stringify(e));
			}
			return i.message;
		}
		async function r(e) {
			let n = new FormData();
			n.append("file", e), n.append("is_private", "0");
			let r = await fetch("/api/method/upload_file", {
				method: "POST",
				headers: { "X-Frappe-CSRF-Token": t() },
				credentials: "same-origin",
				body: n
			}), i = await r.json().catch(() => ({}));
			if (!r.ok) throw Error("Evidence upload failed");
			return i.message.file_url;
		}
		let i = /* @__PURE__ */ L(""), a = /* @__PURE__ */ L(null), o = /* @__PURE__ */ L(null), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L("summary"), u = /* @__PURE__ */ L(""), d = /* @__PURE__ */ L([]), f = /* @__PURE__ */ L(""), p = /* @__PURE__ */ L(""), m = /* @__PURE__ */ L(!1), h = /* @__PURE__ */ rn({
			change_type: "Price",
			negotiation_note: "",
			supplier_requote_ref: ""
		}), g = /* @__PURE__ */ rn({
			change_type: "Price",
			description: "",
			source: "Customer"
		}), _ = /* @__PURE__ */ rn({
			version: "",
			source: "Email",
			evidence: ""
		}), v = null, y = $(() => d.value.filter((e) => e.docstatus === 1)), b = $(() => !!_.version && !!_.evidence && !!_.source), x = $(() => {
			let e = s.value && s.value.organization || a.value && a.value.organization || "", t = (i.value || "").match(/(\d{4})-(\d+)$/);
			return [
				e,
				t ? t[1] : "",
				t ? "#" + t[2] : ""
			].filter(Boolean).join(" · ");
		}), S = $(() => s.value && s.value.shared || {}), C = $(() => {
			let e = S.value;
			return {
				destination: e.fjk_destination_route || "—",
				dates: e.fjk_exact_dates || e.fjk_timeframe || "—",
				duration: e.fjk_duration || "—"
			};
		});
		function w(e, t, n) {
			return e + " " + (e === 1 ? t : n);
		}
		let T = $(() => {
			let e = S.value, t = [];
			e.fjk_total_pax && t.push(e.fjk_total_pax + " pax");
			let n = [];
			return e.fjk_adults && n.push(w(e.fjk_adults, "adult", "adults")), e.fjk_children && n.push(w(e.fjk_children, "child", "children")), e.fjk_infants && n.push(w(e.fjk_infants, "infant", "infants")), n.length && t.push(n.join(", ")), t.join(" · ") || "—";
		}), E = $(() => (s.value && s.value.components || []).filter((e) => e.requested)), D = $(() => {
			let e = s.value && s.value.components || [], t = E.value;
			return t.length ? e.length > 0 && e.every((e) => e.requested) && e.length >= 3 ? "Full package" : t.map((e) => e.component).join(" + ") : "—";
		}), O = $(() => {
			let e = s.value;
			if (!e) return [];
			let t = e.requirement_lines_by_domain || {}, n = (e) => (t[e] || []).map((e) => ({
				text: e.item + (e.detail ? " — " + e.detail : ""),
				status: e.status
			})), r = [
				{
					label: "Transportation",
					items: n("Transportation")
				},
				{
					label: "Accommodation",
					items: n("Accommodation")
				},
				{
					label: "Meals",
					items: n("Meals")
				},
				{
					label: "Activities / Tickets",
					items: (e.activity_items || []).map((e) => ({
						text: e.item + (e.quantity ? " ×" + e.quantity : ""),
						status: e.status
					}))
				},
				{
					label: "Guide",
					items: (e.guide_requirements || []).map((e) => ({
						text: (e.languages || "—") + (e.coverage_scope ? " — " + e.coverage_scope : ""),
						status: e.status
					}))
				},
				{
					label: "Special Requirements",
					items: n("Special Requirements")
				}
			];
			return ["Flights", "Other"].forEach((e) => {
				(t[e] || []).length && r.push({
					label: e,
					items: n(e)
				});
			}), r;
		}), k = $(() => s.value && s.value.outstanding || {
			missing: [],
			to_confirm: []
		}), A = $(() => (s.value && s.value.requirement_lines || []).filter((e) => e.status === "KNOWN").map((e) => (e.domain ? e.domain + " / " : "") + e.item)), ee = $(() => {
			let e = s.value;
			return e ? [
				...(e.requirement_lines || []).map((e) => ({
					d: e.domain,
					i: e.item,
					st: e.status
				})),
				...(e.guide_requirements || []).map((e) => ({
					d: "Guide",
					i: e.languages,
					st: e.status
				})),
				...(e.activity_items || []).map((e) => ({
					d: "Activities",
					i: e.item,
					st: e.status
				})),
				...(e.components || []).map((e) => ({
					d: "Components",
					i: e.component,
					st: e.status
				}))
			].filter((e) => e.st === "CUSTOMER-CONFIRMED").map((e) => (e.d ? e.d + " / " : "") + e.i) : [];
		}), te = {
			fjk_request_nature: "Request Nature",
			fjk_commercial_intent: "Commercial Intent",
			fjk_destination_route: "Destination / Route",
			fjk_timeframe: "Timeframe",
			fjk_exact_dates: "Exact Dates",
			fjk_duration: "Duration",
			fjk_total_pax: "Total Pax",
			fjk_adults: "Adults",
			fjk_children: "Children",
			fjk_infants: "Infants",
			fjk_trip_purpose: "Trip Purpose / Type",
			fjk_other_shared_context: "Other Shared Context",
			fjk_ready_for_quotation: "Ready for Quotation",
			fjk_info_complete: "Info Complete"
		};
		function ne(e) {
			return e == null || e === "" ? "—" : typeof e == "boolean" ? e ? "Yes" : "No" : e;
		}
		function re(e) {
			return +(e === !0 || e === 1 || e === "1");
		}
		function ie(e, t) {
			return e === "fjk_ready_for_quotation" ? re(t) ? "Yes" : "Not yet" : e === "fjk_info_complete" ? re(t) ? "Yes" : "No" : ne(t);
		}
		let ae = {
			MISSING: {
				cls: "fjk-st-missing",
				cue: "!"
			},
			"TO CONFIRM": {
				cls: "fjk-st-confirm",
				cue: "?"
			},
			"CUSTOMER-CONFIRMED": {
				cls: "fjk-st-confirmed",
				cue: "✓"
			},
			KNOWN: {
				cls: "fjk-st-known",
				cue: ""
			},
			"NOT APPLICABLE": {
				cls: "fjk-st-na",
				cue: ""
			}
		};
		function oe(e) {
			return ae[e] && ae[e].cls || "fjk-st-unknown";
		}
		function j(e) {
			return ae[e] && ae[e].cue || "";
		}
		let M = $(() => Object.entries(S.value).map(([e, t]) => ({
			label: te[e] || e,
			value: ie(e, t)
		}))), se = $(() => {
			let e = s.value && s.value.requirement_lines_by_domain || {}, t = [
				"Transportation",
				"Accommodation",
				"Meals"
			], n = [];
			return Object.keys(e).forEach((r) => {
				t.includes(r) || n.push(...e[r]);
			}), [{
				domain: "Special / Other Requirements",
				rows: n
			}];
		});
		function ce() {
			let e = S.value || {}, t = ([e.fjk_exact_dates, e.fjk_timeframe].filter(Boolean).join(" ").match(/\d{4}-\d{2}-\d{2}/g) || []).slice().sort();
			return t.length ? {
				start: t[0],
				end: t[t.length - 1]
			} : null;
		}
		let le = $(ce);
		function ue(e, t) {
			if (!e) return [];
			let n = e, r = t || e;
			if (n > r) {
				let e = n;
				n = r, r = e;
			}
			let i = [], a = /* @__PURE__ */ new Date(n + "T00:00:00Z"), o = /* @__PURE__ */ new Date(r + "T00:00:00Z"), s = 0;
			for (; a <= o && s < 120;) i.push(a.toISOString().slice(0, 10)), a.setUTCDate(a.getUTCDate() + 1), s += 1;
			return i;
		}
		let de = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		function fe(e) {
			if (!e || typeof e != "string") return e || "—";
			let t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
			if (!t) return e;
			let n = de[Number(t[2]) - 1] || t[2];
			return Number(t[3]) + " " + n + " " + t[1];
		}
		let pe = $(() => {
			let e = le.value;
			return e ? ue(e.start, e.end) : [];
		}), me = $(() => pe.value.length > 0);
		function he(e) {
			return e.date_from ? ue(e.date_from, e.date_to) : [];
		}
		function ge(e) {
			let t = (s.value && s.value.requirement_lines_by_domain || {})[e] || [], n = pe.value;
			if (!n.length) return {
				domain: e,
				rows: t,
				days: [],
				undated: [],
				outOfWindow: []
			};
			let r = n.map((e, t) => ({
				day: t + 1,
				date: e,
				items: []
			})), i = {};
			r.forEach((e) => {
				i[e.date] = e;
			});
			let a = [], o = [];
			return t.forEach((e) => {
				let t = he(e);
				if (!t.length) {
					a.push(e);
					return;
				}
				let n = t.filter((e) => i[e]);
				if (!n.length) {
					o.push(e);
					return;
				}
				n.forEach((t) => i[t].items.push(e));
			}), {
				domain: e,
				rows: t,
				days: r,
				undated: a,
				outOfWindow: o
			};
		}
		let _e = $(() => [
			"Transportation",
			"Accommodation",
			"Meals"
		].map((e) => ge(e))), ve = [
			"Breakfast",
			"Lunch",
			"Dinner",
			"Other"
		];
		function ye(e) {
			let t = ve.map((e) => ({
				label: e,
				rows: []
			}));
			return e.forEach((e) => {
				let n = ((e.item || "") + " " + (e.detail || "")).toLowerCase(), r = n.includes("breakfast") ? 0 : n.includes("lunch") ? 1 : n.includes("dinner") ? 2 : 3;
				t[r].rows.push(e);
			}), t;
		}
		let be = {
			PASS: {
				cls: "fjk-st-confirmed",
				cue: "✓"
			},
			WARNING: {
				cls: "fjk-st-confirm",
				cue: "!"
			},
			ERROR: {
				cls: "fjk-st-missing",
				cue: "✕"
			},
			"NOT DETERMINABLE": {
				cls: "fjk-st-na",
				cue: "?"
			}
		};
		function xe(e) {
			return be[e] && be[e].cls || "fjk-st-unknown";
		}
		function Se(e) {
			return be[e] && be[e].cue || "";
		}
		let Ce = $(() => c.value && c.value.transportation || []), Te = $(() => c.value && c.value.accommodation || []);
		async function Ee(e) {
			p.value = "", m.value = !0;
			try {
				await e();
			} catch (e) {
				p.value = e && e.message ? e.message : String(e);
			} finally {
				m.value = !1;
			}
		}
		async function De() {
			a.value = await n("feeljapank_crm.api.get_deal_context", { deal: i.value }), s.value = await n("feeljapank_crm.api.get_deal_summary", { deal: i.value }), c.value = await n("feeljapank_crm.api.get_allocation_validation", { deal: i.value }), o.value = await n("feeljapank_crm.api.get_readiness", { deal: i.value });
			let e = await n("feeljapank_crm.api.get_quotation", { deal: i.value });
			u.value = e.quotation || "", u.value && await Oe();
		}
		async function Oe() {
			if (!u.value) {
				d.value = [], f.value = "";
				return;
			}
			let e = await n("feeljapank_crm.api.get_version_history", { quotation: u.value });
			if (d.value = e.versions || [], f.value = e.active_confirmed_version || "", !_.version) {
				let e = y.value[y.value.length - 1];
				e && (_.version = e.name);
			}
		}
		async function ke() {
			await Ee(async () => {
				let e = await n("feeljapank_crm.api.create_quotation", { deal: i.value });
				u.value = e.quotation, await Oe();
			});
		}
		async function Ae() {
			await Ee(async () => {
				u.value || await ke(), await n("feeljapank_crm.api.create_version", {
					quotation: u.value,
					change_type: h.change_type,
					negotiation_note: h.negotiation_note,
					supplier_requote_ref: h.supplier_requote_ref
				}), h.negotiation_note = "", h.supplier_requote_ref = "", await Oe();
			});
		}
		async function je(e) {
			await Ee(async () => {
				await n("feeljapank_crm.api.submit_version", { name: e }), await Oe();
			});
		}
		async function Me() {
			await Ee(async () => {
				await n("feeljapank_crm.api.add_negotiation_entry", {
					quotation: u.value,
					change_type: g.change_type,
					description: g.description,
					source: g.source,
					quotation_version: _.version || null
				}), g.description = "";
			});
		}
		function Ne(e) {
			let t = e.target.files && e.target.files[0];
			v = t || null, _.evidence = t ? t.name : "";
		}
		async function Pe() {
			await Ee(async () => {
				let e = _.evidence;
				v && (e = await r(v)), await n("feeljapank_crm.api.confirm_version", {
					quotation: u.value,
					version: _.version,
					source: _.source,
					evidence: e
				}), await Oe();
			});
		}
		function Fe() {
			window.open("/crm/deals/" + encodeURIComponent(i.value), "_blank");
		}
		async function Ie(e) {
			await Ee(async () => {
				await n("feeljapank_crm.api.set_info_complete", {
					deal: i.value,
					value: e
				}), s.value = await n("feeljapank_crm.api.get_deal_summary", { deal: i.value }), a.value = await n("feeljapank_crm.api.get_deal_context", { deal: i.value });
			});
		}
		function Le() {
			!document.hidden && i.value && Ee(De);
		}
		return ra(() => {
			let e = new URL(window.location.href);
			i.value = e.searchParams.get("deal") || window.frappe && frappe.route_options && frappe.route_options.deal || "", i.value && Ee(De), document.addEventListener("visibilitychange", Le), window.addEventListener("focus", Le);
		}), oa(() => {
			document.removeEventListener("visibilitychange", Le), window.removeEventListener("focus", Le);
		}), (e, t) => (G(), K("div", Hm, [i.value ? (G(), K("div", Wm, [J("div", Gm, [
			J("div", Km, [J("div", null, [J("h1", qm, N(x.value || i.value), 1), J("div", Jm, [s.value ? (G(), K("span", Ym, N(s.value.organization || "—"), 1)) : (G(), K("span", Xm, "Loading…")), s.value ? (G(), K("span", Zm, " · " + N(s.value.status || "—"), 1)) : Z("", !0)])]), Y(R(Vm), {
				label: "Open in CRM",
				onClick: Fe
			})]),
			p.value ? (G(), K("div", Qm, N(p.value), 1)) : Z("", !0),
			m.value ? (G(), K("div", $m, "Working…")) : Z("", !0),
			J("div", eh, [
				Y(R(Vm), {
					variant: l.value === "summary" ? "solid" : void 0,
					label: "Summary",
					onClick: t[0] ||= (e) => l.value = "summary"
				}, null, 8, ["variant"]),
				Y(R(Vm), {
					variant: l.value === "details" ? "solid" : void 0,
					label: "Full Details",
					onClick: t[1] ||= (e) => l.value = "details"
				}, null, 8, ["variant"]),
				Y(R(Vm), {
					variant: l.value === "supplier" ? "solid" : void 0,
					label: "Supplier Quotation",
					onClick: t[2] ||= (e) => l.value = "supplier"
				}, null, 8, ["variant"])
			])
		]), l.value === "summary" ? (G(), K(U, { key: 0 }, [
			J("section", th, [t[22] ||= J("b", null, "Deal Summary", -1), s.value ? (G(), K("div", nh, [
				J("div", null, [t[14] ||= X("Company: ", -1), J("b", null, N(s.value.organization || "—"), 1)]),
				J("div", null, [t[15] ||= X("Destination / route: ", -1), J("b", null, N(C.value.destination), 1)]),
				J("div", null, [
					t[16] ||= X("Dates: ", -1),
					J("b", null, N(C.value.dates), 1),
					t[17] ||= X(" · Duration: ", -1),
					J("b", null, N(C.value.duration), 1)
				]),
				J("div", null, [t[18] ||= X("Passenger composition: ", -1), J("b", null, N(T.value), 1)]),
				J("div", null, [t[19] ||= X("Scope: ", -1), J("b", null, N(D.value), 1)]),
				J("div", null, [
					t[20] ||= X("Status: ", -1),
					J("b", null, N(s.value.status || "—"), 1),
					t[21] ||= X(" · Next action: ", -1),
					J("b", null, N(s.value.next_step || "—"), 1)
				])
			])) : (G(), K("div", rh, "Loading summary…"))]),
			(G(!0), K(U, null, V(O.value, (e) => (G(), K("section", {
				key: e.label,
				class: "border border-gray-200 rounded-lg p-3 mb-3"
			}, [J("b", null, N(e.label), 1), J("div", ih, [e.items.length ? (G(), K("ul", oh, [(G(!0), K(U, null, V(e.items, (e, t) => (G(), K("li", { key: t }, [X(N(e.text) + " ", 1), J("span", { class: we(["fjk-status", oe(e.status)]) }, [j(e.status) ? (G(), K("span", sh, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)]))), 128))])) : (G(), K("span", ah, "None recorded."))])]))), 128)),
			J("section", ch, [
				t[31] ||= J("b", null, "Information Status", -1),
				s.value ? (G(), K("div", lh, [
					J("div", null, [
						t[23] ||= X(" Ready to proceed: ", -1),
						J("b", null, N(s.value.ready_for_quotation ? "Yes" : "Not yet"), 1),
						t[24] ||= J("span", { class: "text-gray-500" }, " (advisory)", -1)
					]),
					J("div", null, [t[25] ||= J("div", { class: "fjk-status fjk-st-known" }, "Collected", -1), A.value.length ? (G(), K("ul", dh, [(G(!0), K(U, null, V(A.value, (e, t) => (G(), K("li", { key: "c" + t }, N(e), 1))), 128))])) : (G(), K("span", uh, "Nothing recorded yet."))]),
					J("div", null, [t[26] ||= J("div", { class: "fjk-status fjk-st-confirm" }, [J("span", { class: "fjk-cue" }, "?"), X("To confirm")], -1), k.value.to_confirm.length ? (G(), K("ul", ph, [(G(!0), K(U, null, V(k.value.to_confirm, (e) => (G(), K("li", { key: "t" + e.area + e.item }, N(e.area) + N(e.domain ? " / " + e.domain : "") + ": " + N(e.item), 1))), 128))])) : (G(), K("span", fh, "None outstanding."))]),
					J("div", null, [t[27] ||= J("div", { class: "fjk-status fjk-st-missing" }, [J("span", { class: "fjk-cue" }, "!"), X("Missing")], -1), k.value.missing.length ? (G(), K("ul", hh, [(G(!0), K(U, null, V(k.value.missing, (e) => (G(), K("li", { key: "m" + e.area + e.item }, N(e.area) + N(e.domain ? " / " + e.domain : "") + ": " + N(e.item), 1))), 128))])) : (G(), K("span", mh, "Nothing missing."))]),
					ee.value.length ? (G(), K("div", gh, [t[28] ||= J("div", { class: "fjk-status fjk-st-confirmed" }, [J("span", { class: "fjk-cue" }, "✓"), X("Customer-confirmed")], -1), J("ul", _h, [(G(!0), K(U, null, V(ee.value, (e, t) => (G(), K("li", { key: "cc" + t }, N(e), 1))), 128))])])) : Z("", !0),
					t[29] ||= J("div", { class: "text-xs text-gray-500" }, " Advisory only. The operator decides whether the information is sufficient. ", -1)
				])) : Z("", !0),
				s.value ? (G(), K("div", vh, [J("span", null, [t[30] ||= X("Info Complete: ", -1), J("b", null, N(s.value.info_complete ? "YES" : "NO"), 1)]), s.value.info_complete ? (G(), q(R(Vm), {
					key: 1,
					label: "Reopen Information Collection",
					onClick: t[4] ||= (e) => Ie(!1)
				})) : (G(), q(R(Vm), {
					key: 0,
					variant: "solid",
					label: "Mark Info Complete",
					onClick: t[3] ||= (e) => Ie(!0)
				}))])) : Z("", !0),
				t[32] ||= J("div", { class: "mt-1 text-xs text-gray-500" }, " Info Complete means the operator considers the information sufficient to proceed. It does not mean customer acceptance, supplier acceptance, quotation confirmation, Deal Won, or Trip creation. ", -1)
			])
		], 64)) : l.value === "details" ? (G(), K("section", yh, [t[71] ||= J("b", null, "Full Details · Information Gathering (read-only)", -1), s.value ? (G(), K("div", bh, [
			J("div", xh, [t[33] ||= X("Deal ID: ", -1), J("b", null, N(i.value), 1)]),
			t[61] ||= J("div", { class: "mt-3 font-medium" }, "Deal / Customer Context", -1),
			J("table", Sh, [J("tbody", null, [(G(!0), K(U, null, V(M.value, (e) => (G(), K("tr", {
				key: e.label,
				class: "border-t border-gray-100"
			}, [J("td", Ch, N(e.label), 1), J("td", wh, N(e.value), 1)]))), 128))])]),
			t[62] ||= J("div", { class: "mt-3 font-medium" }, "Requested Components", -1),
			J("table", Th, [t[34] ||= J("thead", null, [J("tr", null, [
				J("th", { align: "left" }, "Component"),
				J("th", { align: "left" }, "Requested"),
				J("th", { align: "left" }, "Status"),
				J("th", { align: "left" }, "Notes")
			])], -1), J("tbody", null, [(G(!0), K(U, null, V(s.value.components || [], (e) => (G(), K("tr", {
				key: e.component,
				class: "border-t border-gray-100"
			}, [
				J("td", null, N(e.component), 1),
				J("td", null, N(e.requested ? "yes" : "no"), 1),
				J("td", null, N(e.status || "—"), 1),
				J("td", null, N(e.notes || ""), 1)
			]))), 128))])]),
			t[63] ||= J("div", { class: "mt-4 font-medium" }, [X("Primary Domain Detail — Day-by-Day "), J("span", { class: "text-gray-500 font-normal" }, "(advisory)")], -1),
			t[64] ||= J("div", { class: "text-xs text-gray-500 mb-1" }, " Advisory only — built from captured requirement lines. It does not assert that every day requires a line, does not invent data, and does not change readiness. ", -1),
			me.value ? Z("", !0) : (G(), K("div", Eh, " Trip window not established from current data — showing captured requirement lines per domain (no day grouping). ")),
			(G(!0), K(U, null, V(_e.value, (e) => (G(), K("div", {
				key: e.domain,
				class: "mt-3"
			}, [J("div", Dh, N(e.domain), 1), e.days.length ? (G(), K(U, { key: 0 }, [
				(G(!0), K(U, null, V(e.days, (n) => (G(), K("div", {
					key: n.date,
					class: "mt-2"
				}, [J("div", Oh, [X(N(fe(n.date)) + " ", 1), J("span", kh, "· Day " + N(n.day), 1)]), n.items.length ? (G(), K(U, { key: 1 }, [e.domain === "Meals" ? (G(), K("table", jh, [J("tbody", null, [(G(!0), K(U, null, V(ye(n.items), (e) => (G(), K("tr", { key: e.label }, [J("td", Mh, N(e.label), 1), J("td", Nh, [e.rows.length ? Z("", !0) : (G(), K("span", Ph, "—")), (G(!0), K(U, null, V(e.rows, (e, t) => (G(), K("span", {
					key: t,
					style: { "margin-right": "8px" }
				}, [
					X(N(e.item), 1),
					e.detail ? (G(), K("span", Fh, " · " + N(e.detail), 1)) : Z("", !0),
					J("span", {
						class: we(["fjk-status", oe(e.status)]),
						style: { "margin-left": "4px" }
					}, [j(e.status) ? (G(), K("span", Ih, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)
				]))), 128))])]))), 128))])])) : (G(), K("table", Lh, [t[35] ||= J("thead", null, [J("tr", null, [
					J("th", { align: "left" }, "Item"),
					J("th", { align: "left" }, "Detail"),
					J("th", { align: "left" }, "Location / Route"),
					J("th", { align: "left" }, "Pax / Qty"),
					J("th", { align: "left" }, "Status")
				])], -1), J("tbody", null, [(G(!0), K(U, null, V(n.items, (e, t) => (G(), K("tr", {
					key: t,
					class: "border-t border-gray-100"
				}, [
					J("td", null, N(e.item), 1),
					J("td", null, N(e.detail || ""), 1),
					J("td", null, N(e.location || ""), 1),
					J("td", null, N(e.pax_or_qty || ""), 1),
					J("td", null, [J("span", { class: we(["fjk-status", oe(e.status)]) }, [j(e.status) ? (G(), K("span", Rh, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)])
				]))), 128))])]))], 64)) : (G(), K("div", Ah, " No " + N(e.domain.toLowerCase()) + " requirement line captured for this day (advisory). ", 1))]))), 128)),
				e.undated.length ? (G(), K("div", zh, [t[36] ||= J("span", { class: "text-gray-600" }, "Undated lines:", -1), (G(!0), K(U, null, V(e.undated, (e, t) => (G(), K("span", {
					key: "u" + t,
					style: { "margin-left": "6px" }
				}, [X(N(e.item) + " ", 1), J("span", { class: we(["fjk-status", oe(e.status)]) }, [j(e.status) ? (G(), K("span", Bh, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)]))), 128))])) : Z("", !0),
				e.outOfWindow.length ? (G(), K("div", Vh, N(e.outOfWindow.length) + " line(s) dated outside the trip window (advisory). ", 1)) : Z("", !0)
			], 64)) : (G(), K(U, { key: 1 }, [e.rows.length ? (G(), K("table", Uh, [t[37] ||= J("thead", null, [J("tr", null, [
				J("th", { align: "left" }, "Dates"),
				J("th", { align: "left" }, "Item"),
				J("th", { align: "left" }, "Detail"),
				J("th", { align: "left" }, "Location / Route"),
				J("th", { align: "left" }, "Pax / Qty"),
				J("th", { align: "left" }, "Status")
			])], -1), J("tbody", null, [(G(!0), K(U, null, V(e.rows, (e, t) => (G(), K("tr", {
				key: t,
				class: "border-t border-gray-100"
			}, [
				J("td", null, N(fe(e.date_from)) + N(e.date_to ? " – " + fe(e.date_to) : ""), 1),
				J("td", null, N(e.item), 1),
				J("td", null, N(e.detail || ""), 1),
				J("td", null, N(e.location || ""), 1),
				J("td", null, N(e.pax_or_qty || ""), 1),
				J("td", null, [J("span", { class: we(["fjk-status", oe(e.status)]) }, [j(e.status) ? (G(), K("span", Wh, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)])
			]))), 128))])])) : (G(), K("div", Hh, " No " + N(e.domain.toLowerCase()) + " requirement lines captured. ", 1))], 64))]))), 128)),
			t[65] ||= J("div", { class: "mt-4 font-medium" }, [X("Allocation & Validation "), J("span", { class: "text-gray-500 font-normal" }, "(advisory; allocation is edited in CRM)")], -1),
			t[66] ||= J("div", { class: "text-xs text-gray-500 mb-1" }, " Advisory only. The suggested allocation is not prescriptive; the operator controls the actual allocation in CRM. Validation is non-blocking and does not change readiness. ", -1),
			J("div", Gh, [
				t[44] ||= J("div", { class: "font-medium border-b border-gray-200 pb-1" }, "Transportation Allocation", -1),
				Ce.value.length ? Z("", !0) : (G(), K("div", Kh, "No transportation allocation recorded.")),
				(G(!0), K(U, null, V(Ce.value, (e, n) => (G(), K("div", {
					key: "ta" + n,
					class: "mt-2 border border-gray-200 rounded p-2"
				}, [
					J("div", qh, [
						X(N(e.name || "Transport") + " ", 1),
						J("span", Jh, [X(N(fe(e.date_from)) + N(e.date_to && e.date_to !== e.date_from ? " – " + fe(e.date_to) : ""), 1), e.location ? (G(), K("span", Yh, " · " + N(e.location), 1)) : Z("", !0)]),
						J("span", {
							class: we(["fjk-status", xe(e.state)]),
							style: { "margin-left": "6px" }
						}, [Se(e.state) ? (G(), K("span", Xh, N(Se(e.state)), 1)) : Z("", !0), X(N(e.state), 1)], 2)
					]),
					J("table", Zh, [t[38] ||= J("thead", null, [J("tr", null, [
						J("th", { align: "left" }, "Vehicle Type"),
						J("th", { align: "left" }, "Capacity"),
						J("th", { align: "left" }, "Qty"),
						J("th", { align: "left" }, "Capacity Total"),
						J("th", { align: "left" }, "Allocated Pax"),
						J("th", { align: "left" }, "Special"),
						J("th", { align: "left" }, "Status")
					])], -1), J("tbody", null, [(G(!0), K(U, null, V(e.rows, (e, t) => (G(), K("tr", {
						key: t,
						class: "border-t border-gray-100"
					}, [
						J("td", null, N(e.type || ""), 1),
						J("td", null, N(e.capacity || ""), 1),
						J("td", null, N(e.quantity || ""), 1),
						J("td", null, N(e.row_capacity), 1),
						J("td", null, N(e.allocated_pax || ""), 1),
						J("td", null, N(e.is_special ? "yes" : ""), 1),
						J("td", null, [J("span", { class: we(["fjk-status", oe(e.status)]) }, [j(e.status) ? (G(), K("span", Qh, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)])
					]))), 128))])]),
					J("div", $h, [
						t[39] ||= X(" Demand: ", -1),
						J("b", null, N(e.demand === null || e.demand === void 0 ? "—" : e.demand), 1),
						t[40] ||= X(" · Total capacity: ", -1),
						J("b", null, N(e.total_capacity), 1),
						t[41] ||= X(" · Allocated: ", -1),
						J("b", null, N(e.total_allocated), 1),
						t[42] ||= X(" · Remaining: ", -1),
						J("b", null, N(e.remaining === null ? "—" : e.remaining), 1),
						t[43] ||= X(" · Excess: ", -1),
						J("b", null, N(e.excess), 1)
					])
				]))), 128))
			]),
			J("div", eg, [
				t[51] ||= J("div", { class: "font-medium border-b border-gray-200 pb-1" }, "Accommodation Allocation", -1),
				Te.value.length ? Z("", !0) : (G(), K("div", tg, "No accommodation allocation recorded.")),
				(G(!0), K(U, null, V(Te.value, (e, n) => (G(), K("div", {
					key: "aa" + n,
					class: "mt-2 border border-gray-200 rounded p-2"
				}, [
					J("div", ng, [
						X(N(e.name || "Stay") + " ", 1),
						J("span", rg, [X(N(fe(e.date_from)) + N(e.date_to && e.date_to !== e.date_from ? " – " + fe(e.date_to) : ""), 1), e.location ? (G(), K("span", ig, " · " + N(e.location), 1)) : Z("", !0)]),
						J("span", {
							class: we(["fjk-status", xe(e.state)]),
							style: { "margin-left": "6px" }
						}, [Se(e.state) ? (G(), K("span", ag, N(Se(e.state)), 1)) : Z("", !0), X(N(e.state), 1)], 2)
					]),
					J("table", og, [t[45] ||= J("thead", null, [J("tr", null, [
						J("th", { align: "left" }, "Room Type"),
						J("th", { align: "left" }, "Occupancy"),
						J("th", { align: "left" }, "Qty"),
						J("th", { align: "left" }, "Capacity Total"),
						J("th", { align: "left" }, "Allocated Pax"),
						J("th", { align: "left" }, "Special"),
						J("th", { align: "left" }, "Status")
					])], -1), J("tbody", null, [(G(!0), K(U, null, V(e.rows, (e, t) => (G(), K("tr", {
						key: t,
						class: "border-t border-gray-100"
					}, [
						J("td", null, N(e.type || ""), 1),
						J("td", null, N(e.capacity || ""), 1),
						J("td", null, N(e.quantity || ""), 1),
						J("td", null, N(e.row_capacity), 1),
						J("td", null, N(e.allocated_pax || ""), 1),
						J("td", null, N(e.is_special ? "yes" : ""), 1),
						J("td", null, [J("span", { class: we(["fjk-status", oe(e.status)]) }, [j(e.status) ? (G(), K("span", sg, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)])
					]))), 128))])]),
					J("div", cg, [
						t[46] ||= X(" Demand: ", -1),
						J("b", null, N(e.demand === null || e.demand === void 0 ? "—" : e.demand), 1),
						t[47] ||= X(" · Total capacity: ", -1),
						J("b", null, N(e.total_capacity), 1),
						t[48] ||= X(" · Allocated: ", -1),
						J("b", null, N(e.total_allocated), 1),
						t[49] ||= X(" · Remaining: ", -1),
						J("b", null, N(e.remaining === null ? "—" : e.remaining), 1),
						t[50] ||= X(" · Excess: ", -1),
						J("b", null, N(e.excess), 1)
					])
				]))), 128))
			]),
			(G(!0), K(U, null, V(se.value, (e) => (G(), K("div", {
				key: e.domain,
				class: "mt-3"
			}, [J("div", lg, N(e.domain), 1), e.rows.length ? (G(), K("table", dg, [t[52] ||= J("thead", null, [J("tr", null, [
				J("th", { align: "left" }, "Domain"),
				J("th", { align: "left" }, "Item"),
				J("th", { align: "left" }, "Detail"),
				J("th", { align: "left" }, "Dates"),
				J("th", { align: "left" }, "Pax/Qty"),
				J("th", { align: "left" }, "Location"),
				J("th", { align: "left" }, "Status")
			])], -1), J("tbody", null, [(G(!0), K(U, null, V(e.rows, (e) => (G(), K("tr", {
				key: e.domain + e.item + (e.detail || ""),
				class: "border-t border-gray-100"
			}, [
				J("td", null, N(e.domain), 1),
				J("td", null, N(e.item), 1),
				J("td", null, N(e.detail || ""), 1),
				J("td", null, N(e.date_from || "") + N(e.date_to ? " – " + e.date_to : ""), 1),
				J("td", null, N(e.pax_or_qty || ""), 1),
				J("td", null, N(e.location || ""), 1),
				J("td", null, [J("span", { class: we(["fjk-status", oe(e.status)]) }, [j(e.status) ? (G(), K("span", fg, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)])
			]))), 128))])])) : (G(), K("span", ug, "None recorded."))]))), 128)),
			t[67] ||= J("div", { class: "mt-3 font-medium" }, "Activities / Tickets", -1),
			(s.value.activity_items || []).length ? (G(), K("table", mg, [t[53] ||= J("thead", null, [J("tr", null, [
				J("th", { align: "left" }, "Item"),
				J("th", { align: "left" }, "Qty"),
				J("th", { align: "left" }, "Date/Time"),
				J("th", { align: "left" }, "Pax/Coverage"),
				J("th", { align: "left" }, "Status"),
				J("th", { align: "left" }, "Notes")
			])], -1), J("tbody", null, [(G(!0), K(U, null, V(s.value.activity_items || [], (e) => (G(), K("tr", {
				key: e.item,
				class: "border-t border-gray-100"
			}, [
				J("td", null, N(e.item), 1),
				J("td", null, N(e.quantity || ""), 1),
				J("td", null, N(e.date_time || ""), 1),
				J("td", null, N(e.pax_or_coverage || ""), 1),
				J("td", null, [J("span", { class: we(["fjk-status", oe(e.status)]) }, [j(e.status) ? (G(), K("span", hg, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)]),
				J("td", null, N(e.notes || ""), 1)
			]))), 128))])])) : (G(), K("span", pg, "None recorded.")),
			t[68] ||= J("div", { class: "mt-3 font-medium" }, "Guide", -1),
			(s.value.guide_requirements || []).length ? (G(), K("table", _g, [t[54] ||= J("thead", null, [J("tr", null, [
				J("th", { align: "left" }, "Languages"),
				J("th", { align: "left" }, "Dates"),
				J("th", { align: "left" }, "Duration"),
				J("th", { align: "left" }, "Location"),
				J("th", { align: "left" }, "Pax"),
				J("th", { align: "left" }, "Scope"),
				J("th", { align: "left" }, "Status")
			])], -1), J("tbody", null, [(G(!0), K(U, null, V(s.value.guide_requirements || [], (e) => (G(), K("tr", {
				key: (e.languages || "") + (e.date_from || ""),
				class: "border-t border-gray-100"
			}, [
				J("td", null, N(e.languages || ""), 1),
				J("td", null, N(e.date_from || "") + N(e.date_to ? " – " + e.date_to : ""), 1),
				J("td", null, N(e.duration || ""), 1),
				J("td", null, N(e.location || ""), 1),
				J("td", null, N(e.pax || ""), 1),
				J("td", null, N(e.coverage_scope || ""), 1),
				J("td", null, [J("span", { class: we(["fjk-status", oe(e.status)]) }, [j(e.status) ? (G(), K("span", vg, N(j(e.status)), 1)) : Z("", !0), X(N(e.status || "—"), 1)], 2)])
			]))), 128))])])) : (G(), K("span", gg, "None recorded.")),
			t[69] ||= J("div", { class: "mt-3 font-medium" }, "Information Status / Readiness", -1),
			J("div", yg, [
				t[55] ||= X(" Ready to proceed: ", -1),
				J("b", null, N(s.value.ready_for_quotation ? "Yes" : "Not yet"), 1),
				t[56] ||= J("span", { class: "text-gray-500" }, " (advisory)", -1)
			]),
			J("div", bg, [
				t[57] ||= X(" To confirm: ", -1),
				J("b", null, N(k.value.to_confirm.length), 1),
				t[58] ||= X(" · Missing: ", -1),
				J("b", null, N(k.value.missing.length), 1)
			]),
			J("ul", xg, [(G(!0), K(U, null, V(k.value.missing, (e) => (G(), K("li", { key: "dm" + e.area + e.item }, [t[59] ||= J("span", { class: "fjk-status fjk-st-missing" }, [J("span", { class: "fjk-cue" }, "!"), X("MISSING")], -1), X(" — " + N(e.area) + N(e.domain ? " / " + e.domain : "") + ": " + N(e.item), 1)]))), 128)), (G(!0), K(U, null, V(k.value.to_confirm, (e) => (G(), K("li", { key: "dt" + e.area + e.item }, [t[60] ||= J("span", { class: "fjk-status fjk-st-confirm" }, [J("span", { class: "fjk-cue" }, "?"), X("TO CONFIRM")], -1), X(" — " + N(e.area) + N(e.domain ? " / " + e.domain : "") + ": " + N(e.item), 1)]))), 128))]),
			t[70] ||= J("div", { class: "mt-3 font-medium" }, "Source evidence", -1),
			J("ul", Sg, [(G(!0), K(U, null, V(s.value.evidence || [], (e) => (G(), K("li", { key: e.name }, [J("a", {
				href: e.file_url,
				target: "_blank",
				rel: "noopener"
			}, N(e.file_name), 9, Cg)]))), 128))]),
			(s.value.evidence || []).length ? Z("", !0) : (G(), K("div", wg, "No attachments."))
		])) : (G(), K("div", Tg, "Loading…"))])) : (G(), K(U, { key: 2 }, [s.value && s.value.info_complete ? (G(), K(U, { key: 1 }, [
			t[83] ||= J("section", { class: "border border-gray-200 rounded-lg p-3 mb-3" }, [J("b", null, "Supplier Quotation"), J("div", { class: "mt-2 text-gray-500" }, " Supplier Quotation workflow is not yet implemented. The area below is the existing quotation prototype retained for continuity. ")], -1),
			J("section", Dg, [t[77] ||= J("b", null, "Quotation & version history", -1), u.value ? (G(), K("div", kg, [
				J("div", null, [
					t[74] ||= X(" Quotation: ", -1),
					J("b", null, N(u.value), 1),
					f.value ? (G(), K("span", Ag, [t[73] ||= X(" · active confirmed: ", -1), J("b", null, N(f.value), 1)])) : Z("", !0)
				]),
				J("table", jg, [t[75] ||= J("thead", null, [J("tr", null, [
					J("th", { align: "left" }, "Version"),
					J("th", { align: "left" }, "No"),
					J("th", { align: "left" }, "State"),
					J("th", { align: "left" }, "Total"),
					J("th", { align: "left" }, "Action")
				])], -1), J("tbody", null, [(G(!0), K(U, null, V(d.value, (e) => (G(), K("tr", {
					key: e.name,
					class: "border-t border-gray-100"
				}, [
					J("td", null, N(e.name), 1),
					J("td", null, N(e.version_no || "—"), 1),
					J("td", null, N(e.derived_state), 1),
					J("td", null, N(e.final_total || ""), 1),
					J("td", null, [e.docstatus === 0 ? (G(), q(R(Vm), {
						key: 0,
						label: "Submit",
						onClick: (t) => je(e.name)
					}, null, 8, ["onClick"])) : Z("", !0)])
				]))), 128))])]),
				J("div", Mg, [
					Sr(J("select", { "onUpdate:modelValue": t[5] ||= (e) => h.change_type = e }, [...t[76] ||= [
						J("option", null, "Price", -1),
						J("option", null, "Add", -1),
						J("option", null, "Remove", -1),
						J("option", null, "Requirement change", -1),
						J("option", null, "Terms", -1)
					]], 512), [[Zl, h.change_type]]),
					Sr(J("input", {
						"onUpdate:modelValue": t[6] ||= (e) => h.negotiation_note = e,
						placeholder: "negotiation note",
						class: "flex-1"
					}, null, 512), [[ql, h.negotiation_note]]),
					Sr(J("input", {
						"onUpdate:modelValue": t[7] ||= (e) => h.supplier_requote_ref = e,
						placeholder: "supplier re-quote ref"
					}, null, 512), [[ql, h.supplier_requote_ref]]),
					Y(R(Vm), {
						label: "Create V",
						onClick: Ae
					})
				])
			])) : (G(), K("div", Og, [Y(R(Vm), {
				variant: "solid",
				label: "Create quotation",
				onClick: ke
			})]))]),
			J("section", Ng, [t[80] ||= J("b", null, "Negotiation", -1), u.value ? (G(), K("div", Pg, [
				Sr(J("select", { "onUpdate:modelValue": t[8] ||= (e) => g.change_type = e }, [...t[78] ||= [
					J("option", null, "Price", -1),
					J("option", null, "Add", -1),
					J("option", null, "Remove", -1),
					J("option", null, "Requirement change", -1),
					J("option", null, "Terms", -1)
				]], 512), [[Zl, g.change_type]]),
				Sr(J("select", { "onUpdate:modelValue": t[9] ||= (e) => g.source = e }, [...t[79] ||= [
					J("option", null, "Customer", -1),
					J("option", null, "Operator", -1),
					J("option", null, "Supplier", -1)
				]], 512), [[Zl, g.source]]),
				Sr(J("input", {
					"onUpdate:modelValue": t[10] ||= (e) => g.description = e,
					placeholder: "description",
					class: "flex-1"
				}, null, 512), [[ql, g.description]]),
				Y(R(Vm), {
					label: "Add entry",
					onClick: Me
				})
			])) : (G(), K("div", Fg, "Create a quotation first."))]),
			J("section", Ig, [t[82] ||= J("b", null, "Confirm definitive quotation + evidence", -1), u.value ? (G(), K("div", Lg, [
				Sr(J("select", { "onUpdate:modelValue": t[11] ||= (e) => _.version = e }, [(G(!0), K(U, null, V(y.value, (e) => (G(), K("option", {
					key: e.name,
					value: e.name
				}, N(e.name) + " (V" + N(e.version_no) + ") ", 9, Rg))), 128))], 512), [[Zl, _.version]]),
				Sr(J("select", { "onUpdate:modelValue": t[12] ||= (e) => _.source = e }, [...t[81] ||= [
					J("option", null, "Email", -1),
					J("option", null, "WhatsApp", -1),
					J("option", null, "Other", -1)
				]], 512), [[Zl, _.source]]),
				J("input", {
					type: "file",
					onChange: Ne
				}, null, 32),
				Y(R(Vm), {
					variant: "solid",
					label: "Mark CONFIRMED",
					disabled: !b.value,
					onClick: Pe
				}, null, 8, ["disabled"])
			])) : (G(), K("div", zg, "Create and submit a version first."))])
		], 64)) : (G(), K("section", Eg, [...t[72] ||= [J("b", null, "Supplier Quotation — Inactive", -1), J("div", { class: "mt-2 text-gray-500" }, [
			X(" Information Gathering must be completed first. Mark "),
			J("b", null, "Info Complete"),
			X(" in the Summary tab to activate this workflow. ")
		], -1)]]))], 64))])) : (G(), K("div", Um, [...t[13] ||= [
			J("b", null, "FeelJapanK Workspace", -1),
			J("br", null, null, -1),
			X(" Open this workspace with a Deal, e.g. ", -1),
			J("code", null, "/app/fjk-workspace?deal=CRM-DEAL-2026-00010", -1)
		]]))]));
	}
}, [["__scopeId", "data-v-ed520aa6"]]);
//#endregion
//#region src/main.js
window.feeljapank = window.feeljapank || { mount(e) {
	e && !e.__fjkMounted && (e.__fjkMounted = !0, vu(Bg).mount(e));
} };
//#endregion

//# sourceMappingURL=feeljapank.js.map