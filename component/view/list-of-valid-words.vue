<template>
  <div>
    <h2>List of valid words</h2>

    <p>
      The word list below is labeled '2of12inf' provided by the people over at
      <link-to url="http://wordlist.aspell.net/">
        SCOWL (And Friends)
      </link-to>.
      It is
      <link-to :url="url_2of12inf_isForWordgames">
        intended for word games
      </link-to>
      because it removes hyphens, includes inflections and a few other suitable
      qualities.  More info about the list can be
      <link-to :url="url_2of12inf_moreInfo">
        found here
      </link-to>.
    </p>
    <p>

    <p class="sidenote">
      Confession: I added the single letter words 'a' and 'i' to the list.  If
      you think a word should be added then let me know at
      {{ global.authorEmail }}.  Apparently Words With Friends adds slang,
      acronyms, and all sorts of fun words that make Scrabble purists cry foul.
    </p>

    <ul class="words">
      <li v-for="word in arrayOfValidWords" :key="word">
        {{ word }}
      </li>
    </ul>
  </div>
</template>

<script>
import setOfValidWords from 'universal/set-of-valid-words'
import funGameNote from 'universal/fun-game-note'

const arrayOfValidWords = Array.from(setOfValidWords)

export default {
  name: 'list-of-valid-words',
  path: '/list-of-valid-words',
  computed: {
    url_2of12inf_isForWordgames() {
      return 'http://wordlist.aspell.net/12dicts-readme/#whichlist'
    },
    url_2of12inf_moreInfo() {
      return 'http://wordlist.aspell.net/12dicts-readme/#2of12inf'
    },
    funGameNote() {
      return funGameNote
    },
    arrayOfValidWords() {
      return arrayOfValidWords
    }
  }
}
</script>

<style lang="scss">
.list-of-valid-words.view {
  ul.words {
    @include res-aware-element-spacing('margin-top', 'lg');
    font-family: Hack, monospace;
  }
}
</style>
