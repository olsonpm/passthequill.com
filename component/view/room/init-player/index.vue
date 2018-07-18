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
            :autofocus="true"
            :parentComponent="this"
            :placeholder="placeholder.displayName"
            :readonly="state.showSuccessInfo" />
        </li>
        <li>
          <my-text-input id="secretWord"
            autocomplete="off"
            label="Your secret word"
            info-component-name="init-player-info_secret-word"
            :parentComponent="this"
            :placeholder="placeholder.secretWord"
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

      <p v-html="state.successStatusMessage"></p>

      <div class="just-kidding"
        v-initially-removed
        ref="justKiddingEl">

        Just kidding - they joined now.  Press 'Ok' to start&nbsp;playing.
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

import tedent from 'tedent'
import validationInfo from 'universal/input-validation-info'
import { createNamespacedHelpers } from 'vuex'
import { animateShow } from 'client/utils'
import { getRandomElementFrom, settleAll, wrapIn } from 'universal/utils'
import { waitFor } from '../../helpers'
import { combineAll, join, map, mAppendTo, mAssignOver, passThrough } from 'fes'
import {
  exampleDisplayNameAndSecretWordPairs,
  invalidDisplayNameMessage,
  invalidWordMessage,
  initPlayer,
} from '../helpers'
import {
  createComputedFormData,
  createFormData,
  createFormObject,
} from 'client/form-helpers'

//
//------//
// Init //
//------//

const inputIdToInitialState = validationInfo.initPlayer,
  { mapState: mapRoomState } = createNamespacedHelpers('room'),
  { mapState: mapInitPlayerState } = createNamespacedHelpers('initPlayer'),
  statusToMessage = getStatusToMessage()

//
//------//
// Main //
//------//

export default {
  name: 'init-player',

  beforeCreate() {
    this.formObject = createFormObject(inputIdToInitialState, this)
  },

  beforeDestroy() {
    this.$store.commit('removeAppClass', this.$options._componentTag)
  },

  created() {
    if (!this.placeholder.displayName) this.setPlaceholder()

    if (process.env.NODE_ENV === 'development') {
      const { number } = this.currentPlayer
      mAssignOver(this.formData.inputs)({
        displayName: number === 1 ? 'Wonder Woman' : 'Strongbad',
        secretWord: number === 1 ? 'super' : 'great'
      })
    }
  },

  props: ['transitionTo'],

  computed: getComputedProperties(),

  subscribeTo: {
    room: {
      liveUpdate: {
        afterOtherPlayerEnteredGame() {
          const { $refs, state } = this

          return state.successStatusMessage
            ? animateShow($refs.justKiddingEl)
            : undefined
        },
      },
    },
  },

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
        join(''),
      ])
    },
    okClicked() {
      this.$myStore.dispatch('room/enterGame')
      return this.transitionTo('game')
    },
    onSubmit() {
      const { $myStore, $refs, formData, formObject, state } = this

      if (!formObject.isValid()) {
        return $myStore.dispatch('notifyError/tryToShow', {
          html: this.getErrorMessageHtml(),
        })
      } else {
        $myStore.dispatch('notifyError/tryToHide')
      }

      state.loading = true

      return settleAll([
        this.$myStore.dispatch('room/initPlayer', formData.inputs),
        animateShow($refs.loadingCheckComponent),
        waitFor.animation.loadingCircle(),
      ])
        .then(([initPlayerResult]) => {
          const { status, value } = initPlayerResult
          return Promise[status](value)
        })
        .then(() => {
          state.success = true
          state.loading = true
          return waitFor.animation.successCheck()
        })
        .then(() => {
          state.showSuccessInfo = true
          state.successStatusMessage = statusToMessage[this.successStatus]
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

//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const vuexRoomState = mapRoomState(['currentPlayer', 'otherPlayer']),
    vuexInitPlayerState = mapInitPlayerState(['placeholder']),
    formState = createComputedFormData(inputIdToInitialState),
    localState = getLocalComputedProperties()

  return combineAll.objects([
    vuexRoomState,
    vuexInitPlayerState,
    formState,
    localState,
  ])
}

function getLocalComputedProperties() {
  return {
    invalidWordMessage,
    successStatus: initPlayer.successStatus,
  }
}

function getStatusToMessage() {
  return {
    mustWaitForFriend: tedent(`
      Looks like your friend hasn't entered in their display name and secret
      word yet.  If you're sure they've received the invitation email then there
      aint much to do other than wait in the game&nbsp;room.
    `),
    startGame: tedent(`
      You're ready to start&nbsp;playing!
    `),
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
    @include res-aware-element-spacing('margin-top', 'xl');

    > h3 {
      @include res-aware-element-spacing('margin-bottom', 'sm');

      margin-top: 0;
    }

    .just-kidding {
      @include res-aware-element-spacing('margin-top', 'sm');
    }
  }
}
</style>
