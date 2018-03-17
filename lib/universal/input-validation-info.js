//
// README
//   - This structure is very brittle atm because I'm still trying to figure out
//     a clean way to share these structures between the back and frontends.
//     At first I thought all forms would share validation info with a post
//     endpoint but this is not true for forms which have no submit button.
//     Anyway, we can refactor it later so let's just move forward!
//

//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { approveIsLaden, truncate } from 'universal/utils'
import { assignOver, map, passThrough } from 'fes'
import { approveEmailType } from 'universal/email/types'

//
//------//
// Main //
//------//

const inputValidationInfo = map(normalize)({
  createARoom: {
    body: {
      player1Email: {},
      player2Email: {},
    },
  },
  emailResubscribe: {
    body: {
      type: {
        approve: approveEmailType.unsubscribe,
      },
    },
  },
  emailUnsubscribe: {
    body: {
      type: {
        approve: approveEmailType.unsubscribe,
      },
    },
  },
  guess: {
    body: {
      guess: {
        approve: value => {
          if (typeof value !== 'string' || !value) {
            return dedent(`
              Your guess must be a non-empty string
              typeof value: ${typeof value}
              value passed: ${truncate(value)}
            `)
          }
          if (value.length > 5) {
            return dedent(`
              Your guess cannot be greater than 5 letters
              number of letters: ${value.length}
              string passed: ${value}
            `)
          }
        },
      },
    },
  },
  initPlayer: {
    body: {
      displayName: {
        approve: value => {
          if (typeof value !== 'string' || !value || value.length > 15) {
            return 'displayName must be 1-15 letters'
          }
        },
      },
      word: {
        approve: value => {
          if (typeof value !== 'string' || !value) {
            return dedent(`
              The word must be a non-empty string
              typeof value: ${typeof value}
              value passed: ${truncate(value)}
            `)
          }
          if (value.length !== 5) {
            return dedent(`
              The word must be exactly 5 letters
              number of letters: ${value.length}
              string passed: ${value}
            `)
          }
          if (new Set(value).size !== 5) {
            return dedent(`
              The word cannot have duplicate letters
              string passed: ${value}
            `)
          }
        },
      },
    },
  },
  markChosenLetter: {
    body: {
      chosenLetter: {
        approve: value => {
          if (typeof value !== 'string' || !value) {
            return dedent(`
              chosenLetter must be a non-empty string
              typeof value: ${typeof value}
              value passed: ${truncate(value)}
            `)
          }

          if (value.length !== 1) {
            return dedent(`
              chosenLetter must be a single character
              value passed: ${truncate(value)}
            `)
          }
        },
      },
    },
  },
})

//
//------------------//
// Helper Functions //
//------------------//

function normalize(apiEndpiont) {
  return passThrough(apiEndpiont, [
    assignOver({ body: {}, form: {}, queryParameters: {} }),
    map(normalizeIdToValidationInfo),
  ])
}

function normalizeIdToValidationInfo(idToValidationInfo) {
  return map(validationInfo =>
    Object.assign(
      {
        approve: approveIsLaden,
        isRequired: true,
      },
      validationInfo
    )
  )(idToValidationInfo)
}

//
//---------//
// Exports //
//---------//

export default inputValidationInfo
