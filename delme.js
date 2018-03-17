const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '../../server.js'),
  target: 'node',
  devtool: '#cheap-module-inline-source-map',
  node: { __dirname: false },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.bundle.js',
    path: path.join(__dirname, '../..'),
  },
  resolve: {
    alias: {
      'project-root': path.join(__dirname, '../..'),
    },
    modules: [
      //
      // dev-modules are necessary because things break when symlinks are used
      //
      path.join(__dirname, '../../node_modules'),
      path.join(__dirname, '../../dev-modules'),
      path.join(__dirname, '../../dev-modules/fes/node_modules'),
    ],
  },
}
