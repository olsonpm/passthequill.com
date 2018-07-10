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
            autocomplete="off"
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
        data-animate="{ duration: { opacity: 'fast' } }"
        :loading="state.loading"
        :success="state.success"
      />

      <!--
        TODO: implement a failure-link
      -->
    </my-form>

    <div v-if="state.showSuccessInfo"
      class="info-after-submit"
      ref="infoAfterSubmitEl"
      data-animate="{ duration: { opacity: 'fast' } }">

      <h3>Got it<party /></h3>

      <p v-html="state.successStatusMessage"></p>

      <div class="just-kidding"
        ref="justKiddingEl"
        data-animate="{
          duration: {
            opacity: 'fast',
            size: 'fast',
          },
          shouldAnimate: { height: true },
        }">

        Just kidding - it seems you're friend just joined.  Press 'Ok' to
        start&nbsp;playing.
      </div>

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

import dedent from 'dedent'
import validationInfo from 'universal/input-validation-info'
import setOfValidWords from 'universal/set-of-valid-words'
import { createNamespacedHelpers } from 'vuex'
import { logErrorToServer, settleAll, waitMs, wrapIn } from 'universal/utils'
import { animateShow } from 'client/utils'
import {
  createComputedFormData,
  createFormData,
  createFormObject,
} from 'client/form-helpers'
import {
  combineAll,
  getArrayOfKeys,
  isGreaterThan,
  isLaden,
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

  subscribeTo: {
    room: {
      liveUpdate: {
        afterOtherPlayerInitialized() {
          const { $refs, state } = this

          if (!state.successStatusMessage) return

          return animateShow($refs.justKiddingEl)
        },
      },
    }
  },

  methods: {
    getClientErrorMessages() {
      const messages = [],
        addMessage = mAppendTo(messages)

      if (!this.displayName_isValid) addMessage(invalidDisplayNameMessage)
      if (!this.word_isValid) addMessage(this.invalidWordMessage)

      return messages
    },
    getErrorMessageHtml() {
      return passThrough(this.getClientErrorMessages(), [
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
      } else {
        $myStore.dispatch('notifyError/tryToHide')
      }

      state.loading = true

      const minimumAnimationTime = waitMs(1000)

      return settleAll([
        this.$myStore.dispatch('room/initPlayer', formData.inputs),
        animateShow($refs.loadingCheckComponent),
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
          return waitMs(1300)
        })
        .then(() => {
          state.showSuccessInfo = true
          state.successStatusMessage = statusToMessage[this.successStatus]
          return this.$nextTick()
        })
        .then(() => animateShow($refs.infoAfterSubmitEl))
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
      much to do other than wait in the game&nbsp;room.
    `),
    startGame: dedent(`
      You're ready to start&nbsp;playing!
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
    invalidWordMessage() {
      const currentWord = this.formData.inputs.word || ''

      if (currentWord.length !== 5) return 'word must be 5 letters'

      const repeatingLetters = passThrough(currentWord, [
        getLetterToLetterCount,
        keepWhen(isGreaterThan(1)),
        getArrayOfKeys,
      ])

      if (isLaden(repeatingLetters)) {
        const showRepeatedLetters =
          repeatingLetters.length === 1
            ? `('${repeatingLetters[0]}' is repeated)`
            : `('${join("' and '")(repeatingLetters)}' are repeated)`

        return `your word must use unique letters<br>${showRepeatedLetters}`
      }

      if (!setOfValidWords.has(currentWord)) {
        return `your word is not in my dictionary`
      }

      logErrorToServer({
        context: 'during invalidWordMessage()',
        error: new Error(`currentWord seems to be valid: '${currentWord}'`)
      })
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

    .just-kidding {
      @include res-aware-element-spacing('margin-top', 'sm');

      display: none;

      &.exists {
        display: block;
      }
    }
  }
}
</style>
