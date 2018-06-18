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

import { assignOver, contains, map, passThrough } from 'fes'

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
          const { ladenString, maxLength } = createApprover({
            fieldName: 'guess',
            value,
          })

          return approveEach([ladenString(), maxLength(5)])
        },
      },
    },
  },
  initPlayer: {
    body: {
      displayName: {
        approve: value => {
          const { ladenString, maxLength } = createApprover({
            fieldName: 'displayName',
            value,
          })

          return approveEach([ladenString(), maxLength(15)])
        },
      },
      word: {
        approve: value => {
          const approver = createApprover({
            fieldName: 'word',
            value,
          })

          const { ladenString, maxLength, noDuplicateLetters } = approver

          return approveEach([
            ladenString(),
            maxLength(5),
            noDuplicateLetters(),
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
          const { doesNotContain, ladenString, maxLength } = createApprover({
            fieldName: 'context',
            value,
          })

          return approveEach([
            ladenString(),
            maxLength(500),
            doesNotContain('\n'),
          ])
        },
      },
      message: { approve: isLadenString('message') },
      stack: { approve: isLadenString('stack') },
    },
  },
  markChosenLetter: {
    body: {
      chosenLetter: {
        approve: value => {
          const { ladenString, maxLength } = createApprover({
            fieldName: 'chosenLetter',
            value,
          })

          return approveEach([ladenString(), maxLength(1)])
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
