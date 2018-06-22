//
// TODO: log all errors to server (couchdb) and only console.error when logging
//   to the server fails
//

//-------------//
// Pre-Imports //
//-------------//

import 'source-map-support/register'
import 'longjohn'

//
//---------//
// Imports //
//---------//

import Koa from 'koa'
import KoaRouter from 'koa-router'
import chalk from 'chalk'
import createLruCache from 'lru-cache'
import dedent from 'dedent'
import koaCompress from 'koa-compress'
import koaStatic from 'koa-static'
import koaVueSsr_initDevServer from 'koa-vue-ssr_init-dev-server'
import path from 'path'

import _client from './config/webpack/client'
import _ssr from './config/webpack/ssr'
import createApiRouter from './create/router/api'
import createDebugRouter from './create/router/debug'
import createPageRouter from './create/router/page'
import fixtureNameToInstall from './dev/fixture-name-to-install'
import directives from 'universal/directives'
import debugConfig from 'project-root/config/debug'

import { createBundleRenderer } from 'vue-server-renderer'
import { createAllDatabases, deleteAllDatabases } from 'server/db'
import { readFile, readRawFile } from 'server/utils'
import { persistentStaticDir, serverPort } from 'project-root/config/app'
import {
  jstring,
  logError,
  logErrorToServer,
  resolveAllProperties,
} from 'universal/utils'

//
//------//
// Init //
//------//

const { localHostIp, webpackHotClientPort } = debugConfig

const distDir = path.resolve(__dirname, 'dist'),
  highlight = chalk.green,
  isDevelopment = process.env.NODE_ENV === 'development',
  templatePath = path.resolve(__dirname, 'index.template.html'),
  faviconPath = path.resolve(__dirname, 'assets/images/favicon'),
  webpackConfigs = {
    client: _client,
    ssr: _ssr,
  },
  fixtureNameCamel = 'onlyPlayer2IsInitialized',
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
      png16: readRawFile(faviconPath + '.16.png'),
      png32: readRawFile(faviconPath + '.32.png'),
    })
  )
  .then(contents => {
    const koaApp = createInitialKoaApp(contents)
    return isDevelopment ? initDevServer(koaApp) : initNonDevServer(koaApp)
  })
  .then(({ getRenderer, koaApp }) => {
    const router = createRouter(getRenderer)

    if (!isDevelopment) {
      if (persistentStaticDir) {
        koaApp.use(koaStatic(persistentStaticDir, { hidden: true }))
      }

      koaApp.use(koaStatic(distDir))
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

  koaApp.use(koaCompress()).use((ctx, next) => {
    if (ctx.url === '/favicon.ico') {
      ctx.body = faviconContents.ico
      return
    } else if (ctx.url === '/favicon.png' || ctx.url === '/favicon.16.png') {
      ctx.body = faviconContents.png16
      return
    } else if (ctx.url === '/favicon.32.png') {
      ctx.body = faviconContents.png32
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
    readFile(path.resolve(distDir, 'vue-ssr-client-manifest.json')),
    readFile(path.resolve(distDir, 'vue-ssr-server-bundle.json')),
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
    directives: directives.ssr,
    koaApp,
    koaWebpackOptions: {
      devMiddleware: {
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
      hotClient: {
        host: localHostIp,
        port: webpackHotClientPort,
      },
    },
    webpackConfigs,
    templatePath,
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
    let error = reason

    if (!(error instanceof Error)) {
      error = new Error(jstring(reason))
    }

    error.message = dedent(`
      ${error.message}

      at promise: ${p}
    `)

    logErrorToServer({
      context: '- node unhandledRejection',
      error,
    })
  })
}
