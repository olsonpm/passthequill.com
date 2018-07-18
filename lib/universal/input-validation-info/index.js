//
// README
//   - This structure is very brittle atm because I'm still trying to figure out
//     a clean way to share these structures between the back and frontends.
//     At first I thought all forms would share validation info with a post
//     endpoint but this is not true for forms which have no submit button.
//     Anyway, we can refactor it later so let's move forward!
//

//---------//
// Imports //
//---------//

import tedent from 'tedent'

import setOfUnderstandsKeys from '../set-of-understands-keys'

import { assignOver as applyDefaults, map } from 'fes'

import { approveIsLaden, truncate } from '../utils'
import { approveEmailType } from '../email/types'
import { approveEach, createApprover, isLadenString } from './approve'

//
//------//
// Init //
//------//

const commitHashRe = /^[a-f0-9]{40}$/i,
  initPlayer = getInitPlayerValidationInfo()

//
//------//
// Main //
//------//

const inputValidationInfo = map(normalize)({
  createARoom: {
    player1Email: {},
    player2Email: {},
  },
  displayName: {
    displayName: initPlayer.displayName,
  },
  emailResubscribe: {
    type: {
      approve: approveEmailType.unsubscribe,
    },
  },
  emailUnsubscribe: {
    type: {
      approve: approveEmailType.unsubscribe,
    },
  },
  guess: {
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
  initPlayer,
  log: {
    commitHash: {
      approve: value => {
        if (!commitHashRe.test(value)) {
          return tedent(`
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

        return containedIn(['client', 'server', 'ssr'])
      },
    },
    message: { approve: isLadenString('message') },
    other: {
      isRequired: false,
    },
    stack: { approve: isLadenString('stack') },
  },
  revealLetter: {
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
  secretWord: {
    secretWord: initPlayer.secretWord,
  },
  understands: {
    understands: {
      approve: value => {
        const { containedIn } = createApprover({
          fieldName: 'understands',
          value,
        })

        return containedIn(setOfUnderstandsKeys)
      },
    },
  },
})

//
//------------------//
// Helper Functions //
//------------------//

function getInitPlayerValidationInfo() {
  return {
    displayName: {
      approve: value => {
        const { isLadenString, maxLength } = createApprover({
          fieldName: 'displayName',
          value,
        })

        return approveEach([isLadenString, maxLength(15)])
      },
    },
    secretWord: {
      approve: value => {
        if (value && typeof value === 'string') {
          value = value.toLowerCase().trim()
        }

        const approver = createApprover({
          fieldName: 'secretWord',
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
  }
}

function normalize(inputIdToValidationInfo, _unused_apiEndpointKey) {
  return map(
    applyDefaults({
      approve: approveIsLaden,
      isRequired: true,
    })
  )(inputIdToValidationInfo)
}

//
//---------//
// Exports //
//---------//

export default inputValidationInfo
