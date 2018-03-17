//---------//
// Imports //
//---------//

import { dal, hashToDocid } from 'server/db'
import { flow, pickAll } from 'fes'

//
//------//
// Main //
//------//

const getCurrentAndOtherPlayerData = arg => {
  const { currentPlayerHash, player1Hash, player2Hash } = arg

  return Promise.all([
    dal.player.get({ _id: hashToDocid(player1Hash) }),
    dal.player.get({ _id: hashToDocid(player2Hash) }),
  ]).then(([player1Data, player2Data]) => {
    const [currentPlayer, otherPlayer] =
      currentPlayerHash === player1Hash
        ? [player1Data, player2Data]
        : [player2Data, player1Data]

    return {
      currentPlayer,
      otherPlayer,
    }
  })
}

const sanitize = {
  player: {
    current: pickAll(['number', 'displayName', 'guesses', 'word']),

    other: flow([
      pickAll(['displayName', 'guesses', 'word']),
      changeWordToHasWord,
    ]),
  },

  room: pickAll(['playerNumberTurn']),
}

function toggleTurn(playerNumberTurn) {
  return playerNumberTurn === 1 ? 2 : 1
}

//
//------------------//
// Helper Functions //
//------------------//

function changeWordToHasWord(data) {
  data.hasWord = !!data.word
  delete data.word
  return data
}

//
//---------//
// Exports //
//---------//

export { getCurrentAndOtherPlayerData, sanitize, toggleTurn }
