const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  rules: {
    'ts/consistent-type-imports': 'off',
    'node/prefer-global/process': 'off'
  },
  typescript: true,
})
