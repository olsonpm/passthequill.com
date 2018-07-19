<template>
  <div id="app"
    :class="allAppClasses">

    <!--
      Some views need to modify site-wide styles (e.g. the mobile game view
      needs to replace the footer margin with its own padding to allow a better
      swipe experience).
    -->

    <lightbox />
    <notify-error />

    <header>
      <div class="site-container">
        <logo />
        <nav ref="navEl">
          <router-link to="/" class="link-to">
            Home
          </router-link>

          <router-link to="/create-a-room" class="link-to">
            Begin
          </router-link>

          <router-link to="/how-to-play" class="link-to">
            How To Play
          </router-link>
        </nav>
      </div>
    </header>
    <main>
      <div class="site-container">
        <notFoundView v-if="showNotFoundView" />
        <errorView v-else-if="showErrorView" />
        <router-view v-else :class="'view ' + $route.name"></router-view>
      </div>
    </main>
    <footer>
      <div class="site-container">
        <small-quill />
        <span class="author">
          {{ global.authorEmail }}
        </span>
        <link-to :url="global.url.github"
          custom-focus="octicon-focus">

          <octicon />
        </link-to>
      </div>
    </footer>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import debounce from 'debounce'
import errorView from 'project-root/component/single-use/error'
import lightbox from 'project-root/component/single-use/lightbox'
import notFoundView from 'project-root/component/view/not-found'
import { removeFocus } from 'client/utils'
import { mapState as mapRootState } from 'vuex'
import { append, combineAll } from 'fes'
import { locals } from './screen-size-breakpoints.scss'

//
//------//
// Init //
//------//

const { phoneMax, smallPhoneMax } = locals

//
//------//
// Main //
//------//

export default {
  name: 'app',
  components: { errorView, lightbox, notFoundView },
  computed: getComputedProperties(),

  mounted() {
    for (const link of this.navLinks) {
      link.addEventListener('click', () => removeFocus(link))
    }

    //
    // we need to set the screenSize state after everything has been rendered.
    //   Otherwise we'll get an unwanted rehydration
    //
    this.$nextTick().then(() => {
      const initialSizes = {
        isPhoneOrSmaller: getIsPhoneOrSmaller(),
        isSmallPhone: getIsSmallPhone()
      }
      this.$store.commit(
        'screenSize/setIsPhoneOrSmaller',
        initialSizes.isPhoneOrSmaller
      )
      this.$store.commit(
        'screenSize/setIsSmallPhone',
        initialSizes.isSmallPhone
      )

      const maybeUpdateScreenSize = createMaybeUpdateScreenSize(this, initialSizes)

      window.addEventListener(
        'resize',
        debounce(maybeUpdateScreenSize, 150)
      )

      return this.$nextTick()
    })
    .then(() => {
      this.$eventManager.publish('screenSize/hasInitialized')
    })
  },
  beforeDestroy() {
    for (const link of this.navLinks) {
      link.removeEventListener('click', () => removeFocus(link))
    }
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function createMaybeUpdateScreenSize(appInstance, initialSizes) {
  const current = initialSizes

  return function onWindowResize() {
    const updated = {
      isPhoneOrSmaller: getIsPhoneOrSmaller(),
      isSmallPhone: getIsSmallPhone(),
    }

    if (updated.isPhoneOrSmaller !== current.updatedIsPhoneOrSmaller) {
      current.isPhoneOrSmaller = updated.isPhoneOrSmaller
      appInstance.$store.commit(
        'screenSize/setIsPhoneOrSmaller',
        current.isPhoneOrSmaller
      )
    }

    if (updated.isSmallPhone !== current.isSmallPhone) {
      current.isSmallPhone = updated.isSmallPhone
      appInstance.$store.commit(
        'screenSize/setIsSmallPhone',
        current.isSmallPhone
      )
    }
  }
}

function getComputedProperties() {
  const vuexRootState = mapRootState(['showNotFoundView', 'showErrorView']),
    localComputedState = getLocalComputedState()

  return combineAll.objects([
    vuexRootState,
    localComputedState
  ])
}

function getLocalComputedState() {
  return {
    allAppClasses() {
      return append(this.$route.name)(this.appClasses)
    },
    appClasses() {
      return this.$store.state.appClasses
    },
    navLinks() {
      return this.$refs.navEl.childNodes
    },
  }
}

function getIsPhoneOrSmaller() {
  return window.matchMedia(`(max-width: ${phoneMax})`).matches
}
function getIsSmallPhone() {
  return window.matchMedia(`(max-width: ${smallPhoneMax})`).matches
}
</script>

<style lang="scss" src="./styles/index.scss">
</style>
