
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // build target — keeps output compatible across Node versions & browsers
  build: {
    target: "es2020",
    minify: "esbuild",
    rollupOptions: {
      // If a package tries to require platform native bindings,
      // externalizing or aliasing can help — we leave this blank for now.
      external: []
    }
  },

  optimizeDeps: {
    // Add packages here if you see them in the error stack.
    // Eg: include: ['some-esm-only-package']
    // or exclude: ['rollup'] to prevent Vite from pre-bundling rollup native bits
    exclude: ["rollup"]
  },

  ssr: {
    // If a dependency causes "Cannot find module" at SSR/build-time,
    // add it here to force bundling server side
    noExternal: [
      // e.g. 'some-package', 'another-problem-package'
      // Add package names from the error stack if needed
    ]
  },

  resolve: {
    alias: {
      // Sometimes aliasing native rollup to the JS fallback helps; uncomment if needed:
      // 'rollup/dist/native': 'rollup/dist/rollup.js'
    }
  }
});
