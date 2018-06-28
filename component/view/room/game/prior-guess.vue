<template>
  <!--

  TODO: normalize the server data and connect this component to the vuex store
    so it doesn't rely on all props directly being passed by `game/index.vue`

  -->

  <li v-show-initially="!justAdded"
    data-animate="{ duration: { opacity: 'slow' } }">

    <ul ref="lettersEl"
      class="letters"
      :class="lettersClasses">

      <li v-for="(letter, index) in word"
        data-animate="{ duration: { opacity: 'slow' } }"
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

    <cancel v-if="showLetterChooser"
      class="mark-invalid"
      data-animate="{ duration: { opacity: 'slow' } }"
      ref="cancelComponent"
      :onClick="showConfirmInvalidGuess" />

    <check-circle v-if="showLetterChooser && hasNoMatchingLetters"
      class="mark-valid"
      data-animate="{ duration: { opacity: 'slow' } }"
      ref="checkCircleComponent"
      :onClick="selectWordIsValid" />

    <simple-button v-if="showInvalidWordIndicator"
      :on-click="showInvalidWordHelp"
      class="alert"
      ref="alertButton"
      data-animate="{
        duration: {
          opacity: 'slow',
          size: 'fast'
        },
        shouldAnimate: { width: true }
      }">

      <alert class="warn" />
    </simple-button>

    <party v-if="isCorrect && iWon" />

    <frown v-if="isCorrect && friendWon" />

    <clock ref="clockComponent"
      class="clock"
      v-initial-classes="{ exists: showClock }"
      data-animate="{
        duration: {
          opacity: 'slow',
          size: 'fast',
        },
        shouldAnimate: { width: true },
      }"
      :onClick="showStatusHelp" />
  </li>
</template>

<script>
//---------//
// Imports //
//---------//

import confirmInvalidGuess from './confirm_invalid-guess'
import infoInvalidGuess from './info_invalid-guess'
import statusHelpContent from './status-help-content'
import { noop, waitMs } from 'universal/utils'
import { animateHide, animateShow, makeVisible } from 'client/utils'
import { createNamespacedHelpers } from 'vuex'
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
        const { $refs, showInvalidWordIndicator } = this

        if (showInvalidWordIndicator) return animateHide($refs.alertButton)
      },
      afterAddGuess() {
        const { $el, justAdded } = this

        if (justAdded) return animateShow($el)
      },
      beforeGuessMarkedAsInvalid() {
        const { $el, wasReviewed } = this

        if (!wasReviewed) return animateHide($el)
      },
      beforeGuessMarkedAsValid() {
        const { $el, wasReviewed } = this

        if (!wasReviewed) return animateHide($el)
      },
      afterGuessMarkedAsInvalid() {
        const {
          $el,
          isOtherPlayer,
          isValid,
          isLastGuess,
          wasReviewed
        } = this

        if (
          isOtherPlayer &&
          !isValid &&
          wasReviewed &&
          isLastGuess
        ) {
          return animateShow($el)
        }
      },
      afterGuessMarkedAsValid() {
        const {
          $el,
          isOtherPlayer,
          isValid,
          isLastGuess,
          wasReviewed
        } = this

        if (
          isOtherPlayer &&
          isValid &&
          wasReviewed &&
          isLastGuess
        ) {
          return animateShow($el)
        }
      },

      liveUpdate: {
        afterOtherPlayerGuessed() {
          const { $el, justAdded } = this

          if (justAdded) return animateShow($el)
        },
        beforeOtherPlayerChoseLetter() {
          const { $el, isCurrentPlayer, isLastGuess } = this

          if (isCurrentPlayer && isLastGuess) return animateHide($el)
        },
        afterOtherPlayerChoseLetter() {
          const { $el, isCurrentPlayer, isLastGuess } = this

          if (isCurrentPlayer && isLastGuess) return animateShow($el)
        },
        beforeOtherPlayerMarkedGuessAsInvalid() {
          const { $el, isCurrentPlayer, isLastGuess } = this

          if (isCurrentPlayer && isLastGuess) return animateHide($el)
        },
        afterOtherPlayerMarkedGuessAsInvalid() {
          const { $el, $refs, isCurrentPlayer, isLastGuess } = this

          if (isCurrentPlayer && isLastGuess) {
            makeVisible($refs.alertButton)
            return animateShow($el)
          }
        },
        beforeOtherPlayerMarkedGuessAsValid() {
          const { $refs, isCurrentPlayer, isLastGuess } = this

          if (isCurrentPlayer && isLastGuess) {
            return animateHide($refs.clockComponent)
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
          const { cancelComponent, checkCircleComponent, lettersEl } = this.$refs

          const hideNonChosenLetters = passThrough(lettersEl.children, [
            keepWhen(isNotChosen),
            map(animateHide)
          ])

          const maybeHideCheckCircle = checkCircleComponent
            ? animateHide(checkCircleComponent)
            : undefined

          return Promise.all([
            hideNonChosenLetters,
            animateHide(cancelComponent),
            maybeHideCheckCircle,
            waitMs(600),
          ])
        })
        .then(() => {
          const { lettersEl } = this.$refs,
            chosenLetter = findFirstWhen(isChosen)(lettersEl.children)

          return Promise.all([
            animateHide(chosenLetter),
            this.maybeRemoveNoGuesses(),
            waitMs(600),
          ])
        })
        .then(() => {
          return this.$myStore.dispatch('room/markChosenLetter', { letter })
        })
        .then(() => {
          const { lettersEl } = this.$refs

          const animateChildren = map(animateShow)(lettersEl.children)

          return Promise.all([
            ...animateChildren,
            this.revealEnterGuess(),
          ])
        })
        .then(() => {
          const { cancelComponent, checkCircleComponent, lettersEl } = this.$refs

          forEach(maybeClearOpacity)([
            cancelComponent,
            checkCircleComponent,
            ...lettersEl.children
          ])
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
        'last-letter-is-choosable': isChoosable(lastLetter, lastLetterIndex)
      }
    },
    showClock() {
      const { isCorrect, isCurrentPlayer, isFriendsTurn, wasReviewed } = this

      return (
        isCurrentPlayer &&
        isFriendsTurn &&
        !wasReviewed &&
        !isCorrect
      )
    },
    showInvalidWordIndicator() {
      const {
        isCurrentPlayer,
        isLastGuess,
        isValid,
        isMyTurn,
      } = this

      return isCurrentPlayer &&
        isMyTurn &&
        isLastGuess &&
        !isValid
    },
    showLetterChooser() {
      const { friendWon, isOtherPlayer, wasReviewed } = this

      return (
        !friendWon &&
        isOtherPlayer &&
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

function maybeClearOpacity(ref) {
  if (!ref) return

  const element = ref.$el || ref
  element.style.opacity = null
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
  button.clock {
    display: none;

    &.exists {
      display: inline-block;
    }
  }

  button.clock,
  button.alert,
  .frown {
    @include res-aware-element-spacing('margin-left', 'sm');
  }

  button.alert {
    margin-top: -2px;
    vertical-align: middle;
  }
  svg.alert {
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
    }

    &.last-letter-is-choosable + .mark-invalid {
      @include res-aware-element-spacing('margin-left', 'md');
    }
    &:not(.last-letter-is-choosable) + .mark-invalid {
      @include res-aware-element-spacing('margin-left', 'lg');
    }
  }

  .mark-valid {
    @include res-aware-element-spacing('margin-left', 'lg');
  }
}
</style>
