//---------//
// Imports //
//---------//

import autoprefixer from 'autoprefixer'
import clean from 'postcss-clean'
import focusWithin from 'postcss-focus-within'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'

import { VueLoaderPlugin } from 'vue-loader'
import { mAppendAll } from 'fes'

import { getModuleAliases } from './helpers'

//
//------//
// Init //
//------//

const isDevelopment = process.env.NODE_ENV === 'development',
  isProduction = process.env.NODE_ENV === 'production',
  projectRootDir = path.resolve(__dirname, '../../'),
  screenSizeBreakpointsRe = /app\/screen-size-breakpoints\.scss$/

//
//------//
// Main //
//------//

const getCommonConfig = babelLoaderOptions => {
  const plugins = getPlugins(),
    extractOrStyleLoader = isDevelopment
      ? 'vue-style-loader'
      : MiniCssExtractPlugin.loader

  return {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',
    optimization: {
      minimize: !isDevelopment,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(projectRootDir, 'dist/vue'),
      publicPath: '/',
    },
    performance: {
      maxEntrypointSize: 300000,
      hints: !!isProduction && 'warning',
    },
    resolve: {
      alias: getModuleAliases(),
      extensions: ['.js', '.json', '.vue'],
    },
    plugins,
    module: {
      rules: getRules(babelLoaderOptions, extractOrStyleLoader),
    },
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function getRules(babelLoaderOptions, extractOrStyleLoader) {
  return [
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
              clean(),
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
            resources: path.resolve(
              projectRootDir,
              'create/app/styles/imported-by-all-components.scss'
            ),
          },
        },
      ],
    },
  ]
}

function getPlugins() {
  const plugins = [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new VueLoaderPlugin(),
    ],
    environmentDependentPlugins = isDevelopment
      ? [new FriendlyErrorsPlugin()]
      : [new MiniCssExtractPlugin()]

  return mAppendAll(environmentDependentPlugins)(plugins)
}

//
//---------//
// Exports //
//---------//

export default getCommonConfig
