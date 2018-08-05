<template>
  <div>
    <h2>Room</h2>

    <h3>First let's get you a "display&nbsp;name"</h3>

    <my-form class="display-name-form"
      :form-object="formObject"
      :on-submit="onSubmit"
      :set-submit-active="setSubmitActive">

      <p>
        This is just the name used to identify you for this game. Use your real
        name, your superhero name or anything you feel&nbsp;like.
      </p>

      <p class="sidenote">(Up to 15 letters)</p>

      <my-text-input id="display-name"
        autofocus
        :parentComponent="this"
        :placeholder="placeholder.displayName"  />

      <my-button type="submit"
        text="Next"
        :active="state.submitActive" />
    </my-form>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import inputValidationInfo from 'universal/input-validation-info'

import { createNamespacedHelpers } from 'vuex'
import { animateShow } from 'client/utils'
import { getRandomElementFrom, settleAll } from 'universal/utils'
import { combineAll } from 'fes'
import { waitFor } from '../helpers'
import {
  exampleDisplayNameAndSecretWordPairs,
  invalidDisplayNameMessage,
} from './helpers'
import {
  createComputedFormData,
  createFormData,
  createFormObject,
} from 'client/form-helpers'

//
//------//
// Init //
//------//

const inputIdToInitialState = inputValidationInfo.displayName,
  { mapState: mapInitPlayerState } = createNamespacedHelpers('initPlayer')

//
//------//
// Main //
//------//

export default {
  name: 'enter-display-name',

  beforeCreate() {
    this.formObject = createFormObject(inputIdToInitialState, this)
  },

  beforeDestroy() {
    this.$store.commit('removeAppClass', this.$options._componentTag)
  },

  created() {
    if (!this.placeholder.displayName) this.setPlaceholder()
  },

  props: ['transitionTo'],

  data() {
    return {
      formData: createFormData(this.formObject),
      state: {
        submitActive: false,
      },
    }
  },

  computed: getComputedProperties(),

  methods: {
    onSubmit() {
      const { $myStore, formData, formObject } = this

      if (!formObject.isValid()) {
        return $myStore.dispatch('notifyError/tryToShow', {
          html: `<p>${invalidDisplayNameMessage}</p>`,
        })
      } else {
        $myStore.dispatch('notifyError/tryToHide')
      }

      this.$myStore.dispatch('room/setDisplayName', formData.inputs)

      return this.transitionTo('enter-secret-word')
    },
    setPlaceholder() {
      const [displayName, secretWord] = getRandomElementFrom(
        exampleDisplayNameAndSecretWordPairs
      )

      this.$store.commit('initPlayer/setPlaceholder', {
        displayName: `e.g. ${displayName}`,
        secretWord: `e.g. ${secretWord}`,
      })
    },
    setSubmitActive(trueOrFalse) {
      this.state.submitActive = trueOrFalse
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const vuexInitPlayerState = mapInitPlayerState(['placeholder']),
    computedFormData = createComputedFormData(inputIdToInitialState)

  return combineAll.objects([computedFormData, vuexInitPlayerState])
}
</script>

<style lang="scss">
.sub-view.enter-display-name {
  @include for-tablets-and-up {
    max-width: $desktop-single-column-content-width;
  }

  .my-text-input {
    @include res-aware-element-spacing('margin-top', 'xs');
  }

  .info-after-submit {
    @include res-aware-element-spacing('margin-top', 'xl');

    h3 {
      margin-top: 0;
    }
  }
}
</style>
