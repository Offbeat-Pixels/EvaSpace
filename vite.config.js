import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: { main: "./index.html" },
    },
  },
  server: {
    hmr: {
      overlay: false, // Reduces HMR noise during development
    },
  },
});