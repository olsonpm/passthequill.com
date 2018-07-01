<template>
  <h5 class="status">
    <clock ref="clockComponent"
      :onClick="showStatusHelp"
      :initialClasses="{ exists: showClock }"
      data-animate="{
        duration: {
          opacity: 'slow',
          size: 'fast',
        },
        shouldAnimate: { width: true },
      }" />

    <simple-button ref="helpButton"
      class="help"
      :on-click="showStatusHelp"
      :initialClasses="{ exists: shouldShowHelpButton }"
      data-animate="{
        duration: {
          opacity: 'slow',
          size: 'fast',
        },
        shouldAnimate: { width: true },
      }" >

      <help-circle />
    </simple-button>

    <span class="message">
      {{ message }}
      <attention-circle ref="attentionCircleComponent"
        data-animate="{ duration: { opacity: 'slow' } }" />
    </span>
  </h5>
</template>

<script>
//---------//
// Imports //
//---------//

import dedentMacro from 'dedent/macro'
import statusHelpContent from './status-help-content'

import { createNamespacedHelpers } from 'vuex'
import { logErrorToServer } from 'universal/utils'
import {
  addClass,
  animateHide,
  animateShow,
  makeVisible,
  removeClass,
} from 'client/utils'
import {
  combineAll,
  containedIn,
  forEach,
  getCount,
  isLaden,
  keepWhen,
  last,
  passThrough,
  unique
} from 'fes'

//
//------//
// Init //
//------//

const statusToMessage = getStatusToMessage(),
  interactionEvents = getInteractionEvents(),
  { mapGetters, mapState } = createNamespacedHelpers('room'),
  validHelpContentStatuses = new Set([
    'myTurn',
    'theirTurn',
    'waitForFriendToInit'
  ])

//
//------//
// Main //
//------//

//
// TODO: create meaningful group events e.g. beforeTurnGoesToOtherPlayer.  That
//   will remove a lot of the copy/paste below.
//

