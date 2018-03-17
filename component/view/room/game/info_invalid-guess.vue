<template>
  <div class="game_info-invalid-guess warn">
    <p>Your friend flagged '{{ lastGuess }}' as&nbsp;invalid.</p>
    <p>
      Disagree?  Work it out with them!  I'm just the
      <span class="dont-wrap">messenger <smile /></span>
    </p>
  </div>
</template>

<script>
import { combine, last } from 'fes'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('room')

export default {
  name: 'game_info-invalid-guess',

  computed: getComputedProperties(),

  methods: {
    confirmIsInvalid() {
      return this.$myStore.dispatch('lightbox/tryToHide')
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const vuexState = mapState(['currentPlayer']),
    localState = getLocalComputedState()

  return combine(vuexState)(localState)
}

function getLocalComputedState() {
  return {
    lastGuess() {
      return last(this.currentPlayer.guesses).word
    },
  }
}
</script>
