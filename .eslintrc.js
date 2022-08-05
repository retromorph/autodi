module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
  },
  "env": {
    "esnext": true,
  },
  "plugins": [
    "@typescript-eslint",
    "functional",
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:functional/external-recommended",
    "plugin:functional/recommended",
    "plugin:functional/stylistic",
  ],
};