import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5cb46242 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _f39c59e2 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _41f7afba = () => interopDefault(import('..\\pages\\manage\\admin.vue' /* webpackChunkName: "pages_manage_admin" */))
const _332aa304 = () => interopDefault(import('..\\pages\\manage\\auth.vue' /* webpackChunkName: "pages_manage_auth" */))
const _d9e681aa = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _5cb46242,
    name: "login"
  }, {
    path: "/signup",
    component: _f39c59e2,
    name: "signup"
  }, {
    path: "/manage/admin",
    component: _41f7afba,
    name: "manage-admin"
  }, {
    path: "/manage/auth",
    component: _332aa304,
    name: "manage-auth"
  }, {
    path: "/",
    component: _d9e681aa,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
