//---------//
// Imports //
//---------//

import normalizeField from './normalize-field'
import presetFields from './preset-fields'
import { assignOver, map, passThrough, transformProperties } from 'fes'

//
//------//
// Init //
//------//

const {
  closedReason,
  displayName,
  emailSentType,
  emailUnsubscribeTypes,
  guesses,
  player1Hash,
  player2Hash,
  playerNumber,
  playerNumberTurn,
  playerWord,
  roomHash,
  userAgent,
} = presetFields

//
//------//
// Main //
//------//

const databaseNameToDefinition = map(normalize)({
  activeRoom: {
    fields: [playerNumberTurn, player1Hash, player2Hash],
  },
  closedRoom: {
    fields: [closedReason, roomHash],
  },
  emailSent: {
    fields: ['to', emailSentType],
  },
  emailUnsubscription: {
    //
    // _id should be the encrypted email to ensure we don't duplicate entries
    //
    hasCustomId: true,
    fields: [emailUnsubscribeTypes],
  },
  log: {
    fields: [
      'commitHash',
      'context',
      'environment',
      'ip',
      'message',
      'stack',
      userAgent,
    ],
  },
  player: {
    fields: [
      'encryptedEmail',
      displayName,
      guesses,
      playerNumber,
      playerWord,
      roomHash,
    ],
  },
})

//
//------------------//
// Helper Functions //
//------------------//

function normalize(databaseDefinition) {
  return passThrough(databaseDefinition, [
    assignOver({
      fields: [],
    }),
    transformProperties({
      fields: map(normalizeField),
    }),
  ])
}

//
//---------//
// Exports //
//---------//

export default databaseNameToDefinition
