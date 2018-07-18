//
// TODO: this file was copied from './server' and needs to be trimmed to only
//   the configs necessary for migration-scripts
//

//---------//
// Imports //
//---------//

import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import webpackNodeExternals from 'webpack-node-externals'

import babelConfig from '../babel/server'

import { baseUrl } from '../app'
import { getModuleAliases, projectRootDirectory } from './helpers'

//
//------//
// Init //
//------//

const migrationScriptsDir = path.resolve(
    projectRootDirectory,
    'migration-scripts'
  ),
  isDevelopment = process.env.NODE_ENV === 'development'

//
//------//
// Main //
//------//

const config = {
  mode: isDevelopment ? 'development' : 'production',
  context: projectRootDirectory,
  entry: path.resolve(migrationScriptsDir, 'index.js'),
  target: 'node',
  devtool: 'source-map',
  node: { __dirname: true },
  optimization: {
    minimize: false,
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'index.bundle.js',
    path: migrationScriptsDir,
  },
  externals: webpackNodeExternals({
    whitelist: [/\.css$/, 'fes'],
  }),
  resolve: {
    alias: getModuleAliases(),
    extensions: ['.js', '.json', '.vue'],
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': `'${baseUrl.local}/'`,
      'process.env.ENVIRONMENT': "'server'",
      'process.env.SHOULD_INIT_DEV_SERVER':
        process.env.SHOULD_INIT_DEV_SERVER === undefined
          ? 'true'
          : process.env.SHOULD_INIT_DEV_SERVER,
      'process.env.VUE_ENV': 'undefined',
      'process.env.USE_HTTPS':
        process.env.USE_HTTPS !== undefined
          ? process.env.USE_HTTPS
          : !isDevelopment,
    }),
  ],
  module: {
    rules: getRules(),
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getRules() {
  return [
    {
      loader: 'raw-loader',
      test: /email\/templates\/.*\.html/,
    },
    {
      exclude: /\/node_modules\/(?!(vue2-hammer)\/).*/,
      loader: 'babel-loader',
      options: babelConfig,
      test: /.js$/,
    },
  ]
}

//
//---------//
// Exports //
//---------//

export default config
