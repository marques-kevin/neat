import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@app/core": path.resolve(__dirname, "../core/src/index.ts"),
      "@app/infrastructure": path.resolve(__dirname, "../infrastructure/src/index.ts"),
      "@app/store": path.resolve(__dirname, "../store/src/index.ts"),
      "@app/ui": path.resolve(__dirname, "../ui/src/index.ts"),
    },
  },
  server: {
    port: 5173,
    fs: {
      allow: [".."],
    },
  },
});
