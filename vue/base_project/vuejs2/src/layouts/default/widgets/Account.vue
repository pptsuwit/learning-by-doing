<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      flat
      nav
    >
      <template>
        <app-bar-item
          to="/profile"
        >
          <v-list-item-title v-text="'Profile'" />
        </app-bar-item>
      </template>
      <template>
        <app-bar-item
          to="/change_password"
        >
          <v-list-item-title v-text="'Change Password'" />
        </app-bar-item>
      </template>
      <template>
        <v-divider
          class="mb-2 mt-2"
        />
        <a
          @click="logout()"
        >
          <app-bar-item>
            <v-list-item-title v-text="'Logout'" />
          </app-bar-item>
        </a>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    data: () => ({
    }),
    methods: {
      logout: function () {
        this.$store.dispatch('logout').then(() => {
          location.reload()
          // this.$router.push('/login')
        })
      },
    },
  }
</script>
