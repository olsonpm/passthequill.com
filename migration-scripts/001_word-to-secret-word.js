//---------//
// Imports //
//---------//

import { log, logError, resolveAll } from 'universal/utils'
import { couchdb } from 'server/api'
import { map, mMap, passThrough } from 'fes'

//
//------//
// Init //
//------//

const { createDbAccessor, getAllDocuments } = couchdb

//
//------//
// Main //
//------//

const playerAccessor = createDbAccessor('player')

const wordToSecretWord = () =>
  Promise.all([getAllDocuments('player'), playerAccessor])
    .then(initHasEnteredGameForAllPlayers)
    .then(() => {
      log('migration finished: 001_word-to-secret-word')
    })
    .catch(err => {
      logError(err)
    })

//
//------------------//
// Helper Functions //
//------------------//

function initHasEnteredGameForAllPlayers([allPlayers, playerAccessor]) {
  return passThrough(allPlayers, [
    map(moveWordToSecretWord),
    mMap(playerAccessor.updateDocument),
    resolveAll,
  ])
}

function moveWordToSecretWord(aPlayer) {
  aPlayer.secretWord = aPlayer.word || aPlayer.secretWord
  delete aPlayer.word
  return aPlayer
}

//
//---------//
// Exports //
//---------//

export default wordToSecretWord
