//
// README
//   - This structure is very brittle atm because I'm still trying to figure out
//     a clean way to share these structures between the back and frontends.
//     At first I thought all forms would share validation info with a post
//     endpoint but this is not true for forms which have no submit button.
//     Anyway, we can refactor it later so let's just move forward!
//

//
// TODO: remove unnecessary 'body' property.  Originally I was going to declare
//   query string properties in addition to body, but I seem not to have
//   needed that.
//

//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { assignOver, map, passThrough } from 'fes'

import { approveIsLaden, truncate } from 'universal/utils'
import { approveEmailType } from 'universal/email/types'
import { approveEach, createApprover, isLadenString } from './approve'

//
//------//
// Init //
//------//

const commitHashRe = /^[a-f0-9]{40}$/i

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
          if (value && typeof value === 'string') {
            value = value.toLowerCase().trim()
          }

          const { isLadenString, isValidWord, maxLength } = createApprover({
            fieldName: 'guess',
            value,
          })

          return approveEach([isLadenString, maxLength(5), isValidWord])
        },
      },
    },
  },
  initPlayer: {
    body: {
      displayName: {
        approve: value => {
          const { isLadenString, maxLength } = createApprover({
            fieldName: 'displayName',
            value,
          })

          return approveEach([isLadenString, maxLength(15)])
        },
      },
      word: {
        approve: value => {
          if (value && typeof value === 'string') {
            value = value.toLowerCase().trim()
          }

          const approver = createApprover({
            fieldName: 'word',
            value,
          })

          const {
            isLadenString,
            hasLength,
            isValidWord,
            noDuplicateLetters,
          } = approver

          return approveEach([
            isLadenString,
            hasLength(5),
            noDuplicateLetters,
            isValidWord,
          ])
        },
      },
    },
  },
  log: {
    body: {
      commitHash: {
        approve: value => {
          if (!commitHashRe.test(value)) {
            return dedent(`
              commitHash must match the regex ${commitHashRe.toString()}
              value: ${truncate(value)}
            `)
          }
        },
      },
      context: {
        approve: value => {
          const { doesNotContain, isLadenString, maxLength } = createApprover({
            fieldName: 'context',
            value,
          })

          return approveEach([
            isLadenString,
            maxLength(500),
            doesNotContain('\n'),
          ])
        },
      },
      environment: {
        approve: value => {
          const { containedIn } = createApprover({
            fieldName: 'environment',
            value,
          })

          return approveEach([containedIn(['client', 'server', 'ssr'])])
        },
      },
      message: { approve: isLadenString('message') },
      stack: { approve: isLadenString('stack') },
    },
  },
  revealLetter: {
    body: {
      chosenLetter: {
        approve: value => {
          const { hasLength, isLadenString } = createApprover({
            fieldName: 'chosenLetter',
            value,
          })

          return approveEach([isLadenString, hasLength(1)])
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
