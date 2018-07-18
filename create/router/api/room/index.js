//---------//
// Imports //
//---------//

import KoaRouter from 'koa-router'
import createGetRoute from './get'
import createPostRoutes from './post'

import { callEach } from 'universal/utils'

//
//------//
// Main //
//------//

const createRoomRouter = websocketServer => {
  const router = new KoaRouter()

  callEach({ router, websocketServer }, [createGetRoute, createPostRoutes])

  return router
}

//
//---------//
// Exports //
//---------//

export default createRoomRouter
