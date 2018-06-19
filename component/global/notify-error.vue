<template>
  <div class="notification-wrapper">
    <div class="notification error"
      @click="close"
      ref="notificationEl">

      <div v-html="html" />
      <close-x />
    </div>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import animate from 'velocity-animate'
import closeX from './close-x'

import { durations, onKeyUp } from 'client/utils'
import { createNamespacedHelpers } from 'vuex'

//
//------//
// Init //
//------//

const { normal } = durations,
  { mapState } = createNamespacedHelpers('notifyError')

//
//------//
// Main //
//------//

export default {
  name: 'notify-error',
  beforeMount() {
    const { $myStore } = this
    this.disposeKeyUp = onKeyUp('Escape', () => {
      $myStore.dispatch('notifyError/tryToHide')
    })
  },
  subscribeTo: {
    notifyError: {
      isClosing() {
        return this.close()
      }
    },
  },
  beforeDestroy() {
    this.disposeKeyUp()
  },
  components: {
    'close-x': closeX,
  },
  mounted() {
    const { $refs, $store } = this

    return animate(
      $refs.notificationEl,
      { opacity: [1, 0], transform: ['translateY(15px)', 'translateY(0px)'] },
      { duration: normal }
    ).then(() => {
      $store.commit('notifyError/setIsAnimating', false)
    })
  },
  computed: mapState(['html']),
  methods: {
    close() {
      const { $refs, $store } = this

      return animate(
        $refs.notificationEl,
        {
          opacity: [0, 1],
          transform: ['translateY(30px)', 'translateY(15px)'],
        },
        { duration: normal }
      ).then(() => {
        $store.commit('notifyError/setHtml', '')
        $store.commit('notifyError/setIsActive', false)
        $store.commit('notifyError/setIsAnimating', false)
      })
    },
  },
}
</script>

<style lang="scss">
.notification-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  top: 0;
  width: 100%;

  .notification {
    @include per-screen-size('min-width', 100%, 70%, 500px, 500px);
    @include res-aware-element-spacing('padding', 'sm');
    @include shadow-normal;

    border-radius: $radius-small;
    color: $bg;
    cursor: pointer;
    display: inline-block;
    font-weight: 500;
    position: relative;

    &.error {
      background-color: $error-red;
    }

    p {
      margin-top: 0;
      text-align: center;
    }

    > .close-x {
      @include res-aware-element-spacing(('top', 'right'), 'sm');

      position: absolute;
    }
  }
}
</style>
