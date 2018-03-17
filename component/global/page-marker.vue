<template>
  <svg :viewbox="viewbox"
    :width="widthOfWholeMarker"
    :height="diameterOfSingleCircle"
    class="page-marker">

    <circle v-for="pageNumber in global.range(1, numberOfPages)"
      :cx="getCx(pageNumber)"
      :cy="radiusOfSingleCircle"
      :r="radiusOfSingleCircle"
      :class="{ 'active-page': activePage === pageNumber }"
      :key="pageNumber"
      @click="slideTo(pageNumber)" />
  </svg>
</template>

<script>
//---------//
// Imports //
//---------//

import { createNamespacedHelpers } from 'vuex'
import { combine } from 'fes'

//
//------//
// Init //
//------//

const { mapState: mapScreenSizeState } = createNamespacedHelpers('screenSize')

//
//------//
// Main //
//------//

export default {
  name: 'page-marker',
  props: ['active-page', 'number-of-pages', 'slide-to'],
  methods: {
    getCx(pageNumber) {
      const {
        radiusOfSingleCircle,
        diameterOfSingleCircle,
        spaceBetweenCircles
      } = this

      return (diameterOfSingleCircle + spaceBetweenCircles)
        * (pageNumber - 1)
        + radiusOfSingleCircle
    }
  },
  computed: getComputedProperties(),
}

//
//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const screenSizeState = mapScreenSizeState(['isSmallPhone']),
    local = getLocalComputedProperties()

  return combine(screenSizeState)(local)
}
function getLocalComputedProperties() {
  return {
    diameterOfSingleCircle() {
      return 12
    },
    radiusOfSingleCircle() {
      return this.diameterOfSingleCircle / 2
    },
    spaceBetweenCircles() {
      const { isSmallPhone } = this
      return isSmallPhone ? 14 : 24
    },
    viewbox() {
      const { diameterOfSingleCircle, widthOfWholeMarker } = this
      return `0 0 ${widthOfWholeMarker} ${diameterOfSingleCircle}`
    },
    widthOfWholeMarker() {
      const {
        numberOfPages,
        spaceBetweenCircles,
        diameterOfSingleCircle
      } = this

      return (numberOfPages * diameterOfSingleCircle)
        + ((numberOfPages - 1) * spaceBetweenCircles)
    }
  }
}
</script>

<style lang="scss">
svg.page-marker {
  > circle {
    cursor: pointer;
    fill: $shadow-gray-default;

    &.active-page {
      fill: $quill-blue;
    }
  }
}
</style>
