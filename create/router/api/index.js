//---------//
// Imports //
//---------//

import bodyparser from 'koa-bodyparser'
import dedent from 'dedent'
import KoaRouter from 'koa-router'
import { RateLimit } from 'koa2-ratelimit'

import log from 'server/log'
import createEmailRouter from './email'
import createRoomRouter from './room'
import post_createARoom from './create-a-room'
import createWebsocketServer from '../../websocket-server'
import { jstring } from 'universal/utils'

//
//------//
// Main //
//------//

const createApiRouter = () => {
  const apiRouter = new KoaRouter(),
    websocketServer = createWebsocketServer.liveUpdate(),
    emailRouter = createEmailRouter(),
    roomRouter = createRoomRouter(websocketServer),
    createARoomRateLimiter = getCreateARoomRateLimiter()

  return apiRouter
    .use(bodyparser())
    .use('/email', emailRouter.routes(), emailRouter.allowedMethods())
    .use('/room', roomRouter.routes(), roomRouter.allowedMethods())
    .post('/create-a-room', createARoomRateLimiter, post_createARoom)
}

//
//------------------//
// Helper Functions //
//------------------//

function getCreateARoomRateLimiter() {
  const max = 10,
    interval = { min: 30 }

  return RateLimit.middleware({
    interval,
    max,
    keyGenerator: ctx => ctx.request.ip,
    onLimitReached: ctx => {
      log.http.concern(
        dedent(`
          Max create-a-room limit reached for ip: ${ctx.request.ip}
            max: ${max}
            interval: ${jstring(interval)}
        `)
      )
    },
    message: 'Too many rooms created from this IP',
  })
}

//
//---------//
// Exports //
//---------//

export default createApiRouter
