//---------//
// Imports //
//---------//

import path from 'path'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import webpack from 'webpack'

import babelConfig from '../babel/client'
import getCommonConfig from './common'

import { appendAll } from 'fes'
import { baseUrl } from 'project-root/config/app'

//
//------//
// Init //
//------//

const commonConfig = getCommonConfig(babelConfig),
  clientPlugins = getClientPlugins()

//
//------//
// Main //
//------//

const clientConfig = Object.assign({}, commonConfig, {
  entry: [path.resolve(__dirname, '../../entry/client/index.js')],
  optimization: {
    splitChunks: { chunks: 'all' },
  },
})

clientConfig.plugins = appendAll(clientPlugins)(clientConfig.plugins)

//
//------------------//
// Helper Functions //
//------------------//

function getClientPlugins() {
  return [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': '"client"',
      'process.env.BASE_URL': `'${baseUrl.external}/'`,
    }),
    new VueSSRClientPlugin(),
  ]
}
//
//---------//
// Exports //
//---------//

export default clientConfig
