//---------//
// Imports //
//---------//

import { flow, mAssignOver, pickAll } from 'fes'
import { resolveAllProperties } from 'universal/utils'
import { ifResponseIsNot404 } from 'server/utils'
import { dal, hashToDocid } from 'server/db'

//
//------//
// Init //
//------//

const optionsForGet = {
  allow404: true,
  returnRawResponse: true,
}

//
//------//
// Main //
//------//

const attachToState = something => (ctx, next) => {
  mAssignOver(ctx.state)(something)
  return next()
}

const authorize = ctx => {
  try {
    const { roomHash } = ctx.params

    const playerHash =
      ctx.state.routeName === 'getRoom'
        ? ctx.request.query['player-hash']
        : ctx.params.playerHash

    return dal.activeRoom
      .get({ _id: hashToDocid(roomHash) }, optionsForGet)
      .then(
        ifResponseIsNot404(ctx, roomData => {
          const { player1Hash, player2Hash } = roomData,
            possiblePlayerHashes = new Set([player1Hash, player2Hash])

          if (!possiblePlayerHashes.has(playerHash)) {
            ctx.status = 404
            ctx.body = {
              error: "The room isn't associated with your specified playerHash",
            }
            return { is404: true }
          } else {
            return {
              ctx,
              currentPlayerHash: playerHash,
              player1Hash,
              player2Hash,
              roomData,
            }
          }
        })
      )
  } catch (e) {
    return Promise.reject(e)
  }
}

const getRoomAndPlayers = arg => {
  const { roomData } = arg

  return getCurrentAndOtherPlayerData(arg).then(result =>
    mAssignOver(result)({ roomData })
  )
}

const getCurrentAndOtherPlayerData = arg => {
  const { ctx, currentPlayerHash, player1Hash, player2Hash } = arg

  return Promise.all([
    dal.player.get({ _id: hashToDocid(player1Hash) }),
    dal.player.get({ _id: hashToDocid(player2Hash) }),
  ]).then(([player1Data, player2Data]) => {
    const [currentPlayer, otherPlayer] =
      currentPlayerHash === player1Hash
        ? [player1Data, player2Data]
        : [player2Data, player1Data]

    return {
      ctx,
      currentPlayer,
      otherPlayer,
    }
  })
}

const getCurrentPlayerData = ({ ctx, currentPlayerHash }) => {
  return resolveAllProperties({
    ctx,
    currentPlayer: dal.player.get({ _id: hashToDocid(currentPlayerHash) }),
  })
}

const getOtherPlayerData = ({ ctx, currentPlayerHash, roomData }) => {
  const { player1Hash, player2Hash } = roomData,
    otherPlayerHash =
      currentPlayerHash === player1Hash ? player2Hash : player1Hash

  return resolveAllProperties({
    ctx,
    otherPlayer: dal.player.get({ _id: hashToDocid(otherPlayerHash) }),
  })
}

const sanitize = {
  player: {
    current: pickAll([
      'number',
      'displayName',
      'guesses',
      'hasEnteredGame',
      'secretWord',
    ]),

    other: flow([
      pickAll(['displayName', 'guesses', 'hasEnteredGame', 'secretWord']),
      changeSecretWordToHasSecretWord,
    ]),
  },

  room: pickAll(['playerNumberTurn']),
}

//
//------------------//
// Helper Functions //
//------------------//

function changeSecretWordToHasSecretWord(data) {
  data.hasWord = !!data.secretWord
  delete data.secretWord
  return data
}

//
//---------//
// Exports //
//---------//

export {
  attachToState,
  authorize,
  getCurrentAndOtherPlayerData,
  getCurrentPlayerData,
  getOtherPlayerData,
  getRoomAndPlayers,
  sanitize,
}
