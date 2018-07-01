<template>
  <div>
    <h2>How To Play</h2>

    <p class="sidenote">
      Note: The game should be simple enough to learn just by playing it once or
      twice, and that is what I recommend.  However I know some of you will
      prefer reading the instructions beforehand or enjoy referencing it during
      the game.  This page is for&nbsp;you.
    </p>

    <h4>What You'll Need</h4>
    <ul class="bulleted">
      <li>a friend</li>
      <li>an email for each of you</li>
    </ul>

    <h4>Getting Started</h4>
    <p>
      Click the "Begin" link above and enter in each of your emails.  You will
      each receive a link to the newly created game room.  Once you enter the
      game room you will be prompted for a
      <span class="field-name">display name</span> and
      a&nbsp;<span class="field-name">secret word</span>.
    </p>

    <dl>
      <dt>Display Name</dt>
      <dd>
        Any name you wish to identify yourself in the game room.
        1&#8209;15&nbsp;letters.
      </dd>

      <dt>Secret Word</dt>
      <dd>
        <p>
          A 5 letter word with no repeating characters found in
          <link-to url="/list-of-valid-words">
            this list
          </link-to>.
          For example, you could use "grape" but not "apple" because apple has
          two p's.  Secret words and guesses in this game are
          not&nbsp;case&#8209;sensitive.
        </p>
        <p class="sidenote" v-html="funGameNote" />
      </dd>
    </dl>

    <h4>Once You're In The Game</h4>
    <p>
      After both people have entered their display name and secret word, the
      person who was invited goes first (i.e. the person who created the game
      goes&nbsp;second).
    </p>
    <p class="sidenote">
      Because it will be easier to explain the game through example, let's
      pretend the person who created the game chose the display name
      <span class="player">Batman</span> and the secret word they chose is
      <span class="word">robin</span>.  Their friend chose the display name
      <span class="player">Wonder Woman</span> with the secret word
      <span class="word">power</span>.  Right now it's Wonder Woman's&nbsp;turn.
    </p>

    <h4>Wonder Woman's Turn</h4>
    <p>
      Wonder Woman is prompted to guess a word.  Unlike the secret word she
      chose earlier, a guess can be any word up to 5 letters and the letters do
      not have to be unique.  For example, Wonder Woman could guess "apple",
      "pear" or even "a" if she wanted&nbsp;to.
    </p>
    <p>
      Wonder Woman guesses the word&nbsp;"bling".
    </p>
    <p>
      After she submits her guess, the screen will show an updated status: "It's
      your friend's turn".  There will also be a clock icon next to the guess
      which just means Batman hasn't chosen a matching letter to reveal.  The
      clock will disappear and the matching letter will be revealed once he's
      done&nbsp;so.
    </p>

    <h4>Now It's Batman's Turn</h4>
    <p>
      Because "bling" has at least one matching letter, batman is prompted to
      reveal&nbsp;one.
    </p>
    <p>Batman reveals the letter "i" then guesses the word&nbsp;"cat".</p>

    <h4>Wonder Woman's Turn Again</h4>
    <p>
      Batman didn't match any letters so wonder woman is prompted to guess
      a&nbsp;word
    </p>
    <p>
      The game just got a little tougher for Wonder Woman because from now on
      she should guess words without the letter "i".  If she uses "i" in her
      guess then Batman can choose to reveal "i" again which wastes
      her&nbsp;turn.
    </p>
    <p>Wonder Woman guesses the word&nbsp;"blues"</p>

    <h4>Batman's Turn</h4>
    <p>Batman reveals the letter "b".</p>
    <p>
      Just like the game became more difficult for Wonder Woman last turn, this
      holds even more true for Batman.  He should think of a word without the
      letters "c", "a" nor "t" because he already knows they aren't in Wonder
      Woman's secret word.  Also note Batman would have been better off guessing
      a five letter word because that's two more chances to get a&nbsp;match.
    </p>
    <p class="sidenote">
      Sometimes it's hard to think of a five letter word while avoiding all the
      letters you're supposed to.  When that happens don't stress out!  Just use
      a smaller word and keep playing.  The game is more fun that
      <span class="dont-wrap">way <smile /></span>.
    </p>
    <p>Through a stroke of luck Batman guesses "power".</p>

    <h4>Game Over</h4>
    <p>Batman wins! <party /></p>
  </div>
</template>

<script>
import funGameNote from 'universal/fun-game-note'

export default {
  name: 'how-to-play',
  path: '/how-to-play',
  computed: {
    funGameNote() {
      return funGameNote
    }
  }
}
</script>

<style lang="scss">
.how-to-play.view {
  .field-name,
  .player,
  .word {
    font-weight: bold;
  }

  ul.bulleted {
    @include res-aware-element-spacing('margin-top', 'xxs');
  }
}
</style>
