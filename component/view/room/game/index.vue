<template>
  <div :class="{ 'game-over': isGameOver }">
    <status ref="statusComponent"
      data-animate="{ duration: { opacity: 'slow' } }" />

    <div v-if="isTabletOrLarger"
      class="board tablets-and-larger">

      <div class="column current-player">
        <h3>{{ currentPlayer.displayName }}</h3>
        <ul class="prior-guesses">
          <template v-if="otherPlayerHasGuessed">
            <prior-guess v-for="(theGuess, index) in otherPlayer.guesses"
              :guess-index="index"
              :is-last-guess="index === otherPlayer.guesses.length - 1"
              :key="index"
              :reveal-enter-guess="revealEnterGuess"
              current-or-other-player="otherPlayer"
              v-bind="theGuess" />
          </template>

          <li v-else
            class="tbd"
            ref="tabletsAndLarger_currentPlayerNoGuessesEl"
            data-animate="{ duration: { opacity: 'slow' } }">

            &lt;No guesses yet&gt;
          </li>
        </ul>
      </div>

      <div class="column other-player">
        <h3 ref="tabletsAndLarger_otherPlayerDisplayNameEl"
          data-animate="{ duration: { opacity: 'slow' } }"
          :class="{ tbd: !otherPlayer.displayName }">

          {{ otherPlayer.displayName || '&lt;not entered yet&gt;' }}
        </h3>
        <ul class="prior-guesses">
          <template v-if="currentPlayerHasGuessed">
            <prior-guess v-for="(theGuess, index) in currentPlayer.guesses"
              :guess-index="index"
              :is-last-guess="index === currentPlayer.guesses.length - 1"
              :key="index"
              current-or-other-player="currentPlayer"
              v-bind="theGuess" />
          </template>

          <li v-else-if="showNoGuessesYet"
            class="tbd"
            ref="tabletsAndLarger_otherPlayerNoGuessesEl"
            data-animate="{ duration: { opacity: 'slow' } }">

            &lt;No guesses yet&gt;
          </li>

          <li v-if="state.showPlaceholder" />

          <enter-guess v-if="state.showEnterGuess"
            ref="tabletsAndLarger_enterGuessComponent"
            data-animate="{ duration: { opacity: 'slow' } }" />
        </ul>
      </div>
    </div>

    <div v-if="isPhoneOrSmaller"
      class="board phones-and-smaller">

      <arrow-circle direction="left"
        ref="leftArrowComponent"
        data-animate="{ duration: { opacity: 'fast' } }"
        :pulsate="currentPlayerMustRevealALetter && !statusIsPulsating"
        :onClick="sliiiideToTheLeft"
        :show-initially="showLeftArrow" />

      <arrow-circle direction="right"
        ref="rightArrowComponent"
        data-animate="{ duration: { opacity: 'fast' } }"
        :pulsate="currentPlayerMustGuess && !statusIsPulsating"
        :onClick="sliiiideToTheRight"
        :show-initially="showRightArrow" />

      <ul class="player-view"
        ref="phonesAndSmaller_playerViewEl">

        <li>
          <h4>{{ currentPlayer.displayName }}</h4>
          <ul class="prior-guesses">
            <template v-if="otherPlayerHasGuessed">
              <prior-guess v-for="(theGuess, index) in otherPlayer.guesses"
                :guess-index="index"
                :is-last-guess="index === otherPlayer.guesses.length - 1"
                :key="index"
                :reveal-enter-guess="revealEnterGuess"
                current-or-other-player="otherPlayer"
                v-bind="theGuess" />
            </template>

            <li v-else
              class="tbd"
              ref="phonesAndSmaller_currentPlayerNoGuessesEl"
              data-animate="{ duration: { opacity: 'slow' } }">

              &lt;No guesses yet&gt;
            </li>
          </ul>
        </li>

        <li>
          <h4 ref="phonesAndSmaller_otherPlayerDisplayNameEl"
            data-animate="{ duration: { opacity: 'slow' } }"
            :class="{ tbd: !otherPlayer.displayName }">

            {{ otherPlayer.displayName || '&lt;not entered yet&gt;' }}
          </h4>
          <ul class="prior-guesses">
            <template v-if="currentPlayerHasGuessed">
              <prior-guess v-for="(theGuess, index) in currentPlayer.guesses"
                :guess-index="index"
                :key="index"
                :is-last-guess="index === currentPlayer.guesses.length - 1"
                current-or-other-player="currentPlayer"
                v-bind="theGuess" />
            </template>

            <li v-else-if="showNoGuessesYet"
              class="tbd"
              ref="phonesAndSmaller_otherPlayerNoGuessesEl"
              data-animate="{ duration: { opacity: 'slow' } }">

              &lt;No guesses yet&gt;
            </li>

            <li v-if="state.showPlaceholder" />

            <enter-guess v-if="state.showEnterGuess"
              ref="phonesAndSmaller_enterGuessComponent"
              data-animate="{ duration: { opacity: 'slow' } }" />
          </ul>
        </li>
      </ul>
    </div>
    <div v-if="isGameOver"
      class="game-over"
      ref="gameOverEl"
      data-animate="{ duration: { opacity: 'slow' } }">

      <p>
        Thanks for playing and I hope you enjoyed&nbsp;it.
      </p>
      <p>
        If you ran into an issue or were confused at any point please let me
        know <span class="dont-wrap">at {{ global.authorEmail }}.</span>
      </p>
    </div>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import hammerjs from 'hammerjs'

