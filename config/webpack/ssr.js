//---------//
// Imports //
//---------//

import CleanPlugin from 'clean-webpack-plugin'
import path from 'path'
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin'
import webpackNodeExternals from 'webpack-node-externals'
import webpack from 'webpack'

import babelConfig from '../babel/server'
import getCommonConfig from './common'

import { baseUrl } from '../app'
import { append, appendAll } from 'fes'

//
//------//
// Init //
//------//

const projectRootDir = path.resolve(__dirname, '../..')

const commonConfig = getCommonConfig(babelConfig),
  distDir = path.resolve(projectRootDir, 'dist'),
  replaceLoader = getReplaceLoader(),
  ssrPlugins = getSsrPlugins()

//
//------//
// Main //
//------//

const ssrConfig = Object.assign({}, commonConfig, {
  entry: path.resolve(projectRootDir, 'entry/ssr.js'),
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
    new CleanPlugin(
      [path.resolve(distDir, '*.js'), path.resolve(distDir, '*.map')],
      {
        verbose: false,
        watch: true,
      }
    ),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': `'${baseUrl.local}/'`,
      'process.env.ENVIRONMENT': "'ssr'",
      'process.env.VUE_ENV': '"ssr"',
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
