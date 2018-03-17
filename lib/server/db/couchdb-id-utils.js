//---------//
// Imports //
//---------//

import couchdbBase64 from 'couchdb-base64'
import moment from 'moment'

import { hasher } from 'server/utils'
import { discardFirst, keepFirst } from 'fes'

//
//------//
// Init //
//------//

const myEpoch = moment.utc('2018.01.01', 'YYYY.MM.DD'),
  max3ByteUInt = 2 ** 24,
  timestampBits = 36,
  randomBits = 24,
  numberOfTimestampCharacters = timestampBits / 6,
  getTimestampCharactersFrom = keepFirst(numberOfTimestampCharacters),
  getRandomCharactersFrom = discardFirst(numberOfTimestampCharacters)

//
//------//
// Main //
//------//

//
// creates a 60-bit string.  The first 36 bits are the seconds since
//   'myEpoch'.  The next 24 bits are random
//
// 36 bits of seconds gives us unique timestamps til year 4195
// 24 bits of randomness is overkill to prevent collisions for ids created
//   on the same second
//
// a great article on creating ids can be found hurr:
//   https://eager.io/blog/how-long-does-an-id-need-to-be/
//
// Note: I don't expect to be reaching any performance bottlenecks with ids, but
//   I did want to follow best-practice for sake of learning.  In that regard,
//   here is relevant couchdb documentation for document id performance:
//   http://docs.couchdb.org/en/2.1.1/maintenance/performance.html#document-s-id
//
const createCouchdbId = () => {
  const secondsSinceMyEpoch = moment.utc().diff(myEpoch, 'seconds'),
    random3ByteUInt = createRandom3ByteUInt()

  //
  // 'base64' below refers to the custom base64 encoding provided
  //   by couchdb-base64
  //

  const base64Timestamp = encodeTimestamp(secondsSinceMyEpoch),
    base64Random = encodeRandomUInt(random3ByteUInt)

  return base64Timestamp + base64Random
}

//
// docid is a couchdb-base64 encoded string
//
const docidToHash = docid => {
  const secondsSinceMyEpoch = getSecondsSinceMyEpoch(docid),
    random3ByteUInt = getRandom3ByteUInt(docid)

  return hasher.encode(secondsSinceMyEpoch, random3ByteUInt)
}

const getMomentCreated = docid =>
  moment(myEpoch).add(getSecondsSinceMyEpoch(docid), 'seconds')

const getRandom3ByteUInt = docid =>
  couchdbBase64.decodeToUInt(getRandomCharactersFrom(docid))

const getSecondsSinceMyEpoch = docid =>
  couchdbBase64.decodeToUInt(getTimestampCharactersFrom(docid))

const hashToDocid = hash => {
  const [secondsSinceMyEpoch, randome3ByteUInt] = hasher.decode(hash),
    encodedTimestamp = encodeTimestamp(secondsSinceMyEpoch),
    encodedRandomUInt = encodeRandomUInt(randome3ByteUInt)

  return encodedTimestamp + encodedRandomUInt
}

//
//------------------//
// Helper Functions //
//------------------//

function encodeTimestamp(secondsSinceMyEpoch) {
  return couchdbBase64.encodeFromUInt({
    uint: secondsSinceMyEpoch,
    totalBits: timestampBits,
  })
}

function encodeRandomUInt(random3ByteUInt) {
  return couchdbBase64.encodeFromUInt({
    uint: random3ByteUInt,
    totalBits: randomBits,
  })
}

function createRandom3ByteUInt() {
  return Math.floor(Math.random() * max3ByteUInt)
}

//
//---------//
// Exports //
//---------//

export {
  createCouchdbId,
  docidToHash,
  getMomentCreated,
  getRandom3ByteUInt,
  getSecondsSinceMyEpoch,
  hashToDocid,
}
