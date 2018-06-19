<template>
  <div>
    <h2>Room</h2>

    <h3>Let's get started</h3>

    <my-form class="player-form"
      :form-object="formObject"
      :on-submit="onSubmit"
      :set-submit-active="setSubmitActive">

       <ul>
        <li>
          <my-text-input id="display-name"
            label="Your display name"
            info-component-name="init-player-info_display-name"
            placeholder="e.g. Wonder Woman"
            :autofocus="true"
            :parentComponent="this"
            :readonly="state.showSuccessInfo" />
        </li>
        <li>
          <my-text-input id="word"
            label="Your secret word"
            info-component-name="init-player-info_word"
            placeholder="e.g. super"
            :parentComponent="this"
            :readonly="state.showSuccessInfo" />
        </li>
      </ul>

      <my-button type="submit"
        text="Submit"
        :active="state.submitActive"
        :disabled="formData.submitted && state.showSuccessInfo"
      />

      <loading-check ref="loadingCheckComponent"
        :loading="state.loading"
        :success="state.success"
      />

      <!--
        TODO: implement a failure-link
      -->

    </my-form>

    <can-fade ref="fadeableInfoAfterSubmit"
      :show-initially="false">

      <div class="info-after-submit">
        <h3>Got it<party /></h3>

        <p>{{ successStatusMessage }}</p>

        <my-button type="button"
          text="Ok"
          class="ok"
          :on-click="okClicked"
        />
      </div>
    </can-fade>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import dedent from 'dedent'
import validationInfo from 'universal/input-validation-info'
import { createNamespacedHelpers } from 'vuex'
import { settleAll, waitMs, wrapIn } from 'universal/utils'
import {
  createComputedFormData,
  createFormData,
  createFormObject,
} from 'client/form-helpers'
import {
  combineAll,
  getArrayOfKeys,
  isGreaterThan,
  join,
  keep,
  keepWhen,
  mAppendTo,
  map,
  mMap,
  mSet,
  passThrough,
  reduce,
  unique,
} from 'fes'

//
//------//
// Init //
//------//

const inputIdToInitialState = validationInfo.initPlayer.body,
  statusToMessage = getStatusToMessage(),
  { mapState } = createNamespacedHelpers('room'),
  invalidDisplayNameMessage = 'display name must be 1 to 15 letters'

if (process.env.NODE_ENV === 'development') {
  inputIdToInitialState.displayName.initialValue = 'Superwoman'
  inputIdToInitialState.word.initialValue = 'humor'
}

//
//------//
// Main //
//------//

export default {
  name: 'init-player',

  beforeCreate() {
    this.formObject = createFormObject(inputIdToInitialState, this)
  },

  props: ['transitionTo'],

  computed: getComputedProperties(),

  data() {
    return {
      formData: createFormData(this.formObject),
      state: {
        loading: false,
        showSuccessInfo: false,
        submitActive: false,
        success: null,
        successStatusMessage: '',
      },
    }
  },

  methods: {
    getErrorMessageHtml() {
      return passThrough(this.clientErrorMessages, [
        map(wrapIn('<p>', '</p>')),
        join('')
      ])
    },
    onSubmit() {
      const { $myStore, $refs, formData, formObject, state } = this

      if (!formObject.isValid()) {
        return $myStore.dispatch(
          'notifyError/tryToShow',
          { html: this.getErrorMessageHtml() }
        )
      }

      state.loading = true

      const minimumAnimationTime = waitMs(1000)

      return settleAll([
        this.$myStore.dispatch('room/initPlayer', formData.inputs),
        $refs.loadingCheckComponent.animateShow(),
        minimumAnimationTime,
      ])
        .then(([initPlayerResult]) => {
          const { status, value } = initPlayerResult
          return Promise[status](value)
        })
        .then(() => {
          state.success = true

          // TODO: use javascript to animate loading-check so we can program
          //   a hook `onFinishedAnimating` or something.  This hardcoded wait
          //   is a hack in the meantime
          waitMs(1300).then(() => {
            state.showSuccessInfo = true
            return $refs.fadeableInfoAfterSubmit.animateShow()
          })
          return
        })
    },
    setSubmitActive(trueOrFalse) {
      this.state.submitActive = trueOrFalse
    },
    okClicked() {
      this.transitionTo('game')
    },
  },
}

//------------------//
// Helper Functions //
//------------------//

function getLetterToLetterCount(currentWord) {
  return passThrough(currentWord, [
    unique,
    reduce(toZeroes, {}),
    mMap(toLetterCounts),
  ])

  // scoped helper functions

  function toLetterCounts(_unused_zero, letter) {
    return keep(letter)(currentWord).length
  }
}

function toZeroes(result, letter) {
  return mSet(letter, 0)(result)
}

function getStatusToMessage() {
  return {
    mustWaitForFriend: dedent(`
      Looks like your friend hasn't entered in their display name and word
      yet.  If you're sure they've received the invitation email then there aint
      much to do other than wait in the game room.
    `),
    startGame: dedent(`
      You're ready to start playing!
    `),
  }
}

function getComputedProperties() {
  const vuexState = mapState(['currentPlayer', 'otherPlayer', 'room']),
    formState = createComputedFormData(inputIdToInitialState),
    customState = getCustomComputedProperties()

  return combineAll.objects([vuexState, formState, customState])
}

function getCustomComputedProperties() {
  return {
    successStatus() {
      const { otherPlayer } = this

      return !otherPlayer.hasWord || !otherPlayer.displayName
        ? 'mustWaitForFriend'
        : 'startGame'
    },
    successStatusMessage() {
      return statusToMessage[this.successStatus]
    },
    clientErrorMessages() {
      const messages = [],
        addMessage = mAppendTo(messages)

      if (!this.displayName_isValid) addMessage(invalidDisplayNameMessage)
      if (!this.word_isValid) addMessage(this.invalidWordMessage)

      return messages
    },
    invalidWordMessage() {
      const currentWord = this.formData.inputs.word || ''

      if (currentWord.length !== 5) return 'word must be 5 letters'

      const repeatingLetters = passThrough(currentWord, [
        getLetterToLetterCount,
        keepWhen(isGreaterThan(1)),
        getArrayOfKeys,
      ])

      const showRepeatedLetters =
        repeatingLetters.length === 1
          ? `('${repeatingLetters[0]}' is repeated)`
          : `('${join("' and '")(repeatingLetters)}' are repeated)`

      return `your word must use unique letters<br>${showRepeatedLetters}`
    },
  }
}
</script>

<style lang="scss">
$local_label-width: 150px;

.sub-view.init-player {
  > .my-form {
    @include res-aware-element-spacing('margin-top', 'lg');

    label {
      width: $local_label-width;
    }
  }

  .info-after-submit {
    > h3 {
      @include res-aware-element-spacing('margin-top', 'lg');
      @include res-aware-element-spacing('margin-bottom', 'sm');
    }

    > h3 + p {
      margin-bottom: 0;
    }
  }
}
</style>
