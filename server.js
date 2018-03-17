//-------------//
// Pre-Imports //
//-------------//

import 'source-map-support/register'

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
import createPageRouter from './create/router/page'
import fixtureNameToInstall from './dev/fixture-name-to-install'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import path from 'path'
import initDevServer from 'koa-vue-ssr_init-dev-server'

import _client from './config/webpack/client'
import _ssr from './config/webpack/ssr'

import { createAllDatabases, deleteAllDatabases } from 'server/db'
import { logError } from 'universal/utils'

//
//------//
// Init //
//------//

const highlight = chalk.green,
  isDevelopment = process.env.NODE_ENV !== 'production',
  isProduction = !isDevelopment,
  serverPort = 8085,
  webpackHotClientPort = 8086,
  templatePath = path.join(__dirname, 'index.template.html'),
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

initDevDatabase()
  .then(() =>
    initDevServer({
      koaApp: new Koa(),
      webpackConfigs,
      webpackHotClientPort,
      templatePath,
    })
  )
  .then(({ getRenderer, koaApp }) => {
    const router = createRouter(getRenderer)

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

function initDevDatabase() {
  if (isProduction) return Promise.resolve()

  return deleteAllDatabases()
    .then(createAllDatabases)
    .then(installFixture)
}

function createRouter(getRenderer) {
  const rootRouter = new KoaRouter(),
    api = createApiRouter(),
    page = createPageRouter(getRenderer),
    debug =
      process.env.NODE_ENV === 'development'
        ? createDebugRouter(fixtureNameCamel)
        : undefined

  rootRouter
    .use('/api', api.routes(), api.allowedMethods())
    .use(page.routes(), page.allowedMethods())

  if (debug) {
    rootRouter.use('/debug', debug.routes(), debug.allowedMethods())
  }

  return rootRouter
}

function logUnhandledRejections() {
  process.on('unhandledRejection', (reason, p) => {
    // eslint-disable-next-line no-console
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
  })
}
