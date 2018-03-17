<template>
  <!--

  TODO: normalize the server data and connect this component to the vuex store
    so it doesn't rely on all props directly being passed by `game/index.vue`

  -->

  <can-fade always-render
    ref="fadeableGuess"
    :show-initially="!justAdded"
    :should-animate-slowly="true">

    <li>
      <ul class="letters" ref="lettersEl">
        <li v-for="(letter, index) in word"
          :key="index"
          :class="{
            chosen: wasChosen(letter, index),
            choosable: isChoosable(letter, index),
          }">

          <button v-if="isChoosable(letter, index)"
            @click.once="chooseLetter(letter, index)">

            {{ letter }}
          </button>

          <span v-else>
            {{ letter }}
          </span>
        </li>

        <li v-if="showLetterChooser"
          class="mark-invalid">

          <cancel tabindex="0"
            @click.native="showConfirmInvalidGuess"
            @keyup.space="showConfirmInvalidGuess"
            @keyup.enter="showConfirmInvalidGuess" />
        </li>

        <li v-if="showLetterChooser && hasNoMatchingLetters"
          class="mark-valid">

          <check-circle tabindex="0"
            @click.native="selectWordIsValid"
            @keyup.space="selectWordIsValid"
            @keyup.enter="selectWordIsValid" />
        </li>

        <li v-if="!isValid && wasReviewed"
          class="cross-out-line">

          <svg width="100%"
            height="100%">

            <line x1="0"
              y1="65%"
              x2="100%"
              y2="35%"
              stroke-width="1" />
          </svg>
        </li>
      </ul>

      <alert class="warn"
        ref="alertComponent"
        tabindex="0"
        should-animate-slowly
        should-animate-width
        :show-initially="showInvalidWordIndicator"
        @click.native="showInvalidWordHelp"
        @keyup.space="showInvalidWordHelp"
        @keyup.enter="showInvalidWordHelp" />

      <party v-if="isCorrect && iWon" />

      <frown v-if="isCorrect && friendWon" />

      <can-fade v-if="showClock"
        ref="fadeableClock"
        should-animate-slowly
        should-animate-width
        @click.native="showStatusHelp"
        @keyup.space="showStatusHelp"
        @keyup.enter="showStatusHelp">

        <clock />
      </can-fade>
    </li>
  </can-fade>
</template>

<script>
//---------//
// Imports //
//---------//

import confirmInvalidGuess from './confirm_invalid-guess'
import infoInvalidGuess from './info_invalid-guess'
import statusHelpContent from './status-help-content'
import { noop, waitMs } from 'universal/utils'
import { animateHide, animateShow, durations } from 'client/utils'
import { createNamespacedHelpers } from 'vuex'
import {
  combineAll,
  containedIn,
  contains,
  findFirstWhen,
  forEach,
  keepWhen,
  none,
} from 'fes'

//
//------//
// Init //
//------//

