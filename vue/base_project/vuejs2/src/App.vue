<template>
  <v-app v-if="$store.getters.isLoggedIn">
    <default-bar />

    <default-drawer />

    <default-view />

    <default-footer />

    <default-settings />
    <dialog-system />
    <v-overlay :value="$store.state.loading">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </v-app>
  <v-app
    v-else
  >
    <v-main>
      <v-container
        fluid
        class="container--fwh"
      >
        <router-view />
      </v-container>
    </v-main>
    <dialog-system />
    <v-overlay :value="$store.state.loading">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </v-app>
</template>
<style scoped>
.container--fwh{
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  border: none;
}
</style>
<script>
  // Styles
  import '@/styles/overrides.sass'
  import '@/assets/fonts/stylesheet.css'
  import '@/assets/app.css'
  import DialogSystem from './components/DialogSystem.vue'

  export default {
    name: 'App',
    metaInfo: {
      title: 'Vue Standard',
      titleTemplate: '%s',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    components: {
      DefaultBar: () => import(
        /* webpackChunkName: "default-app-bar" */
        './layouts/default/AppBar.vue'
      ),
      DefaultDrawer: () => import(
        /* webpackChunkName: "default-drawer" */
        './layouts/default/Drawer'
      ),
      DefaultFooter: () => import(
        /* webpackChunkName: "default-footer" */
        './layouts/default/Footer'
      ),
      DefaultSettings: () => import(
        /* webpackChunkName: "default-settings" */
        './layouts/default/Settings'
      ),
      DefaultView: () => import(
        /* webpackChunkName: "default-view" */
        './layouts/default/View'
      ),
      DialogSystem,
    },
  }
</script>
