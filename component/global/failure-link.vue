<template>
  <simple-button type="button"
    class="failure-link link custom-focus"
    initially-removed
    :on-click="explainFailure">

    <p v-html="text"></p>
    <span class="wrapper">
      <alert class="error" />
    </span>
  </simple-button>
</template>

<script>
import tedent from 'tedent'
import { log, truncate } from 'universal/utils'

const isNotProd = process.env.NODE_ENV !== 'production'

export default {
  name: 'failure-link',
  props: ['reason-component-name', 'reason-content', 'text'],
  methods: {
    explainFailure() {
      warnIfIncorrectProps(this)

      const dispatchArg = this.reasonComponentName
        ? { componentName: this.reasonComponentName }
        : { content: this.reasonContent, type: 'error' }

      this.$myStore.dispatch('lightbox/tryToShow', dispatchArg)
    },
  },
}

function warnIfIncorrectProps({ reasonComponentName, reasonContent }) {
  if (isNotProd) {
    if (reasonComponentName && reasonContent) {
      log(
        tedent(`
          both reasonComponentName and reasonContent should not be truthy

          reasonComponentName: ${reasonComponentName}

          reasonContent: ${truncate(reasonContent)}
        `)
      )
    }
    if (!reasonComponentName && !reasonContent) {
      log(
        tedent(`
          either reasonComponentName or reasonContent should be truthy

          reasonComponentName: ${reasonComponentName}

          reasonContent: ${truncate(reasonContent)}
        `)
      )
    }
  }
}
</script>

<style lang="scss">
.failure-link {
  align-items: center;
  color: $error-red-dark;
  flex-direction: row;

  > * {
    display: inline-block;
    vertical-align: middle;
  }

  > p {
    flex-grow: 1;
    margin-top: 0;
  }

  > .wrapper {
    @include res-aware-element-spacing('margin-left', 'xs');
  }

  //
  // TODO: extract the common focus code between here, simple-button,
  //   and link-to
  //
  &::before {
    background-color: transparent;
    bottom: 0;
    box-shadow: 0 0 0 transparent;
    content: '';
    display: inline-block;
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
    transition-duration: $duration-tiny;
    transition-property: background-color, box-shadow;
    transition-timing-function: $easing-default;

    // TODO: find a better way to style focus when using the keyboard but not
    //   a mouse.  This transition delay fixes a flash of focus styling before
    //   focus is removed upon a mouse click.
    transition-delay: 50ms;
  }

  &:focus::before {
    bottom: 0;
    box-shadow: 0 0 5px $info-blue-focus;
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
}
</style>
