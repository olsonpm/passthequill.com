//
// TODO: handle errors
// TODO: find a less copy/paste solution to error logging.  Either an option in
//   the api object or a separate api object which automatically logs errors
//   would be appropriate
// TODO: find a sensible name for functions which share the logic between
//   between 'current' and 'other' player, or find a way to restructure the data
//   to prevent this duplicate code.
// TODO: rename/shorten currentPlayer -> i && otherPlayer -> friend
//

//---------//
// Imports //
//---------//

import vue from 'vue'

import api from 'universal/api'
import enterDisplayName from 'project-root/component/view/room/enter-display-name'
import enterSecretWord from 'project-root/component/view/room/enter-secret-word'
import firstTime from 'project-root/component/view/room/first-time/index'
import game from 'project-root/component/view/room/game/index'
import getInitialGuide from 'universal/get-initial-guide'
import introduceGuide from 'project-root/component/view/room/introduce-guide'
import initPlayer from 'project-root/component/view/room/init-player/index'
import isDeepEqual from 'lodash/isEqual'
import { getValueAt, isLaden, last, none } from 'fes'
import {
  assignAllLeaves,
  findFirstValueWithTruthyKey,
  logErrorToServer,
  setShowNotFoundOrErrorView,
} from 'universal/utils'

//
//------//
// Init //
//------//

const hasTruthyValue = getValueAt,
  initialGuide = getInitialGuide(),
  noData = {}

//
//------//
// Main //
//------//

const room = {
  state: getInitialState,
  getters: {
    bothPlayersHaveJoined(state) {
      const { currentPlayer, otherPlayer } = state

      return currentPlayer.hasEnteredGame && otherPlayer.hasEnteredGame
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
      commit('addAppClass', subViewName, { root: true })
      commit('setSubViewName', subViewName)
    },
    disableGuide({ commit, rootState }) {
      const { playerHash, roomHash } = rootState.route.params

      //
      // we don't want the user to have to wait for the result of this request
      //   before taking her to the 'init-player' subView so we commit the state
      //   right away.  I think this is termed 'optimistic ux'.
      //
      commit('disableGuide')
      return api
        .post(`/room/${roomHash}/player/${playerHash}/disable-guide`, noData)
        .catch(error => {
          logErrorToServer({
            context: 'when disabling the guide',
            error,
          })

          return Promise.reject(error)
        })
    },
    enterGame({ commit, rootState }) {
      const { playerHash, roomHash } = rootState.route.params

      commit('enterGame')

      return api
        .post(`/room/${roomHash}/player/${playerHash}/enter-game`, noData)
        .catch(error => {
          logErrorToServer({
            context: 'when entering the game',
            error,
          })

          return Promise.reject(error)
        })
    },
    getRoom({ commit, dispatch }, { route }) {
      const { playerHash, roomHash } = route.params

      return api
        .get(`/room/${roomHash}?player-hash=${playerHash}`)
        .then(responseData => {
          const subViewName = getSubView(responseData).name

          dispatch('changeSubViewName', { subViewName })
          commit('setRoomData', responseData)
        })
        .catch(setShowNotFoundOrErrorView(commit))
    },
    initPlayer({ commit, rootState }, { displayName, secretWord }) {
      const newPlayerData = { displayName, secretWord },
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
    markAsUnderstood({ commit, rootState }, { understands }) {
      const { playerHash, roomHash } = rootState.route.params

      commit('setUnderstands', understands)
      return api
        .post(`/room/${roomHash}/player/${playerHash}/understands`, {
          understands,
        })
        .catch(error => {
          logErrorToServer({
            context: 'when marking a concept as understood',
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
          `/room/${roomHash}/player/${playerHash}/reveal-letter`,
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
    setDisplayName({ commit, rootState }, { displayName }) {
      const { playerHash, roomHash } = rootState.route.params

      return api
        .post(`/room/${roomHash}/player/${playerHash}/display-name`, {
          displayName,
        })
        .then(currentPlayer => {
          commit('updateCurrentPlayer', currentPlayer)
        })
        .catch(error => {
          logErrorToServer({
            context: "when setting a player's displayName",
            error,
          })

          return Promise.reject(error)
        })
    },
    setSecretWord({ commit, rootState }, { secretWord }) {
      const { playerHash, roomHash } = rootState.route.params

      return api
        .post(`/room/${roomHash}/player/${playerHash}/secret-word`, {
          secretWord,
        })
        .then(currentAndOtherPlayer => {
          commit('updatePlayers', currentAndOtherPlayer)
        })
        .catch(error => {
          logErrorToServer({
            context: "when setting a player's secretWord",
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
    disableGuide(state) {
      state.guide.isActive = false
    },
    enterGame(state) {
      state.currentPlayer.hasEnteredGame = true
    },
    setStatusIsPulsating(state, trueOrFalse) {
      state.statusIsPulsating = trueOrFalse
    },
    setSubViewName(state, name) {
      state.subViewName = name
    },
    setUnderstands(state, understandsKey) {
      state.guide.understands[understandsKey] = true
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
    guide: getInitialGuide(),
    currentPlayer: {
      number: null,
      displayName: null,
      guesses: [],
      secretWord: null,
    },
    otherPlayer: {
      displayName: null,
      guesses: [],
      hasWord: null,
      hasEnteredGame: null,
    },
    room: {
      playerNumberTurn: null,
    },
    statusIsPulsating: false,
    subViewName: null,
  }
}

function getSubView(getRoomResponseData) {
  const { currentPlayer, guide } = getRoomResponseData,
    { displayName, secretWord } = currentPlayer

  if (guide.isActive) {
    const isInitialGuide = isDeepEqual(guide, initialGuide),
      { understands } = guide

    return findFirstValueWithTruthyKey([
      [isInitialGuide && !displayName, introduceGuide],
      [understands.gameRoomBasics && !displayName, initPlayer],
      [!displayName, enterDisplayName],
      [!secretWord, enterSecretWord],
      [!understands.gameRoomBasics, firstTime],
      [true, game],
    ])
  } else {
    return displayName && secretWord ? game : initPlayer
  }
}

//
//---------//
// Exports //
//---------//

export default room
