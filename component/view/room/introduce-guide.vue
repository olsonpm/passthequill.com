<template>
  <div>
    <h2>Room</h2>

    <h3>Welcome!</h3>

    <p>
      Let me guide you through your first&nbsp;game.
    </p>

    <p class="sidenote">
      If you've played before and are just using a new email address then click
      'No&nbsp;Thanks'.
    </p>

    <my-button type="button"
      text="Sure!"
      autofocus
      can-only-click-once
      :on-click="continueWithGuide"
    />

    <my-button type="button"
      text="No Thanks"
      class="no-thanks"
      can-only-click-once
      secondary
      :on-click="continueWithoutGuide"
    />
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

  .my-button.no-thanks {
    @include res-aware-element-spacing('margin-left', 'lg');
  }
}
</style>
