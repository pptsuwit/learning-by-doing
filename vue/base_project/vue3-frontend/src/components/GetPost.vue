<template>
  <h1>Get Posts</h1>
  <h2>{{ number }}</h2>
  <button type="button" class="btn btn-primary" @click="increment">
    Increment Number
  </button>
  <button type="button" class="btn btn-danger" @click="decrement">
    Decrement Number
  </button>

  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.title }}
    </li>
  </ul>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "@/plugins/axios";

const items = ref([]);
const number = ref(1);
onMounted(async () => {
  await axios({
    url: "/posts",
    method: "GET",
  })
    .then((response) => {
      const data = response.data;
      items.value = data;
    })
    .catch((err) => {
      err;
    });
});

const decrement = () => {
  number.value--;
};
const increment = () => {
  number.value++;
};
</script>
<!-- <script>
import { onMounted, ref } from "vue";
import axios from "@/plugins/axios";
export default {
  setup() {
    const items = ref([]);
    const number = ref(1);
    onMounted(async () => {
      await axios({
        url: "/posts",
        method: "GET",
      })
        .then((response) => {
          const data = response.data;
          items.value = data;
        })
        .catch((err) => {
          err;
        });
    });

    function increment() {
      number.value++;
    }
    return {
      items,
      number,
      increment,
    };
  },
};
</script> -->

<style lang="scss" scoped></style>
