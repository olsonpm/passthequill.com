<template>
  <!--

  TODO: rewrite this to be more like lightbox.vue, where consumers call it like
    a service rather than declare it in their markup
    
  -->

  <div class="notification-wrapper">
    <div class="notification"
      :class="[type]"
      @click="close"
      ref="notificationEl">

      <slot />
      <close-x />
    </div>
  </div>
</template>

<script>
import animate from 'velocity-animate'
import closeX from './close-x'
import { durations, onKeyUp } from 'client/utils'

const { normal } = durations

export default {
  name: 'notifier',
  props: ['afterClose', 'type'],
  beforeMount() {
    this.disposeKeyUp = onKeyUp('Escape', () => this.close())
  },
  beforeDestroy() {
    this.disposeKeyUp()
  },
  data: () => ({
    state: { leave: false },
  }),
  components: {
    'close-x': closeX,
  },
  mounted() {
    const { notificationEl } = this.$refs

    animate(
      notificationEl,
      { opacity: [1, 0], transform: ['translateY(15px)', 'translateY(0px)'] },
      { duration: normal }
    )
  },
  methods: {
    close() {
      const { notificationEl } = this.$refs

      animate(
        notificationEl,
        {
          opacity: [0, 1],
          transform: ['translateY(30px)', 'translateY(15px)'],
        },
        { duration: normal }
      ).then(this.afterClose)
    },
  },
}
</script>

<style lang="scss" scoped>
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

    > p {
      margin: 0;
      text-align: center;
    }

    > .close-x {
      @include res-aware-element-spacing(('top', 'right'), 'sm');

      position: absolute;
    }
  }
}
</style>
