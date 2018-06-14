<template>
  <div :class="{ 'game-over': isGameOver }">
    <status ref="statusComponent" />

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
              :maybe-remove-no-guesses="maybeRemoveNoGuesses"
              :reveal-enter-guess="revealEnterGuess"
              current-or-other-player="otherPlayer"
              v-bind="theGuess" />
          </template>

          <li v-else
            class="tbd"
            ref="tabletsAndLarger_currentPlayerNoGuessesEl">
            &lt;No guesses yet&gt;
          </li>
        </ul>
      </div>

      <div class="column other-player">
        <h3 ref="tabletsAndLarger_otherPlayerDisplayNameEl"
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
            ref="tabletsAndLarger_otherPlayerNoGuessesEl">

            &lt;No guesses yet&gt;
          </li>

          <li v-else-if="state.showPlaceholder" />

          <enter-guess ref="tabletsAndLarger_enterGuessComponent"
            :show-initially="state.showEnterGuess" />
        </ul>
      </div>
    </div>

    <div v-if="isPhoneOrSmaller"
      class="board phones-and-smaller">

      <arrow-circle direction="left"
        ref="leftArrowComponent"
        :always-render="true"
        :pulsate="currentPlayerMustReviewWord && !statusIsPulsating"
        :show-initially="showLeftArrow"
        @click.native="slide(-1)" />

      <arrow-circle direction="right"
        ref="rightArrowComponent"
        :always-render="true"
        :pulsate="currentPlayerMustGuess && !statusIsPulsating"
        :show-initially="showRightArrow"
        @click.native="slide(1)" />

      <ul class="player-view" ref="phonesAndSmaller_playerViewEl">
        <li>
          <h4>{{ currentPlayer.displayName }}</h4>
          <ul class="prior-guesses">
            <template v-if="otherPlayerHasGuessed">
              <prior-guess v-for="(theGuess, index) in otherPlayer.guesses"
                :guess-index="index"
                :is-last-guess="index === otherPlayer.guesses.length - 1"
                :key="index"
                :maybe-remove-no-guesses="maybeRemoveNoGuesses"
                :reveal-enter-guess="revealEnterGuess"
                current-or-other-player="otherPlayer"
                v-bind="theGuess" />
            </template>

            <li v-else
              class="tbd"
              ref="phonesAndSmaller_currentPlayerNoGuessesEl">
              &lt;No guesses yet&gt;
            </li>
          </ul>
        </li>

        <li>
          <h4 ref="phonesAndSmaller_otherPlayerDisplayNameEl"
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
              ref="phonesAndSmaller_otherPlayerNoGuessesEl">

              &lt;No guesses yet&gt;
            </li>

            <li v-else-if="state.showPlaceholder" />

            <enter-guess ref="phonesAndSmaller_enterGuessComponent"
              :show-initially="state.showEnterGuess" />
          </ul>
        </li>
      </ul>
    </div>
    <can-fade ref="fadeableGameOver"
      :should-animate-slowly="true"
      :show-initially="isGameOver">
      <div class="game-over">
        <p>
          Thanks for playing and I hope you enjoyed&nbsp;it.
        </p>
        <p>
          If you ran into an issue or were confused at any point please let me
          know <span class="dont-wrap">at {{ global.authorEmail }}.</span>
        </p>
      </div>
    </can-fade>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import hammerjs from 'hammerjs'

import enterGuess from './enter-guess'
import initWebsocket from 'project-root/entry/client/init-websocket'
import priorGuess from './prior-guess'
import status from './status'

import { bindAll } from 'universal/utils'
import { animate, animateHide, animateShow, durations } from 'client/utils'
import { createNamespacedHelpers } from 'vuex'
import { combineAll, isEmpty, isLaden } from 'fes'

//
//------//
// Init //
//------//

