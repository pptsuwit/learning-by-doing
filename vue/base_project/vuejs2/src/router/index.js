
// Imports
import Vue from 'vue'
import Router from 'vue-router'
// import { trailingSlash } from '@/util/helpers'
// import { layout } from '@/util/routes'
import store from '../store'
import Login from '../views/auth/Login.vue'
import ChangePassword from '../views/auth/ChangePassword.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'
import Profile from '../views/auth/Profile.vue'

import User from '../views/user_management/user/Index.vue'
import UserForm from '../views/user_management/user/Form.vue'

import SystemUses from '../views/system_uses/Index.vue'

// import SettingUserManual from '../views/setting/user_manual/Index.vue'
// import SettingTermOfUse from '../views/setting/term_of_use/Index.vue'
// import SettingPolicy from '../views/setting/policy/Index.vue'
// import SettingContactUs from '../views/setting/contact_us/Index.vue'

import SettingSocial from '../views/setting/social/Index.vue'

import Admin from '../views/admin_management/admin/Index.vue'
import AdminForm from '../views/admin_management/admin/Form.vue'

import Position from '../views/admin_management/position/Index.vue'
import PositionForm from '../views/admin_management/position/Form.vue'

// import AdminLog from '../views/log/admin/Index.vue'

import Dashboard from '../views/Dashboard.vue'

Vue.use(Router)
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/forgot_password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/reset_password/*',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/change_password',
    name: 'ChangePassword',
    component: ChangePassword,
  },
  {
    path: '/',
    // name: 'Dashboard',
    component: { render: (h) => h('router-view') },
    children: [
      {
        path: '',
        name: 'Dashboard.Index',
        component: Dashboard,
      },
    ],
  },
  {
    path: '/admin/management',
    // name: 'Admin',
    component: { render: (h) => h('router-view') },
    children: [
      {
        path: '',
        name: 'Admin.Index',
        component: Admin,
      },
      {
        path: 'add',
        name: 'Admin.Add',
        component: AdminForm,
      },
      {
        path: 'edit/:id',
        name: 'Admin.Edit',
        component: AdminForm,
      },
    ],
  },
  {
    path: '/admin/position',
    // name: 'Position',
    component: { render: (h) => h('router-view') },
    children: [
      {
        path: '',
        name: 'Position.Index',
        component: Position,
      },
      {
        path: 'add',
        name: 'Position.Add',
        component: PositionForm,
      },
      {
        path: 'edit/:id',
        name: 'Position.Edit',
        component: PositionForm,
      },
    ],
  },
  // {
  //   path: '/log/admin',
  //   name: 'AdminLog',
  //   component: { render: (h) => h('router-view') },
  //   children: [
  //     {
  //       path: '',
  //       name: 'AdminLog.Index',
  //       component: AdminLog,
  //     },
  //   ],
  // },
  {
    path: '/user',
    // name: 'User',
    component: { render: (h) => h('router-view') },
    children: [
      {
        path: '',
        name: 'User.Index',
        component: User,
      },
      {
        path: 'add',
        name: 'User.Add',
        component: UserForm,
      },
      {
        path: 'edit/:id',
        name: 'User.Edit',
        component: UserForm,
      },
    ],
  },
  {
    path: '/system_uses',
    // name: 'SystemUses',
    component: { render: (h) => h('router-view') },
    children: [
      {
        path: '',
        name: 'SystemUses.Index',
        component: SystemUses,
      },
    ],
  },
  // {
  //   path: '/setting/user_manual',
  //   name: 'SettingUserManual',
  //   component: { render: (h) => h('router-view') },
  //   children: [
  //     {
  //       path: '',
  //       name: 'SettingUserManual.Index',
  //       component: SettingUserManual,
  //     },
  //   ],
  // },
  // {
  //   path: '/setting/terms_of_use',
  //   name: 'SettingTermOfUse',
  //   component: { render: (h) => h('router-view') },
  //   children: [
  //     {
  //       path: '',
  //       name: 'SettingTermOfUse.Index',
  //       component: SettingTermOfUse,
  //     },
  //   ],
  // },
  // {
  //   path: '/setting/policy',
  //   name: 'SettingPolicy',
  //   component: { render: (h) => h('router-view') },
  //   children: [
  //     {
  //       path: '',
  //       name: 'SettingPolicy.Index',
  //       component: SettingPolicy,
  //     },
  //   ],
  // },
  // {
  //   path: '/setting/contact_us',
  //   name: 'SettingContactUs',
  //   component: { render: (h) => h('router-view') },
  //   children: [
  //     {
  //       path: '',
  //       name: 'SettingContactUs.Index',
  //       component: SettingContactUs,
  //     },
  //   ],
  // },
  {
    path: '/setting/social',
    name: 'SettingSocial',
    component: { render: (h) => h('router-view') },
    children: [
      {
        path: '',
        name: 'SettingSocial.Index',
        component: SettingSocial,
      },
    ],
  },
  {
    path: '/abort',
    name: 'Abort',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Abort.vue'),
  },
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes,
  // routes: [
  //   layout('Default',),
  // ],
})

// router.beforeEach((to, from, next) => {
//   return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
// })
router.beforeEach((to, from, next) => {
  if (
    store.getters.isLoggedIn &&
    ['Login', 'ForgotPassword', 'ResetPassword'].includes(to.name)
  ) {
    next(false)
  } else {
    next()
  }
})
export default router
