<template>
  <div>
    <h2>Room</h2>

    <h3>Welcome!</h3>

    <p>
      Let me guide you through your first&nbsp;game.
    </p>

    <my-button type="button"
      text="Sure!"
      autofocus
      can-only-click-once
      :on-click="continueWithGuide"
    />

    <simple-button type="button"
      class="link no-thanks"
      can-only-click-once
      :on-click="continueWithoutGuide">

      <span>I've played before</span>
    </simple-button>
  </div>
</template>

<script>
export default {
  name: 'introduce-guide',

  props: ['transitionTo'],

  beforeDestroy() {
    this.$store.commit('removeAppClass', this.$options._componentTag)
  },

  methods: {
    continueWithGuide() {
      return this.transitionTo('enter-display-name')
    },
    continueWithoutGuide() {
      this.$myStore.dispatch('room/disableGuide')
      return this.transitionTo('init-player')
    },
  },
}
</script>

<style lang="scss">
.sub-view.introduce-guide {
  display: block !important;
  position: relative;

  @include for-tablets-and-up {
    max-width: $desktop-single-column-content-width;
  }

  button.no-thanks {
    @include res-aware-element-spacing('margin-left', 'lg');

    line-height: $default-line-height;
  }
}
</style>
