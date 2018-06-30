export default {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: { node: 8 },
      },
    ],
  ],
  plugins: [
    'macros',
    '@babel/syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
  ],
}
