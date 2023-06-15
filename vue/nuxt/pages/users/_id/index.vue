<template>
  <div style="text-align: center">
    <div class="mb-5">{{ id }}</div>
    <button type="button" class="btn btn-primary" @click="id++">Add +</button>
    <button type="button" class="btn btn-danger" @click="id--">Danger</button>
  </div>
</template>

<script>
export default {
  validate(data) {
    return /^\d+$/.test(data.params.id)
  },
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  mounted() {
    console.log(this.$route.params)
  },
}
</script>

<style lang="scss" scoped></style>
