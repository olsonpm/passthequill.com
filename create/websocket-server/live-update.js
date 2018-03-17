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

import ws from 'ws'
import log from 'server/log'

import { websocketPort } from 'project-root/config/debug'

//
//------//
// Init //
//------//

// together these create a two-way map
const playerHashToClientSocket = {},
  clientSocketToPlayerHash = new Map()

//
//------//
// Main //
//------//

const createWebsocketServer = () => {
  const server = new ws.Server({ port: websocketPort.liveUpdate })

  server.on('connection', ws => {
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

  return {
    maybeUpdateClient,
    server,
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
