<template>
  <div>
    <!--
      This component only exists because the server doesn't know whether the
      client is mobile or desktop.  Normally the user will be forwarded to the
      correct sub-view during the guide and thus won't see this page.
    -->
    <h2>Room</h2>

    <p>Time to introduce you to the game&nbsp;room.</p>

    <my-button can-only-click-once
      type="button"
      text="Ok"
      class="ok"
      :on-click="okClicked" />
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import { createNamespacedHelpers } from 'vuex'

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
  name: 'first-time',

  props: ['transitionTo'],

  //
  // TODO: write plugin to do this automatically for us.  Currently every
  //   sub-view under 'room' commits 'removeAppClass'
  //
  beforeDestroy() {
    this.$store.commit('removeAppClass', this.$options._componentTag)
  },

  computed: mapScreenSizeState(['isPhoneOrSmaller']),

  methods: {
    okClicked() {
      const mobileOrDesktop = this.isPhoneOrSmaller ? 'mobile' : 'desktop'
      this.transitionTo(`first-time-${mobileOrDesktop}`)
    },
  },
}
</script>

<style lang="scss">
.sub-view.first-time {
  display: block !important;
}
</style>
