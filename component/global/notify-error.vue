<template>
  <div class="notification-wrapper">
    <simple-button can-only-click-once
      class="notification error"
      ref="notificationComponent"
      :on-click="close">

      <div v-html="html" />
      <close-x />
    </simple-button>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import animate from 'velocity-animate'
import closeX from './close-x'

import { durationEnum, onKeyUp } from 'client/utils'
import { createNamespacedHelpers } from 'vuex'

//
//------//
// Init //
//------//

const duration = durationEnum.normal,
  { mapState } = createNamespacedHelpers('notifyError')

//
//------//
// Main //
//------//

export default {
  name: 'notify-error',
  data: () => ({
    state: {
      isClosing: false
    },
  }),
  beforeMount() {
    this.disposeKeyUp = onKeyUp('Escape', () => {
      this.close()
    })
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
      $refs.notificationComponent.$el,
      { opacity: [1, 0], transform: ['translateY(15px)', 'translateY(0px)'] },
      { duration }
    ).then(() => {
      $store.commit('notifyError/setIsAnimating', false)
    })
  },
  computed: mapState(['html']),
  methods: {
    close() {
      const { $refs, $store, state } = this

      if (state.isClosing) return
      else state.isClosing = true

      return animate(
        $refs.notificationComponent.$el,
        {
          opacity: [0, 1],
          transform: ['translateY(30px)', 'translateY(15px)'],
        },
        { duration }
      ).then(() => {
        $store.commit('notifyError/setHtml', '')
        $store.commit('notifyError/setIsActive', false)
        $store.commit('notifyError/setIsAnimating', false)
      })
      // finally
      .then(() => {
        state.isClosing = false
      })
      .catch(() => {
        state.isClosing = false
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
    display: inline-block;
    font-weight: 500;
    line-height: $default-line-height;
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
