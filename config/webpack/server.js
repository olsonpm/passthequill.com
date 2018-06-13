//-------------//
// Pre-Imports //
//-------------//

// mutates _moduleAliases to full paths
import 'module-alias/register'

//
//---------//
// Imports //
//---------//

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

const projectRootDir = path.resolve(__dirname, '../../'),
  isDevelopment = process.env.NODE_ENV === 'development'

//
//------//
// Main //
//------//

const eventualConfig = createInlineTemplates().then(() => {
  return {
    mode: 'development',
    context: projectRootDir,
    entry: path.resolve(projectRootDir, 'server.js'),
    target: 'node',
    devtool: isDevelopment ? '#cheap-module-inline-source-map' : 'source-map',
    node: { __dirname: true },
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server.bundle.js',
      path: projectRootDir,
    },
    externals: webpackNodeExternals({
      whitelist: [/\.css$/, 'fes'],
    }),
    resolve: {
      alias: _moduleAliases,
      extensions: ['.js', '.json', '.vue'],
      modules: [
        //
        // dev-modules are necessary because things break when symlinks are used
        //
        path.resolve(projectRootDir, 'dev-modules'),
        path.resolve(projectRootDir, 'node_modules'),
        path.resolve(projectRootDir, 'dev-modules/fes/node_modules'),
      ],
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
