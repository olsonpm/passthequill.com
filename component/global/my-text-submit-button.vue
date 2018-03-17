<template>
  <!--

  TODO: Figure out whether `my-button` can be written to encompass this without
    obscuring its api

  README
    - This is only a component to isolate the logic.  I only plan on it being
      used as the `my-guess` submission which will visually look something like
      [my text field][->]

      Normally submit buttons should use `my-button`, it's just the guess
      submission is a single field so a whole separate button would be
      too imposing

  -->

  <!--
    The enter and space handling is a workaround due to firefox not triggering
    the :active pseudoclass upon these buttons being pressed
  -->
  <button class="my-text-submit-button"
    :class="{ active: isActive }"
    @keydown.space="setActive"
    @keydown.enter="setActive"
    @keyup.space="unsetActive"
    @keyup.enter="unsetActive">

    <small-quill />
  </button>
</template>

<script>
export default {
  name: 'my-text-submit-button',
  props: ['active'],
  data: () => ({
    state: { active: false },
  }),
  methods: {
    setActive() {
      this.state.active = true
    },
    unsetActive() {
      this.state.active = false
    },
  },
  computed: {
    isActive() {
      return this.active || this.state.active
    },
  },
}
</script>

<style lang="scss">
.my-text-submit-button {
  @include per-screen-size(('padding-left', 'padding-right'), 5, 7, 8, 8, 'px');
  @include per-screen-size('height', 34, 36, 36, 36, 'px');

  background-color: $green;
  border-bottom: 1px solid $green-focus-border;
  border-right: 1px solid $green-focus-border;
  border-top: 1px solid $green-focus-border;
  border-top-right-radius: $radius-small;
  border-bottom-right-radius: $radius-small;
  box-shadow: 0 0 0 transparent;
  display: inline-block;
  transition: box-shadow $duration-tiny $easing-default;
  vertical-align: middle;

  &:focus {
    box-shadow: 0 0 10px $green-focus-border;
  }

  > .small-quill {
    height: 26px;
    text-align: center;
    vertical-align: middle;
    width: 26px;

    > .outer-stem {
      stroke: $bg;
    }

    > .feather {
      fill: $bg;
    }

    > .inner-stem {
      fill: $green;
    }
  }
}
</style>
