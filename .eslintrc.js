module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
  ],
  plugins: ["jest", "sonarjs"],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-unused-vars": ["error", { vars: "all", args: "none" }],
    "no-console": ["off"], // I like to use the console
    "max-params": ["warn", 5],
    "max-nested-callbacks": ["warn", 5],
    "max-statements": ["warn", 20],
    "max-depth": ["warn", 7],
    "max-lines": ["warn", 750],
    "array-callback-return": "warn",
    complexity: ["warn", { max: 20 }],
  },
};
