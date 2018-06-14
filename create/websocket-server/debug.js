//---------//
// Imports //
//---------//

import ws from 'ws'
import log from 'server/log'

import { applyAt, forEach, keepWhen, passThrough } from 'fes'
import debug from 'project-root/config/debug'

//
//------//
// Init //
//------//

const { websocketPort } = debug

//
//------//
// Main //
//------//

const createWebsocketServer = () => {
  const server = new ws.Server({ port: websocketPort })

  server.broadcast = data => {
    const sendData = applyAt('send', [data, handleBroadcastError])

    passThrough(server.clients, [keepWhen(isOpen), forEach(sendData)])
  }

  server.on('connection', ws => {
    ws.on('error', handleConnectionError)
  })

  return server
}

//
//------------------//
// Helper Functions //
//------------------//

function handleBroadcastError(error) {
  if (!error) return

  log.server.error('Error occurred when attempting to broadcast', error)
}

function handleConnectionError(error) {
  log.server.error('Error occurred with the connection to a client', error)
}

function isOpen(client) {
  return client.readyState === ws.OPEN
}

//
//---------//
// Exports //
//---------//

export default createWebsocketServer
