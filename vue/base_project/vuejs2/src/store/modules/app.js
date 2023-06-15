// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/',
    },
    {
      title: 'ผู้ดูแลระบบ',
      icon: 'mdi-account',
      group: 'admin/management|/admin/position',
        items: [
          { title: 'ข้อมูลผู้ดูแลระบบ', to: '/admin/management' },
          { title: 'ตำแหน่งและสิทธิ์การใช้งานในระบบ', to: '/admin/position' },
        ],
    },
    {
      title: 'ผู้ใช้งานในระบบ',
      icon: 'mdi-account-group',
      to: '/user',
    },
    {
      title: 'System Uses',
      icon: 'mdi-cog-outline',
      to: '/system_uses',
    },
    {
      title: 'ข้อมูลติดต่อ Social',
      icon: 'mdi-cellphone-cog',
      to: '/setting/social',
    },
    // {
    //   title: 'Regular Tables',
    //   icon: 'mdi-clipboard-outline',
    //   to: '/tables/regular/',
    // },
    // {
    //   title: 'Typography',
    //   icon: 'mdi-format-font',
    //   to: '/components/typography/',
    // },
    // {
    //   title: 'Icons',
    //   icon: 'mdi-chart-bubble',
    //   to: '/components/icons/',
    // },
    // {
    //   title: 'Google Maps',
    //   icon: 'mdi-map-marker',
    //   to: '/maps/google/',
    // },
    // {
    //   title: 'Notifications',
    //   icon: 'mdi-bell',
    //   to: '/components/notifications/',
    // },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
