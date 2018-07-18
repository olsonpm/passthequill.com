//
// TODO: turn these post methods from procedural code into declared objects
//

//---------//
// Imports //
//---------//

import disableGuide from './disable-guide'
import displayName from './display-name'
import enterGame from './enter-game'
import guess from './guess'
import initPlayer from './init-player'
import revealLetter from './reveal-letter'
import secretWord from './secret-word'
import understands from './understands'

import { callEach } from 'universal/utils'

//
//------//
// Main //
//------//

const createPostRoutes = arg =>
  callEach(arg, [
    disableGuide,
    displayName,
    enterGame,
    guess,
    initPlayer,
    revealLetter,
    secretWord,
    understands,
  ])

//
//---------//
// Exports //
//---------//

export default createPostRoutes
