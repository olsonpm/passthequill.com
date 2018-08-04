<template>
  <div data-animate="{
      duration: { opacity: 'fast' },
      afterHide: 'setDisplayNone',
    }">

    <div class="board">
      <div class="header">
        <status v-initially-removed
          ref="statusComponent"
          :clock-clicked="statusClockClicked"
          :help-clicked="statusHelpClicked"
          :show-clock="state.showStatusClock"
          :show-help="state.showStatusHelp"
          :status-key="state.statusKey"/>

        <div class="wrapper"
          v-initially-removed
          ref="displayNamesWrapperEl">

          <arrow-circle direction="left"
            ref="leftArrowComponent"
            initially-hidden
            :class="{ disabled: !state.hasSwipedLeft }"
            :pulsate="state.pulsateLeftArrow"
            :onClick="maybeSliiiideToTheLeft" />

          <div class="display-names"
            ref="displayNamesEl">

            <h4>{{ currentPlayer.displayName }}</h4>

            <h4>Your friend</h4>
          </div>

          <arrow-circle direction="right"
            ref="rightArrowComponent"
            :pulsate="state.pulsateRightArrow"
            :onClick="sliiiideToTheRight" />
        </div>
      </div>
    </div>
    <ul class="steps"
      ref="stepsEl"
      :class="[`step-${state.currentStep}`]">

      <li>
        <p>First let me show you the "game&nbsp;status"</p>

        <my-button type="button"
          secondary
          text="Next"
          :on-click="explainStatus" />
      </li>
      <li>
        <p>
          The game status displays things like whose turn it is and when the
          game is&nbsp;over.
        </p>
        <p>
          When it's your turn there will be a question mark beside it.  Tap it
          if you're ever unsure what you're supposed to&nbsp;do.
        </p>
        <p>Tap it now to move&nbsp;forward!</p>
      </li>
      <li>
        <p>Click next to move&nbsp;on</p>

        <my-button type="button"
          text="Next"
          secondary
          :on-click="switchStatus" />
      </li>
      <li>
        <p>
          When you're waiting on your friend there will instead be a blue clock
          icon.  In the game you can tap it to get a status update on
          your&nbsp;friend.
        </p>

        <p>Click 'next' to move&nbsp;on</p>

        <my-button type="button"
          secondary
          text="Next"
          :on-click="revealStatusAlert" />
      </li>
      <li>
        <p>
          After your friend guesses it will be your turn again.  The status
          emits an orange dot to get your attention. In the game it will go
          away as soon as you touch the&nbsp;screen.
        </p>

        <p>Click 'next'</p>

        <my-button type="button"
          secondary
          text="Next"
          :on-click="revealRestOfHeader" />
      </li>
      <li>
        <p>
          The header shows the player you're currently viewing - either you or
          your&nbsp;friend.
        </p>

        <p>Tap the arrow to view your&nbsp;friend</p>
      </li>
      <li>
        <p>
          You can also swipe the screen instead of tapping the arrow to move
          back and&nbsp;forth.
        </p>

        <p>
          Swipe from left to right to go back (I&nbsp;disabled the arrow
          this&nbsp;time)
        </p>
      </li>
      <li>
        <p>Those are the basics!</p>

        <p>Click 'Go' to enter the game room</p>

        <my-button type="button"
          text="Go"
          :on-click="goToGameRoom" />
      </li>
    </ul>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import tedent from 'tedent'
import hammerjs from 'hammerjs'

import status from './status'

import { bindAll } from 'universal/utils'
import { animate, animateHide, animateShow } from 'client/utils'
import { createNamespacedHelpers } from 'vuex'
import { mAssignOver } from 'fes'

//
//------//
// Init //
//------//

const { mapState: mapRoomState } = createNamespacedHelpers('room'),
  statusClockContent = getStatusClockContent(),
  statusHelpContent = getStatusHelpContent()

//
//------//
// Main //
//------//

