import { mMap, mSet } from 'fes'

import email from './email'
import initPlayer from './init-player'
import lightbox from './lightbox'
import notifyError from './notify-error'
import room from './room'
import screenSize from './screen-size'
import unexpectedError from './unexpected-error'

const theModules = {
  email,
  initPlayer,
  lightbox,
  notifyError,
  room,
  screenSize,
  unexpectedError,
}

export default mMap(mSet('namespaced', true))(theModules)
