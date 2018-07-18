<template>
  <div data-animate="{
      duration: { opacity: 'fast' },
      afterHide: 'setDisplayNone',
    }">

    <status v-initially-removed
      ref="statusComponent"
      :clock-clicked="statusClockClicked"
      :help-clicked="statusHelpClicked"
      :show-clock="state.showStatusClock"
      :show-help="state.showStatusHelp"
      :status-key="state.statusKey"/>

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
          When it's your turn there will be a question mark beside it.  Click it
          if you're ever unsure what you're supposed to&nbsp;do.
        </p>
        <p>Click it now to move&nbsp;forward!</p>
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
          When you're waiting on your friend for something there will instead
          be a blue clock icon.  In the game you can click it to get a status
          update on your&nbsp;friend.
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
          away as soon as your mouse moves on the&nbsp;screen.
        </p>

        <p>Click 'next'</p>

        <my-button type="button"
          secondary
          text="Next"
          :on-click="removeStatus" />
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

import status from './status'

import { animateHide, animateShow } from 'client/utils'
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
  name: 'first-time-desktop',

  props: ['transitionTo'],

  components: { status },

  beforeDestroy() {
    this.$store.commit('removeAppClass', this.$options._componentTag)
  },

  computed: mapRoomState(['currentPlayer']),

  data() {
    return {
      state: {
        currentStep: 0,

        showStatusClock: false,
        showStatusHelp: true,
        statusClockClicked: false,
        statusHelpClicked: false,
        statusKey: 'myTurn',
      },
    }
  },

  methods: {
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
    removeStatus() {
      const { $refs } = this

      return Promise.all([
        this.hideCurrentStep(),
        animateHide($refs.statusComponent),
      ]).then(() => this.showNextStep())
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
#app.first-time-desktop {
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

.sub-view.first-time-desktop {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: #{$mobile-footer-height}px;

  > .steps {
    display: block;
    max-width: $desktop-single-column-content-width;

    &:not(.step-0):not(.step-5) {
      @include res-aware-element-spacing('margin-top', 'md');
    }

    > li:not(:first-child):not(.animate_shown) {
      display: none;
    }
  }
}
</style>
