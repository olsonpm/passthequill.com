<template>
  <h5 class="first-time status"
    data-animate="{
      duration: { opacity: 'fast' },
      afterHide: 'setDisplayNone',
    }">

    <clock ref="clockComponent"
      v-if="showClock"
      :onClick="clockClicked" />

    <simple-button ref="helpButton"
      v-if="showHelp"
      class="help"
      :on-click="helpClicked">

      <help-circle />
    </simple-button>

    <span class="message">
      {{ message }}

      <attention-circle ref="attentionCircleComponent" />
    </span>
  </h5>
</template>

<script>
import { animateShow } from 'client/utils'
import { statusToMessage } from '../helpers'

export default {
  name: 'status',

  props: [
    'clockClicked',
    'helpClicked',
    'showClock',
    'showHelp',
    'statusKey',
  ],

  computed: {
    message() {
      return statusToMessage[this.statusKey]
    },
  },

  methods: {
    showAlert() {
      return animateShow(this.$refs.attentionCircleComponent)
    },
  },
}
</script>

<style lang="scss">
h5.first-time.status {
  @include per-screen-size(('height', 'line-height'), 30, 30, 30, 30, 'px');
  @include for-tablets-and-up {
    width: $column-width * 2;
  }

  font-style: italic;
  font-weight: 500;

  button.clock {
    @include res-aware-element-spacing('margin-right', 'xs');
  }

  button.help {
    @include res-aware-element-spacing('margin-right', 'xs');
    vertical-align: middle;

    // this offsets the perceived vertical alignment caused by the shadow
    margin-top: -4px;

    .help-circle {
      color: $bg;
      fill: $quill-blue;
    }
  }

  .message {
    position: relative;
  }
}
</style>
