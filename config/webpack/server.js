//---------//
// Imports //
//---------//

// mutates _moduleAliases to full paths
import 'module-alias/register'

import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import webpackNodeExternals from 'webpack-node-externals'

import createInlineTemplates from 'server/email/create-inline-templates'
import babelConfig from '../babel/server'

import { _moduleAliases } from '../../package.json'
import { baseUrl } from 'project-root/config/app'

//
//------//
// Init //
//------//

const projectRootDir = path.join(__dirname, '../..')

//
//------//
// Main //
//------//

const eventualConfig = createInlineTemplates().then(() => ({
  mode: 'development',
  entry: path.join(projectRootDir, 'server.js'),
  target: 'node',
  devtool: '#cheap-module-inline-source-map',
  node: { __dirname: false },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.bundle.js',
    path: projectRootDir,
  },
  externals: webpackNodeExternals({
    whitelist: /\.css$/,
  }),
  resolve: {
    alias: _moduleAliases,
    extensions: ['.js', '.json', '.vue'],
    modules: [
      //
      // dev-modules are necessary because things break when symlinks are used
      //
      path.join(projectRootDir, 'node_modules'),
      path.join(projectRootDir, 'dev-modules'),
      path.join(projectRootDir, 'dev-modules/fes/node_modules'),
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.BASE_URL': `'${baseUrl.local}/'`,
    }),
  ],
  module: {
    rules: [
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
    ],
  },
}))

//
//---------//
// Exports //
//---------//

export default eventualConfig
