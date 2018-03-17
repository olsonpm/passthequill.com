<template>
  <div class="spacing-wrapper">
    <slot />
  </div>
</template>

<script>
import { getPreviousSibling } from 'client/utils'

const typeToMutateSpacing = getTypeToMutateSpacing()

export default {
  name: 'spacing-wrapper',
  props: ['type'],
  computed: {
    mutateSpacing() {
      return typeToMutateSpacing[this.type]
    },
  },
  mounted() {
    this.mutateSpacing(this.$el)
  },
}

//------------------//
// Helper Functions //
//------------------//

function getTypeToMutateSpacing() {
  return {
    'previous sibling height': thisElement => {
      const previousElement = getPreviousSibling(thisElement),
        previousElementStyle = window.getComputedStyle(previousElement)

      thisElement.style.marginTop = previousElementStyle.marginTop
      thisElement.style.height = previousElement.offsetHeight + 'px'
      thisElement.style.lineHeight = previousElement.offsetHeight + 'px'
    },
  }
}
</script>

<style lang="scss">
.spacing-wrapper {
  display: inline-block;
}
</style>
