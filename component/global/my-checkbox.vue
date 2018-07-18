<template>
  <simple-button class="my-checkbox"
    :class="{ 'is-disabled': isDisabled }"
    :on-click="maybeCallOnClick">

    <label :for="id">{{ label }}</label>
    <input type="checkbox"
      tabindex="-1"
      :checked="checked"
      :disabled="isDisabled"
      :id="id" />

    <div class="nice-looking-checkbox">
      <check ref="checkComponent"
        data-animate="{
          duration: { opacity: 'fast' },
          afterHide: 'makeInvisible',
        }"
        :initially-hidden="!checked" />
    </div>
  </simple-button>
</template>

<script>
import { animateHide, animateShow } from 'client/utils'

export default {
  name: 'my-checkbox',
  props: ['checked', 'is-disabled', 'id', 'label', 'on-click'],
  computed: {
    isEnabled() {
      return !this.isDisabled
    },
  },
  methods: {
    maybeCallOnClick() {
      if (this.isEnabled) this.onClick()
    },
  },
  watch: {
    checked(value) {
      const animateShowOrHide = value ? animateShow : animateHide
      return animateShowOrHide(this.$refs.checkComponent)
    },
  },
}
</script>

<style lang="scss">
.my-checkbox {
  -webkit-tap-highlight-color: transparent;
  display: inline-block;

  > input {
    position: absolute;
    opacity: 0;
  }

  > label {
    @include for-phones-and-down {
      margin-bottom: 0;
    }

    display: inline-block;
    transition: color $duration-short $easing-default;
    vertical-align: middle;
  }

  &.is-disabled {
    cursor: default;

    > label {
      color: $fg-disabled;
      cursor: default;
    }

    > .nice-looking-checkbox {
      background-color: $disabled-gray;
      cursor: default;

      > .check {
        color: $bg-off;
      }
    }
  }

  > .nice-looking-checkbox {
    @include res-aware-element-spacing('margin-left', 'sm');

    background-color: $bg;
    border-radius: $radius-small;
    border: 1px solid $fg-light;
    display: inline-block;
    height: 30px;
    text-align: center;
    transition: background-color $duration-short $easing-default;
    vertical-align: middle;
    width: 30px;

    > .check {
      color: $fg;
      margin-top: 2px;
      transition: color $duration-short $easing-default;
    }
  }
}
</style>
