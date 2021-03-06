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
import tedent from 'tedent'
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
  shouldInitDevServer = process.env.SHOULD_INIT_DEV_SERVER,
  templatePath = path.resolve(__dirname, 'index.template.html'),
  imagesPath = path.resolve(__dirname, 'assets/images'),
  faviconPath = path.resolve(imagesPath, 'favicon'),
  webpackConfigs = {
    client: _client,
    ssr: _ssr,
  },
  fixtureNameCamel = 'roomExists',
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
  .then(imageContents => {
    const koaApp = createInitialKoaApp(imageContents)

    return isDevelopment && shouldInitDevServer
      ? initDevServer(koaApp)
      : initNonDevServer(koaApp)
  })
  .then(({ getRenderer, koaApp }) => {
    const router = createRouter(getRenderer)

    if (!isDevelopment || !shouldInitDevServer) {
      if (persistentStaticDir) {
        koaApp.use(koaStatic(persistentStaticDir, { hidden: true }))
      }

      koaApp.use(koaStatic(distDir))
    }

    koaApp.use(router.routes()).use(router.allowedMethods())

    const listenArgs = [serverPort]
    if (isDevelopment) listenArgs.push(localHostIp)

    koaApp.listen(...listenArgs)

    // eslint-disable-next-line no-console
    console.log(`The server is running on port: ${highlight(serverPort)}`)
  })
  .catch(logError)

//
//------------------//
// Helper Functions //
//------------------//

function createInitialKoaApp(imageContents) {
  const koaApp = new Koa(),
    imageToBody = getImageToBody(imageContents)

  // ensures request.ip is correct
  koaApp.proxy = true

  koaApp.use(koaCompress()).use((ctx, next) => {
    const maybeBody = imageToBody[ctx.url]
    if (maybeBody) {
      ctx.type = ctx.url === '/favicon.ico' ? 'image/x-icon' : 'image/png'
      ctx.body = maybeBody
      return
    } else {
      return next()
    }
  })

  return koaApp
}

function getImageToBody(imageContents) {
  return {
    '/favicon.ico': imageContents.ico,
    '/favicon.png': imageContents.png16,
    '/favicon.16.png': imageContents.png16,
    '/favicon.32.png': imageContents.png32,
  }
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
      //
      // doesn't matter whether we use client or ssr output paths as they
      //   should be the same
      //
      basedir: webpackConfigs.client.output.path,
      cache: createLruCache({
        max: 1000,
        maxAge: 1000 * 60 * 15,
      }),
      clientManifest: JSON.parse(ssrClientManifest),
      directives: directives.ssr,
      runInNewContext: false,
      template,
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
    .use('/ping', ctx => {
      ctx.set('Cache-Control', 'no-cache')
      ctx.status = 200
    })
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

    error.message = tedent(`
      ${error.message}

      at promise: ${p}
    `)

    logErrorToServer({
      context: '- node unhandledRejection',
      error,
    })
  })
}
