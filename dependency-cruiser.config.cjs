/** @type {import("dependency-cruiser").IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "core-isolation",
      severity: "error",
      comment: "Core must not depend on outer packages",
      from: { path: "^packages/core" },
      to: { path: "^packages/(infrastructure|store|ui|web)" },
    },
    {
      name: "infrastructure-isolation",
      severity: "error",
      from: { path: "^packages/infrastructure" },
      to: { path: "^packages/(store|ui|web)" },
    },
    {
      name: "store-no-infrastructure",
      severity: "error",
      from: { path: "^packages/store" },
      to: { path: "^packages/infrastructure" },
    },
    {
      name: "ui-components-no-store",
      severity: "error",
      from: { path: "^packages/ui/src/components" },
      to: { path: "^packages/store|^@app/store" },
    },
    {
      name: "ui-components-no-core",
      severity: "error",
      from: { path: "^packages/ui/src/components" },
      to: { path: "^packages/core|^@app/core" },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
    combinedDependencies: true,
    exclude: { path: "(\\.storybook|\\.stories\\.|/test/|vitest\\.config)" },
  },
};
