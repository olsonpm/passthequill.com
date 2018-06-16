<template>
  <div>
    <div class="wrapper" ref="wrapperEl">
      <component class="sub-view"
        :class="subViewName"
        :is="subViewName"
        :transition-to="transitionTo"
      />
    </div>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import game from './game/index'
import initPlayer from './init-player/index'
import { createNamespacedHelpers } from 'vuex'
import { animate } from 'client/utils'

//
//------//
// Init //
//------//

const { mapState } = createNamespacedHelpers('room'),
  subViews = { game, initPlayer }

//
//------//
// Main //
//------//

export default {
  name: 'room',
  path: '/room/:roomHash/player/:playerHash',

  asyncData({ route, store }) {
    return store.dispatch('room/getRoom', { route })
  },

  components: subViews,

  computed: mapState(['currentPlayer', 'otherPlayer', 'room', 'subViewName']),

  methods: {
    transitionTo(newSubViewName) {
      const { wrapperEl } = this.$refs,
        oldHeight = wrapperEl.offsetHeight + 'px'

      wrapperEl.style.height = oldHeight

      return animate(wrapperEl, { opacity: [0, 1] })
        .then(() =>
          Promise.all([
            this.$myStore.dispatch('room/changeSubViewName', {
              subViewName: newSubViewName,
            }),
            this.$nextTick(),
          ])
        )
        .then(() => {
          wrapperEl.style.height = null
          const newHeight = wrapperEl.offsetHeight + 'px'
          wrapperEl.style.height = oldHeight

          return animate(wrapperEl, {
            opacity: [1, 0],
            height: [newHeight, oldHeight],
          })
        })
        .then(() => {
          wrapperEl.style.height = null
          wrapperEl.style.opacity = null
        })
    },
  },
}
</script>

<style lang="scss">
.view.room {
  > .wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    > .sub-view {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  }
}
</style>
