//
// README
//   - Instead of trying to be fancy and figuring out which users haven't
//     started a game, we're just going to be safe and create an inactive guide
//     for all email hashes found in email-sent.
//

//---------//
// Imports //
//---------//

import couchdbBase64 from 'couchdb-base64'

import { log, resolveAll, then } from 'universal/utils'
import { couchdb } from 'server/api'
import { combine, getValueAt, map, mMap, passThrough, unique } from 'fes'

//
//------//
// Init //
//------//

const { createDbAccessor, getAllIds } = couchdb,
  initialGuideData = getInitialGuideData()

//
//------//
// Main //
//------//

const createGuides = () =>
  Promise.all([createDbAccessor('guide'), getAllEmailHashes()])
    .then(createAllGuides)
    .then(() => {
      log('migration finished: 000_add-guide')
    })

//
//------------------//
// Helper Functions //
//------------------//

function createAllGuides([guide, allEmailHashes]) {
  return passThrough(allEmailHashes, [
    map(emailHash => couchdbBase64.encodeFromString(emailHash)),
    mMap(_id => guide.createDocument(combine({ _id })(initialGuideData))),
    resolveAll,
    then(allGuides => ({ guideAccessor: guide, allGuides })),
  ])
}

function getInitialGuideData() {
  return {
    isActive: false,
    understands: {
      displayNameAndSecretWord: true,
      gameRoomBasics: true,
      friendsGuessWithMultiMatch: true,
      friendsGuessWithSingleMatch: true,
      friendsGuessNoMatch: true,
      myFirstGuess: true,
      afterGuessWithMatch: true,
      afterGuessNoMatch: true,
      myGuessWithPriorMatch: true,
      myGuessNoPriorMatch: true,
    },
  }
}

function getAllEmailHashes() {
  const playerAccessor = createDbAccessor('player')
  return getAllIds('player')
    .then(allPlayerIds =>
      passThrough(allPlayerIds, [
        map(_id => playerAccessor.getDocument({ _id })),
        resolveAll,
      ])
    )
    .then(allPlayers =>
      passThrough(allPlayers, [map(getValueAt('encryptedEmail')), unique])
    )
}

//
//---------//
// Exports //
//---------//

export default createGuides
