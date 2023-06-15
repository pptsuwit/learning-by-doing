import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import axios from './axios'
import store from './store'
// import { sync } from 'vuex-router-sync'
import helperMessage from './helpers/message'

Vue.config.productionTip = false
Vue.config.ignoredElements = ['req']

// sync(store, router)

new Vue({
  router,
  vuetify,
  store,
  el: '#app',
  created () {
    if (
      !store.getters.isLoggedIn &&
      router.currentRoute.name !== 'LoginRootAdmin' &&
      router.currentRoute.name !== 'LoginAdmin' &&
      router.currentRoute.name !== 'ForgotPassword' &&
      router.currentRoute.name !== 'ResetPassword'
    ) {
      router.push('/login')
    }
  },
    methods: {
    appApi: (options) => {
      return new Promise((resolve, reject) => {
        axios(
          Object.assign(
            {
              method: 'GET',
              timeout: 0,
              processData: false,
            },
            options,
          ),
        )
          .then((resp) => {
            resolve(resp)
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.data.errors) {
                if (err.response.data.errors.message) {
                  reject(err.response.data.errors.message)
                } else {
                  reject(err.response.data)
                }
              } else if (err.response.statusText === 'Unauthorized') {
                if (localStorage.getItem('token') === this.$store.state.token) {
                  this.$store.dispatch('logout').then(() => {
                    this.$router.push('/login')
                  })
                } else {
                  location.reload()
                }
              } else {
                Promise.reject(new Error(err.response.status + ' ' + err.response.statusText))
              }
            } else if (err.message === 'Network Error') {
              this.getErrorSystemMessage('กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต')
              Promise.reject(new Error('กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต'))
            } else {
              reject(err.message)
            }
          })
      })
    },
    getSystemMessage (error) {
      const message = helperMessage.getSystemMessage(error)
      store.commit('dialog', {
        message: message,
        type: 'success',
      })
      store.state.loading = false
    },
    getErrorSystemMessage (error) {
      const message = helperMessage.getErrorMessage(error)
      store.commit('dialog', {
        message: message,
        type: 'error',
      })
      store.state.loading = false
    },
  },
  render: h => h(App),
}).$mount('#app')
