<template>
  <div></div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      console.log(store.dispatch("api", { url: "posts" }));
      // this.$root
      //   .appApi({
      //     url: "posts",
      //   })
      //   .then((resp) => {
      //     console.log(resp);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    });
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
