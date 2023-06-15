import axios from "axios";
// axios.defaults.baseURL = "https://dev.standard.wewillapp.support/api/v1/";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

axios.defaults.headers.common = {
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  Authorization: `Bearer ${localStorage.getItem("token")}` || "",
};

export default axios;
