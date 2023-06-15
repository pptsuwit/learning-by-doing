module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  // overrides: [
  //   {
  //     files: ['src/views/**/*.vue'],
  //     rules: {
  //       'vue/multi-word-component-names': 0,
  //     },
  //   },
  // ],
  rules: {
    'vue/multi-word-component-names': 0,
    'no-console': 'off',
  },
}
