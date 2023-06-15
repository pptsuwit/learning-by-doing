<template>
  <div class="abort">
    <h1 />
  </div>
</template>

<script>
  export default {
    // beforeCreate() {
    //   if (
    //     this.$store.getters.isAdmin == null &&
    //     this.$store.getters.isRootAdmin == null
    //   ) {
    //     this.$store.dispatch("logout").then(() => {
    //       this.$router.push("/login");
    //     });
    //   }
    // },
    mounted () {
      this.$store.state.title = ''
      this.$store.state.isBack = false
    },
  }
</script>

<style></style>