import enterGuess from './enter-guess'
import priorGuess from './prior-guess'
import status from './status'

import { bindAll } from 'universal/utils'
import { animate, animateHide, animateShow } from 'client/utils'
import { createNamespacedHelpers } from 'vuex'
import { combineAll, isLaden, last } from 'fes'

//
//------//
// Init //
//------//

const { mapState: mapScreenSizeState } = createNamespacedHelpers('screenSize'),
  {
    mapGetters: mapRoomGetters,
    mapState: mapRoomState,
  } = createNamespacedHelpers('room')

//
//------//
// Main //
//------//

export default {
  name: 'game',

  //
  // TODO: extract boilerplate in events
  //
  subscribeTo: {
    room: {
      beforeAddGuess() {
        const { $refs, state } = this

        return Promise.all([
            animateHide(this.getRef('enterGuessComponent')),
            animateHide($refs.statusComponent),
          ])
          .then(() => {
            state.showEnterGuess = false
            state.showPlaceholder = true
          })
      },
      afterAddGuess() {
        const { $refs, isGameOver, state } = this

        const maybeShowGameOver = isGameOver
          ? this.$nextTick().then(() => animateShow($refs.gameOverEl))
          : undefined

        state.showPlaceholder = false

        return Promise.all([
            animateShow($refs.statusComponent),
            maybeShowGameOver,
          ])
      },
      beforeRevealLetter() {
        return (this.currentPlayerHasGuessed)
          ? undefined
          : animateHide(this.getRef('otherPlayerNoGuessesEl'))
      },

      liveUpdate: {
        beforeOtherPlayerInitialized() {
          return Promise.all([
            animateHide(this.$refs.statusComponent),
            animateHide(this.getRef('otherPlayerDisplayNameEl'))
          ])
        },
        afterOtherPlayerInitialized() {
          const { $refs, currentPlayerMustGuess, state } = this,
            { statusComponent } = $refs

          statusComponent.maybeDrawAttentionUntilUserInteracts()
          state.showEnterGuess = currentPlayerMustGuess

          const maybeShowEnterGuess = state.showEnterGuess
              ? this.$nextTick().then(() => animateShow(this.getRef('enterGuessComponent')))
              : undefined

          return Promise.all([
            animateShow(statusComponent),
            animateShow(this.getRef('otherPlayerDisplayNameEl')),
            maybeShowEnterGuess
          ])
        },
        beforeOtherPlayerGuessed({ payload }) {
          const { $refs } = this,
            maybeHideNoGuesses = this.getMaybeHideNoGuesses(payload)

          return Promise.all([
            animateHide($refs.statusComponent),
            maybeHideNoGuesses.currentPlayer,
            maybeHideNoGuesses.otherPlayer,
          ])
        },
        afterOtherPlayerGuessed() {
          const { $refs, currentPlayerMustGuess, isGameOver } = this

          const maybeShowGameOver = isGameOver
              ? this.$nextTick().then(() => animateShow($refs.gameOverEl))
              : undefined

          const maybeShowEnterGuess = currentPlayerMustGuess
            ? this.revealEnterGuess()
            : undefined

          $refs.statusComponent.maybeDrawAttentionUntilUserInteracts()

          return Promise.all([
            animateShow($refs.statusComponent),
            maybeShowEnterGuess,
            maybeShowGameOver,
          ])
        },
      },
    },
  },

  components: { enterGuess, priorGuess, status },

  computed: getComputedProperties(),

  created() {
    const { state, currentPlayerMustGuess } = this

    state.showEnterGuess = currentPlayerMustGuess
  },

  watch: {
    isPhoneOrSmaller(value) {
      // nextTick is necessary because otherwise the referenced element
      //   `phonesAndSmaller_playerViewEl` won't have been rendered
      if (value) this.$nextTick(() => this.createTouchManager())
      else this.destroyTouchManager()
    },
    showLeftArrow(value) {
      const animateShowOrHide = value ? animateShow : animateHide
      return animateShowOrHide(this.$refs.leftArrowComponent)
    },
    showRightArrow(value) {
      const animateShowOrHide = value ? animateShow : animateHide
      return animateShowOrHide(this.$refs.rightArrowComponent)
    },
  },

  mounted() {
    //
    // because the swipe functionality is mobile-specific, we need to wait until
    //   the app has rendered before initializing the events.  At this point
    //   the vuex 'screenSize' store should have been initialized
    //
    this.$nextTick(() => {
      if (this.isPhoneOrSmaller) this.createTouchManager()
    })
  },

  beforeDestroy() {
    this.$store.commit('removeAppClass', 'game')
    this.closeLiveUpdateWebSocket()
    this.destroyTouchManager()
  },

  data() {
    return {
      state: {
        // this is initialized in `created`
        showEnterGuess: null,

        // TODO: remove this hack which addresses a flash between entering a
        //   guess and the guess appearing.  I think the solution is to wrap
        //   prior-guess and enter-guess into the li to ensure the li always
        //   exists.  That may cause complexity of its own though
        showPlaceholder: false,

        isSliding: false,

        // not sure what name to give this.  A 'slide' refers to a view of a
        //   player in the mobile view.  We need a one column layout for mobile,
        //   and a carousel-like ux is what I landed on.
        slidePosition: 0,
      },
    }
  },

  methods: {
    createTouchManager() {
      const playerViewEl = this.getRef('playerViewEl'),
        { DIRECTION_HORIZONTAL: direction } = hammerjs,
        { Swipe, Manager } = bindAll(['Swipe', 'Manager'], hammerjs)

      this.touchManager = new Manager(playerViewEl, {
        recognizers: [[Swipe, { direction }]],
      })

      this.touchManager.on('swipeleft swiperight', this.onSwipe.bind(this))
    },
    destroyTouchManager() {
      if (!this.touchManager) return

      this.touchManager.destroy()
      delete this.touchManager
    },
    getMaybeHideNoGuesses(payload) {
      const {
        currentPlayerHasGuessed,
        otherPlayerHasGuessed
      } = this

      const mostRecentGuess = last(payload.otherPlayer.guesses),
        currentPlayerMustRevealLetter = mostRecentGuess.hasAnyMatchingLetters

      const currentPlayer = otherPlayerHasGuessed
        ? undefined
        : animateHide(this.getRef('currentPlayerNoGuessesEl'))

      const otherPlayer = (
        currentPlayerHasGuessed
        || currentPlayerMustRevealLetter
      )
        ? undefined
        : animateHide(this.getRef('otherPlayerNoGuessesEl'))

      return {
        currentPlayer,
        otherPlayer
      }
    },
    getRef(name) {
      const prefix = this.isPhoneOrSmaller
        ? 'phonesAndSmaller_'
        : 'tabletsAndLarger_'

      return this.$refs[prefix + name]
    },
    onSwipe({ type }) {
      const { slidePosition } = this.state
      if (type === 'swipeleft' && slidePosition < 1) {
        this.slide(1)
      } else if (type === 'swiperight' && slidePosition > 0) {
        this.slide(-1)
      }
    },
    revealEnterGuess() {
      this.state.showEnterGuess = true

      return this.$nextTick().then(() => {
        const enterGuessComponent = this.getRef('enterGuessComponent')
        enterGuessComponent.clearText()

        return animateShow(enterGuessComponent)
      })
    },
    sliiiideToTheLeft() {
      return this.slide(-1)
    },
    sliiiideToTheRight() {
      return this.slide(1)
    },
    slide(positionMoved) {
      const { state } = this

      if (state.isSliding) return
      else state.isSliding = true

      const playerViewEl = this.getRef('playerViewEl'),
        index = state.slidePosition,
        to = (index + positionMoved) * 100,
        from = index * 100,
        fromNode = playerViewEl.childNodes[index],
        toNode = playerViewEl.childNodes[index + positionMoved],
        transform = [`translateX(-${to}%)`, `translateX(-${from}%)`]

      state.slidePosition += positionMoved

      return Promise.all([
        animate(fromNode, { opacity: [0, 1], transform }),
        animate(toNode, { opacity: [1, 0], transform }),
      ]).then(() => {
        state.isSliding = false
      })
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const vuexRoomState = mapRoomState([
      'currentPlayer',
      'otherPlayer',
      'room',
      'statusIsPulsating'
    ]),
    vuexRoomGetters = mapRoomGetters([
      'currentPlayerMustGuess',
      'currentPlayerMustRevealALetter',
      'friendWon',
      'isGameOver',
      'isFriendsTurn',
      'otherPlayerHasGuessed',
    ]),
    vuexScreenSizeState = mapScreenSizeState([
      'isPhoneOrSmaller',
      'isTabletOrLarger',
    ]),
    localState = getLocalComputedProperties()

  return combineAll.objects([
    vuexRoomState,
    vuexRoomGetters,
    vuexScreenSizeState,
    localState,
  ])
}

function getLocalComputedProperties() {
  return {
    currentPlayerHasGuessed() {
      return isLaden(this.currentPlayer.guesses)
    },
    currentPlayerIsSelected() {
      return this.state.viewingPlayerKey === 'currentPlayer'
    },
    otherPlayerIsSelected() {
      return this.state.viewingPlayerKey === 'otherPlayer'
    },
    showLeftArrow() {
      return this.state.slidePosition > 0
    },
    //
    // this property is only called if no guesses exist for the relevant player
    //
    showNoGuessesYet() {
      const { currentPlayerMustRevealALetter, friendWon, isFriendsTurn } = this

      return isFriendsTurn ||
        currentPlayerMustRevealALetter ||
        friendWon
    },
    showRightArrow() {
      return this.state.slidePosition < 1
    },
    viewingPlayer() {
      // this will have to be refactored if and once more than two players are
      //   allowed.  At least the design won't have to be modified.
      return this[this.state.viewingPlayerKey]
    },
  }
}
</script>

<style lang="scss">
@include for-phones-and-down {
  #app.game {
    text-align: center;

    > footer {
      margin-top: 0;
    }
  }
}

.sub-view.game {
  .tbd {
    font-style: italic;
  }

  @include for-phones-and-down {
    &.game-over {
      margin-bottom: $mobile-footer-height#{px};

      > .board.phones-and-smaller > ul.player-view {
        @include res-aware-element-spacing('padding-bottom', 'lg');
      }
    }
  }

  @include for-tablets-and-up {
    > .game-over {
      max-width: $column-width * 2;
    }
  }

  > .board {
    @include res-aware-element-spacing('margin-top', 'md');

    > .column {
      @include res-aware-element-spacing('padding-bottom', 'xl');

      display: inline-block;
      vertical-align: top;
      width: $column-width;

      > h3 {
        @include res-aware-font-size('lg');

        margin-top: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      > ul {
        @include res-aware-element-spacing('margin-top', 'xs');

        > li {
          &:not(.enter-guess) {
            @include per-screen-size(
              ('height', 'line-height'),
              56,
              56,
              56,
              56,
              'px'
            );

            vertical-align: top;
          }
        }
      }

      + .column {
        @include res-aware-element-spacing('margin-left', 'md');
      }
    }

    &.phones-and-smaller {
      display: flex;
      flex-grow: 1;
      position: relative;
      text-align: center;

      button.arrow-circle {
        position: absolute;
        top: 4px;
        z-index: 2;

        &:first-child {
          left: 0;
        }
        &:nth-child(2) {
          right: 0;
        }
      }

      > ul.player-view {
        flex-grow: 1;
        overflow: hidden;
        padding-bottom: $mobile-footer-height#{px};
        white-space: nowrap;
        z-index: 1;

        > li {
          display: inline-block;
          vertical-align: top;
          width: 100%;

          > h4 {
            margin-top: 0;
            font-size: 22px;
          }

          > ul {
            @include res-aware-element-spacing('margin-top', 'xs');

            > li {
              &:not(.enter-guess) {
                @include per-screen-size(
                  ('height', 'line-height'),
                  56,
                  56,
                  56,
                  56,
                  'px'
                );

                vertical-align: top;
              }
            }
          }
        }
      }
    }
  }
}
</style>
