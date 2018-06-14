//-------------//
// Pre-Imports //
//-------------//

import 'source-map-support/register'

// TODO: use null-loader to handle this instead.  It's supposed to run before
//   other files are imported, but the dynamic require happens after imports due
//   to hoisting
if (process.env.NODE_ENV !== 'production') {
  require('longjohn')
}

//
//---------//
// Imports //
//---------//

import chalk from 'chalk'
import createApiRouter from './create/router/api'
import createDebugRouter from './create/router/debug'
import createLruCache from 'lru-cache'
import createPageRouter from './create/router/page'
import fixtureNameToInstall from './dev/fixture-name-to-install'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaStatic from 'koa-static'
import koaVueSsr_initDevServer from 'koa-vue-ssr_init-dev-server'
import path from 'path'
import { createBundleRenderer } from 'vue-server-renderer'

import _client from './config/webpack/client'
import _ssr from './config/webpack/ssr'

import { createAllDatabases, deleteAllDatabases } from 'server/db'
import { readFile, readRawFile } from 'server/utils'
import { logError, resolveAllProperties } from 'universal/utils'
import { serverPort } from 'project-root/config/app'

//
//------//
// Init //
//------//

const distVueDir = path.resolve(__dirname, 'dist/vue'),
  highlight = chalk.green,
  isDevelopment = process.env.NODE_ENV === 'development',
  webpackHotClientPort = 8086,
  templatePath = path.resolve(__dirname, 'index.template.html'),
  faviconPath = path.resolve(__dirname, 'assets/images/favicon'),
  webpackConfigs = {
    client: _client,
    ssr: _ssr,
  },
  fixtureNameCamel = 'onlyPlayer1IsInitialized',
  installFixture = () => fixtureNameToInstall[fixtureNameCamel]()

logUnhandledRejections()

//
//------//
// Main //
//------//

maybeInitDevDatabase()
  .then(() =>
    resolveAllProperties({
      ico: readRawFile(faviconPath + '.ico'),
      png: readRawFile(faviconPath + '.png'),
    })
  )
  .then(contents => {
    const koaApp = createInitialKoaApp(contents)
    return isDevelopment ? initDevServer(koaApp) : initNonDevServer(koaApp)
  })
  .then(({ getRenderer, koaApp }) => {
    const router = createRouter(getRenderer)

    if (!isDevelopment) {
      koaApp.use(koaStatic(distVueDir))
    }

    koaApp
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(serverPort)

    // eslint-disable-next-line no-console
    console.log(`The server is running on port: ${highlight(serverPort)}`)
  })
  .catch(logError)

//
//------------------//
// Helper Functions //
//------------------//

function createInitialKoaApp(faviconContents) {
  const koaApp = new Koa()

  koaApp.use((ctx, next) => {
    if (ctx.url === '/favicon.ico') {
      ctx.body = faviconContents.ico
      return
    } else if (ctx.url === '/favicon.png') {
      ctx.body = faviconContents.png
      return
    } else {
      return next()
    }
  })

  return koaApp
}

//
// TODO: rename koa-vue-ssr_init-dev-server to be more generic so it can handle
//   non-dev-server usage as well.  Some of this code is currently duplicated.
//
function initNonDevServer(koaApp) {
  return Promise.all([
    readFile(path.resolve(__dirname, 'dist/vue/vue-ssr-client-manifest.json')),
    readFile(path.resolve(__dirname, 'dist/vue/vue-ssr-server-bundle.json')),
    readFile(templatePath),
  ]).then(([ssrClientManifest, ssrServerBundle, template]) => {
    const bundleRenderer = createBundleRenderer(JSON.parse(ssrServerBundle), {
      clientManifest: JSON.parse(ssrClientManifest),
      template,
      cache: createLruCache({
        max: 1000,
        maxAge: 1000 * 60 * 15,
      }),
      //
      // doesn't matter whether we use client or ssr output paths as they
      //   should be the same
      //
      basedir: webpackConfigs.client.output.path,
      runInNewContext: false,
    })

    return {
      koaApp,
      getRenderer: () => bundleRenderer,
    }
  })
}

function initDevServer(koaApp) {
  return koaVueSsr_initDevServer({
    koaApp,
    webpackConfigs,
    webpackHotClientPort,
    templatePath,

    //
    // currently this app assumes that development means live-reloading.  My
    //   app my rules!
    //
    shouldWatch: isDevelopment,
  })
}

function maybeInitDevDatabase() {
  if (!isDevelopment) return Promise.resolve()

  return deleteAllDatabases()
    .then(createAllDatabases)
    .then(installFixture)
}

function createRouter(getRenderer) {
  const router = {
    root: new KoaRouter(),
    api: createApiRouter(),
    page: createPageRouter(getRenderer),
  }

  router.root
    .use('/api', router.api.routes(), router.api.allowedMethods())
    .use(router.page.routes(), router.page.allowedMethods())

  if (isDevelopment) {
    router.debug = createDebugRouter(fixtureNameCamel)
    router.root.use(
      '/debug',
      router.debug.routes(),
      router.debug.allowedMethods()
    )
  }

  return router.root
}

function logUnhandledRejections() {
  process.on('unhandledRejection', (reason, p) => {
    // eslint-disable-next-line no-console
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
  })
}
