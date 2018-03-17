<template>
  <div class="game_confirm-invalid-guess error">
    <p>
      Are you sure '{{ lastGuess }}' is invalid?  If so then I will let your
      friend know so they can guess something else.
    </p>
    <my-button :on-click="confirmIsInvalid" text="Yup It's Invalid" />
  </div>
</template>

<script>
import { combine, last } from 'fes'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('room')

export default {
  name: 'game_confirm-invalid-guess',

  computed: getComputedProperties(),

  methods: {
    confirmIsInvalid() {
      const { $myStore } = this

      return Promise.all([
        $myStore.dispatch('lightbox/tryToHide'),
        $myStore.dispatch('room/markGuessAsInvalid'),
      ])
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const vuexState = mapState(['otherPlayer']),
    localState = getLocalComputedState()

  return combine(vuexState)(localState)
}

function getLocalComputedState() {
  return {
    lastGuess() {
      return last(this.otherPlayer.guesses).word
    },
  }
}
</script>
