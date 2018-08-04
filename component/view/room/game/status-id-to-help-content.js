//---------//
// Imports //
//---------//

import tedent from 'tedent'

//
//------//
// Main //
//------//

const idToContent = {
  guessAWord: getGuessAWord(),
  otherPlayerIsGuessingNoMatch: getOtherPlayerIsGuessingNoMatch(),
  otherPlayerIsGuessing: getOtherPlayerIsGuessing(),
  otherPlayerIsChoosingALetter: getOtherPlayerIsChoosingALetter(),
  otherPlayerMustJoin: getOtherPlayerMustJoinContent(),
  revealOnlyLetter: getRevealOnlyLetterContent(),
  revealOneOfTheLetters: getRevealOneOfTheLetters(),
}

//
//------------------//
// Helper Functions //
//------------------//

function getGuessAWord() {
  return tedent(`
    <p>Guess a word up to 5&nbsp;letters</p>
    <p>
      Unlike your secret word, your guess can be less than 5 letters and may
      also have repeating letters.  For example "apple", "pear" and "a" are
      all&nbsp;valid.
    </p>
  `)
}

function getOtherPlayerIsGuessing() {
  return '<p>Your friend is figuring out a word to&nbsp;guess</p>'
}

function getOtherPlayerIsGuessingNoMatch() {
  return tedent(`
    <p>Bummer, your guess didn't match any&nbsp;letters</p>

    <p>Your friend is now figuring out a word to&nbsp;guess</p>
  `)
}

function getOtherPlayerIsChoosingALetter() {
  return tedent(`
    <p>
      Good news! You've matched one or more letters.  Your friend is choosing
      which one to&nbsp;reveal.
    </p>
  `)
}

function getOtherPlayerMustJoinContent() {
  return tedent(`
    <p>
      Your friend hasn't entered the game&nbsp;yet.
    </p>
  `)
}

function getRevealOnlyLetterContent() {
  return tedent(`
    <p>
      Your friend's guess matched a single&nbsp;letter.
    </p>
    <p>
      Having to click the only matching letter may seem silly, but if I
      automatically revealed this letter to your friend then they would know
      their word only matched a single letter.  The immediate response
      gives it&nbsp;away.
    </p>
  `)
}

function getRevealOneOfTheLetters() {
  return tedent(`
    <p>
      Your friend's guess matched more than one letter.  Choose one
      to&nbsp;reveal.
    </p>
    <p>
      <i>Which</i> letter should you reveal?  There's no one right answer.
      You'll come up with strategies as you play the&nbsp;game.
    </p>
  `)
}

//
//---------//
// Exports //
//---------//

export default idToContent