const duration = durations.slow,
  { mapState: mapScreenSizeState } = createNamespacedHelpers('screenSize'),
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

  subscribeTo: {
    room: {
      beforeAddGuess() {
        const { $refs, currentPlayer, state } = this

        state.showEnterGuess = false

        return Promise.all([
            this.getRef('enterGuessComponent').animateHide(),
            $refs.statusComponent.animateHide(),
          ])
          .then(() => {
            state.showPlaceholder = isEmpty(currentPlayer.guesses)
          })
      },
      afterAddGuess() {
        const { $refs, isGameOver, state } = this

        const showGameOver = isGameOver
          ? $refs.fadeableGameOver.animateShow()
          : undefined

        return Promise.all([
            $refs.statusComponent.animateShow(),
            showGameOver,
          ])
          .then(() => {
            state.showPlaceholder = false
          })
      },
      beforeGuessMarkedAsInvalid() {
        const { statusComponent } = this.$refs
        return statusComponent.animateHide()
      },
      afterGuessMarkedAsInvalid() {
        const { statusComponent } = this.$refs
        return statusComponent.animateShow()
      },
      afterGuessMarkedAsValid() {
        return this.revealEnterGuess()
      },

      liveUpdate: {
        beforeOtherPlayerInitialized() {
          const { statusComponent } = this.$refs

          return Promise.all([
            statusComponent.animateHide(),
            animateHide(this.getRef('otherPlayerDisplayNameEl'), duration)
          ])
        },
        afterOtherPlayerInitialized() {
          const { statusComponent } = this.$refs

          return Promise.all([
            statusComponent.animateShow({ isLiveUpdate: true }),
            animateShow(this.getRef('otherPlayerDisplayNameEl'), duration),
          ])
        },
        beforeOtherPlayerGuessed() {
          const { statusComponent } = this.$refs,
            hideStatus = statusComponent.animateHide()

          const hideNoGuessesEl = this.otherPlayerHasGuessed
            ? undefined
            : animateHide(this.getRef('currentPlayerNoGuessesEl'), duration)

          return Promise.all([
            hideStatus,
            hideNoGuessesEl
          ])
        },
        afterOtherPlayerGuessed() {
          const { $refs, currentPlayerMustGuess } = this

          const maybeShowGameOver = this.isGameOver
              ? $refs.fadeableGameOver.animateShow()
              : undefined

          const maybeShowEnterGuess = currentPlayerMustGuess
            ? this.revealEnterGuess()
            : undefined

          return Promise.all([
            $refs.statusComponent.animateShow({ isLiveUpdate: true }),
            maybeShowEnterGuess,
            maybeShowGameOver,
          ])
        },
        beforeOtherPlayerMarkedGuessAsInvalid() {
          const { $refs, state } = this

          state.showEnterGuess = false
          return $refs.statusComponent.animateHide()
        },
        afterOtherPlayerMarkedGuessAsInvalid() {
          const { $refs, state } = this

          state.showEnterGuess = true
          return Promise.all([
            $refs.statusComponent.animateShow({ isLiveUpdate: true }),
            this.revealEnterGuess()
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
      const method = value ? 'Show' : 'Hide'
      return this.$refs.leftArrowComponent['animate' + method]()
    },
    showRightArrow(value) {
      const method = value ? 'Show' : 'Hide'
      return this.$refs.rightArrowComponent['animate' + method]()
    },
  },

  beforeMount() {
    const { $eventManager, $store, $route } = this,
      { playerHash, roomHash } = $route.params

    // it doesn't really matter which life-cycle event the websocket is created,
    //   just as long as it only fires on the client
    this.closeLiveUpdateWebSocket = initWebsocket.liveUpdate({
      playerHash,
      roomHash,
      eventManager: $eventManager,
      store: $store,
    })
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
    getRef(name) {
      const prefix = this.isPhoneOrSmaller
        ? 'phonesAndSmaller_'
        : 'tabletsAndLarger_'

      return this.$refs[prefix + name]
    },
    maybeRemoveNoGuesses() {
      const { currentPlayerHasGuessed, showNoGuessesYet } = this

      //
      // note 'otherPlayer' here refers to the otherPlayer column.  It does not
      //   refer to the other player's guesses.  Suggestions for better naming
      //   are appreciated :)
      //
      const maybeHideOtherPlayerNoGuessesEl = (!currentPlayerHasGuessed && showNoGuessesYet)
        ? animateHide(this.getRef('otherPlayerNoGuessesEl'), duration)
        : Promise.resolve()

      return maybeHideOtherPlayerNoGuessesEl
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
      const enterGuessComponent = this.getRef('enterGuessComponent')

      return enterGuessComponent.clearText()
        .animateShow()
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
      'currentPlayerMustReviewWord',
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
      const { currentPlayerMustReviewWord, friendWon, isFriendsTurn } = this

      return isFriendsTurn ||
        currentPlayerMustReviewWord ||
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

    footer {
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

      > .arrow-circle {
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
