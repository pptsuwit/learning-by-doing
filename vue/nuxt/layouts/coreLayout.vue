<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary ">
        <b-navbar-brand to="/">Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/users">Users</b-nav-item>
            <b-nav-item href="/post">Post</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{ currentUserName }}</em>
              </template>
              <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <nuxt></nuxt>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUserName: 'User Name',
      // showCollapse: false,
    }
  },
  methods: {
    logout() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
