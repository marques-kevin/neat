import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

const boundaryElements = [
  { type: "core", pattern: "packages/core/src/**", mode: "full" },
  { type: "infrastructure", pattern: "packages/infrastructure/src/**", mode: "full" },
  { type: "store", pattern: "packages/store/src/**", mode: "full" },
  {
    type: "ui-components",
    pattern: "packages/ui/src/components/**",
    mode: "full",
  },
  {
    type: "ui-containers",
    pattern: "packages/ui/src/containers/**",
    mode: "full",
  },
  { type: "ui-other", pattern: "packages/ui/src/**", mode: "full" },
  { type: "web", pattern: "packages/web/src/**", mode: "full" },
];

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/storybook-static/**",
      "**/*.config.{js,cjs,mjs,ts}",
      "eslint.config.js",
      "prettier.config.js",
      "lint-staged.config.js",
      "dependency-cruiser.config.cjs",
      "vitest.config.ts",
      "**/.storybook/**",
      "**/*.stories.{ts,tsx}",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      boundaries,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      "boundaries/elements": boundaryElements,
      "boundaries/include": ["packages/*/src/**"],
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.config.js", "*.config.cjs", "*.config.ts", "vitest.config.ts"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "core", allow: ["core"] },
            { from: "infrastructure", allow: ["core", "infrastructure"] },
            { from: "store", allow: ["core", "store"] },
            { from: "ui-components", allow: ["ui-components", "ui-other"] },
            {
              from: "ui-containers",
              allow: ["ui-containers", "ui-components", "ui-other", "store"],
            },
            {
              from: "ui-other",
              allow: ["ui-other", "ui-components", "ui-containers", "store", "core"],
            },
            {
              from: "web",
              allow: [
                "web",
                "ui-containers",
                "ui-components",
                "ui-other",
                "store",
                "infrastructure",
                "core",
              ],
            },
          ],
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["packages/ui/src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "@app/store", message: "Dumb components must not import Redux store." },
            { name: "@app/core", message: "Dumb components must not import core directly." },
            {
              name: "@app/infrastructure",
              message: "Dumb components must not import infrastructure.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["packages/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["packages/**/*.{tsx,jsx}"],
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  {
    files: ["packages/ui/src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  ...storybook.configs["flat/recommended"],
);
