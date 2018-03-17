<template>
  <div class="my-button" :class="[type, { disabled }]">
    <!--
      The enter and space handling is a workaround due to firefox not triggering
      the :active pseudoclass upon these buttons being pressed
    -->
    <button :type="type"
      :disabled="disabled"
      :class="{ active: isActive }"
      @click="onClick"
      @keydown.space="setActive"
      @keydown.enter="setActive"
      @keyup.space="unsetActive"
      @keyup.enter="unsetActive">

      {{ text }}
    </button>
  </div>
</template>

<script>
import { noop } from 'universal/utils'

export default {
  name: 'my-button',
  props: {
    active: {},
    disabled: {},
    text: {},
    type: {},
    onClick: {
      default: () => noop,
    },
  },
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
.my-button {
  @include res-aware-element-spacing('margin-top', $button-margin-top-size);
  @include shadow-normal($with-focus: true);

  border-radius: $radius-small;
  display: inline-block;
  transition: box-shadow $duration-short $easing-default;

  &.disabled {
    box-shadow: 0 0 0 transparent;
  }

  > button {
    @include res-aware-element-spacing(('padding-left', 'padding-right'), 'lg');
    @include res-aware-element-spacing(
      ('padding-top', 'padding-bottom'),
      $button-vertical-padding-size
    );

    background-color: $green;
    border: 1px solid $green;
    border-radius: $radius-small;
    color: $bg;
    font-weight: 500;
    //
    // I have no idea why I need to specify 1px instead of 0, but 0 definitely
    //   causes a blank row of pixels on the bottom in firefox (didn't test
    //   other browsers)
    //
    // transform: translateY(1px);
    transition-duration: $duration-tiny;
    transition-property: background-color, border-color, box-shadow, transform;
    transition-timing-function: $easing-default;
    z-index: 1;

    &:focus {
      border-color: $green-focus-border;
    }

    &:disabled {
      background-color: $disabled-gray;
      border-color: $disabled-gray-dark;
      cursor: default;
    }

    &:not(:disabled) {
      &:active,
      &.active {
        transform: translateY(3px);
      }
    }
  }
}
</style>
