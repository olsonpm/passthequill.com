<template>
  <div :class="{ 'game-over': isGameOver }"
    data-animate="{
      duration: { opacity: 'slow' },
      afterHide: 'setDisplayNone',
    }">

    <!--
      TODO: Refactor/split out this monolithic empire of a file
    -->

    <div v-if="screenSizeIsTabletOrLarger"
      class="board tablets-and-larger">

      <status ref="tabletsAndLarger_statusComponent" />

      <div class="column current-player">
        <h3>{{ currentPlayer.displayName }}</h3>
        <ul class="prior-guesses">
          <template v-if="otherPlayerHasGuessed">
            <prior-guess v-for="(theGuess, index) in otherPlayer.guesses"
              :guess-index="index"
              :is-last-guess="index === otherPlayer.guesses.length - 1"
              :key="index"
              :reveal-enter-guess="revealEnterGuess"
              current-or-other-player="otherPlayer"
              v-bind="theGuess" />
          </template>

          <li v-else
            class="tbd"
            ref="tabletsAndLarger_currentPlayerNoGuessesEl">

            &lt;No guesses yet&gt;
          </li>
        </ul>
      </div>

      <div class="column other-player">
        <h3 ref="tabletsAndLarger_otherPlayerDisplayNameEl"
          :class="{ tbd: !otherPlayer.displayName }">

          {{ otherPlayer.displayName || '&lt;not entered yet&gt;' }}
        </h3>
        <ul class="prior-guesses">
          <template v-if="currentPlayerHasGuessed">
            <prior-guess v-for="(theGuess, index) in currentPlayer.guesses"
              :guess-index="index"
              :is-last-guess="index === currentPlayer.guesses.length - 1"
              :key="index"
              current-or-other-player="currentPlayer"
              v-bind="theGuess" />
          </template>

          <li v-else-if="showNoGuessesYet"
            class="tbd"
            ref="tabletsAndLarger_otherPlayerNoGuessesEl">

            &lt;No guesses yet&gt;
          </li>

          <li v-if="state.showPlaceholder" />

          <enter-guess ref="tabletsAndLarger_enterGuessComponent"
            :display="enterGuessDisplay" />
        </ul>
      </div>

      <div class="guide"
        data-animate="{
          duration: {
            opacity: 'slow',
            size: 'normal',
          },
          afterHide: 'setDisplayNone',
          shouldAnimate: { height: true },
        }">

        <div ref="tabletsAndLarger_friendsGuessWithMultiMatchGuideEl"
          v-initially-removed="!showFriendsGuessWithMultiMatchGuide">

          <div v-html="statusIdToHelpContent.revealOneOfTheLetters" />
        </div>

        <div ref="tabletsAndLarger_friendsGuessWithSingleMatchGuideEl"
          v-initially-removed="!showFriendsGuessWithSingleMatchGuide">

          <div v-html="statusIdToHelpContent.revealOnlyLetter" />
        </div>

        <div ref="tabletsAndLarger_friendsGuessNoMatchGuideEl"
          v-initially-removed="!showFriendsGuessNoMatchGuide">

          <p>
            Your friend's guess didn't match any letters.  This means you
            have nothing to&nbsp;reveal.
          </p>
          <p>
            Click 'Got It' to move onto your {{ nextOrFirst }}&nbsp;guess.
          </p>
          <my-button type="button"
            secondary
            text="Got It"
            :on-click="removeFriendsGuessNoMatchGuide" />
        </div>

        <div ref="tabletsAndLarger_myFirstGuessGuideEl"
          v-initially-removed="!showMyFirstGuessGuide">

          <p>Guess a word up to 5&nbsp;letters</p>
          <p>
            Unlike your secret word, your guess can be less than 5 letters
            and may also have repeating letters.  For example "apple",
            "pear" and "a" are all&nbsp;valid.
          </p>
          <p>
            For your first guess try to think of a word with 5
            unique&nbsp;letters.
          </p>
        </div>

        <div ref="tabletsAndLarger_afterGuessWithMatchGuideEl"
          v-initially-removed="!showAfterGuessWithMatchGuide">

          <p>
            Congrats - at least one letter in your guess exists in their secret
            word.  You can tell because the blue clock icon shows beside
            your&nbsp;guess.
          </p>
          <p>
            This means your friend has to choose which letter
            to&nbsp;reveal.
          </p>
        </div>

        <div ref="tabletsAndLarger_afterGuessNoMatchGuideEl"
          v-initially-removed="!showAfterGuessNoMatchGuide">

          <p>
            Bummer - none of the letters in your guess are in their secret word.
            You can tell because there's no blue clock icon beside
            your&nbsp;guess.
          </p>
          <p>
            Your friend is choosing a word to&nbsp;guess.
          </p>
        </div>

        <div ref="tabletsAndLarger_myGuessWithPriorMatchGuideEl"
          v-initially-removed="!showMyGuessWithPriorMatchGuide">

          <p>
            Your turn to guess again.  This time you should use a word without
            the letter
            '{{ maybeCurrentPlayersLastGuess.chosenLetter }}'
            because it has already been&nbsp;revealed.
          </p>
          <p>
            If you use a letter that's been revealed then your friend will
            just reveal that same letter&nbsp;again!
          </p>
        </div>

        <div ref="tabletsAndLarger_myGuessNoPriorMatchGuideEl"
          v-initially-removed="!showMyGuessNoPriorMatchGuide">

          <p>
            Since you didn't match any letters in your previous guess, you
            should think of a word without those&nbsp;letters.
          </p>
          <p>
            This can be difficult though so don't worry if you end up
            reusing some letters to deduce&nbsp;others.
          </p>
        </div>
      </div>
    </div>

    <div v-if="screenSizeIsPhoneOrSmaller"
      class="board phones-and-smaller">

      <div class="sticky-header"
        ref="stickyHeaderEl">

        <status ref="phonesAndSmaller_statusComponent" />

        <div class="wrapper"
          data-animate="{
            duration: { opacity: 'slow' },
            afterHide: 'makeInvisible',
          }">

          <arrow-circle direction="left"
            ref="leftArrowComponent"
            :pulsate="pulsateLeftArrow"
            :onClick="sliiiideToTheLeft"
            :initially-hidden="!showLeftArrow" />

          <div class="display-names"
            ref="displayNamesEl">

            <h4>{{ currentPlayer.displayName }}</h4>

            <h4 ref="phonesAndSmaller_otherPlayerDisplayNameEl"
              :class="{ tbd: !otherPlayer.displayName }">

              {{ otherPlayer.displayName || '&lt;not entered yet&gt;' }}
            </h4>
          </div>

          <arrow-circle direction="right"
            ref="rightArrowComponent"
            :pulsate="pulsateRightArrow"
            :onClick="sliiiideToTheRight" />
        </div>
      </div>

      <ul class="player-view"
        ref="playerViewEl"
        :class="{ 'has-guide': guideIsShowing }">

        <li class="current-player">
          <ul class="prior-guesses">
            <template v-if="otherPlayerHasGuessed">
              <prior-guess v-for="(theGuess, index) in otherPlayer.guesses"
                :guess-index="index"
                :is-last-guess="index === otherPlayer.guesses.length - 1"
                :key="index"
                :reveal-enter-guess="revealEnterGuess"
                current-or-other-player="otherPlayer"
                v-bind="theGuess" />
            </template>

            <li v-else
              class="tbd"
              ref="phonesAndSmaller_currentPlayerNoGuessesEl">

              &lt;No guesses yet&gt;
            </li>
          </ul>

          <div class="guide"
            data-animate="{
              duration: {
                opacity: 'slow',
                size: 'normal',
              },
              afterHide: 'setDisplayNone',
              shouldAnimate: { height: true },
            }">

            <div ref="phonesAndSmaller_friendsGuessWithMultiMatchGuideEl"
              v-initially-removed="!showFriendsGuessWithMultiMatchGuide">

              <div v-html="statusIdToHelpContent.revealOneOfTheLetters" />
            </div>

            <div ref="phonesAndSmaller_friendsGuessWithSingleMatchGuideEl"
              v-initially-removed="!showFriendsGuessWithSingleMatchGuide">

              <div v-html="statusIdToHelpContent.revealOnlyLetter" />
            </div>

            <div ref="phonesAndSmaller_friendsGuessNoMatchGuideEl"
              v-initially-removed="!showFriendsGuessNoMatchGuide">

              <p>
                Your friend's guess didn't match any letters.  This means you
                have nothing to&nbsp;reveal.
              </p>
              <p>
                Click 'Got It' to move onto your {{ nextOrFirst }}&nbsp;guess.
              </p>
              <my-button type="button"
                secondary
                text="Got It"
                :on-click="removeFriendsGuessNoMatchGuide" />
            </div>
          </div>
        </li>
        <li class="friend">
          <ul class="prior-guesses">
            <template v-if="currentPlayerHasGuessed">
              <prior-guess v-for="(theGuess, index) in currentPlayer.guesses"
                :guess-index="index"
                :key="index"
                :is-last-guess="index === currentPlayer.guesses.length - 1"
                current-or-other-player="currentPlayer"
                v-bind="theGuess" />
            </template>

            <li v-else-if="showNoGuessesYet"
              class="tbd"
              ref="phonesAndSmaller_otherPlayerNoGuessesEl">

              &lt;No guesses yet&gt;
            </li>

            <li v-if="state.showPlaceholder" />

            <enter-guess ref="phonesAndSmaller_enterGuessComponent"
              :display="enterGuessDisplay" />
          </ul>

          <div class="guide"
            data-animate="{
              duration: {
                opacity: 'slow',
                size: 'fast',
              },
              afterHide: 'setDisplayNone',
              shouldAnimate: { height: true },
            }">

            <div ref="phonesAndSmaller_myFirstGuessGuideEl"
              v-initially-removed="!showMyFirstGuessGuide">

              <p>Guess a word up to 5&nbsp;letters</p>
              <p>
                Unlike your secret word, your guess can be less than 5 letters
                and may also have repeating letters.  For example "apple",
                "pear" and "a" are all&nbsp;valid.
              </p>
              <p>
                For your first guess try to think of a word with 5
                unique&nbsp;letters.
              </p>
            </div>

            <div ref="phonesAndSmaller_afterGuessWithMatchGuideEl"
              v-initially-removed="!showAfterGuessWithMatchGuide">

              <p>
                Congrats - at least one letter in your guess exists in their
                secret word.  You can tell because the blue clock icon shows
                beside your&nbsp;guess.
              </p>
              <p>
                This means your friend has to choose which letter
                to&nbsp;reveal.
              </p>
            </div>

            <div ref="phonesAndSmaller_afterGuessNoMatchGuideEl"
              v-initially-removed="!showAfterGuessNoMatchGuide">

              <p>
                Bummer - none of the letters in your guess are in their secret
                word.  You can tell because there's no blue clock icon beside
                your&nbsp;guess.
              </p>
              <p>
                Your friend is choosing a word to&nbsp;guess.
              </p>
            </div>

            <div ref="phonesAndSmaller_myGuessWithPriorMatchGuideEl"
              v-initially-removed="!showMyGuessWithPriorMatchGuide">

              <p>
                Your turn to guess again.  This time you should use a word
                without the letter
                '{{ maybeCurrentPlayersLastGuess.chosenLetter }}'
                because it has already been&nbsp;revealed.
              </p>
              <p>
                If you use a letter that's been revealed then your friend will
                just reveal that same letter&nbsp;again!
              </p>
            </div>

            <div ref="phonesAndSmaller_myGuessNoPriorMatchGuideEl"
              v-initially-removed="!showMyGuessNoPriorMatchGuide">

              <p>
                Since you didn't match any letters in your previous guess, you
                should think of a word without those&nbsp;letters.
              </p>
              <p>
                This can be difficult though so don't worry if you end up
                reusing some letters to deduce&nbsp;others.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="guide-finished"
      ref="guideFinishedEl"
      v-initially-removed="!showGuideFinished"
      data-animate="{
        duration: {
          opacity: 'slow',
          size: 'fast',
        },
        afterHide: 'setDisplayNone',
        shouldAnimate: { height: true },
      }">

      <p>You finished the <span class="dont-wrap">guide <party /></span></p>
      <p>
        If anything else is confusing for you then let me know at
        {{ global.authorEmail }} so I can address it.
      </p>
      <my-button type="button"
        secondary
        text="Ok"
        :on-click="removeGuideFinished" />
    </div>
    <div class="game-over-message"
      v-initially-removed="!isGameOver"
      ref="gameOverEl"
      data-animate="{
        duration: {
          opacity: 'slow',
          size: 'fast',
        },
        shouldAnimate: { height: true },
      }">

      <p>
        Thanks for playing and I hope you enjoyed&nbsp;it.
      </p>
      <p>
        If you ran into an issue or were confused at any point please let me
        know <span class="dont-wrap">at {{ global.authorEmail }}.</span>
      </p>

      <p v-if="guide.isActive">
        Also it looks there are a couple situations you didn't encounter which
        the guide will explain.  This just means the guide may pop up in a
        future game should you play again.
      </p>
    </div>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import hammerjs from 'hammerjs'

