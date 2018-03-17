<template>
  <can-fade ref="canFadeComponent"
    :show-initially="showInitially">

    <button type="button" class="failure-link link" @click="explainFailure">
      {{ text }}
      <span class="wrapper">
        <alert class="error" />
      </span>
    </button>
  </can-fade>
</template>

<script>
import dedent from 'dedent'
import { log, truncate } from 'universal/utils'

const isNotProd = process.env.NODE_ENV !== 'production'

export default {
  name: 'failure-link',
  props: [
    'reason-component-name',
    'reason-content',
    'show-initially',
    'text',
    'when-done-hiding',
  ],
  methods: {
    animateHide() {
      const { canFadeComponent } = this.$refs
      return canFadeComponent.animateHide()
    },
    animateShow() {
      const { canFadeComponent } = this.$refs
      return canFadeComponent.animateShow()
    },
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
        dedent(`
          both reasonComponentName and reasonContent should not be truthy

          reasonComponentName: ${reasonComponentName}

          reasonContent: ${truncate(reasonContent)}
        `)
      )
    }
    if (!reasonComponentName && !reasonContent) {
      log(
        dedent(`
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
  border: 1px solid transparent;
  color: $error-red-dark;

  > .wrapper {
    @include res-aware-element-spacing('margin-left', 'xs');
    @include per-screen-size(('height', 'line-height'), 18, 18, 18, 18, 'px');

    display: inline-block;
    margin-top: -3px;
    vertical-align: middle;
  }
}
</style>
