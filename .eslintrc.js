module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/no-explicit-any': 'off' //关闭any类型警告
  }
}
