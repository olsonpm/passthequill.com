//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { truncateDirtyArgs } from 'universal/utils'
import { mSet, reduce } from 'fes'

//
//------//
// Init //
//------//

const methodNameToAction = getMethodNameToAction(),
  setOfVowels = new Set('aeiou')

//
//------//
// Main //
//------//

const sections = ['couchdb', 'fallback', 'invalidArgs'],
  sectionToCreateErrorMessage = reduce(toCreateMessage, {})(sections)

//
//------------------//
// Helper Functions //
//------------------//

function toCreateMessage(sectionToCreateMessage, section) {
  return mSet(section, createMessage)(sectionToCreateMessage)

  function createMessage(
    methodName,
    databaseName,
    args,
    invalidArgsMessage = ''
  ) {
    const action = methodNameToAction[methodName],
      firstLetterIsVowel = setOfVowels.has(databaseName[0]),
      aOrAn = firstLetterIsVowel ? 'an' : 'a',
      friendly = `${action} ${aOrAn} ${databaseName} record`,
      truncatedArgs = truncateDirtyArgs(args)

    let detailed = dedent(`
      Error occurred while ${friendly}

      section: ${section}
    `)

    if (invalidArgsMessage) {
      detailed += `\n${invalidArgsMessage}`
    }
    detailed += `\n\n${truncatedArgs}`

    return {
      friendly,
      detailed,
    }
  }
}

function getMethodNameToAction() {
  return {
    create: 'creating',
    delete: 'deleting',
    get: 'getting',
    update: 'updating',
  }
}

//
//---------//
// Exports //
//---------//

export default sectionToCreateErrorMessage
