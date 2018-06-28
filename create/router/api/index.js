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
import debugConfig from 'project-root/config/debug'

//
//------//
// Main //
//------//

const createApiRouter = () => {
  const apiRouter = new KoaRouter(),
    websocketServer = createWebsocketServer.liveUpdate(),
    emailRouter = createEmailRouter(),
    roomRouter = createRoomRouter(websocketServer)

  apiRouter
    .use(bodyparser())
    .use('/email', emailRouter.routes(), emailRouter.allowedMethods())
    .use('/room', roomRouter.routes(), roomRouter.allowedMethods())
    .post(
      '/log',
      log.rateLimit.allRequests,
      log.rateLimit.perIp,
      koaUseragent,
      log.post
    )

  if (debugConfig.preventEmailFromSending)
    apiRouter.post('/create-a-room', createARoom.post)
  else {
    apiRouter.post(
      '/create-a-room',
      createARoom.rateLimit.allRequests,
      createARoom.rateLimit.perIp,
      createARoom.post
    )
  }

  return apiRouter
}

//
//---------//
// Exports //
//---------//

export default createApiRouter
