<template>
  <div :class="{ 'game-over': isGameOver }">
    <div v-if="isTabletOrLarger"
      class="board tablets-and-larger">

      <status ref="tabletsAndLarger_statusComponent"
        data-animate="{ duration: { opacity: 'slow' } }" />

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

      <div class="sticky-header"
        ref="stickyHeaderEl">

        <status ref="phonesAndSmaller_statusComponent"
          data-animate="{ duration: { opacity: 'slow' } }" />

        <div class="wrapper">
          <arrow-circle direction="left"
            ref="leftArrowComponent"
            data-animate="{ duration: { opacity: 'fast' } }"
            :pulsate="currentPlayerMustRevealALetter && !statusIsPulsating"
            :onClick="sliiiideToTheLeft"
            :show-initially="showLeftArrow" />

          <div class="display-names"
            ref="displayNamesEl">

            <h4>{{ currentPlayer.displayName }}</h4>

            <h4 ref="phonesAndSmaller_otherPlayerDisplayNameEl"
              data-animate="{ duration: { opacity: 'slow' } }"
              :class="{ tbd: !otherPlayer.displayName }">

              {{ otherPlayer.displayName || '&lt;not entered yet&gt;' }}
            </h4>
          </div>

          <arrow-circle direction="right"
            ref="rightArrowComponent"
            data-animate="{ duration: { opacity: 'fast' } }"
            :pulsate="currentPlayerMustGuess && !statusIsPulsating"
            :onClick="sliiiideToTheRight"
            :show-initially="showRightArrow" />
        </div>
      </div>

      <ul class="player-view"
        ref="playerViewEl">

        <li>
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
        const { state } = this

        return Promise.all([
          animateHide(this.getRef('enterGuessComponent')),
          animateHide(this.getRef('statusComponent')),
        ]).then(() => {
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

        return Promise.all([this.showStatus(), maybeShowGameOver])
      },
      beforeRevealLetter() {
        return this.currentPlayerHasGuessed
          ? undefined
          : animateHide(this.getRef('otherPlayerNoGuessesEl'))
      },

      liveUpdate: {
        beforeOtherPlayerInitialized() {
          return Promise.all([
            animateHide(this.getRef('statusComponent')),
            animateHide(this.getRef('otherPlayerDisplayNameEl')),
          ])
        },
        afterOtherPlayerInitialized() {
          const { currentPlayerMustGuess, state } = this

          state.showEnterGuess = currentPlayerMustGuess

          const maybeShowEnterGuess = state.showEnterGuess
            ? this.$nextTick().then(() =>
                animateShow(this.getRef('enterGuessComponent'))
              )
            : undefined

          return Promise.all([
            this.showStatus(),
            animateShow(this.getRef('otherPlayerDisplayNameEl')),
            maybeShowEnterGuess,
          ])
        },
        beforeOtherPlayerGuessed({ payload }) {
          const maybeHideNoGuesses = this.getMaybeHideNoGuesses(payload)

          return Promise.all([
            animateHide(this.getRef('statusComponent')),
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

          return Promise.all([
            this.showStatus(),
            maybeShowEnterGuess,
            maybeShowGameOver,
          ])
        },
      },
    },
    screenSize: {
      hasInitialized() {
        if (this.isPhoneOrSmaller) {
          this.createTouchManager()
          this.initStickyHeader()
        }
      }
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

  beforeDestroy() {
    this.$store.commit('removeAppClass', 'game')
    this.destroyTouchManager()
    window.removeEventListener('scroll', this.maybeToggleStuck)
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

        stickyHeaderIsStuck: false,
      },
    }
  },

  methods: {
    createTouchManager() {
      const { playerViewEl } = this.$refs,
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
      const { currentPlayerHasGuessed, otherPlayerHasGuessed } = this

      const mostRecentGuess = last(payload.otherPlayer.guesses),
        currentPlayerMustRevealLetter = mostRecentGuess.hasAnyMatchingLetters

      const currentPlayer = otherPlayerHasGuessed
        ? undefined
        : animateHide(this.getRef('currentPlayerNoGuessesEl'))

      const otherPlayer =
        currentPlayerHasGuessed || currentPlayerMustRevealLetter
          ? undefined
          : animateHide(this.getRef('otherPlayerNoGuessesEl'))

      return {
        currentPlayer,
        otherPlayer,
      }
    },
    getRef(name) {
      const prefix = this.isPhoneOrSmaller
        ? 'phonesAndSmaller_'
        : 'tabletsAndLarger_'

      return this.$refs[prefix + name]
    },
    initStickyHeader() {
      this.maybeToggleStuck()
      window.addEventListener('scroll', this.maybeToggleStuck)
    },
    maybeToggleStuck() {
      const { $refs, state } = this,
        { stickyHeaderEl } = $refs,
        { stickyHeaderIsStuck } = state,
        offset = window.pageYOffset,
        distance = stickyHeaderEl.offsetTop - offset

      if (!stickyHeaderIsStuck && distance === 0) {
        stickyHeaderEl.classList.add('stuck')
        state.stickyHeaderIsStuck = true;
      } else if (stickyHeaderIsStuck && distance > 0) {
        stickyHeaderEl.classList.remove('stuck')
        state.stickyHeaderIsStuck = false;
      }
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
    showStatus() {
      const statusComponent = this.getRef('statusComponent')

      return statusComponent
        .maybeDrawAttentionUntilUserInteracts()
        .then(() => animateShow(statusComponent))
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

      const { displayNamesEl, playerViewEl } = this.$refs,
        index = state.slidePosition,
        to = (index + positionMoved) * 100,
        from = index * 100,
        fromDisplayName = displayNamesEl.childNodes[index],
        toDisplayName = displayNamesEl.childNodes[index + positionMoved],
        fromGuessList = playerViewEl.childNodes[index],
        toGuessList = playerViewEl.childNodes[index + positionMoved],
        transform = [`translateX(-${to}%)`, `translateX(-${from}%)`]

      state.slidePosition += positionMoved

      return Promise.all([
        animate(fromDisplayName, { opacity: [0, 1], transform }),
        animate(toDisplayName, { opacity: [1, 0], transform }),
        animate(fromGuessList, { opacity: [0, 1], transform }),
        animate(toGuessList, { opacity: [1, 0], transform }),
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
      'statusIsPulsating',
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

      return isFriendsTurn || currentPlayerMustRevealALetter || friendWon
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

    > header {
      @include res-aware-element-spacing('margin-bottom', 'md');

      .logo {
        margin-left: auto;
        margin-right: auto;

        //
        // due to the feather leaning to the right, the logo doesn't seem centered
        //   without a manual offset.
        //
        position: relative;
        right: -8px;
      }
    }

    > main {
      > .site-container {
        max-width: unset;
        padding-left: 0;
        padding-right: 0;
      }
    }

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
    > .board > .column {
      @include res-aware-element-spacing('margin-top', 'md');
    }

    > .game-over {
      max-width: $column-width * 2;
    }
  }

  > .board {
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
      flex-direction: column;
      flex-grow: 1;
      text-align: center;

      > .sticky-header {
        @include res-aware-element-spacing('padding-bottom', 'md');
        @include res-aware-element-spacing('padding-top', 'xs');

        align-self: start;
        background-color: $bg;
        box-shadow: 0 0 0 transparent;
        position: sticky;
        top: 0;
        transition: box-shadow $duration-short $easing-default;
        width: 100%;
        z-index: 2;

        &.stuck {
          @include shadow-small;
        }

        > .status {
          display: block;
        }

        > .wrapper {
          max-width: $phone-min;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        .display-names {
          @include res-aware-element-spacing('margin-top', 'sm');

          display: block;
          overflow: hidden;
          white-space: nowrap;
          z-index: 0;

          > h4 {
            display: inline-block;
            font-size: 22px;
            margin-top: 0;
            width: 100%;
          }
        }

        button.arrow-circle {
          bottom: 0;
          position: absolute;
          z-index: 1;

          &.left {
            @include res-aware-element-spacing('left', 'lg');
          }
          &.right {
            @include res-aware-element-spacing('right', 'lg');
          }
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

          > ul > li {
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
</style>
