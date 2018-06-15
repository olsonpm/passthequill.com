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

import { _moduleAliases } from '../../package.json'
import { VueLoaderPlugin } from 'vue-loader'
import { map, mAppendAll, startsWith } from 'fes'

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
      alias: getFullPathAliases(_moduleAliases),
      extensions: ['.js', '.json', '.vue'],
      modules: [
        //
        // Also, dev-modules are necessary because things break when symlinks
        //   are used
        //
        path.resolve(projectRootDir, 'dev-modules'),
        path.resolve(projectRootDir, 'node_modules'),
        path.resolve(projectRootDir, 'dev-modules/fes/node_modules'),
      ],
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

//
// During development the _moduleAliases will be relative because I don't feel
//   like forking the `module-alias` project and preventing it from mutating the
//   _moduleAliases package.json field
//
function getFullPathAliases() {
  const firstValue = _moduleAliases[Object.keys(_moduleAliases)[0]],
    aliasesAreAbsolute = startsWith('/')(firstValue)

  return aliasesAreAbsolute
    ? _moduleAliases
    : map(resolvePath(projectRootDir))(_moduleAliases)
}

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

function resolvePath(firstPart) {
  return secondPart => path.resolve(firstPart, secondPart)
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
