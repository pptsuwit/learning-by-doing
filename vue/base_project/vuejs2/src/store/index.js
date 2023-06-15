// Vue
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
import pathify from '@/plugins/vuex-pathify'

// Modules
import * as modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: '',
    token: localStorage.getItem('token') || '',
    loading: false,
    dialog: {
      state: false,
    },
    drawer: null,
  },
    mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, { token }) {
      state.status = 'success'
      state.token = token
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    },
    dialog (state, { message, type }) {
      state.dialog = { message, type, state: true }
    },
  },
  actions: {
    login ({ commit }, loginData) {
      return new Promise((resolve, reject) => {
    axios({
          url: 'admin/login',
          method: 'POST',
          data: loginData,
          timeout: 0,
          processData: false,
          contentType: false,
        })
          .then((resp) => {
            console.log(resp)
            const token = resp.data.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('user', resp.data.data)
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            commit('auth_success', { token })
            resolve(resp)
          })
          .catch((err) => {
            commit('auth_error')
            localStorage.removeItem('token')

            if (err.response.data.errors) {
              reject(err.response.data.errors)
            } else if (err.message === 'Network Error') {
              Promise.reject(new Error('กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต'))
            } else {
              Promise.reject(new Error(err.message))
            }
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        axios({
          method: 'POST',
          url: 'admin/logout',
        })

        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('admin')
        localStorage.removeItem('root')
        delete axios.defaults.headers.common.Authorization
        resolve()
      })
    },
  },
  getters: {
    title: (state) => state.title,
    isLoggedIn: (state) => !!state.token,
    drawer: (state) => state.drawer,
  },
  modules,
  plugins: [
    pathify.plugin,
  ],
})

store.subscribe(mutation => {
  if (!mutation.type.startsWith('user/')) return

  store.dispatch('user/update', mutation)
})

store.dispatch('app/init')

export default store

export const ROOT_DISPATCH = Object.freeze({ root: true })
