import axios from "axios";
// axios.defaults.baseURL = "https://dev.standard.wewillapp.support/api/v1/";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
// axios.defaults.baseURL = "http://localhost:5000/";

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}` || "",
};

export default axios;