export default {
  name: 'first-time-mobile',

  props: ['transitionTo'],

  components: { status },

  beforeDestroy() {
    this.destroyTouchManager()
    this.$store.commit('removeAppClass', this.$options._componentTag)
  },

  computed: mapRoomState(['currentPlayer']),

  data() {
    return {
      state: {
        currentStep: 0,
        isSliding: false,

        hasSwipedLeft: false,
        pulsateLeftArrow: false,
        pulsateRightArrow: false,
        rightArrowClicked: false,
        showStatusClock: false,
        showStatusHelp: true,
        slidePosition: 0,
        statusClockClicked: false,
        statusHelpClicked: false,
        statusKey: 'myTurn',
      },
    }
  },

  methods: {
    createTouchManager() {
      const { DIRECTION_HORIZONTAL: direction } = hammerjs,
        { Swipe, Manager } = bindAll(['Swipe', 'Manager'], hammerjs)

      this.touchManager = new Manager(this.$el, {
        recognizers: [[Swipe, { direction }]],
      })

      this.touchManager.on('swipeleft swiperight', this.onSwipe.bind(this))
    },
    destroyTouchManager() {
      if (!this.touchManager) return

      this.touchManager.destroy()
      delete this.touchManager
    },
    explainStatus() {
      return this.hideCurrentStep().then(() => {
        return Promise.all([
          animateShow(this.$refs.statusComponent),
          this.showNextStep(),
        ])
      })
    },
    getCurrentStepEl() {
      const { $refs, state } = this

      return $refs.stepsEl.children[state.currentStep]
    },
    getNextStepEl() {
      const { $refs, state } = this

      return $refs.stepsEl.children[state.currentStep + 1]
    },
    goToGameRoom() {
      const { $myStore } = this,
        understands = 'gameRoomBasics'

      $myStore.dispatch('room/enterGame')
      $myStore.dispatch('room/markAsUnderstood', { understands })

      return this.transitionTo('game')
    },
    hideCurrentStep() {
      return animateHide(this.getCurrentStepEl())
    },
    justTransitionToTheNextStep() {
      return this.hideCurrentStep().then(() => this.showNextStep())
    },
    maybeSliiiideToTheLeft() {
      const { state } = this

      return state.hasSwipedLeft ? this.sliiiideToTheLeft() : undefined
    },
    onSwipe({ type }) {
      const { slidePosition } = this.state
      if (type === 'swipeleft' && slidePosition < 1) {
        this.sliiiideToTheRight()
      } else if (type === 'swiperight' && slidePosition > 0) {
        this.sliiiideToTheLeft()
      }
    },
    revealRestOfHeader() {
      const { $refs } = this

      return Promise.all([
        this.hideCurrentStep(),
        animateHide($refs.statusComponent),
      ]).then(() =>
        Promise.all([
          this.showNextStep(),
          animateShow($refs.displayNamesWrapperEl),
        ])
      )
    },
    revealStatusAlert() {
      const { $refs, state } = this

      return Promise.all([
        this.hideCurrentStep(),
        animateHide($refs.statusComponent),
      ]).then(() => {
        mAssignOver(state)({
          showStatusClock: false,
          showStatusHelp: true,
          statusKey: 'myTurn',
        })

        return Promise.all([
          this.showNextStep(),
          $refs.statusComponent.showAlert(),
          animateShow($refs.statusComponent),
        ])
      })
    },
    showNextStep() {
      const nextStepEl = this.getNextStepEl()
      this.state.currentStep += 1

      return animateShow(nextStepEl)
    },
    sliiiideToTheLeft() {
      const { $refs, state } = this

      if (!state.hasSwipedLeft) {
        state.hasSwipedLeft = true

        this.justTransitionToTheNextStep()
      }

      return Promise.all([
        animateShow($refs.rightArrowComponent),
        animateHide($refs.leftArrowComponent),
        this.slide(-1),
      ])
    },
    sliiiideToTheRight() {
      const { $refs, state } = this

      if (!state.rightArrowClicked) {
        state.rightArrowClicked = true
        this.createTouchManager()

        this.justTransitionToTheNextStep()
      }

      return Promise.all([
        animateHide($refs.rightArrowComponent),
        animateShow($refs.leftArrowComponent),
        this.slide(1),
      ])
    },
    slide(positionMoved) {
      const { state } = this

      if (state.isSliding) return
      else state.isSliding = true

      const { displayNamesEl } = this.$refs,
        index = state.slidePosition,
        to = (index + positionMoved) * 100,
        from = index * 100,
        fromDisplayName = displayNamesEl.childNodes[index],
        toDisplayName = displayNamesEl.childNodes[index + positionMoved],
        transform = [`translateX(-${to}%)`, `translateX(-${from}%)`]

      state.slidePosition += positionMoved

      return Promise.all([
        animate(fromDisplayName, { opacity: [0, 1], transform }),
        animate(toDisplayName, { opacity: [1, 0], transform }),
      ]).then(() => {
        state.isSliding = false
      })
    },
    statusClockClicked() {
      return this.$myStore.dispatch('lightbox/tryToShow', {
        content: statusClockContent,
        type: 'info',
      })
    },
    statusHelpClicked() {
      const { $myStore, state } = this

      $myStore.dispatch('lightbox/tryToShow', {
        content: statusHelpContent,
        type: 'info',
      })

      if (state.statusHelpClicked) return
      else state.statusHelpClicked = true

      return this.justTransitionToTheNextStep()
    },
    switchStatus() {
      const { $refs, state } = this

      return Promise.all([
        this.hideCurrentStep(),
        animateHide($refs.statusComponent),
      ]).then(() => {
        mAssignOver(state)({
          showStatusClock: true,
          showStatusHelp: false,
          statusKey: 'theirTurn',
        })

        return Promise.all([
          this.showNextStep(),
          animateShow($refs.statusComponent),
        ])
      })
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getStatusClockContent() {
  return tedent(`
    <p>
      Nothing to see&nbsp;here!
    </p>
  `)
}

function getStatusHelpContent() {
  return tedent(`
    <p>You can click anywhere outside this box to close it</p>
  `)
}
</script>

<style lang="scss">
#app.first-time-mobile {
  > header {
    @include res-aware-element-spacing('padding-bottom', 'xl');
  }

  .view.room > .wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  > footer {
    margin-top: 0;
  }
}

.sub-view.first-time-mobile {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: #{$mobile-footer-height}px;

  > .board {
    display: block;

    .header {
      .status,
      .display-names > h4 {
        text-align: center;
      }

      > .wrapper {
        position: relative;

        button.arrow-circle {
          bottom: 0;
          position: absolute;
          z-index: 1;

          &.left {
            left: 0;

            &.disabled circle {
              fill: $disabled-gray-darker !important;
            }
          }
          &.right {
            right: 0;
          }
        }
      }

      .display-names {
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
    }
  }

  > .steps {
    display: block;

    &:not(.step-0) {
      @include res-aware-element-spacing('margin-top', 'md');
    }

    > li:not(:first-child):not(.animate_shown) {
      display: none;
    }
  }
}
</style>
