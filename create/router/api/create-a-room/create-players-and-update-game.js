//---------//
// Imports //
//---------//

import presetFields from 'server/db/dal/preset-fields'

import setOfUnderstandsKeys from 'universal/set-of-understands-keys'

import { alwaysReturn as justReturn, mSet, omit, reduce } from 'fes'
import { dal, docidToHash } from 'server/db'
import { resolveAllProperties } from 'universal/utils'

//
//------//
// Init //
//------//

const initialUnderstands = reduce(toFalse, {})(setOfUnderstandsKeys)

//
//------//
// Main //
//------//

//
// TODO: clean this up a bit - seems unnecessarily heavy on declaring and
//   passing around variables
//
const createGameAndPlayers = responses => {
  const { player, roomData } = responses,
    roomHash = docidToHash(roomData._id)

  return resolveAllProperties({
    roomData,
    roomHash,
    player1Data: createPlayer(1, roomHash, player.one.encryptedEmail),
    player1EmailSentHash: docidToHash(player.one.emailSentData._id),
    player2Data: createPlayer(2, roomHash, player.two.encryptedEmail),
    player2EmailSentHash: docidToHash(player.two.emailSentData._id),
    //
    // this basically causes a side-effect for later, since we don't need to
    //   return guide data until the room is GET'd.
    //
    maybeCreateGuides: maybeCreateGuides(player),
  }).then(responses => {
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

function maybeCreateGuides(player) {
  const createPlayer1Guide =
    player.one.guide.status === 404
      ? dal.guide.create({ _id: player.one.guideId })
      : null

  const createPlayer2Guide =
    player.two.guide.status === 404
      ? dal.guide.create({ _id: player.two.guideId })
      : null

  return resolveAllProperties({
    createPlayer1Guide,
    createPlayer2Guide,
  })
}

function createPlayer(number, roomHash, encryptedEmail) {
  return dal.player.create({
    encryptedEmail,
    roomHash,
    number,
  })
}

function toFalse(result, key) {
  return mSet(key, false)(result)
}

//
//---------//
// Exports //
//---------//

export default createGameAndPlayers
