import { mMap, mSet } from 'fes'

import email from './email'
import lightbox from './lightbox'
import room from './room'
import screenSize from './screen-size'
import unexpectedError from './unexpected-error'

const theModules = { email, lightbox, room, screenSize, unexpectedError }

export default mMap(mSet('namespaced', true))(theModules)
