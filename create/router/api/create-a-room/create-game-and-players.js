//---------//
// Imports //
//---------//

import presetFields from 'server/db/dal/preset-fields'

import { alwaysReturn as justReturn, omit } from 'fes'
import { dal, docidToHash } from 'server/db'
import { resolveAllProperties } from 'universal/utils'

//
//------//
// Main //
//------//

const createGameAndPlayers = responses => {
  const {
      encryptedEmails,
      player1EmailSentData,
      player2EmailSentData,
    } = responses,
    [player1EncryptedEmail, player2EncryptedEmail] = encryptedEmails

  return dal.activeRoom
    .create({})
    .then(roomData => {
      const roomHash = docidToHash(roomData._id)

      return resolveAllProperties({
        roomData,
        roomHash,
        player1Data: createPlayer(1, roomHash, player1EncryptedEmail),
        player1EmailSentHash: docidToHash(player1EmailSentData._id),
        player2Data: createPlayer(2, roomHash, player2EncryptedEmail),
        player2EmailSentHash: docidToHash(player2EmailSentData._id),
      })
    })
    .then(responses => {
      const { player1Data, player2Data, roomData } = responses,
        { _id, _rev } = roomData,
        responsesSansRoomData = omit('roomData')(responses)

      return dal.activeRoom
        .update({
          _id,
          _rev,
          player1Hash: docidToHash(player1Data._id),
          player2Hash: docidToHash(player2Data._id),
          playerNumberTurn: presetFields.playerNumberTurn.autogenerate(),
        })
        .then(justReturn(responsesSansRoomData))
    })
}

//
//------------------//
// Helper Functions //
//------------------//

function createPlayer(number, roomHash, encryptedEmail) {
  return dal.player.create({
    encryptedEmail,
    roomHash,
    number,
  })
}

//
//---------//
// Exports //
//---------//

export default createGameAndPlayers
