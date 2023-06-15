import { createApp, h } from "vue";
import App from "@/App.vue";
import router from "@/router";
// import axios from "@/plugins/axios";
import "bootstrap/dist/css/bootstrap.css";
import { store } from "@/store";

const app = createApp({
  render: () => h(App),
});

app.use(router);
app.use(store);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
