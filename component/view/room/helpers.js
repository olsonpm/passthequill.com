//---------//
// Imports //
//---------//

import setOfValidWords from 'universal/set-of-valid-words'
import { logErrorToServer } from 'universal/utils'
import {
  getArrayOfKeys,
  isGreaterThan,
  isLaden,
  join,
  keep,
  keepWhen,
  mMap,
  mSet,
  passThrough,
  reduce,
  unique,
} from 'fes'

//
//------//
// Main //
//------//

const exampleDisplayNameAndSecretWordPairs = getExampleDisplayNameAndSecretWordPairs()

const initPlayer = {
  //
  // this function is placed in the 'computed' object of a vue component
  //
  successStatus() {
    return this.otherPlayer.hasEnteredGame ? 'startGame' : 'mustWaitForFriend'
  },
}

const invalidDisplayNameMessage = 'display name must be 1 to 15 letters'

//
// this function is placed in the 'computed' object of a vue component
//
function invalidWordMessage() {
  const currentWord = this.formData.inputs.secretWord || ''

  if (currentWord.length !== 5) return 'your secret word must be 5 letters'

  const repeatingLetters = passThrough(currentWord, [
    getLetterToLetterCount,
    keepWhen(isGreaterThan(1)),
    getArrayOfKeys,
  ])

  if (isLaden(repeatingLetters)) {
    const showRepeatedLetters =
      repeatingLetters.length === 1
        ? `('${repeatingLetters[0]}' is repeated)`
        : `('${join("' and '")(repeatingLetters)}' are repeated)`

    return `secret word must have unique letters<br>${showRepeatedLetters}`
  }

  if (!setOfValidWords.has(currentWord)) {
    return `your secret word is not in<br>my dictionary`
  }

  logErrorToServer({
    context: 'during invalidWordMessage()',
    error: new Error(`currentWord seems to be valid: '${currentWord}'`),
  })
}

const statusToMessage = {
  friendWon: 'Bummer. Your friend won',
  iWon: 'Congratulations. You won!',
  myTurn: "It's your turn",
  theirTurn: "It's your friend's turn",
  waitForFriendToInit: 'Waiting for friend to join',
}

//
//------------------//
// Helper Functions //
//------------------//

function getLetterToLetterCount(currentWord) {
  return passThrough(currentWord, [
    unique,
    reduce(toZeroes, {}),
    mMap(toLetterCounts),
  ])

  // scoped helper functions

  function toLetterCounts(_unused_zero, letter) {
    return keep(letter)(currentWord).length
  }
}

function toZeroes(result, letter) {
  return mSet(letter, 0)(result)
}

function getExampleDisplayNameAndSecretWordPairs() {
  return [
    ['Austin Powers', 'swing'],
    ['Backstreet Boy', 'group'],
    ['Dopey', 'dwarf'],
    ['Gordon Ramsay', 'shout'],
    ['Hercules', 'bicep'],
    ['Hulk Hogan', 'brawl'],
    ['Jack Dawson', 'goner'],
    ['Jason Voorhees', 'panic'],
    ['Mario', 'peach'],
    ['Michael Jordan', 'jumps'],
    ['My Cat Max', 'meows'],
    ['Paul Bunyan', 'giant'],
    ['Tinkerbell', 'fairy'],
    ['Wonder Woman', 'super'],
  ]
}

//
//---------//
// Exports //
//---------//

export {
  exampleDisplayNameAndSecretWordPairs,
  initPlayer,
  invalidDisplayNameMessage,
  invalidWordMessage,
  statusToMessage,
}
