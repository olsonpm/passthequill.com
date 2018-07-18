<template>
  <li>
    <!--

    TODO: normalize the server data and connect this component to the vuex store
      so it doesn't rely on all props directly being passed by `game/index.vue`

    -->

    <ul ref="lettersEl"
      class="letters"
      :class="lettersClasses"
      data-animate="{
        duration: { opacity: 'slow' },
        afterHide: 'makeInvisible',
      }">

      <li v-for="(letter, index) in word"
        :key="index"
        :class="{
          chosen: wasChosen(letter, index),
          choosable: isChoosable(letter, index),
        }">

        <simple-button can-only-click-once
          v-if="isChoosable(letter, index)"
          :on-click="() => chooseLetter(letter, index)">

          {{ letter }}
        </simple-button>

        <span v-else>
          {{ letter }}
        </span>
      </li>
    </ul>

    <party v-if="isCorrect && iWon" />

    <frown v-if="isCorrect && friendWon" />

    <clock v-if="showClock"
      :onClick="showStatusHelp" />
  </li>
</template>

<script>
//
// TODO: standardize some of these waitMs times - I'm just eyeballing it atm
// TODO: Some of this logic was written prior to implementing eventManager, and
//   should be refactored to utilize it instead.
//

//---------//
// Imports //
//---------//

import statusIdToHelpContent from './status-id-to-help-content'
import { noop, waitMs } from 'universal/utils'
import { createNamespacedHelpers } from 'vuex'
import { animateHide, animateShow } from 'client/utils'
import {
  combineAll,
  containedIn,
  contains,
  findFirstWhen,
  forEach,
  keepWhen,
  map,
  none,
  passThrough,
} from 'fes'

//
//------//
// Init //
//------//

const { mapGetters, mapState } = createNamespacedHelpers('room'),
  returnNoop = () => noop

//
//------//
// Main //
//------//

