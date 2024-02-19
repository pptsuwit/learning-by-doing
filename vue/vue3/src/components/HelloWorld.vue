<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const props = defineProps(["msg"]);
const store = useCounterStore();

const { count, doubleCount } = storeToRefs(store);
// the increment action can just be destructured
const { increment } = store;
</script>

<template>
  <div class="greetings">
    <button
      @click="increment"
      style="
        background-color: blue;
        padding: 1rem;
        border-radius: 10px;
        /* color: white; */
      "
    >
      Increment
    </button>
    <h1 class="green">{{ count }}</h1>
    <h1 class="green">{{ doubleCount }}</h1>

    <h1 class="green">{{ props.msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
</template>

<style scoped></style>
