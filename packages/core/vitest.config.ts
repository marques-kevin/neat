import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "@app/core",
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