export default {
  name: 'prior-guess',

  //
  // Note there are two 'chosen letter' identifiers here, one as a property and
  //   one on state.  The one on state represents the choice made immediately
  //   by the user whereas the one on props represents the source of truth
  //   (data from server).  This separation is how I keep the UX smooth -
  //   because we don't want the rest of the site to behave as though the letter
  //   was chosen until the animations are finished.
  //
  // TODO: use eventManager to create before and after hooks as opposed to track
  //   local 'chosen letter' state
  //
  props: {
    guessIndex: {},
    isLastGuess: {},
    revealEnterGuess: {
      default: returnNoop,
    },

    // from vuex
    chosenLetter: {},
    currentOrOtherPlayer: {},
    hasAnyMatchingLetters: {},
    isCorrect: {},
    justAdded: {
      default: false,
    },
    word: {},
  },

  subscribeTo: {
    room: {
      afterAddGuess() {
        const { $el, justAdded } = this

        if (justAdded) return animateShow($el)
      },
      beforeRevealLetter() {
        const { $refs, showLetterChooser } = this

        if (!showLetterChooser) return

        const chosenLetter = findFirstWhen(isChosen)($refs.lettersEl.children)

        return animateHide(chosenLetter)
      },
      afterRevealLetter() {
        const { $refs, isCurrentPlayer, isLastGuess } = this

        if (isCurrentPlayer || !isLastGuess) return

        const showChildren = map(animateShow)($refs.lettersEl.children)

        return Promise.all([...showChildren, this.revealEnterGuess()]).then(
          () => {
            const { lettersEl } = this.$refs

            forEach(maybeClearOpacity)(lettersEl.children)
          }
        )
      },

      liveUpdate: {
        afterOtherPlayerGuessed({ payload }) {
          const { $el, guessIndex, isOtherPlayer } = this,
            lastGuessIndex = payload.otherPlayer.guesses.length - 1

          if (isOtherPlayer && guessIndex === lastGuessIndex)
            return animateShow($el)
        },
        beforeOtherPlayerChoseLetter() {
          const { $el, isCurrentPlayer, isLastGuess } = this

          if (isCurrentPlayer && isLastGuess) return animateHide($el)
        },
        afterOtherPlayerChoseLetter() {
          const { $el, isCurrentPlayer, isLastGuess } = this

          if (isCurrentPlayer && isLastGuess) return animateShow($el)
        },
      },
    },
  },

  data() {
    return {
      state: {
        chosenLetter: {
          index: null,
          letter: null,
        },
      },
    }
  },

  computed: getComputedProperties(),

  methods: {
    chooseLetter(letter, index) {
      this.state.chosenLetter = {
        index,
        letter,
      }

      return waitMs(300)
        .then(() => {
          const { lettersEl } = this.$refs

          const hideNonChosenLetters = passThrough(lettersEl.children, [
            keepWhen(isNotChosen),
            map(animateHide),
          ])

          return Promise.all(hideNonChosenLetters)
        })
        .then(() => {
          return this.$myStore.dispatch('room/revealLetter', { letter })
        })
    },
    chosenLetterMatchesState(letter, index) {
      const { chosenLetter } = this.state
      return chosenLetter.letter === letter && chosenLetter.index === index
    },
    chosenLetterMatchesProp(letter, index) {
      const { chosenLetter, word } = this
      return chosenLetter === letter && word.indexOf(letter) === index
    },
    isChoosable(letter, index) {
      const { currentPlayer, showLetterChooser, word: guessedWord } = this

      const letterIsInWord = contains(letter)(currentPlayer.secretWord)

      return (
        showLetterChooser &&
        letterIsInWord &&
        guessedWord.indexOf(letter) === index
      )
    },
    showStatusHelp() {
      return this.$myStore.dispatch('lightbox/tryToShow', {
        content: statusIdToHelpContent.otherPlayerIsChoosingALetter,
        type: 'info',
      })
    },
    wasChosen(letter, index) {
      return (
        this.chosenLetterMatchesState(letter, index) ||
        this.chosenLetterMatchesProp(letter, index)
      )
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const vuexState = mapState(['currentPlayer', 'otherPlayer']),
    vuexGetters = mapGetters([
      'currentPlayerMustRevealALetter',
      'friendWon',
      'isFriendsTurn',
      'isMyTurn',
      'iWon',
      'otherPlayerMustRevealALetter',
    ]),
    local = getLocalComputedProperties()

  return combineAll.objects([vuexState, vuexGetters, local])
}

function getLocalComputedProperties() {
  return {
    hasNoMatchingLetters() {
      const { currentPlayer, word: guessedWord } = this

      return none(containedIn(currentPlayer.secretWord))(guessedWord)
    },
    isCurrentPlayer() {
      return this.currentOrOtherPlayer === 'currentPlayer'
    },
    isOtherPlayer() {
      return this.currentOrOtherPlayer === 'otherPlayer'
    },
    lettersClasses() {
      const { isChoosable, word } = this

      const lastLetterIndex = word.length - 1,
        lastLetter = word[lastLetterIndex]

      return {
        'last-letter-is-choosable': isChoosable(lastLetter, lastLetterIndex),
      }
    },
    showClock() {
      const {
        isCurrentPlayer,
        isLastGuess,
        otherPlayerMustRevealALetter,
      } = this

      return isCurrentPlayer && isLastGuess && otherPlayerMustRevealALetter
    },
    showLetterChooser() {
      const {
        currentPlayerMustRevealALetter,
        isLastGuess,
        isOtherPlayer,
      } = this

      return isOtherPlayer && isLastGuess && currentPlayerMustRevealALetter
    },
  }
}

function isNotChosen(aLetter) {
  return !aLetter.classList.contains('chosen')
}
function isChosen(aLetter) {
  return aLetter.classList.contains('chosen')
}

function maybeClearOpacity(ref) {
  if (!ref) return

  const element = ref.$el || ref
  element.style.opacity = null
}
</script>

<style lang="scss">
// TODO: figure out a better color scheme.  Local (unshared) colors feel dirty.
$choose-letter-focus: #ff8d00;

//
// TODO: decide whether it's better to only declare a class on the container,
//   meaning child components must assume their container class - or declare a
//   class on every child.  Or figure out another option? hmmmmm
//
.prior-guesses > li {
  button.clock,
  .frown {
    @include res-aware-element-spacing('margin-left', 'sm');
  }

  > .letters {
    display: inline-block;
    position: relative;

    > li {
      @include res-aware-font-size('md');

      display: inline-block;

      &.chosen {
        > button {
          border-color: $choose-letter-focus;
        }

        > span {
          @include per-screen-size(
            ('line-height', 'height', 'width'),
            34,
            36,
            38,
            40,
            'px'
          );

          background-color: $light-gray;
          border-radius: 200px;
          display: inline-block;
          text-align: center;
        }
      }

      &.chosen,
      &.choosable {
        &:not(:first-child) {
          @include res-aware-element-spacing('margin-left', 'xxs');
        }
        &:not(:last-child) {
          @include res-aware-element-spacing('margin-right', 'xxs');
        }
      }

      // TODO: understand why this works :)
      &.cross-out-line {
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;

        > svg > line {
          stroke: $fg;
        }
      }

      > button,
      > span {
        font-family: Hack, monospace;
        vertical-align: middle;
      }

      > button {
        @include shadow-small($with-focus: true);
        @include per-screen-size(('height', 'width'), 34, 36, 38, 40, 'px');
        @include per-screen-size('line-height', 30, 32, 34, 36, 'px');
        @include res-aware-element-spacing(
          ('margin-left', 'margin-right'),
          'xxs'
        );

        background-color: $yellow-warn-light;
        border: 2px solid $yellow-warn-light;
        border-radius: 200px;
        padding: 0;
        transition-duration: $duration-tiny;
        transition-property: background-color, border-color, box-shadow;
        transition-timing-function: $easing-default;
      }
    }
  }
}
</style>
