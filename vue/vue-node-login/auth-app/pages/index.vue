<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Nuxt Auth</h1>
      <nuxt-link to="/login">Go to Login</nuxt-link>
    </div>
  </section>
</template>
<script>
export default {
  middleware: 'auth',
}
</script>
