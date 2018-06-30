export default {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
      },
    ],
  ],
  plugins: [
    'macros',
    '@babel/syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
  ],
}
