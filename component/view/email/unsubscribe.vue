<template>
  <div>
    <h3>Click 'Confirm' to unsubscribe from '{{ typeTitle }}' emails</h3>

    <my-button autofocus
      can-only-click-once
      class="confirm"
      text="Confirm"
      type="button"
      :on-click="unsubscribe" />

    <h4 class="success"
      ref="success"
      data-animate="{
        duration: {
          opacity: 'fast',
          size: 'fast',
        },
        shouldAnimate: { width: true },
      }">

      Success <party />
    </h4>

    <h4 v-if="wasAlreadySubscribed">
      Note: It seems you've unsubscribed from these emails before.  If you are
      receiving emails when you shouldn't then let me know at
      {{ global.authorEmail }} so I can fix the problem. Spam is no
      <span class="dont-wrap">fun <frown /></span>
    </h4>
  </div>
</template>

<script>
import titleCase from 'title-case'
import { createNamespacedHelpers } from 'vuex'

import { validEmailTypes } from 'universal/email/types'
import { animateShow } from 'client/utils'
import { join } from 'fes'

const { mapState } = createNamespacedHelpers('email'),
  unsubscribeTypes = join('|')(validEmailTypes.unsubscribe)

export default {
  name: 'email-unsubscribe',
  path: `/email/unsubscribe/:type(${unsubscribeTypes})/:emailSentHash`,

  asyncData({ route, store }) {
    return store.dispatch('email/getUnsubscriptions', { route })
  },

  data: () => ({
    state: {
      confirmed: false,
    },
  }),

  methods: {
    unsubscribe() {
      this.state.confirmed = true
      return Promise.all([
        animateShow(this.$refs.success),
        this.$myStore.dispatch('email/unsubscribe', this.$route.params),
      ])
    },
  },

  computed: {
    wasAlreadySubscribed() {
      const { $route, state, unsubscribedFrom } = this

      return !state.confirmed && unsubscribedFrom[$route.params.type]
    },
    typeTitle() {
      return titleCase(this.$route.params.type)
    },

    ...mapState(['unsubscribedFrom']),
  },
}
</script>

<style lang="scss">
.view.email-unsubscribe {
  //
  // TODO: set 'display: flex' only for #app.game so this following line
  //   is unnecessary
  //
  display: block !important;

  h4.success {
    display: none;

    &.exists {
      display: block;
    }
  }
}
</style>
