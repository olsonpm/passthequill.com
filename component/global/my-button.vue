<template>
  <div class="my-button"
    :class="[type, { disabled }]">

    <!--
      The enter and space handling is a workaround due to firefox not triggering
      the :active pseudoclass upon these buttons being pressed
    -->
    <button :type="type"
      :autofocus="autofocus"
      :disabled="disabled"
      :class="{
        active: isActive,
        primary: !secondary,
        secondary
      }"
      @click="onClickWrapper"
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
    autofocus: {
      type: Boolean,
      default: false,
    },
    canOnlyClickOnce: {
      type: Boolean,
      default: false,
    },
    disabled: {},
    onClick: { default: () => noop },
    secondary: {
      type: Boolean,
      default: false,
    },
    text: {},
    type: {},
  },
  data: () => ({
    state: {
      active: false,
      alreadyClicked: false,
    },
  }),
  methods: {
    onClickWrapper() {
      const { canOnlyClickOnce, onClick, state } = this

      if (canOnlyClickOnce && state.alreadyClicked) return

      state.alreadyClicked = true
      return onClick()
    },
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
    @include for-tablets-and-down {
      padding: $button-vertical-padding-tablets-and-smaller
        $button-horizontal-padding-tablets-and-smaller;
    }
    @include for-desktops {
      padding: $button-vertical-padding-desktops
        $button-horizontal-padding-desktops;
    }

    border-radius: $radius-small;
    font-weight: 500;
    //
    // I have no idea why I need to specify 1px instead of 0, but 0 definitely
    //   causes a blank row of pixels on the bottom in firefox (didn't test
    //   other browsers)
    //
    transition-duration: $duration-tiny;
    transition-property: background-color, border-color, box-shadow, transform;
    transition-timing-function: $easing-default;
    z-index: 1;

    &.primary {
      background-color: $green;
      border: 1px solid $green;
      color: $bg;

      &:focus {
        border-color: $green-focus-border;
      }
    }
    &.secondary {
      background-color: $bg;
      border: 1px solid $quill-blue;

      &:focus {
        border-color: $info-blue-focus;
      }
    }

    &:disabled {
      background-color: $disabled-gray;
      border-color: $disabled-gray-darkest;
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
