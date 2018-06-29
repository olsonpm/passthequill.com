//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { log } from 'universal/utils'
import { baseUrl } from 'project-root/config/app'
import { alwaysReturn as justReturn, combine } from 'fes'
import {
  dal,
  docidToHash,
  pickIdAndRev,
  removeCouchdbProperties,
} from 'server/db'

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

const name = 'player1-must-guess'

const install = () => {
  return Promise.all([
    createRoom(),
    createEmailSentRecord(test1EncryptedEmail, 'room-created'),
    createEmailSentRecord(test2EncryptedEmail, 'invitation'),
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
        playerNumberTurn: 1,
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
      dedent(`
        emailSent:
          _id: ${_id}
          hash: ${docidToHash(_id)}
      `)
    )
  })
}

function createRoom() {
  return dal.activeRoom.create({}).then(({ _id, _rev }) => {
    const hash = docidToHash(_id)
    logThenNewline(
      dedent(`
        room:
          _id: ${_id}
          hash: ${hash}
      `)
    )

    return { hash, _id, _rev }
  })
}

function createPlayers([roomData]) {
  const { hash, _id, _rev } = roomData
  return Promise.all([
    createAPlayer(test2EncryptedEmail, 1, hash, 'Space Ghost', 'coast'),
    createAPlayer(test1EncryptedEmail, 2, hash, 'Wonder Woman', 'guest'),
  ])
    .then(([player1, player2]) => {
      const idAndRev = pickIdAndRev(player2),
        player2Data = removeCouchdbProperties(player2)

      player2Data.guesses = [
        {
          word: 'blast',
          isValid: true,
          wasReviewed: true,
          chosenLetter: 'a',
        },
      ]

      return dal.player
        .update(combine(idAndRev)(player2Data))
        .then(justReturn([player1, player2]))
    })
    .then(([player1, player2]) => {
      return {
        roomHash: hash,
        roomId: _id,
        roomRev: _rev,
        player1Hash: docidToHash(player1._id),
        player2Hash: docidToHash(player2._id),
      }
    })
}

function createAPlayer(encryptedEmail, number, roomHash, displayName, word) {
  const playerData = {
    displayName,
    encryptedEmail,
    number,
    roomHash,
    word,
  }

  return dal.player.create(playerData).then(({ _id }) => {
    const hash = docidToHash(_id)
    logThenNewline(
      dedent(`
        player:
          _id: ${_id}
          hash: ${hash}
          number: ${number}
      `)
    )

    return dal.player.get({ _id })
  })
}

//
//---------//
// Exports //
//---------//

export default { install, name }
