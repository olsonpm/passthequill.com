<template>
  <div>
    <h2>Create A Room</h2>
    <my-form class="email-form"
      :on-submit="onSubmit"
      :form-object="formObject"
      :set-submit-active="setSubmitActive">

      <ul>
        <li>
          <my-text-input id="player1-email"
            autocomplete="email"
            label="Your email"
            type="email"
            :autofocus="true"
            :parentComponent="this"
            :readonly="state.showSuccessInfo" />
        </li>
        <li>
          <my-text-input id="player2-email"
            autocomplete="email"
            label="Your friend's email"
            type="email"
            :parentComponent="this"
            :readonly="state.showSuccessInfo" />
        </li>
        <li>
          <more-info>
            <template slot="summary">
              <span class="phones-and-larger">
                What will you use our emails for?
              </span>
              <span class="small-phones">
                Why our emails?
              </span>
            </template>
            <template slot="details">
              <p>
                I only need them to send both you and your friend a link to the
                game room.  If you later decide you don't want to receive any
                emails from {{ global.domain }} then you can easily unsubscribe
                via the links at the bottom of every email&nbsp;sent.
              </p>
              <p>
                If you have any questions related to how this site stores or
                uses email then send them my way
                at&nbsp;{{ global.authorEmail }}.
              </p>
            </template>
          </more-info>
        </li>
      </ul>

      <my-button :disabled="formData.submitted && state.showSuccessInfo"
        :active="state.submitActive"
        text="Create"
        type="submit" />

      <loading-check v-initially-removed
        ref="loadingCheckComponent"
        :loading="state.loading"
        :success="state.success" />

      <failure-link ref="failureLinkComponent"
        text="Sorry, I had trouble creating your&nbsp;room"
        data-animate="{
          duration: { opacity: 'fast' },
          afterHide: 'setDisplayNone',
        }"
        :reasonContent="state.failureReason.content"
        :reasonComponentName="state.failureReason.componentName"
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

      <h3>Success<party /></h3>

      <p>The emails were sent to you and your friend</p>
      <p>
        You may each join the game by clicking on the link in your&nbsp;email
      </p>
      <p>Good luck!</p>

      <more-info>
        <template slot="summary">
          Emails not showing up?
        </template>
        <template slot="details">
          <p>
            Let's check a couple&nbsp;things
          </p>
          <ul class="bulleted">
            <li>Did you type the emails above&nbsp;correctly?</li>
            <li>Did the email go into your spam&nbsp;folder?</li>
            <li>
              Did you give it a few minutes?  Sometimes the email won't
              transfer right away, though it shouldn't take longer than a
              few&nbsp;minutes
            </li>
          </ul>
          <p>
            If everything looks good and you're still not seeing the emails
            then let me know at {{ global.authorEmail }} so we can get
            things&nbsp;working.
          </p>
        </template>
      </more-info>
    </div>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import tedent from 'tedent'
import validationInfo from 'universal/input-validation-info'
import api from 'universal/api'
import { getValueAtPath, getValueFrom, isEmpty, join, map } from 'fes'
import debug from 'project-root/config/debug'
import { settleAll } from 'universal/utils'
import { animateHide, animateShow } from 'client/utils'
import { waitFor } from './helpers'
import {
  createComputedFormData,
  createFormData,
  createFormObject,
} from 'client/form-helpers'

//------//
// Init //
//------//

const inputIdToInitialState = validationInfo.createARoom,
  playerNumberToFamiliarName = getPlayerNumberToFamiliarName(),
  toFamiliarNames = getValueFrom(playerNumberToFamiliarName),
  getFriendlyMessage = getValueAtPath(['response', 'data', 'error']),
  { player1Email, player2Email } = debug

if (process.env.NODE_ENV === 'development') {
  inputIdToInitialState.player1Email.initialValue = player1Email
  inputIdToInitialState.player2Email.initialValue = player2Email
}

//------//
// Main //
//------//

