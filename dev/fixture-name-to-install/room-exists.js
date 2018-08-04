//---------//
// Imports //
//---------//

import couchdbBase64 from 'couchdb-base64'
import tedent from 'tedent'

import { docidToHash } from '../../lib/server/db'
import { dal } from 'server/db'
import { log } from 'universal/utils'
import { baseUrl } from 'project-root/config/app'

//
//------//
// Init //
//------//

const logThenNewline = msg => {
  log(msg + '\n')
}

const test1EncryptedEmail =
    '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.u6Ps74veAJJWW1b/iPFes9iuT8rpoYC',
  test2EncryptedEmail =
    '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.zvRdVlidIL8krbeEJi2CJYTnMfi6hYC'

//
//------//
// Main //
//------//

const name = 'room-exists'

const install = () => {
  return Promise.all([
    createRoom(),
    createEmailSentRecord(test1EncryptedEmail, 'room-created', 1),
    createEmailSentRecord(test2EncryptedEmail, 'invitation', 2),
    dal.guide.create({
      _id: couchdbBase64.encodeFromString(test1EncryptedEmail),
    }),
    dal.guide.create({
      _id: couchdbBase64.encodeFromString(test2EncryptedEmail),
    }),
  ])
    .then(createPlayers)
    .then(roomAndPlayerData => {
      const {
        roomHash,
        roomId,
        roomRev,
        player1Hash,
        player2Hash,
      } = roomAndPlayerData

      log(
        `player 1 room url: ${baseUrl.local}/room/` +
          `${roomHash}/player/${player1Hash}\n`
      )

      log(
        `player 2 room url: ${baseUrl.local}/room/` +
          `${roomHash}/player/${player2Hash}\n`
      )

      return dal.activeRoom.update({
        _id: roomId,
        _rev: roomRev,
        player1Hash,
        player2Hash,
        playerNumberTurn: 2,
      })
    })
}

//
//------------------//
// Helper Functions //
//------------------//

function createEmailSentRecord(to, type, playerNumber) {
  return dal.emailSent.create({ to, type }).then(({ _id }) => {
    logThenNewline(
      tedent(`
        emailSent:
          hash: ${docidToHash(_id)}
          player number: ${playerNumber}
      `)
    )
  })
}

function createRoom() {
  return dal.activeRoom.create({}).then(({ _id, _rev }) => {
    const hash = docidToHash(_id)
    logThenNewline(
      tedent(`
        room hash: ${hash}
      `)
    )

    return { hash, _id, _rev }
  })
}

function createPlayers([roomData]) {
  const { hash, _id, _rev } = roomData
  return Promise.all([
    createAPlayer(test1EncryptedEmail, hash, 1),
    createAPlayer(test2EncryptedEmail, hash, 2),
  ]).then(([player1Hash, player2Hash]) => {
    return {
      roomHash: hash,
      roomId: _id,
      roomRev: _rev,
      player1Hash,
      player2Hash,
    }
  })
}

function createAPlayer(encryptedEmail, roomHash, number) {
  return dal.player
    .create({
      encryptedEmail,
      roomHash,
      number,
    })
    .then(({ _id }) => {
      const hash = docidToHash(_id)
      logThenNewline(
        tedent(`
          player ${number} hash: ${hash}
        `)
      )

      return hash
    })
}

//
//---------//
// Exports //
//---------//

export default { install, name }
