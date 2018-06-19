//---------//
// Imports //
//---------//

import path from 'path'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import webpack from 'webpack'

import babelConfig from '../babel/client'
import getCommonConfig from './common'

import { appendAll } from 'fes'
import { baseUrl } from '../app'

//
//------//
// Init //
//------//

const commonConfig = getCommonConfig(babelConfig),
  clientPlugins = getClientPlugins(),
  projectRootDir = path.resolve(__dirname, '../..')

//
//------//
// Main //
//------//

const clientConfig = Object.assign({}, commonConfig, {
  entry: [path.resolve(projectRootDir, 'entry/client/index.js')],
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
    new webpack.IgnorePlugin(/^fs$/),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': `'${baseUrl.external}/'`,
      'process.env.ENVIRONMENT': "'client'",
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': '"client"',
    }),
    new VueSSRClientPlugin(),
  ]
}
//
//---------//
// Exports //
//---------//

export default clientConfig
