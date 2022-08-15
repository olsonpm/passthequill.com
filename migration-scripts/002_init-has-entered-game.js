//---------//
// Imports //
//---------//

import { log, resolveAll } from 'universal/utils'
import { couchdb } from 'server/api'
import { hasKey, map, mAssignOver, mMap, passThrough } from 'fes'

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

const initHasEnteredGame = () =>
  Promise.all([getAllDocuments('player'), playerAccessor])
    .then(initHasEnteredGameForAllPlayers)
    .then(() => {
      log('migration finished: 002_init-has-entered')
    })

//
//------------------//
// Helper Functions //
//------------------//

function initHasEnteredGameForAllPlayers([allPlayers, playerAccessor]) {
  return passThrough(allPlayers, [
    map(setHasEnteredGame),
    mMap(playerAccessor.updateDocument),
    resolveAll,
  ])
}

function setHasEnteredGame(aPlayer) {
  if (!hasKey('hasEnteredGame')(aPlayer)) {
    const hasEnteredGame = !!(aPlayer.displayName && aPlayer.secretWord)
    return mAssignOver(aPlayer)({ hasEnteredGame })
  } else {
    return aPlayer
  }
}

//
//---------//
// Exports //
//---------//

export default initHasEnteredGame
