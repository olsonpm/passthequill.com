'use strict'

//---------//
// Imports //
//---------//

import path from 'path'
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin'
import webpackNodeExternals from 'webpack-node-externals'
import webpack from 'webpack'

import babelConfig from '../babel/server'
import getCommonConfig from './common'

import { baseUrl } from 'project-root/config/app'
import { append, appendAll } from 'fes'

//
//------//
// Init //
//------//

const commonConfig = getCommonConfig(babelConfig),
  replaceLoader = getReplaceLoader(),
  ssrPlugins = getSsrPlugins()

//
//------//
// Main //
//------//

const ssrConfig = Object.assign({}, commonConfig, {
  //
  // HACK workaround due to https://github.com/webpack/webpack/issues/4303
  // __dirname is the project root instead of the directory containing this file
  //
  entry: path.join(__dirname, 'entry/ssr.js'),
  target: 'node',
  externals: webpackNodeExternals({
    whitelist: [/\.css$/, 'fes'],
  }),
})

ssrConfig.output.libraryTarget = 'commonjs2'

ssrConfig.plugins = appendAll(ssrPlugins)(ssrConfig.plugins)
ssrConfig.module.rules = append(replaceLoader)(ssrConfig.module.rules)

//
//------------------//
// Helper Functions //
//------------------//

function getSsrPlugins() {
  return [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.VUE_ENV': '"ssr"',
      'process.env.BASE_URL': `'${baseUrl.local}/'`,
    }),
    new VueSSRServerPlugin(),
  ]
}

function getReplaceLoader() {
  return {
    test: /\.js$/,
    loader: 'string-replace-loader',
    options: {
      multiple: [
        {
          flags: '',
          search: "import (velocityA|a)nimate from 'velocity-animate'\n",
          replace: '',
        },
        {
          search: "import hammerjs from 'hammerjs'\n",
          replace: '',
        },
      ],
    },
  }
}

//
//---------//
// Exports //
//---------//

export default ssrConfig
