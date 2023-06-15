<template>
  <v-list-item class="mb-0 justify-space-between pl-3">
    <!-- <v-list-item-avatar>
      <v-avatar>
        <v-img
          :src="
            require('@/assets/vmd.svg')"
        />
      </v-avatar>
    </v-list-item-avatar> -->

    <v-list-item-content class="pl-2">
      <v-list-item-title class="text-h3">
        <!-- <strong class="mr-1 font-weight-black">Wewill</strong>

        <span class="primary--text">App</span> -->
        <v-img
          src="https://wewillapp.com/images/logo%20(1).png"
          alt="logo"
        />
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DefaultDrawerHeader',

    computed: { version: get('app/version') },
  }
</script>
