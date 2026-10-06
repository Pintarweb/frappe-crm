frappe.pages["fjk-workspace"] = frappe.pages["fjk-workspace"] || {};

frappe.pages["fjk-workspace"].on_page_load = function (wrapper) {
  const page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "FeelJapanK Workspace",
    single_column: true,
  });

  const container = document.createElement("div");
  container.id = "feeljapank-app";
  page.main.append(container);

  const base = "/assets/feeljapank_crm/dist/";

  if (!document.getElementById("feeljapank-css")) {
    const link = document.createElement("link");
    link.id = "feeljapank-css";
    link.rel = "stylesheet";
    link.href = base + "feeljapank.css";
    document.head.appendChild(link);
  }

  const showError = function (msg) {
    container.innerHTML = '<div style="padding:24px;color:#991b1b;">' + msg + "</div>";
  };

  const mount = function () {
    if (window.feeljapank && window.feeljapank.mount) {
      window.feeljapank.mount(container);
    } else {
      showError("FeelJapanK bundle not loaded.");
    }
  };

  if (window.feeljapank) {
    mount();
    return;
  }

  const script = document.createElement("script");
  script.src = base + "feeljapank.js";
  script.onload = mount;
  script.onerror = function () {
    showError("FeelJapanK bundle failed to load.");
  };
  document.head.appendChild(script);
};
