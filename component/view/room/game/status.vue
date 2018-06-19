<template>
  <can-fade always-render
    should-animate-slowly
    ref="canFadeComponent">

    <h5 class="status">
      <clock v-if="showClock"
        tabindex="0"
        @click.native="showStatusHelp"
        @keyup.space="showStatusHelp"
        @keyup.enter="showStatusHelp" />

      <help-circle v-if="isGameActive && isMyTurn"
        tabindex="0"
        @click.native="showStatusHelp"
        @keyup.space="showStatusHelp"
        @keyup.enter="showStatusHelp" />

      <span class="message">
        {{ message }}
        <attention-circle ref="attentionCircleComponent" />
      </span>
    </h5>
  </can-fade>
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

export default {
  name: 'status',

  computed: getComputedProperties(),

  methods: {
    animateHide() {
      const { canFadeComponent } = this.$refs
      return canFadeComponent.animateHide()
    },
    animateShow({ isLiveUpdate } = {}) {
      const { $refs, message } = this,
        { myTurn } = statusToMessage

      if (isLiveUpdate && message === myTurn) {
        this.drawAttentionUntilUserInteracts()
      }

      return $refs.canFadeComponent.animateShow()
    },
    drawAttentionUntilUserInteracts() {
      const { $refs, $store, statusIsPulsating } = this

      if (statusIsPulsating) return
      else $store.commit('room/setStatusIsPulsating', true)

      const stopPulsating = () => {
        $store.commit('room/setStatusIsPulsating', false)
        $refs.attentionCircleComponent.animateHide()
        forEach(
          eventName => window.removeEventListener(eventName, stopPulsating)
        )(interactionEvents)
      }

      $refs.attentionCircleComponent.setIsVisible(true)
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
      'currentPlayerMustReviewWord',
      'currentPlayersLastGuessWasReviewed',
      'friendWon',
      'isFriendsTurn',
      'isGameActive',
      'isMyTurn',
      'iWon',
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
        currentPlayerMustReviewWord,
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
      else if (currentPlayerMustReviewWord) {
        if (numberOfMatchingLetters === 1) return statusHelpContent.revealOnlyLetter
        if (numberOfMatchingLetters > 1) return statusHelpContent.revealOneOfTheLetters
        else return statusHelpContent.validateWord
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

  > .clock {
    @include res-aware-element-spacing('margin-right', 'xs');
  }

  > .help-circle {
    @include res-aware-element-spacing('margin-right', 'xs');

    color: $bg;
    cursor: pointer;
    fill: $quill-blue;
    vertical-align: middle;

    // this offsets the perceived vertical alignment caused by the shadow
    margin-top: -4px;
  }

  .attention-circle {
    position: relative;
    top: -2px;
  }
}
</style>
