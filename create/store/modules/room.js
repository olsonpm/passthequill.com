//
// TODO: handle errors
// TODO: find a less copy/paste solution to error logging.  Either an option in
//   the api object or a separate api object which automatically logs errors
//   would be appropriate
//

//---------//
// Imports //
//---------//

import vue from 'vue'

import api from 'universal/api'
import game from 'project-root/component/view/room/game/index'
import initPlayer from 'project-root/component/view/room/init-player/index'
import { assignAllLeaves } from '../helpers'
import { logErrorToServer, setShowNotFoundOrErrorView } from 'universal/utils'
import {
  coerceTo,
  getValueAt,
  isEmpty,
  isLaden,
  last,
  none,
  passThrough,
} from 'fes'

//
//------//
// Init //
//------//

const hasTruthyValue = getValueAt

//
//------//
// Main //
//------//

const room = {
  state: getInitialState,
  getters: {
    currentPlayerHasGuessed(state) {
      return isLaden(state.currentPlayer.guesses)
    },
    currentPlayerHasNotMatchedAnyletters(state) {
      return none(hasTruthyValue('chosenLetter'))(state.currentPlayer.guesses)
    },
    currentPlayerMustReviewWord(_unused_state, getters) {
      const {
        isGameActive,
        isMyTurn,
        otherPlayersLastGuessWasReviewed,
        otherPlayerHasGuessed,
      } = getters

      return (
        isGameActive &&
        isMyTurn &&
        otherPlayerHasGuessed &&
        !otherPlayersLastGuessWasReviewed
      )
    },
    currentPlayerMustGuess(_unused_state, getters) {
      const {
        isMyTurn,
        otherPlayersLastGuessWasReviewed,
        otherPlayerHasGuessed,
      } = getters

      return (
        isMyTurn && (!otherPlayerHasGuessed || otherPlayersLastGuessWasReviewed)
      )
    },
    currentPlayersLastGuessWasReviewed(state, getters) {
      const { currentPlayer } = state,
        { currentPlayerHasGuessed } = getters

      return (
        currentPlayerHasGuessed &&
        passThrough(currentPlayer.guesses, [
          last,
          getValueAt('wasReviewed'),
          coerceTo(Boolean),
        ])
      )
    },
    friendWon: state => {
      const lastGuess = last(state.otherPlayer.guesses) || {}
      return !!lastGuess.isCorrect
    },
    isFriendsTurn: (_unused_state, { isGameActive, isMyTurn }) =>
      isGameActive && !isMyTurn,
    //
    // TODO: come up with a better name than 'isGameActive' because it's too
    //   similar to 'activeRoom', and the concept of active and closed rooms is
    //   not implemented yet
    //
    isGameActive: (_unused_state, { isGameOver }) => !isGameOver,
    isGameOver: (_unused_state, { friendWon, iWon }) => friendWon || iWon,
    isMyTurn: (state, getters) => {
      const { currentPlayer, room } = state,
        { isGameActive } = getters

      return isGameActive && room.playerNumberTurn === currentPlayer.number
    },
    iWon: state => {
      const lastGuess = last(state.currentPlayer.guesses) || {}
      return !!lastGuess.isCorrect
    },
    otherPlayerHasGuessed(state) {
      return isLaden(state.otherPlayer.guesses)
    },
    otherPlayerMustGuess(state, getters) {
      const { currentPlayer } = state,
        { currentPlayersLastGuessWasReviewed, isFriendsTurn } = getters

      return (
        isFriendsTurn &&
        (currentPlayersLastGuessWasReviewed || isEmpty(currentPlayer.guesses))
      )
    },
    otherPlayerMustJoin(state) {
      const { otherPlayer } = state

      return !otherPlayer.hasWord || !otherPlayer.displayName
    },
    otherPlayersLastGuessWasReviewed(state, getters) {
      const { otherPlayer } = state,
        { otherPlayerHasGuessed } = getters

      return (
        otherPlayerHasGuessed &&
        passThrough(otherPlayer.guesses, [
          last,
          getValueAt('wasReviewed'),
          coerceTo(Boolean),
        ])
      )
    },
  },
  actions: {
    addGuess({ commit, rootState }, { eventManager, guess }) {
      const { playerHash, roomHash } = rootState.route.params

      return Promise.all([
        api.post(`/room/${roomHash}/player/${playerHash}/guess`, { guess }),
        eventManager.publish('room/beforeAddGuess'),
      ])
        .then(([currentPlayerAndRoom]) => {
          const { currentPlayer } = currentPlayerAndRoom
          last(currentPlayer.guesses).justAdded = true
          commit('updateCurrentPlayerAndRoom', currentPlayerAndRoom)
          return vue.nextTick()
        })
        .then(() => eventManager.publish('room/afterAddGuess'))
        .then(() => {
          commit('clearJustAdded', 'currentPlayer')
        })
        .catch(error => {
          logErrorToServer({
            context: 'when adding a guess',
            error,
          })

          return Promise.reject(error)
        })
    },
    changeSubViewName({ commit }, { subViewName }) {
      if (subViewName === 'game') {
        commit('addAppClass', 'game', { root: true })
      }
      commit('setSubViewName', subViewName)
    },
    getRoom({ commit, dispatch }, { route }) {
      const { playerHash, roomHash } = route.params

      return api
        .get(`/room/${roomHash}?player-hash=${playerHash}`)
        .then(result => {
          const { displayName, word } = result.currentPlayer,
            subViewName = !displayName || !word ? initPlayer.name : game.name

          dispatch('changeSubViewName', { subViewName })
          commit('setRoomData', result)
        })
        .catch(setShowNotFoundOrErrorView(commit))
    },
    initPlayer({ commit, rootState }, { displayName, word }) {
      const newPlayerData = { displayName, word },
        { playerHash, roomHash } = rootState.route.params

      return api
        .post(`/room/${roomHash}/player/${playerHash}`, newPlayerData)
        .then(currentAndOtherPlayer => {
          commit('updatePlayers', currentAndOtherPlayer)
        })
        .catch(error => {
          logErrorToServer({
            context: 'when adding a guess',
            error,
          })

          return Promise.reject(error)
        })
    },
    markChosenLetter({ commit, rootState }, { letter: chosenLetter }) {
      const { playerHash, roomHash } = rootState.route.params,
        postBody = chosenLetter ? { chosenLetter } : {}

      return api
        .post(
          `/room/${roomHash}/player/${playerHash}/mark-chosen-letter`,
          postBody
        )
        .then(otherPlayerData => commit('updateOtherPlayer', otherPlayerData))
        .catch(error => {
          logErrorToServer({
            context: 'when adding a guess',
            error,
          })

          return Promise.reject(error)
        })
    },
    markGuessAsInvalid({ commit, rootState }, { eventManager }) {
      const { playerHash, roomHash } = rootState.route.params,
        url = `/room/${roomHash}/player/${playerHash}/mark-guess-as-invalid`

      return Promise.all([
        api.post(url),
        eventManager.publish('room/beforeGuessMarkedAsInvalid'),
      ])
        .then(([otherPlayerAndRoomData]) => {
          commit('updateOtherPlayerAndRoom', otherPlayerAndRoomData)
          return vue.nextTick()
        })
        .then(() => eventManager.publish('room/afterGuessMarkedAsInvalid'))
        .catch(error => {
          logErrorToServer({
            context: 'when adding a guess',
            error,
          })

          return Promise.reject(error)
        })
    },
    markGuessAsValid({ commit, rootState }, { eventManager }) {
      const { playerHash, roomHash } = rootState.route.params,
        url = `/room/${roomHash}/player/${playerHash}/mark-guess-as-valid`

      return Promise.all([
        api.post(url),
        eventManager.publish('room/beforeGuessMarkedAsValid'),
      ])
        .then(([otherPlayer]) => {
          commit('updateOtherPlayer', otherPlayer)
          return vue.nextTick()
        })
        .then(() => eventManager.publish('room/afterGuessMarkedAsValid'))
        .catch(error => {
          logErrorToServer({
            context: 'when adding a guess',
            error,
          })

          return Promise.reject(error)
        })
    },
  },
  mutations: {
    clearJustAdded(state, currentOrOtherPlayer) {
      last(state[currentOrOtherPlayer].guesses).justAdded = false
    },
    setStatusIsPulsating(state, trueOrFalse) {
      state.statusIsPulsating = trueOrFalse
    },
    setSubViewName(state, name) {
      state.subViewName = name
    },

    //
    // yes all these functions are the same.  I just want to keep them separate
    //   for readability.
    //
    updateCurrentPlayer(state, currentPlayer) {
      assignAllLeaves(state)(currentPlayer)
    },
    updateCurrentPlayerAndRoom(state, currentPlayerAndRoom) {
      assignAllLeaves(state)(currentPlayerAndRoom)
    },
    updateOtherPlayerAndRoom(state, otherPlayerAndRoom) {
      assignAllLeaves(state)(otherPlayerAndRoom)
    },
    updateOtherPlayer(state, otherPlayer) {
      assignAllLeaves(state)(otherPlayer)
    },
    updatePlayers(state, currentAndOtherPlayer) {
      assignAllLeaves(state)(currentAndOtherPlayer)
    },
    setRoomData(state, result) {
      assignAllLeaves(state)(result)
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getInitialState() {
  return {
    currentPlayer: {
      number: null,
      displayName: null,
      guesses: [],
      word: null,
    },
    otherPlayer: {
      displayName: null,
      guesses: [],
      hasWord: null,
    },
    room: {
      playerNumberTurn: null,
    },
    statusIsPulsating: false,
    subViewName: null,
  }
}

//
//---------//
// Exports //
//---------//

export default room
