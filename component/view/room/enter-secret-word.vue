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
        <li>Cannot use the same letter&nbsp;twice</li>
      </ul>

      <p v-html="funGameNote" />

      <my-text-input id="secret-word"
        autofocus
        :parentComponent="this"
        :placeholder="placeholder.secretWord" />

      <my-button type="submit"
        text="Next"
        :active="state.submitActive"
        :disabled="formData.submitted && state.showSuccessInfo" />
    </my-form>
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
import { getRandomElementFrom } from 'universal/utils'
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
    okClicked() {},
    onSubmit() {
      const { $myStore, formData, formObject } = this

      if (!formObject.isValid()) {
        return $myStore.dispatch('notifyError/tryToShow', {
          html: `<p>${this.invalidWordMessage}</p>`,
        })
      } else {
        $myStore.dispatch('notifyError/tryToHide')
      }

      const understands = 'displayNameAndSecretWord',
        mobileOrDesktop = this.isPhoneOrSmaller ? 'mobile' : 'desktop'

      $myStore.dispatch('room/setSecretWord', formData.inputs)
      $myStore.dispatch('room/markAsUnderstood', { understands })

      return this.transitionTo(`first-time-${mobileOrDesktop}`)
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
