//---------//
// Imports //
//---------//

import KoaRouter from 'koa-router'
import createGetRoute from './get'
import createPostGuess from './post_guess'
import createPostMarkChosenLetter from './post_mark-chosen-letter'
import createPostMarkGuessAsInvalid from './post_mark-guess-as-invalid'
import createPostMarkGuessAsValid from './post_mark-guess-as-valid'
import createPostInitPlayer from './post_init-player'

import { passThrough } from 'fes'

//
//------//
// Main //
//------//

const createRoomRouter = websocketServer => {
  const router = new KoaRouter()

  passThrough({ router, websocketServer }, [
    createGetRoute,
    createPostInitPlayer,
    createPostGuess,
    createPostMarkGuessAsInvalid,
    createPostMarkGuessAsValid,
    createPostMarkChosenLetter,
  ])

  return router
}

//
//---------//
// Exports //
//---------//

export default createRoomRouter
