import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  resolve: {
    alias: {
      "@fjk/ui": path.resolve(
        import.meta.dirname,
        "node_modules/frappe-ui/src",
      ),
    },
    dedupe: ["vue", "vue-router", "frappe-ui"],
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "../feeljapank_crm/public/dist"),
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(import.meta.dirname, "src/main.js"),
      formats: ["es"],
      fileName: () => "feeljapank.js",
    },
    rollupOptions: {
      output: {
        codeSplitting: false,
        entryFileNames: "feeljapank.js",
        assetFileNames: "feeljapank.[ext]",
      },
    },
  },
});
