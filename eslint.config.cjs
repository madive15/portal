module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'eslint.config.cjs',
    'auto-imports.d.ts',
    'vite.config.ts'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },
  settings: {
    'vue/typescript': true
  }
};
