import { createApp } from "vue";
import App from "./App.vue";
import "frappe-ui/style.css";

window.feeljapank = window.feeljapank || {
  mount(el) {
    if (!el || el.__fjkMounted) return;
    el.__fjkMounted = true;
    createApp(App).mount(el);
  },
};