import enterGuess from './enter-guess'
import priorGuess from './prior-guess'
import status from './status'
import statusIdToHelpContent from './status-id-to-help-content'

import { createNamespacedHelpers } from 'vuex'
import { bindAll, findFirstValueWithTruthyKey } from 'universal/utils'
import {
  all,
  any,
  combineAll,
  discardLast,
  getValueAt,
  isFalsey,
  isTruthy,
  keepAll,
  last,
  map,
  passThrough,
} from 'fes'
import {
  animate,
  animateHide,
  animateShow,
  animateShowWithOverride,
  getDistanceFromTopOfPage,
} from 'client/utils'

//
//------//
// Init //
//------//

// fes utility aliases
const areFalsey = isFalsey,
  areTruthy = isTruthy

const {
    mapGetters: mapScreenSizeGetters,
    mapState: mapScreenSizeState,
  } = createNamespacedHelpers('screenSize'),
  {
    mapGetters: mapRoomGetters,
    mapState: mapRoomState,
  } = createNamespacedHelpers('room')

//
//------//
// Main //
//------//

export default {
  name: 'game',

  //
  // TODO: extract boilerplate in events while sustaining readability
  //
  subscribeTo: {
    screenSize: {
      wasInitialized() {
        this.maybeInitializeMobileView()
      },
    },
    room: {
      beforeAddGuess() {
        const { state } = this

        const hideEnterGuess = animateHide(this.getRef('enterGuessComponent'))
          .then(() => {
            state.showPlaceholder = true
            state.showEnterGuess = false
          })

        return Promise.all([
          hideEnterGuess,
          animateHide(this.getRef('statusComponent')),
          this.maybeRemoveGuideOnFriendSlide(),
        ])
      },
      afterAddGuess() {
        const { $refs, isGameOver, state } = this

        const maybeShowGameOver = isGameOver
          ? animateShow($refs.gameOverEl)
          : undefined

        state.showPlaceholder = false

        return Promise.all([
          this.showStatus(),
          maybeShowGameOver,
          this.maybeShowGuideOnFriendSlide(),
          this.maybeShowGuideFinished(),
        ])
      },
      beforeRevealLetter() {
        const maybeHideOtherPlayerNoGuesses = this.currentPlayerHasGuessed
          ? undefined
          : animateHide(this.getRef('otherPlayerNoGuessesEl'))

        return Promise.all([
          maybeHideOtherPlayerNoGuesses,
          this.maybeRemoveFriendsGuessWithMatchGuide(),
        ])
      },
      afterRevealLetter() {
        return Promise.all([
          this.maybeShowGuideOnFriendSlide(),
          this.maybeShowGuideFinished(),
        ])
      },

      liveUpdate: {
        beforeOtherPlayerEnteredDisplayName() {
          return animateHide(this.getRef('otherPlayerDisplayNameEl'))
        },
        afterOtherPlayerEnteredDisplayName() {
          const maybeShowNoGuesses = this.otherPlayer.hasEnteredGame
            ? undefined
            : animateShow(this.getRef('otherPlayerNoGuessesEl'))

          return Promise.all([
            animateShow(this.getRef('otherPlayerDisplayNameEl')),
            maybeShowNoGuesses,
          ])
        },
        beforeOtherPlayerEnteredGame() {
          const iWillHaveToGuess = this.currentPlayer.number === this.room.playerNumberTurn,
            maybeHideNoGuesses = iWillHaveToGuess
              ? animateHide(this.getRef('otherPlayerNoGuessesEl'))
              : undefined

          return Promise.all([
            animateHide(this.getRef('statusComponent')),
            maybeHideNoGuesses,
          ])
        },
        afterOtherPlayerEnteredGame() {
          const { currentPlayerMustGuess, state } = this

          state.showEnterGuess = currentPlayerMustGuess

          const maybeShowEnterGuess = state.showEnterGuess
            ? this.revealEnterGuess()
            : undefined

          return Promise.all([
            this.showStatus(),
            this.maybeShowGuideOnFriendSlide(),
            maybeShowEnterGuess,
          ])
        },
        beforeOtherPlayerChoseLetter() {
          return this.maybeRemoveAfterGuessGuide()
        },
        afterOtherPlayerChoseLetter() {
          return this.maybeShowGuideFinished()
        },
        beforeOtherPlayerGuessed({ payload }) {
          const maybeHideNoGuesses = this.getMaybeHideNoGuesses(payload)

          return Promise.all([
            animateHide(this.getRef('statusComponent')),
            this.maybeRemoveAfterGuessGuide(),
            maybeHideNoGuesses.currentPlayer,
            maybeHideNoGuesses.otherPlayer,
          ])
        },
        afterOtherPlayerGuessed() {
          const {
            $refs,
            currentPlayerMustGuess,
            isGameOver,
            showFriendsGuessNoMatchGuide,
          } = this

          const maybeShowEnterGuess =
            currentPlayerMustGuess && !showFriendsGuessNoMatchGuide
              ? this.revealEnterGuess()
              : undefined

          const maybeShowGameOver = isGameOver
            ? animateShow($refs.gameOverEl)
            : undefined

          return Promise.all([
            this.showStatus(),
            this.maybeShowGuideOnFriendSlide(),
            this.maybeShowGuideOnMySlide(),
            this.maybeShowGuideFinished(),
            maybeShowEnterGuess,
            maybeShowGameOver,
          ])
        },
      },
    },
  },

  components: { enterGuess, priorGuess, status },

  computed: getComputedProperties(),

  created() {
    const { currentPlayerMustGuess, showFriendsGuessNoMatchGuide, state } = this

    state.showEnterGuess =
      currentPlayerMustGuess && !showFriendsGuessNoMatchGuide
  },

  mounted() {
    this.maybeInitializeMobileView()
  },

  watch: {
    screenSizeIsPhoneOrSmaller(value) {
      //
      // nextTick is necessary here because otherwise the referenced element
      //   `playerViewEl` will not have been rendered
      //
      if (value) this.$nextTick(() => this.createTouchManager())
      else this.destroyTouchManager()
    },
    showLeftArrow(value) {
      const animateShowOrHide = value ? animateShow : animateHide
      return animateShowOrHide(this.$refs.leftArrowComponent)
    },
    showRightArrow(value) {
      const animateShowOrHide = value ? animateShow : animateHide
      return animateShowOrHide(this.$refs.rightArrowComponent)
    },
  },

  beforeDestroy() {
    this.destroyTouchManager()
    window.removeEventListener('scroll', this.maybeToggleStuck)
    this.$store.commit('removeAppClass', this.$options._componentTag)
  },

  data() {
    return {
      state: {
        // this is initialized in `created`
        showEnterGuess: null,

        //
        // TODO: remove this hack which addresses a flash between entering a
        //   guess and the guess appearing.  I think the solution is to wrap
        //   prior-guess and enter-guess into the li to ensure the li always
        //   exists.  That may cause complexity of its own though
        //
        showPlaceholder: false,

        isSliding: false,
        slidePosition: 0,
        stickyHeaderIsStuck: false,
        mobileViewWasInitialized: false,
      },
    }
  },

  methods: {
    createTouchManager() {
      const { Manager, Swipe } = bindAll(['Manager', 'Swipe'], hammerjs),
        direction = hammerjs.DIRECTION_HORIZONTAL

      const touchManager = new Manager(this.$el, {
        recognizers: [[Swipe, { direction }]],
      })

      touchManager.on('swipeleft swiperight', this.onSwipe.bind(this))

      this.touchManager = touchManager
    },
    destroyTouchManager() {
      if (!this.touchManager) return

      this.touchManager.destroy()
      delete this.touchManager
    },
    getMaybeHideNoGuesses(payload) {
      const { currentPlayerHasGuessed, guide, otherPlayerHasGuessed } = this,
        { understands } = guide

      const mostRecentGuess = last(payload.otherPlayer.guesses),
        currentPlayerWillHaveToRevealALetter = otherPlayerHasGuessed &&
          mostRecentGuess.hasAnyMatchingLetters

      const currentPlayer = otherPlayerHasGuessed
        ? undefined
        : animateHide(this.getRef('currentPlayerNoGuessesEl'))

      const friendsGuessNoMatchGuideWillShow =
        guide.isActive &&
        !understands.friendsGuessNoMatch &&
        !currentPlayerWillHaveToRevealALetter

      const otherPlayer =
        currentPlayerHasGuessed ||
        currentPlayerWillHaveToRevealALetter ||
        friendsGuessNoMatchGuideWillShow
          ? undefined
          : animateHide(this.getRef('otherPlayerNoGuessesEl'))

      return {
        currentPlayer,
        otherPlayer,
      }
    },
    getRef(name) {
      const prefix = this.screenSizeIsPhoneOrSmaller
        ? 'phonesAndSmaller_'
        : 'tabletsAndLarger_'

      return this.$refs[prefix + name]
    },
    initStickyHeader() {
      this.maybeToggleStuck()
      window.addEventListener('scroll', this.maybeToggleStuck)
    },
    maybeInitializeMobileView() {
      const {
        screenSizeIsPhoneOrSmaller,
        screenSizeWasInitialized,
        state,
      } = this

      if (
        !state.mobileViewWasInitialized &&
        screenSizeWasInitialized &&
        screenSizeIsPhoneOrSmaller
      ) {
        state.mobileViewWasInitialized = true
        this.createTouchManager()
        this.initStickyHeader()
      }
    },
    maybeRemoveFriendsGuessWithMatchGuide() {
      const {
        $myStore,
        showFriendsGuessWithMultiMatchGuide,
        showFriendsGuessWithSingleMatchGuide,
      } = this

      let understands

      if (showFriendsGuessWithMultiMatchGuide) {
        understands = 'friendsGuessWithMultiMatch'
      } else if (showFriendsGuessWithSingleMatchGuide) {
        understands = 'friendsGuessWithSingleMatch'
      }

      if (!understands) return

      return animateHide(this.getRef(`${understands}GuideEl`)).then(() => {
        $myStore.dispatch('room/markAsUnderstood', { understands })
      })
    },
    maybeShowGuideOnFriendSlide() {
      const refId = findFirstValueWithTruthyKey([
        [this.showMyFirstGuessGuide, 'myFirstGuessGuideEl'],
        [this.showAfterGuessWithMatchGuide, 'afterGuessWithMatchGuideEl'],
        [this.showAfterGuessNoMatchGuide, 'afterGuessNoMatchGuideEl'],
        [this.showMyGuessWithPriorMatchGuide, 'myGuessWithPriorMatchGuideEl'],
        [this.showMyGuessNoPriorMatchGuide, 'myGuessNoPriorMatchGuideEl'],
      ])

      return refId ? animateShow(this.getRef(refId)) : undefined
    },
    maybeShowGuideFinished() {
      const { $refs, showGuideFinished } = this,
        { guideFinishedEl } = $refs

      return showGuideFinished ? animateShow(guideFinishedEl) : undefined
    },
    //
    // The reason 'afterGuess*' is omitted is that it's removed after the friend
    //   reveals a letter.  These should all be removed after submitting
    //   a guess.
    //
    maybeRemoveGuideOnFriendSlide() {
      const refId = findFirstValueWithTruthyKey([
        [this.showMyFirstGuessGuide, 'myFirstGuessGuideEl'],
        [this.showMyGuessWithPriorMatchGuide, 'myGuessWithPriorMatchGuideEl'],
        [this.showMyGuessNoPriorMatchGuide, 'myGuessNoPriorMatchGuideEl'],
      ])

      if (!refId) return

      const understands = discardLast('GuideEl'.length)(refId)

      return animateHide(this.getRef(refId)).then(() => {
        this.$myStore.dispatch('room/markAsUnderstood', { understands })
      })
    },
    maybeShowGuideOnMySlide() {
      const refId = findFirstValueWithTruthyKey([
        [this.showFriendsGuessWithMultiMatchGuide, 'friendsGuessWithMultiMatchGuideEl'],
        [this.showFriendsGuessWithSingleMatchGuide, 'friendsGuessWithSingleMatchGuideEl'],
        [this.showFriendsGuessNoMatchGuide, 'friendsGuessNoMatchGuideEl'],
      ])

      return refId ? animateShow(this.getRef(refId)) : undefined
    },
    maybeSlideRight() {
      const { screenSizeIsPhoneOrSmaller, state } = this

      return (
        screenSizeIsPhoneOrSmaller
        && state.slidePosition === 0
      )
        ? this.slide(1)
        : undefined
    },
    maybeToggleStuck() {
      const { $refs, state } = this,
        { stickyHeaderEl } = $refs,
        { stickyHeaderIsStuck } = state,
        offset = window.pageYOffset,
        distance = getDistanceFromTopOfPage(stickyHeaderEl) - offset

      if (!stickyHeaderIsStuck && distance === 0) {
        state.stickyHeaderIsStuck = true
        stickyHeaderEl.classList.add('stuck')
      } else if (stickyHeaderIsStuck && distance > 0) {
        stickyHeaderEl.classList.remove('stuck')
        state.stickyHeaderIsStuck = false
      }
    },
    onSwipe({ type }) {
      const { slidePosition } = this.state
      if (type === 'swipeleft' && slidePosition < 1) {
        this.slide(1)
      } else if (type === 'swiperight' && slidePosition > 0) {
        this.slide(-1)
      }
    },
    maybeRemoveAfterGuessGuide() {
      const {
        $myStore,
        showAfterGuessNoMatchGuide,
        showAfterGuessWithMatchGuide,
      } = this

      let understands

      if (showAfterGuessNoMatchGuide) {
        understands = 'afterGuessNoMatch'
      } else if (showAfterGuessWithMatchGuide) {
        understands = 'afterGuessWithMatch'
      }

      if (!understands) return

      return animateHide(this.getRef(`${understands}GuideEl`)).then(() => {
        $myStore.dispatch('room/markAsUnderstood', { understands })
      })
    },
    removeFriendsGuessNoMatchGuide() {
      const { $myStore, currentPlayerHasGuessed } = this,
        understands = 'friendsGuessNoMatch'

      const maybeHideOtherPlayerNoGuesses = currentPlayerHasGuessed
        ? undefined
        : animateHide(this.getRef('otherPlayerNoGuessesEl'))

      return Promise.all([
        animateHide(this.getRef('friendsGuessNoMatchGuideEl')),
        maybeHideOtherPlayerNoGuesses,
      ]).then(() => {
        $myStore.dispatch('room/markAsUnderstood', { understands })

        Promise.all([
          this.revealEnterGuess(),
          this.maybeShowGuideOnFriendSlide(),
          this.maybeSlideRight(),
          this.maybeShowGuideFinished(),
        ])
      })
    },
    removeGuideFinished() {
      const { $myStore, $refs } = this

      return animateHide($refs.guideFinishedEl).then(() => {
        $myStore.dispatch('room/disableGuide')
      })
    },
    revealEnterGuess() {
      const enterGuessComponent = this.getRef('enterGuessComponent')

      this.state.showEnterGuess = true
      enterGuessComponent.clearText()

      return (this.currentPlayer.number === 1)
        ? animateShow(enterGuessComponent)
        : animateShowWithOverride(enterGuessComponent, {
            duration: {
              opacity: 'slow',
              size: 'fast',
            },
            shouldAnimate: {
              height: true,
            },
          })
    },
    showStatus() {
      const statusComponent = this.getRef('statusComponent')

      return statusComponent
        .maybeDrawAttentionUntilUserInteracts()
        .then(() => animateShow(statusComponent))
    },
    sliiiideToTheLeft() {
      return this.slide(-1)
    },
    sliiiideToTheRight() {
      return this.slide(1)
    },
    slide(positionMoved) {
      const { state } = this

      if (state.isSliding) return
      else state.isSliding = true

      const { displayNamesEl, playerViewEl } = this.$refs,
        index = state.slidePosition,
        to = (index + positionMoved) * 100,
        from = index * 100,
        fromDisplayName = displayNamesEl.childNodes[index],
        toDisplayName = displayNamesEl.childNodes[index + positionMoved],
        fromGuessList = playerViewEl.childNodes[index],
        toGuessList = playerViewEl.childNodes[index + positionMoved],
        transform = [`translateX(-${to}%)`, `translateX(-${from}%)`]

      state.slidePosition += positionMoved

      return Promise.all([
        animate(fromDisplayName, { opacity: [0, 1], transform }),
        animate(toDisplayName, { opacity: [1, 0], transform }),
        animate(fromGuessList, { opacity: [0, 1], transform }),
        animate(toGuessList, { opacity: [1, 0], transform }),
      ]).then(() => {
        state.isSliding = false
      })
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getComputedProperties() {
  const vuexRoomState = mapRoomState([
      'currentPlayer',
      'guide',
      'otherPlayer',
      'room',
      'statusIsPulsating',
    ]),
    vuexRoomGetters = mapRoomGetters([
      'currentPlayerHasGuessed',
      'currentPlayerMustGuess',
      'currentPlayerMustRevealALetter',
      'currentPlayersLastGuess',
      'friendWon',
      'isGameOver',
      'isFriendsTurn',
      'iWon',
      'otherPlayerHasGuessed',
      'otherPlayersLastGuess',
    ]),
    vuexScreenSizeGetters = mapScreenSizeGetters({
      screenSizeWasInitialized: 'wasInitialized',
    }),
    vuexScreenSizeState = mapScreenSizeState({
      screenSizeIsPhoneOrSmaller: 'isPhoneOrSmaller',
      screenSizeIsTabletOrLarger: 'isTabletOrLarger',
    }),
    localState = getLocalComputedProperties()

  return combineAll.objects([
    vuexRoomState,
    vuexRoomGetters,
    vuexScreenSizeState,
    vuexScreenSizeGetters,
    localState,
  ])
}

function getLocalComputedProperties() {
  return {
    currentPlayerIsSelected() {
      return this.state.viewingPlayerKey === 'currentPlayer'
    },
    enterGuessDisplay() {
      return this.state.showEnterGuess
        ? 'list-item'
        : 'none'
    },
    friendsLastGuessMatchesMultipleLetters() {
      const {
          currentPlayer,
          otherPlayerHasGuessed,
          otherPlayersLastGuess,
        } = this,
        { secretWord } = currentPlayer

      return (
        otherPlayerHasGuessed &&
        keepAll(otherPlayersLastGuess.word)(secretWord).length > 1
      )
    },
    guideIsShowing() {
      return (
        this.showFriendsGuessWithMultiMatchGuide ||
        this.showFriendsGuessWithSingleMatchGuide ||
        this.showFriendsGuessNoMatchGuide ||
        this.showMyFirstGuessGuide ||
        this.showAfterGuessNoMatchGuide ||
        this.showAfterGuessWithMatchGuide ||
        this.showMyGuessWithPriorMatchGuide ||
        this.showMyGuessNoPriorMatchGuide ||
        this.showGuideFinished
      )
    },
    maybeCurrentPlayersLastGuess() {
      return this.currentPlayersLastGuess || {}
    },
    nextOrFirst() {
      return this.currentPlayerHasGuessed ? 'next' : 'first'
    },
    otherPlayerIsSelected() {
      return this.state.viewingPlayerKey === 'otherPlayer'
    },
    pulsateLeftArrow() {
      return (
        !this.statusIsPulsating &&
        (this.currentPlayerMustRevealALetter ||
          this.showFriendsGuessNoMatchGuide)
      )
    },
    pulsateRightArrow() {
      return (
        !this.statusIsPulsating &&
        this.currentPlayerMustGuess &&
        !this.showFriendsGuessNoMatchGuide
      )
    },
    showAfterGuessWithMatchGuide() {
      const {
          currentPlayerHasGuessed,
          currentPlayersLastGuess,
          guide,
          iWon,
        } = this,
        { understands } = guide

      return (
        guide.isActive &&
        !understands.afterGuessWithMatch &&
        !iWon &&
        currentPlayerHasGuessed &&
        currentPlayersLastGuess.hasAnyMatchingLetters
      )
    },
    showAfterGuessNoMatchGuide() {
      const {
          currentPlayerHasGuessed,
          currentPlayersLastGuess,
          guide,
          iWon,
        } = this,
        { understands } = guide

      return (
        guide.isActive &&
        !understands.afterGuessNoMatch &&
        !iWon &&
        currentPlayerHasGuessed &&
        !currentPlayersLastGuess.hasAnyMatchingLetters
      )
    },
    showFriendsGuessWithMultiMatchGuide() {
      const {
          currentPlayerMustRevealALetter,
          friendsLastGuessMatchesMultipleLetters,
          guide,
        } = this,
        { understands } = guide

      return (
        guide.isActive &&
        !understands.friendsGuessWithMultiMatch &&
        currentPlayerMustRevealALetter &&
        friendsLastGuessMatchesMultipleLetters
      )
    },
    showFriendsGuessWithSingleMatchGuide() {
      const {
          currentPlayerMustRevealALetter,
          friendsLastGuessMatchesMultipleLetters,
          guide,
        } = this,
        { understands } = guide

      return (
        guide.isActive &&
        !understands.friendsGuessWithSingleMatch &&
        currentPlayerMustRevealALetter &&
        !friendsLastGuessMatchesMultipleLetters
      )
    },
    showFriendsGuessNoMatchGuide() {
      const { guide, otherPlayerHasGuessed, otherPlayersLastGuess } = this,
        { understands } = guide

      return (
        guide.isActive &&
        !understands.friendsGuessNoMatch &&
        otherPlayerHasGuessed &&
        !otherPlayersLastGuess.hasAnyMatchingLetters
      )
    },
    showGuideFinished() {
      const { guide } = this,
        { understands } = guide

      return guide.isActive && all(areTruthy)(understands)
    },
    showLeftArrow() {
      return this.state.slidePosition > 0
    },
    showMyFirstGuessGuide() {
      const {
          currentPlayerHasGuessed,
          currentPlayerMustGuess,
          guide,
          showFriendsGuessNoMatchGuide,
        } = this,
        { understands } = guide

      return (
        guide.isActive &&
        !understands.myFirstGuess &&
        !showFriendsGuessNoMatchGuide &&
        currentPlayerMustGuess &&
        !currentPlayerHasGuessed
      )
    },
    showMyGuessNoPriorMatchGuide() {
      const {
          currentPlayer,
          currentPlayerHasGuessed,
          currentPlayerMustGuess,
          guide,
          showFriendsGuessNoMatchGuide,
          showMyGuessWithPriorMatchGuide,
        } = this,
        { understands } = guide,
        atLeastOnePriorGuessHasNoMatchingLetter =
          currentPlayerHasGuessed &&
          passThrough(currentPlayer.guesses, [
            map(getValueAt('hasAnyMatchingLetters')),
            any(areFalsey),
          ])

      return (
        guide.isActive &&
        !understands.myGuessNoPriorMatch &&
        !showMyGuessWithPriorMatchGuide &&
        !showFriendsGuessNoMatchGuide &&
        atLeastOnePriorGuessHasNoMatchingLetter &&
        currentPlayerHasGuessed &&
        currentPlayerMustGuess
      )
    },
    showMyGuessWithPriorMatchGuide() {
      const {
          currentPlayer,
          currentPlayerHasGuessed,
          currentPlayerMustGuess,
          guide,
          showFriendsGuessNoMatchGuide,
        } = this,
        { understands } = guide,
        atLeastOnePriorGuessHasMatchingLetter =
          currentPlayerHasGuessed &&
          passThrough(currentPlayer.guesses, [
            map(getValueAt('hasAnyMatchingLetters')),
            any(areTruthy),
          ])

      return (
        guide.isActive &&
        !understands.myGuessWithPriorMatch &&
        !showFriendsGuessNoMatchGuide &&
        atLeastOnePriorGuessHasMatchingLetter &&
        currentPlayerHasGuessed &&
        currentPlayerMustGuess
      )
    },
    //
    // this property is only called if no guesses exist for the relevant player
    //
    showNoGuessesYet() {
      const { otherPlayer } = this

      return (
        this.isFriendsTurn ||
        this.currentPlayerMustRevealALetter ||
        this.friendWon ||
        this.showFriendsGuessNoMatchGuide ||
        (otherPlayer.displayName && !otherPlayer.hasEnteredGame)
      )
    },
    showRightArrow() {
      return this.state.slidePosition < 1
    },
    statusIdToHelpContent() {
      return statusIdToHelpContent
    },
    understands() {
      return this.guide.understands
    },
    viewingPlayer() {
      // this will have to be refactored if and once more than two players are
      //   allowed.  At least the design won't have to be modified.
      return this[this.state.viewingPlayerKey]
    },
  }
}
</script>

<style lang="scss">
@include for-phones-and-down {
  #app.game {
    text-align: center;

    > header {
      @include res-aware-element-spacing('padding-bottom', 'md');

      .logo {
        margin-left: auto;
        margin-right: auto;

        //
        // due to the feather leaning to the right, the logo doesn't seem centered
        //   without a manual offset.
        //
        position: relative;
        right: -8px;
      }
    }

    > main {
      > .site-container {
        max-width: unset;
        padding-left: 0;
        padding-right: 0;
      }

      .view.room > .wrapper {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
    }

    > footer {
      margin-top: 0;
    }
  }
}

.sub-view.game {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .tbd {
    font-style: italic;
  }

  .guide > *,
  .guide-finished {
    @include res-aware-element-spacing('padding', 'lg');

    background-color: $bg-off;
    vertical-align: top;
    white-space: normal;
    width: 100%;
  }

  .game-over-message {
    @include res-aware-element-spacing('padding', 'lg');

    background-color: $bg-off;

    > :first-child {
      margin-top: 0;
    }
  }

  @include for-phones-and-down {
    .guide > *,
    .guide-finished {
      @include res-aware-element-spacing('margin-top', 'lg');

      // prettier-ignore
      margin-bottom: ($mobile-footer-height / 2)#{px};
    }

    > .board > ul.player-view:not(.has-guide) {
      padding-bottom: $mobile-footer-height#{px};
    }

    &.game-over {
      // prettier-ignore
      padding-bottom: ($mobile-footer-height / 2)#{px};

      > .board.phones-and-smaller > ul.player-view {
        padding-bottom: ($mobile-footer-height / 2)#{px};
      }
    }
  }

  @include for-tablets-and-up {
    .guide > *,
    .guide-finished,
    .game-over-message {
      border-radius: $radius-small;
      max-width: $column-width * 2;
    }

    > .board > .column {
      @include res-aware-element-spacing('margin-top', 'md');
    }
  }

  > .board {
    .guide p:first-child {
      margin-top: 0;
    }

    > .column {
      @include res-aware-element-spacing('padding-bottom', 'xl');

      display: inline-block;
      vertical-align: top;
      width: $column-width;

      > h3 {
        @include res-aware-font-size('lg');

        margin-top: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      > ul {
        @include res-aware-element-spacing('margin-top', 'xs');

        > li {
          &:not(.enter-guess) {
            @include per-screen-size(
              ('height', 'line-height'),
              56,
              56,
              56,
              56,
              'px'
            );

            vertical-align: top;
          }
        }
      }

      + .column {
        @include res-aware-element-spacing('margin-left', 'md');
      }
    }

    &.phones-and-smaller {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      text-align: center;

      > .sticky-header {
        @include res-aware-element-spacing('padding-bottom', 'md');
        @include res-aware-element-spacing('padding-top', 'sm');

        align-self: start;
        background-color: $bg;
        box-shadow: 0 0 0 transparent;
        position: sticky;
        top: 0;
        transition: box-shadow $duration-short $easing-default;
        width: 100%;
        z-index: 2;

        &.stuck {
          @include shadow-small;
        }

        > .status {
          display: block;
        }

        > .wrapper {
          max-width: $phone-min;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        .display-names {
          @include res-aware-element-spacing('margin-top', 'md');

          display: block;
          overflow: hidden;
          white-space: nowrap;
          z-index: 0;

          > h4 {
            display: inline-block;
            font-size: 22px;
            margin-top: 0;
            width: 100%;
          }
        }

        button.arrow-circle {
          bottom: 0;
          position: absolute;
          z-index: 1;

          &.left {
            @include res-aware-element-spacing('left', 'lg');
          }
          &.right {
            @include res-aware-element-spacing('right', 'lg');
          }
        }
      }

      > ul.player-view {
        flex-grow: 1;
        overflow: hidden;
        white-space: nowrap;
        z-index: 1;

        > li {
          display: inline-block;
          vertical-align: top;
          width: 100%;

          > ul > li {
            &:not(.enter-guess) {
              @include per-screen-size(
                ('height', 'line-height'),
                56,
                56,
                56,
                56,
                'px'
              );

              vertical-align: top;
            }
          }
        }
      }
    }
  }
}
</style>
