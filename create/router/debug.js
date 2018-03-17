//---------//
// Imports //
//---------//

import bodyparser from 'koa-bodyparser'
import KoaRouter from 'koa-router'

import api from 'server/api/couchdb'
import createWebsocketServer from '../websocket-server'
import { dashelize } from 'universal/utils'

//
//------//
// Main //
//------//

const createDebugRouter = currentFixtureName =>
  createPostRevertToFixture(new KoaRouter(), dashelize(currentFixtureName))

//
//------------------//
// Helper Functions //
//------------------//

function createPostRevertToFixture(...args) {
  const [debugRouter, initialFixtureName] = args,
    websocketServer = createWebsocketServer.debug()

  return debugRouter.use(bodyparser()).post('/revert-to-fixture', ctx => {
    const { fixtureName = initialFixtureName } = ctx.request.body

    return api.revertToFixture(fixtureName).then(() => {
      websocketServer.broadcast('reload page')

      ctx.status = 200
      ctx.body = { result: `fixture '${fixtureName}' successfully reverted` }
    })
  })
}

//
//---------//
// Exports //
//---------//

export default createDebugRouter
