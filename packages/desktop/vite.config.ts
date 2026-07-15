import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  clearScreen: false,
  resolve: {
    alias: {
      "@app/core": path.resolve(__dirname, "../core/src/index.ts"),
      "@app/infrastructure": path.resolve(__dirname, "../infrastructure/src/index.ts"),
      "@app/store": path.resolve(__dirname, "../store/src/index.ts"),
      "@app/ui": path.resolve(__dirname, "../ui/src"),
      "@": path.resolve(__dirname, "../ui/src"),
    },
  },
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    fs: {
      allow: [".."],
    },
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
});
