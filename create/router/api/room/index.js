//---------//
// Imports //
//---------//

import KoaRouter from 'koa-router'
import createGetRoute from './get'
import createPostGuess from './post_guess'
import createPostRevealLetter from './post_reveal-letter'
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
    createPostRevealLetter,
  ])

  return router
}

//
//---------//
// Exports //
//---------//

export default createRoomRouter
