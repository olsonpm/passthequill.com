<template>
  <h5 class="status"
    data-animate="{
      duration: { opacity: 'slow' },
      afterHide: 'makeInvisible',
    }">

    <clock v-if="showClock"
      ref="clockComponent"
      :style="{ display: state.clockDisplay }"
      :onClick="showStatusHelp"
      data-animate="{
        duration: {
          opacity: 'slow',
          size: 'fast',
        },
        shouldAnimate: {
          width: true,
        },
      }" />

    <simple-button v-if="shouldShowHelpButton"
      class="help"
      :on-click="showStatusHelp">

      <help-circle />
    </simple-button>

    <span class="message">
      {{ message }}

      <attention-circle ref="attentionCircleComponent" />
    </span>
  </h5>
</template>

<script>
//---------//
// Imports //
//---------//

import tedent from 'tedent'
import statusIdToHelpContent from './status-id-to-help-content'

import { createNamespacedHelpers } from 'vuex'
import { findFirstValueWithTruthyKey, logErrorToServer } from 'universal/utils'
import { animateHide, animateShow } from 'client/utils'
import { statusToMessage } from '../helpers'
import { combineAll, forEach, isLaden, keepAll, last } from 'fes'

//
//------//
// Init //
//------//

const interactionEvents = getInteractionEvents(),
  { mapGetters, mapState } = createNamespacedHelpers('room'),
  validHelpContentStatuses = new Set([
    'myTurn',
    'theirTurn',
    'waitForFriendToInit',
  ])

//
//------//
// Main //
//------//

export default {
  name: 'status',

  computed: getComputedProperties(),

  subscribeTo: {
    room: {
      liveUpdate: {
        //
        // TODO: figure out a less stateful way to handle the appearing of the
        //   clock component.
        //
        beforeOtherPlayerChoseLetter() {
          this.state.clockDisplay = 'none'
        },
        afterOtherPlayerChoseLetter() {
          this.state.clockDisplay = 'inline-block'
          return animateShow(this.$refs.clockComponent.$el)
        },
      },
    },
  },

  data: () => ({
    state: {
      clockDisplay: 'inline-block',
    }
  }),

  methods: {
    maybeDrawAttentionUntilUserInteracts() {
      const { $refs, $store, message, statusIsPulsating } = this,
        { myTurn } = statusToMessage

      if (message !== myTurn || statusIsPulsating) return Promise.resolve()

      $store.commit('room/setStatusIsPulsating', true)

      const stopPulsating = () => {
        $store.commit('room/setStatusIsPulsating', false)
        animateHide($refs.attentionCircleComponent)
        forEach(eventName =>
          window.removeEventListener(eventName, stopPulsating)
        )(interactionEvents)
      }

      forEach(eventName => window.addEventListener(eventName, stopPulsating))(
        interactionEvents
      )

      return animateShow($refs.attentionCircleComponent)
    },
    showStatusHelp() {
      const { $myStore, helpContent } = this

      return $myStore.dispatch('lightbox/tryToShow', {
        content: helpContent,
        type: 'info',
      })
    },
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
      'statusIsPulsating',
    ]),
    vuexGetters = mapGetters([
      'currentPlayerHasGuessed',
      'currentPlayerHasNotMatchedAnyletters',
      'currentPlayerMustGuess',
      'currentPlayerMustRevealALetter',
      'currentPlayersLastGuess',
      'friendWon',
      'isFriendsTurn',
      'isGameActive',
      'isMyTurn',
      'iWon',
      'otherPlayerMustGuess',
    ]),
    localComputedState = getLocalComputedState()

  return combineAll.objects([vuexState, vuexGetters, localComputedState])
}

function getLocalComputedState() {
  return {
    helpContent() {
      const {
        currentPlayer,
        currentPlayerHasGuessed,
        currentPlayerMustGuess,
        currentPlayerMustRevealALetter,
        currentPlayersLastGuess,
        otherPlayer,
        otherPlayerMustGuess,
        status,
      } = this

      if (!validHelpContentStatuses.has(status)) return

      const otherPlayerHasGuessed = isLaden(otherPlayer.guesses),
        mySecretWord = currentPlayer.secretWord,
        otherPlayerMustGuessNoMatch = otherPlayerMustGuess
          && currentPlayerHasGuessed
          && !currentPlayersLastGuess.hasAnyMatchingLetters

      let numberOfMatchingLetters = 0

      if (otherPlayerHasGuessed) {
        const lastGuess = last(otherPlayer.guesses).word
        numberOfMatchingLetters = keepAll(lastGuess)(mySecretWord).length
      }

      const statusId = findFirstValueWithTruthyKey([
        [!otherPlayer.hasEnteredGame, 'otherPlayerMustJoin'],
        [currentPlayerMustGuess, 'guessAWord'],
        [
          currentPlayerMustRevealALetter && numberOfMatchingLetters === 1,
          'revealOnlyLetter',
        ],
        [currentPlayerMustRevealALetter, 'revealOneOfTheLetters'],
        [otherPlayerMustGuessNoMatch, 'otherPlayerIsGuessingNoMatch'],
        [otherPlayerMustGuess, 'otherPlayerIsGuessing'],
      ])

      if (statusId) return statusIdToHelpContent[statusId]

      const error = new Error(
        tedent(`
          helpContent called during an unsupported state

          NOTE: if this actually ever gets logged then appropriate variables
            to help debug will replace this note :)
        `)
      )

      logErrorToServer({
        context: 'when determining helpContent',
        error,
      })
    },
    message() {
      return statusToMessage[this.status]
    },
    showClock() {
      const { otherPlayer, otherPlayerMustGuess } = this

      return !otherPlayer.hasEnteredGame || otherPlayerMustGuess
    },
    shouldShowHelpButton() {
      const { isGameActive, isMyTurn, otherPlayer } = this

      return isGameActive && isMyTurn && otherPlayer.hasEnteredGame
    },
    status() {
      const { friendWon, isMyTurn, iWon, otherPlayer } = this

      return findFirstValueWithTruthyKey([
        [!otherPlayer.hasEnteredGame, 'waitForFriendToInit'],
        [iWon, 'iWon'],
        [friendWon, 'friendWon'],
        [isMyTurn, 'myTurn'],
        [true, 'theirTurn'],
      ])
    },
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
  @include for-tablets-and-up {
    width: $column-width * 2;
  }

  font-style: italic;
  font-weight: 500;
  margin-top: 0;

  button.clock {
    @include res-aware-element-spacing('margin-right', 'xs');
  }

  button.help {
    @include res-aware-element-spacing('margin-right', 'xs');

    vertical-align: middle;

    // this offsets the perceived vertical alignment caused by the shadow
    margin-top: -4px;

    .help-circle {
      color: $bg;
      fill: $quill-blue;
    }
  }

  .message {
    position: relative;
  }
}
</style>
