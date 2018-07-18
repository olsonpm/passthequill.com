//---------//
// Imports //
//---------//

import tedent from 'tedent'
import typeDetect from 'type-detect'

import normalizeField from './normalize-field'
import inputValidationInfo from 'universal/input-validation-info'
import setOfUnderstandsKeys from 'universal/set-of-understands-keys'

import { hasher } from 'server/utils'
import { approveEmailType, validEmailTypes } from 'universal/email/types'
import {
  approveIsBoolean,
  approveIsLadenString,
  noop,
  toCommaList,
  truncate,
} from 'universal/utils'
import {
  allContainedIn,
  alwaysReturn,
  containedIn,
  containsAll,
  discardAll,
  discardWhen,
  getCount,
  isLaden,
  join,
  keepFirst,
  map,
  mSet,
  passThrough,
  reduce,
} from 'fes'

//
//------//
// Init //
//------//

const initialUnderstands = getInitialUnderstands(),
  validReasons = new Set(['game finished']),
  availableReasons = toCommaList(validReasons),
  isValidReason = containedIn(validReasons),
  approveSecretWord = inputValidationInfo.initPlayer.secretWord.approve,
  requiredGuessKeys = new Set(['hasAnyMatchingLetters', 'isCorrect', 'word']),
  validGuessKeys = new Set(['chosenLetter', ...requiredGuessKeys])

//
//------//
// Main //
//------//

const presetFields = map(normalizeField)({
  _id: { approve: approveIsLadenString },
  _rev: { approve: approveIsLadenString },
  closedReason: {
    name: 'reason',
    approve: value => {
      if (!isValidReason(value)) {
        return tedent(`
          '${value}' is an invalid reason
          reasons available: ${availableReasons}
        `)
      }
    },
  },
  displayName: { isRequired: false },
  emailSentType: {
    name: 'type',
    approve: approveEmailType.send,
  },
  emailUnsubscribeTypes: {
    name: 'types',
    approve: value => {
      const valueType = typeDetect(value)
      if (valueType !== 'Array') {
        return tedent(`
          must be an array of valid unsubscribe types
          type of value passed: ${valueType}
          value passed: ${truncate(value)}
        `)
      }

      const invalidTypes = discardAll(validEmailTypes.unsubscribe)(value)
      if (isLaden(invalidTypes)) {
        return tedent(`
          Some invalid unsubscribe email types were passed
          invalid types passed: ${toCommaList(invalidTypes)}
          types available: all, ${toCommaList(validEmailTypes.unsubscribe)}
        `)
      }
    },
  },
  guesses: {
    autogenerate: () => [],
    approve: value => {
      const valueType = typeDetect(value)
      if (valueType !== 'Array') {
        return tedent(`
          must have type 'Array' (according to typeDetect)
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
        return tedent(`
          Some invalid guesses were passed
          invalid guesses passed: ${invalidGuessesString}
        `)
      }
    },
  },
  hasEnteredGame: {
    approve: approveIsBoolean,
    autogenerate: alwaysReturn(false),
  },
  isActive: {
    approve: approveIsBoolean,
    autogenerate: alwaysReturn(true),
  },
  player1Hash: { isRequired: false },
  player2Hash: { isRequired: false },
  playerNumber: {
    name: 'number',
    approve: value => {
      if (value !== 1 && value !== 2) {
        return tedent(`
          Player number must be 1 or 2
          value passed: ${truncate(value)}
        `)
      }
    },
  },
  playerNumberTurn: {
    autogenerate: alwaysReturn(2),
    approve: value => {
      if (value !== 1 && value !== 2) {
        return tedent(`
          Player number turn must be 1 or 2
          value passed: ${truncate(value)}
        `)
      }
    },
  },
  playerWord: {
    name: 'secretWord',
    approve: approveSecretWord,
    isRequired: false,
  },
  roomHash: {
    approve: value => {
      if (hasher.decode(value).length !== 2) {
        return `'${value}' is an invalid roomHash.  It doesn't decode to two numbers`
      }
    },
  },
  understands: {
    autogenerate: alwaysReturn(initialUnderstands),
    approve: value => {
      if (typeof value !== 'object' || value === null) {
        return tedent(`
          must be typeof 'object'
          type of value passed: ${typeof value}
          value passed: ${truncate(value)}
        `)
      }

      const keysPassed = Object.keys(value),
        extraProps = discardAll(setOfUnderstandsKeys)(keysPassed)

      if (isLaden(extraProps)) {
        const unexpectedPropsString = passThrough(extraProps, [
            keepFirst(5),
            join(', '),
          ]),
          maybeEllipses = extraProps.length > 5 ? ', ...' : ''

        return tedent(`
          At least one unexpected property was passed
          ${unexpectedPropsString}${maybeEllipses}
        `)
      }

      const missingProps = discardAll(keysPassed)(setOfUnderstandsKeys)
      if (isLaden(missingProps)) {
        const missingPropsString = passThrough(missingProps, [
            keepFirst(5),
            join(', '),
          ]),
          maybeEllipses = missingProps.length > 5 ? ', ...' : ''

        return tedent(`
          At least one property is missing
          ${missingPropsString}${maybeEllipses}
        `)
      }

      const invalidProps = discardWhen(isTypeofBoolean)(value)
      if (isLaden(invalidProps)) {
        const invalidPropsString = passThrough(invalidProps, [
            keepFirst(3),
            map(truncate),
          ]),
          maybeEllipses = getCount(invalidProps) > 5 ? '...\n' : ''

        return (
          'At least one property is not typoef boolean' +
          `\n${invalidPropsString}${maybeEllipses}`
        )
      }
    },
  },
  userAgent: {
    isRequired: false,
    approve: noop,
  },
})

//
//------------------//
// Helper Functions //
//------------------//

function isTypeofBoolean(value) {
  return typeof value === 'boolean'
}

function isValidGuess(value) {
  const dirtyKeys = Object.keys(value)
  return (
    typeof value === 'object' &&
    allContainedIn(validGuessKeys)(dirtyKeys) &&
    containsAll(requiredGuessKeys)(dirtyKeys)
  )
}

function getInitialUnderstands() {
  return reduce(toFalse, {})(setOfUnderstandsKeys)
}

function toFalse(result, key) {
  return mSet(key, false)(result)
}

//
//---------//
// Exports //
//---------//

export default presetFields
