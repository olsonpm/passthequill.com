//
// TODO: handle errors
// TODO: find a less copy/paste solution to error logging.  Either an option in
//   the api object or a separate api object which automatically logs errors
//   would be appropriate
// TODO: find a sensible name for functions which share the logic between
//   between 'current' and 'other' player, or find a way to restructure the data
//   to prevent this duplicate code.
//
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
import { getValueAt, isLaden, last, none } from 'fes'

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
    bothPlayersHaveJoined(state) {
      const { currentPlayer, otherPlayer } = state

      return (
        otherPlayer.hasWord &&
        otherPlayer.displayName &&
        currentPlayer.word &&
        currentPlayer.displayName
      )
    },
    currentPlayerHasGuessed(state) {
      return isLaden(state.currentPlayer.guesses)
    },
    currentPlayerHasNotMatchedAnyletters(state) {
      return none(hasTruthyValue('chosenLetter'))(state.currentPlayer.guesses)
    },
    currentPlayerMustRevealALetter(_unused_state, getters) {
      const { isMyTurn, otherPlayerHasGuessed, otherPlayersLastGuess } = getters

      return (
        isMyTurn &&
        otherPlayerHasGuessed &&
        otherPlayersLastGuess.hasAnyMatchingLetters &&
        !otherPlayersLastGuess.chosenLetter
      )
    },
    currentPlayerMustGuess(_unused_state, getters) {
      const { isMyTurn, otherPlayerHasGuessed, otherPlayersLastGuess } = getters

      // prettier-ignore
      return (
        isMyTurn &&
        (
          !otherPlayerHasGuessed
          || !otherPlayersLastGuess.hasAnyMatchingLetters
          || (
            otherPlayersLastGuess.hasAnyMatchingLetters
            && otherPlayersLastGuess.chosenLetter
          )
        )
      )
    },
    currentPlayersLastGuess(state) {
      const { currentPlayer } = state

      return last(currentPlayer.guesses)
    },
    friendWon: state => {
      const lastGuess = last(state.otherPlayer.guesses) || {}
      return !!lastGuess.isCorrect
    },
    isFriendsTurn: (_unused_state, getters) => {
      const { bothPlayersHaveJoined, isGameActive, isMyTurn } = getters
      return isGameActive && bothPlayersHaveJoined && !isMyTurn
    },
    //
    // TODO: come up with a better name than 'isGameActive' because it's too
    //   similar to 'activeRoom', and the concept of active and closed rooms is
    //   not implemented yet
    //
    isGameActive: (_unused_state, { isGameOver }) => !isGameOver,
    isGameOver: (_unused_state, { friendWon, iWon }) => friendWon || iWon,
    isMyTurn: (state, getters) => {
      const { currentPlayer, room } = state,
        { bothPlayersHaveJoined, isGameActive } = getters

      return (
        isGameActive &&
        bothPlayersHaveJoined &&
        room.playerNumberTurn === currentPlayer.number
      )
    },
    iWon: state => {
      const lastGuess = last(state.currentPlayer.guesses) || {}
      return !!lastGuess.isCorrect
    },
    otherPlayerHasGuessed(state) {
      return isLaden(state.otherPlayer.guesses)
    },
    otherPlayerHasJoined(_unused_state, getters) {
      return !getters.otherPlayerMustJoin
    },
    otherPlayerMustGuess(_unused_state, getters) {
      const {
        currentPlayerHasGuessed,
        currentPlayersLastGuess,
        isFriendsTurn,
      } = getters

      // prettier-ignore
      return (
        isFriendsTurn &&
        (
          !currentPlayerHasGuessed
          || !currentPlayersLastGuess.hasAnyMatchingLetters
          || (
            currentPlayersLastGuess.hasAnyMatchingLetters
            && currentPlayersLastGuess.chosenLetter
          )
        )
      )
    },
    otherPlayerMustJoin(state) {
      const { otherPlayer } = state

      return !otherPlayer.hasWord || !otherPlayer.displayName
    },
    otherPlayerMustRevealALetter(_unused_state, getters) {
      const {
        isFriendsTurn,
        currentPlayerHasGuessed,
        currentPlayersLastGuess,
      } = getters

      return (
        isFriendsTurn &&
        currentPlayerHasGuessed &&
        currentPlayersLastGuess.hasAnyMatchingLetters &&
        !currentPlayersLastGuess.chosenLetter
      )
    },
    otherPlayersLastGuess(state) {
      const { otherPlayer } = state

      return last(otherPlayer.guesses)
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
          last(currentPlayerAndRoom.currentPlayer.guesses).justAdded = true
          commit('updateCurrentPlayerAndRoom', currentPlayerAndRoom)
          return vue.nextTick()
        })
        .then(() => {
          eventManager.publish('room/afterAddGuess')
        })
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
            context: 'when initializing a player',
            error,
          })

          return Promise.reject(error)
        })
    },
    revealLetter({ commit, rootState }, argObject) {
      const { eventManager, letter: chosenLetter } = argObject,
        { playerHash, roomHash } = rootState.route.params,
        postBody = chosenLetter ? { chosenLetter } : {}

      return Promise.all([
        api.post(
          `/room/${roomHash}/player/${playerHash}/mark-chosen-letter`,
          postBody
        ),
        eventManager.publish('room/beforeRevealLetter'),
      ])
        .then(([otherPlayerData]) => {
          commit('updateOtherPlayer', otherPlayerData)
          return vue.nextTick()
        })
        .then(() => eventManager.publish('room/afterRevealLetter'))
        .catch(error => {
          logErrorToServer({
            context: 'when revealing a letter',
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
