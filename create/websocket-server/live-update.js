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

import checkCertAndKeyDaily from 'server/check-cert-and-key-daily'
import fs from 'fs'
import http from 'http'
import https from 'https'
import ws from 'ws'
import log from 'server/log'

import { pickAll } from 'fes'
import { liveUpdateWebsocket } from 'project-root/config/app'

//
//------//
// Init //
//------//

// together these create a two-way map
const playerHashToClientSocket = {},
  clientSocketToPlayerHash = new Map()

const isDevelopment = process.env.NODE_ENV === 'development',
  certAndKeyPaths = pickAll(['pathToCert', 'pathToKey'], liveUpdateWebsocket)

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

  server.listen(liveUpdateWebsocket.port)

  return {
    maybeUpdateClient,
    server: websocketServer,
  }
}

function maybeUpdateClient({ data, playerHash }) {
  const clientSocket = playerHashToClientSocket[playerHash]

  if (!clientSocket) return

  clientSocket.send(JSON.stringify(data))
}

//
//------------------//
// Helper Functions //
//------------------//

function handleConnectionError(error) {
  log.server.error('Error occurred in the liveUpdate websocket', error)
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
