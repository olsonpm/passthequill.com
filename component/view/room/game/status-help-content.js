//---------//
// Imports //
//---------//

import dedentMacro from 'dedent/macro'

//
//------//
// Main //
//------//

const idToContent = {
  guessAWord: getGuessAWordContent(),
  matchingLetterHint: getMatchingLetterHint(),
  otherPlayerIsGuessing: getOtherPlayerIsGuessingContent(),
  otherPlayerIsReviewing: getOtherPlayerIsReviewingContent(),
  otherPlayerMustJoin: getOtherPlayerMustJoinContent(),
  revealOnlyLetter: getRevealOnlyLetterContent(),
  revealOneOfTheLetters: getRevealOneOfTheLetters(),
  validateWord: getValidateWord(),
}

//
//------------------//
// Helper Functions //
//------------------//

function getGuessAWordContent() {
  return dedentMacro(`
    <p>Guess a word up to 5&nbsp;letters</p>
    <p>
      Unlike your secret word, your guess can be less than 5 letters and may
      also have repeating&nbsp;letters.
    </p>
    <p>For example "apple", "pear" and "a" are all&nbsp;valid.</p>
  `)
}

function getMatchingLetterHint() {
  return dedentMacro(`
    <p class="sidenote">
      Note: Revealed matching letters are drawn with a gray circle around them.
      If you didn't match any letters then you won't see any&nbsp;circles.
    </p>
  `)
}

function getOtherPlayerIsGuessingContent() {
  return dedentMacro(`
    <p>Your friend is figuring out a word to&nbsp;guess</p>
  `)
}

function getOtherPlayerIsReviewingContent() {
  return dedentMacro(`
    <p>
      Your friend is reviewing your word. This means they are either deciding
      whether your word is valid or choosing which matching letter
      to&nbsp;reveal
    </p>
  `)
}

function getOtherPlayerMustJoinContent() {
  return dedentMacro(`
    <p>Your friend hasn't joined the game&nbsp;yet.</p>
  `)
}

function getRevealOnlyLetterContent() {
  return dedentMacro(`
    <p>
      It looks like your friend's guess matched a single letter.  If their guess
      is a real word then select it, otherwise mark the guess as&nbsp;invalid.
    </p>
  `)
}

function getRevealOneOfTheLetters() {
  return dedentMacro(`
    <p>
      It looks like your friend's guess matched more than one letter.  If their
      guess is a real word then select one of them, otherwise mark the guess
      as&nbsp;invalid.
    </p>
  `)
}

function getValidateWord() {
  return dedentMacro(`
    <p>
      Great news! It looks like your friend didn't get any matching letters.
      This means you need to mark whether their guess is a valid&nbsp;word.
    </p>
  `)
}

//
//---------//
// Exports //
//---------//

export default idToContent
