<template>
  <div>
    <h3>Successfully Unsubscribed From '{{ typeTitle }}' Emails</h3>
    <h4 v-if="wasAlreadySubscribed">
      Note: It seems you've unsubscribed from these emails before.  If you are
      receiving emails when you shouldn't be then let me know at
      {{ global.authorEmail }} so I can fix the problem. Spam is no
      fun <frown />
    </h4>
  </div>
</template>

<script>
import titleCase from 'title-case'
import { createNamespacedHelpers } from 'vuex'

import { validEmailTypes } from 'universal/email/types'
import { join } from 'fes'

const { mapState: mapEmailState } = createNamespacedHelpers('email'),
  unsubscribeTypes = join('|')(validEmailTypes.unsubscribe)

export default {
  name: 'email-unsubscribe',
  path: `/email/unsubscribe/:type(${unsubscribeTypes})/:emailSentHash`,

  asyncData({ store }) {
    return store.dispatch('email/unsubscribe')
  },

  computed: {
    wasAlreadySubscribed() {
      return this.status === 'already unsubscribed'
    },
    typeTitle() {
      return titleCase(this.$route.params.type)
    },

    ...mapEmailState({
      status(state) {
        return state.unsubscribeResult[this.$route.params.type]
      },
    }),
  },
}
</script>
