module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ],
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['iOS >= 11']
        },
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ]
}
