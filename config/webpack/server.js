//---------//
// Imports //
//---------//

import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import webpackNodeExternals from 'webpack-node-externals'

import createInlineTemplates from '../../lib/server/email/create-inline-templates'
import babelConfig from '../babel/server'

import { baseUrl } from '../app'
import { getModuleAliases, projectRootDirectory } from './helpers'

//
//------//
// Init //
//------//

const isDevelopment = process.env.NODE_ENV === 'development'

//
//------//
// Main //
//------//

const eventualConfig = createInlineTemplates().then(() => {
  return {
    mode: 'development',
    context: projectRootDirectory,
    entry: path.resolve(projectRootDirectory, 'server.js'),
    target: 'node',
    devtool: isDevelopment ? '#cheap-module-inline-source-map' : 'source-map',
    node: { __dirname: true },
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server.bundle.js',
      path: projectRootDirectory,
    },
    externals: webpackNodeExternals({
      whitelist: [/\.css$/, 'fes'],
    }),
    resolve: {
      alias: getModuleAliases(),
      extensions: ['.js', '.json', '.vue'],
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new FriendlyErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BASE_URL': `'${baseUrl.local}/'`,
      }),
    ],
    module: {
      rules: getRules(),
    },
  }
})

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

export default eventualConfig
