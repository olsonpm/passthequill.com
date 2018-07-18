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

import enterDisplayName from './enter-display-name'
import enterSecretWord from './enter-secret-word'
import firstTime from './first-time/index'
import firstTimeMobile from './first-time/mobile'
import firstTimeDesktop from './first-time/desktop'
import game from './game/index'
import initPlayer from './init-player/index'
import initWebsocket from 'project-root/entry/client/init-websocket'
import introduceGuide from './introduce-guide'
import { createNamespacedHelpers } from 'vuex'
import { animate } from 'client/utils'

//
//------//
// Init //
//------//

const { mapState } = createNamespacedHelpers('room'),
  subViews = {
    enterDisplayName,
    enterSecretWord,
    firstTime,
    firstTimeMobile,
    firstTimeDesktop,
    game,
    initPlayer,
    introduceGuide,
  }

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

  beforeMount() {
    const { $eventManager, $store, $route } = this,
      { playerHash, roomHash } = $route.params

    //
    // it doesn't really matter which life-cycle event the websocket is created,
    //   just as long as it only fires on the client
    //
    this.closeLiveUpdateWebSocket = initWebsocket.liveUpdate({
      playerHash,
      roomHash,
      eventManager: $eventManager,
      store: $store,
    })
  },

  beforeDestroy() {
    this.closeLiveUpdateWebSocket()
  },

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
