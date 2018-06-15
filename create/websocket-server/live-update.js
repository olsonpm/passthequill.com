//
// TODO: implement connection limit
// TODO: implement connection verification
// TODO: validate playerHash & roomHash pair
// TODO: implement heartbeat
//   https://www.npmjs.com/package/ws#how-to-detect-and-close-broken-connections
//

//---------//
// Imports //
//---------//

import fs from 'fs'
import https from 'https'
import ws from 'ws'
import log from 'server/log'

import { liveUpdateWebsocket } from 'project-root/config/app'

//
//------//
// Init //
//------//

// together these create a two-way map
const playerHashToClientSocket = {},
  clientSocketToPlayerHash = new Map()

const httpsOptions = {
  cert: fs.readFileSync(liveUpdateWebsocket.certPath),
  key: fs.readFileSync(liveUpdateWebsocket.keyPath)
}

//
//------//
// Main //
//------//

const createWebsocketServer = () => {
  const httpsServer = https.createServer(httpsOptions),
    websocketServer = new ws.Server({ server: httpsServer })

  websocketServer.on('connection', ws => {
    ws.on('error', handleConnectionError)

    ws.on('close', () => {
      const playerHash = clientSocketToPlayerHash.get(ws)
      clientSocketToPlayerHash.delete(ws)
      delete playerHashToClientSocket[playerHash]
    })

    ws.on('message', messageData => {
      const { id, data } = JSON.parse(messageData)

      if (id === 'initial-connection') {
        const { playerHash, _unused_roomHash } = data

        playerHashToClientSocket[playerHash] = ws
        clientSocketToPlayerHash.set(ws, playerHash)
      }
    })
  })

  httpsServer.listen(liveUpdateWebsocket.port)

  return {
    maybeUpdateClient,
    server: websocketServer,
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function handleConnectionError(error) {
  log.server.error('Error occurred in the liveUpdate websocket', error)
}

function maybeUpdateClient({ data, playerHash }) {
  const clientSocket = playerHashToClientSocket[playerHash]

  if (!clientSocket) return

  clientSocket.send(JSON.stringify(data))
}

//
//---------//
// Exports //
//---------//

export default createWebsocketServer
