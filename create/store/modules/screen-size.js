//
// README
//   - This module is a little goofy because the whole point of ssr is to get
//     a rendering from the server that matches what the client would get.  This
//     produces an issue when the rendering should be different between mobile
//     and desktop resolutions because the server doesn't have access to that
//     data (without sending it to the server explicitly).
//
//     In the future I could set a cookie that sends the result of
//     `window.matchMedia` to the server upon every request, but for now I'm
//     just going to render everything on the server and trigger the state
//     change when the app is 'mounted'
//

const screenSize = {
  state: () => ({
    isPhoneOrLarger: true,
    isPhoneOrSmaller: true,
    isSmallPhone: true,
    isTabletOrLarger: true,
  }),
  mutations: {
    setIsPhoneOrSmaller(state, value) {
      state.isPhoneOrSmaller = value
      state.isTabletOrLarger = !value
    },
    setIsSmallPhone(state, value) {
      state.isSmallPhone = value
      state.isPhoneOrLarger = !value
    },
  },
}

//
//---------//
// Exports //
//---------//

export default screenSize