const { mapGetters, mapState } = createNamespacedHelpers('room'),
  returnNoop = () => noop,
  duration = durations.slow

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
    maybeRemoveNoGuesses: {
      default: returnNoop,
    },
    revealEnterGuess: {
      default: returnNoop,
    },

    // from vuex
    chosenLetter: {},
    currentOrOtherPlayer: {},
    isCorrect: {},
    isValid: {},
    justAdded: {
      default: false,
    },
    wasReviewed: {},
    word: {},
  },

  subscribeTo: {
    room: {
      beforeAddGuess() {
        if (this.showInvalidWordIndicator) {
          return this.$refs.alertComponent.animateHide()
        }
      },
      afterAddGuess() {
        const { justAdded } = this
        if (justAdded) {
          return this.$refs.fadeableGuess.animateShow()
        }
      },
      beforeGuessMarkedAsInvalid() {
        if (!this.wasReviewed) {
          return this.$refs.fadeableGuess.animateHide()
        }
      },
      beforeGuessMarkedAsValid() {
        if (!this.wasReviewed) {
          return this.$refs.fadeableGuess.animateHide()
        }
      },
      afterGuessMarkedAsInvalid() {
        const {
          $refs,
          currentOrOtherPlayer,
          isValid,
          isLastGuess,
          wasReviewed
        } = this

        if (
          currentOrOtherPlayer === 'otherPlayer' &&
          !isValid &&
          wasReviewed &&
          isLastGuess
        ) {
          return $refs.fadeableGuess.animateShow()
        }
      },
      afterGuessMarkedAsValid() {
        const {
          $refs,
          currentOrOtherPlayer,
          isValid,
          isLastGuess,
          wasReviewed
        } = this

        if (
          currentOrOtherPlayer === 'otherPlayer' &&
          isValid &&
          wasReviewed &&
          isLastGuess
        ) {
          return $refs.fadeableGuess.animateShow()
        }
      },

      liveUpdate: {
        afterOtherPlayerGuessed() {
          const { justAdded } = this
          if (justAdded) {
            return this.$refs.fadeableGuess.animateShow()
          }
        },
        beforeOtherPlayerChoseLetter() {
          const { $refs, isLastGuess, currentOrOtherPlayer } = this

          if (currentOrOtherPlayer === 'currentPlayer' && isLastGuess) {
            return $refs.fadeableGuess.animateHide()
          }
        },
        afterOtherPlayerChoseLetter() {
          const { $refs, isLastGuess, currentOrOtherPlayer } = this

          if (currentOrOtherPlayer === 'currentPlayer' && isLastGuess) {
            return $refs.fadeableGuess.animateShow()
          }
        },
        beforeOtherPlayerMarkedGuessAsInvalid() {
          const { $refs, isLastGuess, currentOrOtherPlayer } = this

          if (currentOrOtherPlayer === 'currentPlayer' && isLastGuess) {
            return $refs.fadeableGuess.animateHide()
          }
        },
        afterOtherPlayerMarkedGuessAsInvalid() {
          const { $refs, isLastGuess, currentOrOtherPlayer } = this

          if (currentOrOtherPlayer === 'currentPlayer' && isLastGuess) {
            this.$refs.alertComponent.setIsVisible(true)
            return $refs.fadeableGuess.animateShow()
          }
        },
        beforeOtherPlayerMarkedGuessAsValid() {
          const { $refs, isLastGuess, currentOrOtherPlayer } = this

          if (currentOrOtherPlayer === 'currentPlayer' && isLastGuess) {
            return $refs.fadeableClock.animateHide()
          }
        },
      }
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

      //
      // TODO: standardize some of these waitMs times - I'm just eyeballing
      //   it atm
      //
      // TODO: Separate this logic into an action and events
      //
      return waitMs(300)
        .then(() => {
          const { lettersEl } = this.$refs,
            nonChosenLetters = keepWhen(isNotChosen)(lettersEl.children)

          return Promise.all([
            animateHide(nonChosenLetters, duration),
            waitMs(600),
          ])
        })
        .then(() => {
          const { lettersEl } = this.$refs,
            chosenLetter = findFirstWhen(isChosen)(lettersEl.children)

          return Promise.all([
            animateHide(chosenLetter, duration),
            this.maybeRemoveNoGuesses(),
            waitMs(600),
          ])
        })
        .then(() => {
          return this.$myStore.dispatch('room/markChosenLetter', { letter })
        })
        .then(() => {
          const { lettersEl } = this.$refs

          return Promise.all([
            animateShow(lettersEl.children, duration),
            this.revealEnterGuess(),
          ])
        })
        .then(() => {
          const { lettersEl } = this.$refs

          forEach(clearOpacity)(lettersEl.children)
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
    showInvalidWordHelp() {
      return this.$myStore.dispatch('lightbox/tryToShow', {
        componentName: infoInvalidGuess.name,
      })
    },
    isChoosable(letter, index) {
      const { currentPlayer, showLetterChooser, word: guessedWord } = this

      const letterIsInWord = contains(letter)(currentPlayer.word)

      return (
        showLetterChooser &&
        letterIsInWord &&
        guessedWord.indexOf(letter) === index
      )
    },
    showConfirmInvalidGuess() {
      this.$myStore.dispatch('lightbox/tryToShow', {
        componentName: confirmInvalidGuess.name,
      })
    },
    selectWordIsValid() {
      this.$myStore.dispatch('room/markGuessAsValid')
    },
    showStatusHelp() {
      const { $myStore, currentPlayerHasNotMatchedAnyletters } = this

      let content = statusHelpContent.otherPlayerIsReviewing

      if (currentPlayerHasNotMatchedAnyletters) {
        content += statusHelpContent.matchingLetterHint
      }

      return $myStore.dispatch('lightbox/tryToShow', {
        content,
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
      'currentPlayerHasNotMatchedAnyletters',
      'friendWon',
      'isFriendsTurn',
      'isMyTurn',
      'iWon'
    ]),
    local = getLocalComputedProperties()

  return combineAll.objects([vuexState, vuexGetters, local])
}

function getLocalComputedProperties() {
  return {
    hasNoMatchingLetters() {
      const { currentPlayer, word } = this

      return none(containedIn(currentPlayer.word))(word)
    },
    showClock() {
      const { currentOrOtherPlayer, isCorrect, isFriendsTurn, wasReviewed } = this

      return (
        currentOrOtherPlayer === 'currentPlayer' &&
        isFriendsTurn &&
        !wasReviewed &&
        !isCorrect
      )
    },
    showInvalidWordIndicator() {
      const {
        currentOrOtherPlayer,
        isLastGuess,
        isValid,
        isMyTurn,
      } = this

      return currentOrOtherPlayer === 'currentPlayer' &&
        isMyTurn &&
        isLastGuess &&
        !isValid
    },
    showLetterChooser() {
      const { currentOrOtherPlayer, friendWon, wasReviewed } = this

      return (
        !friendWon &&
        currentOrOtherPlayer === 'otherPlayer' &&
        !wasReviewed
      )
    },
  }
}

function isNotChosen(aLetter) {
  return !aLetter.classList.contains('chosen')
}
function isChosen(aLetter) {
  return aLetter.classList.contains('chosen')
}

function clearOpacity(letter) {
  letter.style.opacity = null
}
</script>

<style lang="scss">
// TODO: figure out a better color scheme.  Local (unshared) colors feel dirty.
$choose-letter-focus: #ff8d00;
$matched-letter-color: #dcdcdc;

//
// TODO: decide whether it's better to only declare a class on the container,
//   meaning child components must assume their container class - or declare a
//   class on every child.  Or figure out another option? hmmmmm
//
.prior-guesses > li {
  > .clock,
  > .alert,
  > .frown {
    @include res-aware-element-spacing('margin-left', 'sm');
  }

  > .alert {
    height: 24px;
    width: 24px;
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

          background-color: $matched-letter-color;
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

      &:not(.choosable) + .mark-invalid {
        @include res-aware-element-spacing('margin-left', 'lg');
      }
      &.choosable + .mark-invalid {
        @include res-aware-element-spacing('margin-left', 'md');
      }

      &.mark-valid {
        @include res-aware-element-spacing('margin-left', 'lg');
      }
    }
  }
}
</style>
