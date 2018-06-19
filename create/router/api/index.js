//---------//
// Imports //
//---------//

import bodyparser from 'koa-bodyparser'
import KoaRouter from 'koa-router'
import koaUseragent from 'koa-useragent'

import createEmailRouter from './email'
import createRoomRouter from './room'
import createARoom from './create-a-room'
import createWebsocketServer from '../../websocket-server'
import log from './log'

//
//------//
// Main //
//------//

const createApiRouter = () => {
  const apiRouter = new KoaRouter(),
    websocketServer = createWebsocketServer.liveUpdate(),
    emailRouter = createEmailRouter(),
    roomRouter = createRoomRouter(websocketServer)

  return apiRouter
    .use(bodyparser())
    .use('/email', emailRouter.routes(), emailRouter.allowedMethods())
    .use('/room', roomRouter.routes(), roomRouter.allowedMethods())
    .post(
      '/create-a-room',
      createARoom.rateLimit.allRequests,
      createARoom.rateLimit.perIp,
      createARoom.post
    )
    .post(
      '/log',
      log.rateLimit.allRequests,
      log.rateLimit.perIp,
      koaUseragent,
      log.post
    )
}

//
//---------//
// Exports //
//---------//

export default createApiRouter
