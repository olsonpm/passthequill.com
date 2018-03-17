<template>
	<div>
		<h2>Manage your email unsubscriptions</h2>

		<form class="no-submit-form"
			@submit.prevent.stop="global.noop">

			<ul class="unsubscriptions">
				<li v-for="type in unsubscribeTypes"
          :key="type">

          <help-circle @click.native="displayMoreInfo(type)" />

					<my-checkbox :id="type"
						:checked="thisComponent[type]"
						:is-disabled="shouldDisable(type)"
						:label="properlyCase(type)"
						:on-click="() => toggleSubscription(type)" />

					<!-- It's simpler to keep this hardcoded for now -->
					<alert v-if="type === 'room-created'"
						class="warn"
						ref="alertComponent"
						:show-initially="showWarning"
						@click.native="explainConsequenceForUnsubscribing" />
				</li>
			</ul>

		</form>

	</div>
</template>

<script>
import titleCase from 'title-case'
import { validEmailTypes } from 'universal/email/types'
import { combine, first, mSet, reduce } from 'fes'

export default {
  name: 'email-unsubscriptions',
  path: '/email/unsubscriptions/:emailSentHash',

  computed: getComputedProperties(),
  data() {
    return {
      state: {
        showNotification: false,
      },
    }
  },
  asyncData({ store }) {
    return store.dispatch('email/getUnsubscriptions')
  },

  watch: {
    showWarning(value) {
      const { alertComponent } = this.$refs,
        method = value ? 'Show' : 'Hide'

      // because alertComponent exists in a loop, we need to grab the
      //   first one
      return first(alertComponent)['animate' + method]()
    },
  },

  methods: {
    afterNotificationClosed() {
      this.state.showNotification = false
    },
    displayMoreInfo(type) {
      this.$myStore.dispatch('lightbox/tryToShow', {
        componentName: `more-info_unsubscribe-${type}`,
      })
    },
    explainConsequenceForUnsubscribing() {
      this.$myStore.dispatch('lightbox/tryToShow', {
        componentName: 'warn-unsubscribe-from-room-created',
      })
    },
    properlyCase(type) {
      return titleCase(type)
    },
    setSubmitActive(trueOrFalse) {
      this.state.submitActive = trueOrFalse
    },
    shouldDisable(type) {
      return type !== 'all' && this.all
    },
    toggleSubscription(type) {
      const theEvent = this[type] ? 'resubscribe' : 'unsubscribe',
        { emailSentHash } = this.$route.params

      this.$myStore.dispatch(`email/${theEvent}`, { emailSentHash, type })
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const computedUnsubscribeTypes = reduce(toEachType, {})(
      validEmailTypes.unsubscribe
    ),
    otherLocalComputedProps = {
      showWarning() {
        return this['room-created'] && !this.all
      },
      thisComponent() {
        return this
      },
      unsubscribeTypes() {
        return [...validEmailTypes.unsubscribe]
      },
    }

  return combine(computedUnsubscribeTypes)(otherLocalComputedProps)
}

function toEachType(typeToUnsubscribeStatus, type) {
  return mSet(type, isUnsubscribed)(typeToUnsubscribeStatus)

  function isUnsubscribed() {
    return this.$store.state.email.unsubscribedFrom[type]
  }
}
</script>

<style lang="scss">
.view.email-unsubscriptions {
  > form {
    @include res-aware-element-spacing('margin-top', 'xl');

    > .unsubscriptions > li + li {
      @include res-aware-element-spacing('margin-top', 'lg');
    }

    .my-checkbox {
      @include res-aware-element-spacing(('margin-left', 'margin-right'), 'sm');
      @include res-aware-font-size('md');
    }
  }

  .unsubscriptions > li {
    > .help-circle {
      color: $bg;
      cursor: pointer;
      fill: $info-blue-dark;
      vertical-align: middle;
    }
  }
}
</style>
