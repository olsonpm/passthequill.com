//
// TODO: implement connection limit
// TODO: implement connection verification
// TODO: validate playerHash & roomHash pair
//

//---------//
// Imports //
//---------//

import checkCertAndKeyDaily from 'server/check-cert-and-key-daily'
import fs from 'fs'
import http from 'http'
import https from 'https'
import ws from 'ws'

import { forEach, isEmpty, pickAll } from 'fes'
import { liveUpdateWebsocket } from 'project-root/config/app'
import { logErrorToServer, noop } from 'universal/utils'

//
//------//
// Init //
//------//

// together these create a two-way map
const playerHashToClientSockets = {},
  clientSocketToPlayerHash = new Map()

const isDevelopment = process.env.NODE_ENV === 'development',
  certAndKeyPaths = pickAll(['pathToCert', 'pathToKey'])(liveUpdateWebsocket)

//
//------//
// Main //
//------//

const createWebsocketServer = () => {
  const certAndKey = isDevelopment ? {} : getCertAndKey(certAndKeyPaths)

  const server = isDevelopment
    ? http.createServer()
    : https.createServer(certAndKey)

  if (!isDevelopment) checkCertAndKeyDaily(server, certAndKeyPaths)

  const websocketServer = new ws.Server({ server })

  websocketServer.on('connection', ws => {
    ws.isAlive = true
    ws.on('pong', keepAlive)

    ws.on('error', handleErrorEvent)

    ws.on('close', () => {
      const playerHash = clientSocketToPlayerHash.get(ws),
        clientSockets = playerHashToClientSockets[playerHash]
      clientSocketToPlayerHash.delete(ws)
      if (clientSockets) {
        clientSockets.delete(ws)
        if (isEmpty(clientSockets)) delete playerHashToClientSockets[playerHash]
      }
    })

    ws.on('message', messageData => {
      if (messageData === 'ping') {
        ws.send('pong')
        return
      }

      const { id, data } = JSON.parse(messageData)

      if (id === 'initial-connection') {
        const { playerHash, _unused_roomHash } = data

        let clientSockets = playerHashToClientSockets[playerHash]

        if (!clientSockets) {
          clientSockets = playerHashToClientSockets[playerHash] = new Set()
        }
        clientSockets.add(ws)
        clientSocketToPlayerHash.set(ws, playerHash)
      }
    })
  })

  setInterval(pruneDeadConnections, 30000)

  server.listen(liveUpdateWebsocket.port)

  return {
    maybeUpdateClient,
    server: websocketServer,
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function keepAlive() {
  this.isAlive = true
}

function maybeUpdateClient({ data, playerHash }) {
  const clientSockets = playerHashToClientSockets[playerHash]

  if (!clientSockets) return

  forEach(ws => {
    ws.send(JSON.stringify(data), handleSendError)
  })(clientSockets)
}

function handleSendError(error) {
  logErrorToServer({
    context: 'while sending liveUpdate data',
    error,
  })
}

function pruneDeadConnections() {
  forEach((clientSockets, playerHash) => {
    forEach(ws => {
      if (!ws.isAlive) {
        clientSockets.delete(ws)
        clientSocketToPlayerHash.delete(ws)
        ws.terminate()
      }

      ws.isAlive = false
      ws.ping(noop)
    })(clientSockets)

    if (isEmpty(clientSockets)) {
      delete playerHashToClientSockets[playerHash]
    }
  })(playerHashToClientSockets)
}

function handleErrorEvent(error) {
  logErrorToServer({
    context: 'in error event of liveUpdate websocket',
    error,
  })
}

function getCertAndKey({ pathToCert, pathToKey }) {
  return {
    cert: fs.readFileSync(pathToCert),
    key: fs.readFileSync(pathToKey),
  }
}

//
//---------//
// Exports //
//---------//

export default createWebsocketServer
