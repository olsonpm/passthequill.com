//
// TODO: turn these into separate components so we can use <link-to> instead of
//   lazily copying the code in <link-to> here because I'm lazy.
//

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
  otherPlayerIsChoosingALetter: getOtherPlayerIsChoosingALetter(),
  otherPlayerMustJoin: getOtherPlayerMustJoinContent(),
  revealOnlyLetter: getRevealOnlyLetterContent(),
  revealOneOfTheLetters: getRevealOneOfTheLetters(),
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
      also have repeating letters.  For example "apple", "pear" and "a" are
      all valid.  Finally, guesses must be in this
      <a href="/list-of-valid-words" class="link-to" target="_blank">
        list of valid words
      </a>.
    </p>
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

function getOtherPlayerIsChoosingALetter() {
  return dedentMacro(`
    <p>
      Good news! It looks like you matched one or more letters.  Your friend is
      choosing which one to&nbsp;reveal.
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
      It looks like your friend's guess matched a single letter.
    </p>
    <p class="sidenote">
      Having to click the only matching letter may seem silly, but if I
      automatically revealed this letter to your friend then she would know her
      word only matched a single letter.  The immediate response would give
      it&nbsp;away.
    </p>
  `)
}

function getRevealOneOfTheLetters() {
  return dedentMacro(`
    <p>
      It looks like your friend's guess matched more than one letter.  Choose
      one to&nbsp;reveal.
    </p>
  `)
}

//
//---------//
// Exports //
//---------//

export default idToContent
