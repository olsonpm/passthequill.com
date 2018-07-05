<template>
  <div class="notification-wrapper">
    <simple-button class="notification"
      ref="notificationComponent"
      :on-click="tryToHide">

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
  beforeMount() {
    this.disposeKeyUp = onKeyUp('Escape', () => {
      this.$myStore.dispatch('notifyError/tryToHide')
    })
  },
  beforeDestroy() {
    this.disposeKeyUp()
  },
  subscribeTo: {
    notifyError: {
      hide() {
        return this.hide()
      },
      show() {
        return this.show()
      }
    }
  },
  computed: mapState(['html', 'isActive']),
  methods: {
    tryToHide() {
      return this.$myStore.dispatch('notifyError/tryToHide')
    },
    hide() {
      const notificationEl = this.$refs.notificationComponent.$el
      return animate(
        notificationEl,
        {
          opacity: [0, 1],
          transform: ['translateY(30px)', 'translateY(15px)'],
        },
        { duration }
      ).then(() => {
        notificationEl.style.display = 'none'
      })
    },
    show() {
      const notificationEl = this.$refs.notificationComponent.$el
      notificationEl.style.display = 'inline-block'

      return animate(
        this.$refs.notificationComponent.$el,
        {
          opacity: [1, 0],
          transform: ['translateY(15px)', 'translateY(0px)'],
        },
        { duration }
      )
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
  z-index: 4;

  .notification {
    @include per-screen-size('min-width', 100%, 70%, 500px, 500px);
    @include res-aware-element-spacing('padding', 'sm');
    @include shadow-normal;

    background-color: $error-red;
    border-radius: $radius-small;
    color: $bg;
    display: none;
    font-weight: 500;
    line-height: $default-line-height;
    position: relative;

    p {
      margin-top: 0;
      text-align: center;
    }

    > .close-x {
      @include per-screen-size(('right', 'top'), 15, 16, 16, 17, 'px');

      @include for-small-phones {
        height: 12px;
        width: 12px;
      }

      position: absolute;
    }

    // TODO: figure out a better scheme for font-sizes.  It seems
    //   res-aware-font-size is only useful for headers.  For base fonts we need
    //   a standard way to say "small phones get X, everything else gets Y"
    @include for-small-phones {
      font-size: 14px;
    }
  }
}
</style>
