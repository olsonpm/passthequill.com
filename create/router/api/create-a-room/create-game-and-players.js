//---------//
// Imports //
//---------//

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

  return dal.activeRoom.create({}).then(activeRoomResult => {
    const roomHash = docidToHash(activeRoomResult._id)

    return resolveAllProperties({
      player1Data: createPlayer(1, roomHash, player1EncryptedEmail),
      player1EmailSentHash: docidToHash(player1EmailSentData._id),
      player2Data: createPlayer(2, roomHash, player2EncryptedEmail),
      player2EmailSentHash: docidToHash(player2EmailSentData._id),
      roomHash,
    })
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
