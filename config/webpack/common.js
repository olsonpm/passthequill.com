//
// HACK workaround due to https://github.com/webpack/webpack/issues/4303
// __dirname is the project root instead of the directory containing
//   this file
//

//---------//
// Imports //
//---------//

import autoprefixer from 'autoprefixer'
import focusWithin from 'postcss-focus-within'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import webpack from 'webpack'

import { _moduleAliases } from '../../package.json'
import { VueLoaderPlugin } from 'vue-loader'
import { map, mAppendAll } from 'fes'

//
//------//
// Init //
//------//

const isProd = process.env.NODE_ENV === 'production',
  screenSizeBreakpointsRe = /app\/screen-size-breakpoints\.scss$/

//
//------//
// Main //
//------//

const getCommonConfig = babelLoaderOptions => {
  const plugins = getPlugins(),
    extractOrStyleLoader = isProd
      ? MiniCssExtractPlugin.loader
      : 'vue-style-loader'

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    output: {
      filename: '[name].chunkhash.js',
      path: path.join(__dirname, 'dist/vue'),
      publicPath: '/dist/vue',
    },
    performance: {
      maxEntrypointSize: 300000,
      hints: !!isProd && 'warning',
    },
    optimization: {
      splitChunks: { chunks: 'all' },
    },
    resolve: {
      alias: map(joinPath(__dirname))(_moduleAliases),
      extensions: ['.js', '.json', '.vue'],
      modules: [
        //
        // Also, dev-modules are necessary because things break when symlinks
        //   are used
        //
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'dev-modules'),
        path.join(__dirname, 'dev-modules/fes/node_modules'),
      ],
    },
    plugins,
    module: {
      rules: [
        {
          loader: 'vue-loader',
          options: {
            compilerOptions: { preserveWhitespace: false },
          },
          test: /\.vue$/,
        },
        {
          exclude: /\/node_modules\/(?!(vue2-hammer)\/).*/,
          loader: 'babel-loader',
          options: babelLoaderOptions,
          test: /\.js$/,
        },
        {
          loader: 'url-loader',
          options: { limit: 10000 },
          test: /\.(ttf|woff|png|jpg|gif|svg)$/,
        },
        {
          test: screenSizeBreakpointsRe,
          use: ['css-loader', 'sass-loader'],
        },
        {
          test: /\.scss$/,
          exclude: screenSizeBreakpointsRe,
          use: [
            extractOrStyleLoader,
            {
              loader: 'css-loader',
              options: { sourceMap: false },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({ browsers: ['last 2 versions'] }),
                  focusWithin(),
                ],
                sourceMap: false,
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: false },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: path.join(
                  __dirname,
                  'create/app/styles/imported-by-all-components.scss'
                ),
              },
            },
          ],
        },
      ],
    },
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function joinPath(firstPart) {
  return secondPart => path.join(firstPart, secondPart)
}

function getPlugins() {
  const plugins = [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new VueLoaderPlugin(),
    ],
    environmentDependentPlugins = isProd
      ? [new MiniCssExtractPlugin()]
      : [new FriendlyErrorsPlugin()]

  return mAppendAll(environmentDependentPlugins)(plugins)
}

//
//---------//
// Exports //
//---------//

export default getCommonConfig
