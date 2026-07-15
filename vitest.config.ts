import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "packages/core/vitest.config.ts",
      "packages/store/vitest.config.ts",
      "packages/ui/vitest.config.ts",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: ["**/*.stories.{ts,tsx}", "**/*.test.{ts,tsx}", "**/test/**", "**/.storybook/**"],
    },
  },
});
