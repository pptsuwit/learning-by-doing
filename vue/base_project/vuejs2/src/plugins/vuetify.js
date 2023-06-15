// Vuetify Documentation https://vuetifyjs.com

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import ripple from 'vuetify/lib/directives/ripple'

Vue.use(Vuetify, { directives: { ripple } })

const theme = {
  primary: '#E91E63',
  secondary: '#9C27b0',
  accent: '#e91e63',
  info: '#00CAE3',
  success: '#4CAF50',
  warning: '#FB8C00',
  error: '#FF5252',
}

export default new Vuetify({
  breakpoint: { mobileBreakpoint: 960 },
  icons: {
    values: { expand: 'mdi-menu-down' },
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
      // "app-primary": "#DF8536",
      'app-theme': '#23599f',

      'btn-import-theme': '#000',
      'btn-export-theme': '#000',

      'btn-cancle-theme': '#000',
      'btn-save-theme': '#000',

      'btn-add-theme': '#000',
      'btn-edit-theme': '#000',
      'btn-delete-theme': '#000',
      'btn-download-excel-theme': '#000',

      'nav-bar-theme': '#23599f',
      'side-bar-theme': '#23599f',
      'side-bar-active': '#000',
      // "side-bar-child-active": "000",
    },
  },
})
