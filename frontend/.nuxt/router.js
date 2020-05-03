import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5cb46242 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _f39c59e2 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _7509a2ba = () => interopDefault(import('..\\pages\\manage\\admin\\approve.vue' /* webpackChunkName: "pages_manage_admin_approve" */))
const _21348cc2 = () => interopDefault(import('..\\pages\\manage\\admin\\home.vue' /* webpackChunkName: "pages_manage_admin_home" */))
const _55ba9b16 = () => interopDefault(import('..\\pages\\manage\\admin\\profile.vue' /* webpackChunkName: "pages_manage_admin_profile" */))
const _77719ae3 = () => interopDefault(import('..\\pages\\manage\\auth\\home.vue' /* webpackChunkName: "pages_manage_auth_home" */))
const _00c9cd55 = () => interopDefault(import('..\\pages\\manage\\auth\\profile.vue' /* webpackChunkName: "pages_manage_auth_profile" */))
const _a988056e = () => interopDefault(import('..\\pages\\manage\\admin\\customer\\_id.vue' /* webpackChunkName: "pages_manage_admin_customer__id" */))
const _e9737770 = () => interopDefault(import('..\\pages\\manage\\auth\\customer\\_id.vue' /* webpackChunkName: "pages_manage_auth_customer__id" */))
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
    path: "/manage/admin/approve",
    component: _7509a2ba,
    name: "manage-admin-approve"
  }, {
    path: "/manage/admin/home",
    component: _21348cc2,
    name: "manage-admin-home"
  }, {
    path: "/manage/admin/profile",
    component: _55ba9b16,
    name: "manage-admin-profile"
  }, {
    path: "/manage/auth/home",
    component: _77719ae3,
    name: "manage-auth-home"
  }, {
    path: "/manage/auth/profile",
    component: _00c9cd55,
    name: "manage-auth-profile"
  }, {
    path: "/manage/admin/customer/:id?",
    component: _a988056e,
    name: "manage-admin-customer-id"
  }, {
    path: "/manage/auth/customer/:id?",
    component: _e9737770,
    name: "manage-auth-customer-id"
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
