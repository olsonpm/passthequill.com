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

const name = 'both-players-initialized'

const install = () => {
  return Promise.all([
    createRoom(),
    dal.guide.create({ _id: test1EncryptedEmail }),
    dal.guide.create({ _id: test2EncryptedEmail }),
    createEmailSentRecord(test1EncryptedEmail, 'room-created'),
    createEmailSentRecord(test2EncryptedEmail, 'invitation'),
  ])
    .then(createPlayersAndDisableGuides)
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

function createEmailSentRecord(to, type) {
  return dal.emailSent.create({ to, type }).then(({ _id }) => {
    logThenNewline(
      tedent(`
        emailSent:
          hash: ${docidToHash(_id)}
      `)
    )
  })
}

function createRoom() {
  return dal.activeRoom.create({}).then(({ _id, _rev }) => {
    const hash = docidToHash(_id)
    logThenNewline(
      tedent(`
        room:
          hash: ${hash}
      `)
    )

    return { hash, _id, _rev }
  })
}

function createPlayersAndDisableGuides([roomData, player1Guide, player2Guide]) {
  const { hash, _id, _rev } = roomData

  return Promise.all([
    createAPlayer(test1EncryptedEmail, 1, hash, 'Space Ghost', 'coast'),
    createAPlayer(test2EncryptedEmail, 2, hash, 'Wonder Woman', 'guest'),
    disableGuide(player1Guide),
    disableGuide(player2Guide),
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

function disableGuide({ _id }) {
  _id = couchdbBase64.encodeFromString(_id)

  return dal.guide.get({ _id }).then(guideData => {
    guideData.isActive = false
    return dal.guide.update(guideData)
  })
}

function createAPlayer(
  encryptedEmail,
  number,
  roomHash,
  displayName,
  secretWord
) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    secretWord,
  }

  return dal.player
    .create(playerData)
    .then(({ _id }) => dal.player.get({ _id }))
    .then(playerData => {
      playerData.hasEnteredGame = true
      return dal.player.update(playerData)
    })
    .then(({ _id }) => {
      const hash = docidToHash(_id)
      logThenNewline(
        tedent(`
          player:
            hash: ${hash}
            number: ${number}
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
