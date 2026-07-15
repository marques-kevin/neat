import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "@app/store",
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
