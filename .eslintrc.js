module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  lintOnSave: false,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    // 你的自定义规则
    'vue/multi-word-component-names': 'off'
  },
  extensions: {},
  resolvePluginsRelativeTo: {},
  ignorePath: {},
  rulePaths: {}
}
