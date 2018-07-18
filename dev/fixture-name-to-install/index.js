//
// README
//   - This code assumes only one fixture will be installed at a time.
//
// TODO: extract the common code from each fixture so the fixtures themselves
//   can be lightweight and composed of the shared pieces.  I imagine
//   something like:
// createRoom.then(createBothPlayers).then(createGuessForPlayer1).then(...)
//

//---------//
// Imports //
//---------//

import api from 'server/api/couchdb'

import bothPlayersInitialized from './both-players-initialized'
import lotOfGuesses from './lot-of-guesses'
import onlyPlayer1IsInitialized from './only-player1-is-initialized'
import onlyPlayer2IsInitialized from './only-player2-is-initialized'
import player1MustGuessNoMatch from './player1-must-guess-no-match'
import player1MustGuessWithMatch from './player1-must-guess-with-match'
import player1MustRevealALetter from './player1-must-reveal-a-letter'
import player2MustRevealALetter from './player2-must-reveal-a-letter'
import player2MustGuess from './player2-must-guess'
import roomExists from './room-exists'
import unsubscriptionExists from './unsubscription-exists'

import { log, noop, repeatString } from 'universal/utils'
import { map, mSet, passThrough } from 'fes'

//
//------//
// Init //
//------//

const fixtures = getFixtures()

//
//------//
// Main //
//------//

const fixtureNameToInstall = passThrough(fixtures, [
  map(createInstall),
  mSet('none', noop),
])

//
//------------------//
// Helper Functions //
//------------------//

function createInstall({ install, name }) {
  return () => {
    logHeader(`installing fixture '${name}'`)

    return install()
      .then(() => api.replicateAllDbs(name))
      .then(() => {
        logHeader(`'${name}' installed`)
      })
  }
}

function logHeader(header) {
  const border = repeatString(header.length)('-')
  log(`${border}\n${header}\n${border}\n`)
}

function getFixtures() {
  return {
    bothPlayersInitialized,
    lotOfGuesses,
    onlyPlayer1IsInitialized,
    onlyPlayer2IsInitialized,
    player1MustGuessNoMatch,
    player1MustGuessWithMatch,
    player1MustRevealALetter,
    player2MustRevealALetter,
    player2MustGuess,
    roomExists,
    unsubscriptionExists,
  }
}

//
//---------//
// Exports //
//---------//

export default fixtureNameToInstall
