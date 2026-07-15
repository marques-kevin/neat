export default {
  "*.{js,jsx,mjs,cjs,json,md,css,yml,yaml}": "prettier --write",
  "*.{ts,tsx}": ["prettier --write", "eslint --fix --max-warnings=0 --no-warn-ignored"],
};
