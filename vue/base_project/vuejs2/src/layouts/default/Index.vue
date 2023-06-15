<template>
  <v-app v-if="$store.getters.isLoggedIn">
    <default-bar />

    <default-drawer />

    <default-view />

    <default-footer />

    <default-settings />
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
  export default {
    name: 'DefaultLayout',

    components: {
      DefaultBar: () => import(
        /* webpackChunkName: "default-app-bar" */
        './AppBar'
      ),
      DefaultDrawer: () => import(
        /* webpackChunkName: "default-drawer" */
        './Drawer'
      ),
      DefaultFooter: () => import(
        /* webpackChunkName: "default-footer" */
        './Footer'
      ),
      DefaultSettings: () => import(
        /* webpackChunkName: "default-settings" */
        './Settings'
      ),
      DefaultView: () => import(
        /* webpackChunkName: "default-view" */
        './View'
      ),
    },
  }
</script>