export default {
  name: 'create-a-room',
  path: '/create-a-room',

  computed: createComputedFormData(inputIdToInitialState),
  beforeCreate() {
    this.formObject = createFormObject(inputIdToInitialState, this)
  },
  data() {
    return {
      formData: createFormData(this.formObject),
      state: {
        failureReason: {
          componentName: '',
          content: '',
        },
        loading: false,
        showFailureLink: false,
        showSuccessInfo: false,
        success: null,
        submitActive: false,
      },
    }
  },
  methods: {
    maybeDisplayError() {
      const { $refs, state } = this

      if (!state.success) {
        state.showFailureLink = true
        animateShow($refs.failureLinkComponent)
      }
    },
    onSubmit() {
      const { $myStore, $refs, formData, formObject, state } = this

      if (state.showFailureLink) {
        state.success = null
        state.showFailureLink = false
        return animateHide($refs.failureLinkComponent).then(() =>
          this.onSubmit()
        )
      }

      if (!formObject.isValid()) {
        return $myStore.dispatch('notifyError/tryToShow', {
          html: '<p>Both emails are required</p>',
        })
      } else {
        $myStore.dispatch('notifyError/tryToHide')
      }

      state.loading = true

      //
      // regardless whether an error occurs, we want the animation to show for
      //   the minimum amount of time for a smooth experience
      //
      return settleAll([
        api.post('create-a-room', formData.inputs),
        animateShow($refs.loadingCheckComponent),
        waitFor.animation.loadingCircle(),
      ])
        .then(([createARoomResult]) => {
          const { status, value } = createARoomResult
          return Promise[status](value)
        })
        .then(createARoomResult => {
          const { unsubscribedPlayers } = createARoomResult,
            success = isEmpty(unsubscribedPlayers)

          state.success = success
          state.loading = false

          if (success) {
            // TODO: use javascript to animate loading-check so we can program
            //   a hook `onFinishedAnimating` or something.  This hardcoded wait
            //   is a hack in the meantime
            return waitFor.animation.successCheck().then(() => {
              state.showSuccessInfo = true
              return animateShow($refs.infoAfterSubmitEl)
            })
          }

          // otherwise someone was unsubscribed so we need to show
          //   the failure-link
          state.failureReason.content = createFailureReasonContent(
            unsubscribedPlayers
          )

          return animateHide($refs.loadingCheckComponent).then(() =>
            this.maybeDisplayError()
          )
        })
        .finally(() => {
          state.loading = false
        })
        .catch(error => {
          const friendlyMessage =
            getFriendlyMessage(error) ||
            'An issue occurred while creating your game room'
          state.success = false
          state.failureReason.componentName = 'unexpected-error'
          this.$store.commit(
            'unexpectedError/setFriendlyMessage',
            friendlyMessage
          )
          this.$store.commit('setShowErrorView', true)
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

function createFailureReasonContent(unsubscribedPlayers) {
  const familiarNames = map(toFamiliarNames)(unsubscribedPlayers)

  let content = '<p>'
  if (unsubscribedPlayers.length > 1) {
    content += tedent(`
      Both ${join(' and ')(familiarNames)} are unsubscribed so the room
      wasn't&nbsp;created.
    `)
  } else if (familiarNames[0] === 'you') {
    content +=
      "You are unsubscribed to this email so the room wasn't&nbsp;created."
  } else {
    // familiarNames[0] === 'your friend'
    content += tedent(`
      Your friend is unsubscribed to this email.  Currently the only way to get
      a link to the game is through email, so the room wasn't&nbsp;created.
    `)
  }

  content += tedent(`
    </p>
    <p>
      Email subscription settings can be found via a link 'manage your
      subscriptions' in all emails received from&nbsp;passthequill.com
    </p>
  `)

  return content
}

function getPlayerNumberToFamiliarName() {
  return {
    player1: 'you',
    player2: 'your friend',
  }
}
</script>

<style lang="scss">
$label-width: 150px;

.view.create-a-room {
  > form {
    @include res-aware-element-spacing('margin-top', 'md');
  }

  .info-after-submit {
    h3 {
      @include res-aware-element-spacing('margin-top', 'lg');
      @include res-aware-element-spacing('margin-bottom', 'sm');
    }
  }

  @include for-phones-and-down {
    .more-info {
      max-width: floor($default-textbox-width + ($default-textbox-width / 2));
    }
  }

  @include for-tablets-and-up {
    .more-info {
      width: $label-width + $default-textbox-width;
    }
    .my-form label {
      width: $label-width;
    }
  }
}
</style>
