// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // avoid pre-bundling native rollup bits
    exclude: ["rollup"]
  },
  resolve: {
    alias: {
      // Redirect the native loader to the JS fallback (cross-platform)
      "rollup/dist/native": "rollup/dist/rollup",
      "rollup/dist/native.js": "rollup/dist/rollup.js"
    }
  },
  ssr: {
    // add packages here if you see them in build errors
    noExternal: []
  },
  build: {
    target: "es2020"
  }
});
