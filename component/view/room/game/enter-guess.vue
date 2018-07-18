<template>
  <li class="enter-guess"
    :style="{ display }"
    data-animate="{
      duration: { opacity: 'slow' },
      afterHide: 'makeInvisible',
    }">

    <my-form class="guess-form"
      :form-object="formObject"
      :on-submit="onSubmit"
      :set-submit-active="setSubmitActive">

      <my-text-input id="guess"
        autocomplete="off"
        label="Your Guess"
        maxlength="5"
        disable-validation-indicator
        include-inline-submit-button
        :parent-component="this" />
    </my-form>
  </li>
</template>

<script>
//---------//
// Imports //
//---------//

import validationInfo from 'universal/input-validation-info'

import setOfValidWords from 'universal/set-of-valid-words'

import { createNamespacedHelpers } from 'vuex'
import { combineAll, isBetweenInclusive } from 'fes'
import {
  createComputedFormData,
  createFormData,
  createFormObject,
} from 'client/form-helpers'

//
//------//
// Init //
//------//

const inputIdToInitialState = validationInfo.guess,
  { mapState } = createNamespacedHelpers('room')

if (process.env.NODE_ENV === 'development') {
  inputIdToInitialState.guess.initialValue = 'tacky'
}

//
//------//
// Main //
//------//

export default {
  name: 'enter-guess',

  beforeCreate() {
    this.formObject = createFormObject(inputIdToInitialState, this)
  },

  props: ['display'],

  computed: getComputedProperties(),

  data() {
    return {
      formData: createFormData(this.formObject),
      state: {
        clientErrorMessagesSnapshot: [],
        failureReason: '',
        showFailureIndicator: false,
        submitActive: false,
        success: null,
      },
    }
  },

  methods: {
    clearText() {
      this.formData.inputs.guess = ''
      return this
    },
    onSubmit() {
      const { $myStore, formData, formObject } = this

      if (!formObject.isValid()) {
        const currentGuess = this.formData.inputs.guess

        let errorMessage

        if (!isBetweenInclusive(1, 5)(currentGuess.length)) {
          errorMessage = 'Your guess must be 1 - 5 letters'
        } else if (!setOfValidWords.has(currentGuess)) {
          errorMessage = 'That word is not in my dictionary'
        }

        return $myStore.dispatch('notifyError/tryToShow', {
          html: `<p>${errorMessage}</p>`,
        })
      } else {
        $myStore.dispatch('notifyError/tryToHide')
      }

      const { guess } = formData.inputs
      return $myStore.dispatch('room/addGuess', { guess })
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
  const vuexState = mapState(['currentPlayer', 'otherPlayer']),
    formState = createComputedFormData(inputIdToInitialState)

  return combineAll.objects([vuexState, formState])
}
</script>

<style lang="scss">
.enter-guess {
  height: 56px;
  line-height: 56px;

  > .guess-form {
    > .my-text-input {
      > label {
        @include res-aware-element-spacing('margin-right', 'sm');

        display: inline-block;

        &::after {
          content: ':';
        }
      }

      > .input-wrapper {
        @include per-screen-size('width', 76, 102, 102, 102, 'px');
        @include per-screen-size('height', 34, 36, 36, 36, 'px');

        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        display: inline-block;
        vertical-align: middle;

        > input#guess {
          @include per-screen-size('width', 74, 100, 100, 100, 'px');
          @include per-screen-size(
            ('height', 'line-height'),
            32,
            34,
            34,
            34,
            'px'
          );

          background-color: $bg;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          font-family: Hack, monospace;
          vertical-align: top;
        }
      }
    }
  }
}
</style>
