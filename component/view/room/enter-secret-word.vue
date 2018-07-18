<template>
  <div data-animate="{ duration: { opacity: 'fast' } }">
    <h2>Room</h2>

    <h3>Next you need a "secret&nbsp;word"</h3>

    <my-form class="secret-word-form"
      :form-object="formObject"
      :on-submit="onSubmit"
      :set-submit-active="setSubmitActive">

      <ul class="bulleted">
        <li>Must be 5 letters</li>
        <li>Letters must be unique</li>
        <li>Must be a real word</li>
      </ul>

      <p v-html="funGameNote" />

      <my-text-input id="secret-word"
        autofocus
        :parentComponent="this"
        :placeholder="placeholder.secretWord"
        :readonly="state.showSuccessInfo" />

      <my-button type="submit"
        text="Submit"
        :active="state.submitActive"
        :disabled="formData.submitted && state.showSuccessInfo" />

      <loading-check ref="loadingCheckComponent"
        :loading="state.loading"
        :success="state.success" />
    </my-form>

    <div v-initially-removed
      class="info-after-submit"
      ref="infoAfterSubmitEl"
      data-animate="{
        duration: {
          opacity: 'fast',
          size: 'fast',
        },
        shouldAnimate: { height: true },
      }">

      <h3>Got it<party /></h3>

      <p>Time to introduce you to the game&nbsp;room.</p>

      <my-button can-only-click-once
        type="button"
        text="Ok"
        class="ok"
        :on-click="okClicked" />
    </div>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import inputValidationInfo from 'universal/input-validation-info'
import funGameNote from 'universal/html-snippets/fun-game-note'

import { createNamespacedHelpers } from 'vuex'
import { combineAll } from 'fes'
import { animateShow } from 'client/utils'
import { getRandomElementFrom, settleAll } from 'universal/utils'
import { waitFor } from '../helpers'
import {
  exampleDisplayNameAndSecretWordPairs,
  invalidWordMessage,
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

const inputIdToInitialState = inputValidationInfo.secretWord,
  { mapState: mapRoomState } = createNamespacedHelpers('room'),
  { mapState: mapScreenSizeState } = createNamespacedHelpers('screenSize'),
  { mapState: mapInitPlayerState } = createNamespacedHelpers('initPlayer')

//
//------//
// Main //
//------//

export default {
  name: 'enter-secret-word',

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
        loading: false,
        showSuccessInfo: false,
        submitActive: false,
        success: null,
      },
    }
  },

  computed: getComputedProperties(),

  methods: {
    okClicked() {
      const mobileOrDesktop = this.isPhoneOrSmaller ? 'mobile' : 'desktop'
      this.transitionTo(`first-time-${mobileOrDesktop}`)
    },
    onSubmit() {
      const { $myStore, $refs, formData, formObject, state } = this

      if (!formObject.isValid()) {
        return $myStore.dispatch('notifyError/tryToShow', {
          html: `<p>${this.invalidWordMessage}</p>`,
        })
      } else {
        $myStore.dispatch('notifyError/tryToHide')
      }

      state.loading = true
      const understands = 'displayNameAndSecretWord'

      return settleAll([
        this.$myStore.dispatch('room/setSecretWord', formData.inputs),
        this.$myStore.dispatch('room/markAsUnderstood', { understands }),
        animateShow($refs.loadingCheckComponent),
        waitFor.animation.loadingCircle(),
      ])
        .then(([setSecretWordResult]) => {
          const { status, value } = setSecretWordResult
          return Promise[status](value)
        })
        .then(() => {
          state.success = true
          return waitFor.animation.successCheck()
        })
        .then(() => {
          state.showSuccessInfo = true
          return animateShow($refs.infoAfterSubmitEl)
        })
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
  const computedFormData = createComputedFormData(inputIdToInitialState),
    vuexInitPlayerState = mapInitPlayerState(['placeholder']),
    vuexRoomState = mapRoomState(['otherPlayer']),
    vuexScreenSizeState = mapScreenSizeState(['isPhoneOrSmaller']),
    localState = getLocalComputedState()

  return combineAll.objects([
    computedFormData,
    vuexInitPlayerState,
    vuexRoomState,
    vuexScreenSizeState,
    localState,
  ])
}

function getLocalComputedState() {
  return {
    invalidWordMessage,
    funGameNote() {
      return funGameNote
    },
  }
}
</script>

<style lang="scss">
.sub-view.enter-secret-word {
  @include for-tablets-and-up {
    max-width: $desktop-single-column-content-width;
  }

  .my-text-input {
    @include res-aware-element-spacing('margin-top', 'md');
  }

  .info-after-submit {
    @include res-aware-element-spacing('margin-top', 'xl');

    h3 {
      margin-top: 0;
    }
  }
}
</style>
