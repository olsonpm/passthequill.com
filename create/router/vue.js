//---------//
// Imports //
//---------//

import Vue from 'vue'
import VueRouter from 'vue-router'

import createARoom from 'project-root/component/view/create-a-room'
import emailUnsubscribe from 'project-root/component/view/email/unsubscribe'
import emailUnsubscriptions from 'project-root/component/view/email/unsubscriptions'
import home from 'project-root/component/view/home'
import listOfValidWords from 'project-root/component/view/list-of-valid-words'
import notFound from 'project-root/component/view/not-found'
import room from 'project-root/component/view/room/index'

import { map } from 'fes'

//
//------//
// Main //
//------//

Vue.use(VueRouter)

const routes = map(createRoute)([
  home,
  createARoom,
  emailUnsubscribe,
  emailUnsubscriptions,
  room,
  listOfValidWords,
  notFound,
])

const createVueRouter = () => new VueRouter({ mode: 'history', routes })

//
//------------------//
// Helper Functions //
//------------------//

function createRoute(component) {
  return {
    component,
    name: component.name,
    path: component.path,
  }
}

//
//---------//
// Exports //
//---------//

export default createVueRouter
