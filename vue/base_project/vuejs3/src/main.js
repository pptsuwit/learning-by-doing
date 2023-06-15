import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./axios";
import "bootstrap/dist/css/bootstrap.css";
import { store } from "./store";

const app = createApp({
  methods: {
    appApi(options) {
      axios({
        ...{
          method: "GET",
          timeout: 0,
          processData: false,
        },
        ...options,
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          if (err.response) {
            Promise.reject(new Error("กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต"));
          } else {
            // this.getErrorSystemMessage("กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต");
            Promise.reject(new Error("กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต"));
          }
        });
    },
  },
  render: () => h(App),
});
app.$appName = "Vue3";
app.use(router);
app.use(store);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