export default {
  name: 'status',

  computed: getComputedProperties(),

  subscribeTo: {
    room: {
      afterAddGuess() {
        const { $refs, showClock } = this

        removeClass('exists', $refs.helpButton)
        if (showClock) addClass('exists', $refs.clockComponent)
      },

      liveUpdate: {
        afterOtherPlayerChoseLetter() {
          return animateShow(this.$refs.clockComponent)
        },
        afterOtherPlayerInitialized() {
          const { $refs, isMyTurn } = this

          if (isMyTurn) {
            addClass('exists', $refs.helpButton)
            removeClass('exists', $refs.clockComponent)
          }
        },
        afterOtherPlayerGuessed() {
          const { $refs, shouldShowHelpButton } = this

          if (shouldShowHelpButton) addClass('exists', $refs.helpButton)
          removeClass('exists', $refs.clockComponent)
        },
      }
    }
  },

  methods: {
    maybeDrawAttentionUntilUserInteracts() {
      const { $refs, $store, message, statusIsPulsating } = this,
        { myTurn } = statusToMessage

      if (message !== myTurn || statusIsPulsating) return

      if (!statusIsPulsating) $store.commit('room/setStatusIsPulsating', true)

      const stopPulsating = () => {
        $store.commit('room/setStatusIsPulsating', false)
        animateHide($refs.attentionCircleComponent)
        forEach(
          eventName => window.removeEventListener(eventName, stopPulsating)
        )(interactionEvents)
      }

      makeVisible($refs.attentionCircleComponent)
      forEach(
        eventName => window.addEventListener(eventName, stopPulsating)
      )(interactionEvents)
    },
    showStatusHelp() {
      const { $myStore, helpContent } = this

      return $myStore.dispatch('lightbox/tryToShow', {
        content: helpContent,
        type: 'info',
      })
    }
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const vuexState = mapState([
      'currentPlayer',
      'otherPlayer',
      'statusIsPulsating'
    ]),
    vuexGetters = mapGetters([
      'currentPlayerHasNotMatchedAnyletters',
      'currentPlayerMustGuess',
      'currentPlayerMustRevealALetter',
      'friendWon',
      'isFriendsTurn',
      'isGameActive',
      'isMyTurn',
      'iWon',
      'otherPlayerHasJoined',
      'otherPlayerMustGuess',
      'otherPlayerMustJoin',
    ]),
    localComputedState = getLocalComputedState()

  return combineAll.objects([vuexState, vuexGetters, localComputedState])
}

function getStatusToMessage() {
  return {
    friendWon: "Bummer. Your friend won",
    iWon: "Congratulations. You won!",
    myTurn: "It's your turn",
    theirTurn: "It's your friend's turn",
    waitForFriendToInit: 'Waiting for friend to join',
  }
}

function getLocalComputedState() {
  return {
    helpContent() {
      const {
        currentPlayer,
        currentPlayerHasNotMatchedAnyletters,
        currentPlayerMustGuess,
        currentPlayerMustRevealALetter,
        otherPlayer,
        otherPlayerMustGuess,
        otherPlayerMustJoin,
        status
      } = this

      if (!validHelpContentStatuses.has(status)) return

      const otherPlayerHasGuessed = isLaden(otherPlayer.guesses),
        mySecretWord = currentPlayer.word

      let numberOfMatchingLetters = 0

      if (otherPlayerHasGuessed) {
        const lastGuess = last(otherPlayer.guesses).word
        numberOfMatchingLetters = passThrough(lastGuess, [
          keepWhen(containedIn(mySecretWord)),
          unique,
          getCount
        ])
      }

      //
      // TODO: Same issue as below.  Figure out a simpler way to write this
      //   roudy bunch'o booleans
      //
      if (otherPlayerMustJoin) return statusHelpContent.otherPlayerMustJoin
      else if (currentPlayerMustGuess) return statusHelpContent.guessAWord
      else if (currentPlayerMustRevealALetter) {
        return (numberOfMatchingLetters === 1)
          ? statusHelpContent.revealOnlyLetter
          : statusHelpContent.revealOneOfTheLetters
      }
      else if (otherPlayerMustGuess) {
        let result = statusHelpContent.otherPlayerIsGuessing
        if (currentPlayerHasNotMatchedAnyletters) result += statusHelpContent.matchingLetterHint
        return result
      } else {
        const error = new Error(
          dedentMacro(`
            helpContent called during an unsupported state

            NOTE: if this actually ever gets logged then appropriate variables
              to help debug will replace this note :)
          `)
        )

        logErrorToServer({
          context: 'when determining helpContent',
          error
        })
      }
    },
    message() {
      return statusToMessage[this.status]
    },
    showClock() {
      const {
        otherPlayerMustGuess,
        otherPlayerMustJoin,
      } = this

      return otherPlayerMustJoin || otherPlayerMustGuess
    },
    shouldShowHelpButton() {
      const { isGameActive, isMyTurn, otherPlayerHasJoined } = this

      return isGameActive && isMyTurn && otherPlayerHasJoined
    },
    status() {
      const { friendWon, isMyTurn, iWon, otherPlayerMustJoin } = this

      //
      // TODO: figure out a simpler way to write this.  I'm still undecided on
      //   how to best convey a bunch of booleans.
      //
      if (otherPlayerMustJoin) {
        return 'waitForFriendToInit'
      } else if (iWon) {
        return 'iWon'
      } else if (friendWon) {
        return 'friendWon'
      } else if (isMyTurn) {
        return 'myTurn'
      } else {
        return 'theirTurn'
      }
    }
  }
}

function getInteractionEvents() {
  return new Set([
    'keypress',
    'mousedown',
    'mousemove',
    'pointermove',
    'touchmove',
    'wheel',
  ])
}
</script>

<style lang="scss">
h5.status {
  @include per-screen-size(('height', 'line-height'), 30, 30, 30, 30, 'px');
  @include per-screen-size('margin-top', 30, 36, 42, 48, 'px');
  @include for-tablets-and-up {
    width: $column-width * 2;
  }

  font-style: italic;
  font-weight: 500;

  button.clock {
    @include res-aware-element-spacing('margin-right', 'xs');

    display: none;

    &.exists {
      display: inline-block;
    }
  }

  button.help {
    @include res-aware-element-spacing('margin-right', 'xs');
    display: none;
    vertical-align: middle;

    // this offsets the perceived vertical alignment caused by the shadow
    margin-top: -4px;

    &.exists {
      display: inline-block;
    }

    .help-circle {

      color: $bg;
      fill: $quill-blue;
    }
  }

  .attention-circle {
    position: relative;
    top: -2px;
  }
}
</style>
