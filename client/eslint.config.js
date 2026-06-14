import js from "@eslint/js";

const browserGlobals = {
  alert: "readonly",
  AbortController: "readonly",
  console: "readonly",
  document: "readonly",
  fetch: "readonly",
  FormData: "readonly",
  localStorage: "readonly",
  location: "readonly",
  window: "readonly"
};

export default [
  {
    ignores: ["dist/**", "node_modules/**"]
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: browserGlobals,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      "no-unused-vars": "off"
    }
  }
];
