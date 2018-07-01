//---------//
// Imports //
//---------//

import dedent from 'dedent'
import typeDetect from 'type-detect'

import normalizeField from './normalize-field'
import inputValidationInfo from 'universal/input-validation-info'

import { hasher } from 'server/utils'
import { approveIsLadenString, noop, truncate } from 'universal/utils'
import { approveEmailType, validEmailTypes } from 'universal/email/types'
import {
  allContainedIn,
  alwaysReturn,
  containedIn,
  containsAll,
  discardAll,
  discardWhen,
  isLaden,
  join,
  keepFirst,
  map,
  passThrough,
} from 'fes'

//
//------//
// Init //
//------//

const validReasons = new Set(['game finished']),
  toCommaList = join(', '),
  availableReasons = toCommaList(validReasons),
  isValidReason = containedIn(validReasons),
  approveWord = inputValidationInfo.initPlayer.body.word.approve,
  requiredGuessKeys = new Set([
    'hasAnyMatchingLetters',
    'isCorrect',
    'word',
  ]),
  validGuessKeys = new Set(['chosenLetter', ...requiredGuessKeys])

//
//------//
// Main //
//------//

const presetFields = map(normalizeField)({
  _id: {
    name: '_id',
    approve: approveIsLadenString,
  },
  _rev: {
    name: '_rev',
    approve: approveIsLadenString,
  },
  closedReason: {
    name: 'reason',
    approve: value => {
      if (!isValidReason(value)) {
        return dedent(`
          '${value}' is an invalid reason
          reasons available: ${availableReasons}
        `)
      }
    },
  },
  displayName: {
    name: 'displayName',
    isRequired: false,
  },
  emailSentType: {
    name: 'type',
    approve: approveEmailType.send,
  },
  emailUnsubscribeTypes: {
    name: 'types',
    approve: value => {
      const valueType = typeDetect(value)
      if (valueType !== 'Array') {
        return dedent(`
          The field 'types' must be an array of valid unsubscribe types
          type of value passed: ${valueType}
          value passed: ${truncate(value)}
        `)
      }

      const invalidTypes = discardAll(validEmailTypes.unsubscribe)(value)
      if (isLaden(invalidTypes)) {
        return dedent(`
          Some invalid unsubscribe email types were passed
          invalid types passed: ${toCommaList(invalidTypes)}
          types available: all, ${toCommaList(validEmailTypes.unsubscribe)}
        `)
      }
    },
  },
  guesses: {
    name: 'guesses',
    autogenerate: alwaysReturn([]),
    approve: value => {
      const valueType = typeDetect(value)
      if (valueType !== 'Array') {
        return dedent(`
          The field 'guesses' must be an array
          type of value passed: ${valueType}
          value passed: ${truncate(value)}
        `)
      }

      const invalidGuesses = discardWhen(isValidGuess)(value)
      if (isLaden(invalidGuesses)) {
        const invalidGuessesString = passThrough(invalidGuesses, [
          keepFirst(3),
          map(truncate),
        ])
        return dedent(`
          Some invalid guesses were passed
          invalid guesses passed: ${invalidGuessesString}
        `)
      }
    },
  },
  player1Hash: {
    name: 'player1Hash',
    isRequired: false,
  },
  player2Hash: {
    name: 'player2Hash',
    isRequired: false,
  },
  playerNumber: {
    name: 'number',
    approve: value => {
      if (value !== 1 && value !== 2) {
        return dedent(`
          Player number must be 1 or 2
          value passed: ${truncate(value)}
        `)
      }
    },
  },
  playerNumberTurn: {
    name: 'playerNumberTurn',
    approve: value => {
      if (value !== 1 && value !== 2) {
        return dedent(`
          Player number turn must be 1 or 2
          value passed: ${truncate(value)}
        `)
      }
    },
    autogenerate: alwaysReturn(2),
  },
  playerWord: {
    name: 'word',
    approve: approveWord,
    isRequired: false,
  },
  roomHash: {
    name: 'roomHash',
    approve: value => {
      if (hasher.decode(value).length !== 2) {
        return `'${value}' is an invalid roomHash.  It doesn't decode to two numbers`
      }
    },
  },
  userAgent: {
    name: 'userAgent',
    isRequired: false,
    approve: noop,
  },
})

//
//------------------//
// Helper Functions //
//------------------//

function isValidGuess(value) {
  const dirtyKeys = Object.keys(value)
  return (
    typeof value === 'object' &&
    allContainedIn(validGuessKeys)(dirtyKeys) &&
    containsAll(requiredGuessKeys)(dirtyKeys)
  )
}

//
//---------//
// Exports //
//---------//

export default presetFields
