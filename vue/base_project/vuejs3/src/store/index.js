
import axios from "../axios";
import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      count: 1,
    };
  },
  // state: {
  //   dialog: {},
  //   loading: false,
  //   token: localStorage.getItem("token") || "",
  //   userId: localStorage.getItem("user") || "",
  //   title: "จัดการผู้ดูแลระบบ",
  //   isBack: false,
  //   isBackToRoute: false, //route name string
  //   fullName: localStorage.getItem("fullName"),
  // },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, { token }) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    dialog(state, { message, type }) {
      state.dialog = { message, type, state: true };
    },
  },
  actions: {
    api(options) {
      console.log(options);
      // axios({
      //   ...{
      //     method: "GET",
      //     timeout: 0,
      //     processData: false,
      //   },
      //   ...options,
      // })
      //   .then((resp) => {
      //     resolve(resp);
      //   })
      //   .catch((err) => {
      //     if (err.response) {
      //       this.getErrorSystemMessage(err.response);
      //       Promise.reject(new Error("กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต"));
      //     } else {
      //       this.getErrorSystemMessage("กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต");
      //       Promise.reject(new Error("กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต"));
      //     }
      //   });
    },
    login({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        axios({
          url: "admin/login",
          method: "POST",
          data: loginData,
          timeout: 0,
          processData: false,
          contentType: false,
        })
          .then((resp) => {
            const token = resp.data.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem(
              "fullName",
              `${resp.data.data.firstname} ${resp.data.data.lastname}`
            );
            this.state.fullName = `${resp.data.data.firstname} ${resp.data.data.lastname}`;
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            commit("auth_success", { token });
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");

            if (err.response.data.errors) {
              reject(err.response.data.errors);
            } else if (err.message === "Network Error") {
              Promise.reject(new Error("กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต"));
            } else {
              Promise.reject(new Error(err.message));
            }
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        axios({
          method: "POST",
          url: "admin/logout",
        });

        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
        localStorage.removeItem("root");
        localStorage.removeItem("fullName");

        delete axios.defaults.headers.common["Authorization"];

        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    // authStatus: (state) => state.status,
    // userId: (state) => state.userId,
    // title: (state) => state.title,
    // isBack: (state) => state.isBack,
    // isBackToRoute: (state) => state.isBackToRoute,
    // isRootAdmin: (state) => state.isRootAdmin,
    // isAdmin: (state) => state.isAdmin,
    // isRootAdminMenu: (state) => state.isRootAdminMenu,
    fullName: () => localStorage.getItem("fullName"),
  },
  modules: {},
});

// export default new Vuex.Store({
//   state: {
//     dialog: {},
//     loading: false,
//     token: localStorage.getItem("token") || "",
//     userId: localStorage.getItem("user") || "",
//     title: "จัดการผู้ดูแลระบบ",
//     isBack: false,
//     isBackToRoute: false, //route name string
//     fullName: localStorage.getItem("fullName"),
//   },
//   mutations: {
//     auth_request(state) {
//       state.status = "loading";
//     },
//     auth_success(state, { token }) {
//       state.status = "success";
//       state.token = token;
//     },
//     auth_error(state) {
//       state.status = "error";
//     },
//     logout(state) {
//       state.status = "";
//       state.token = "";
//     },
//     dialog(state, { message, type }) {
//       state.dialog = { message, type, state: true };
//     },
//   },
//   actions: {
//     login({ commit }, loginData) {
//       return new Promise((resolve, reject) => {
//         axios({
//           url: "admin/login",
//           method: "POST",
//           data: loginData,
//           timeout: 0,
//           processData: false,
//           contentType: false,
//         })
//           .then((resp) => {
//             const token = resp.data.data.token;
//             localStorage.setItem("token", token);
//             localStorage.setItem(
//               "fullName",
//               `${resp.data.data.firstname} ${resp.data.data.lastname}`
//             );
//             this.state.fullName = `${resp.data.data.firstname} ${resp.data.data.lastname}`;
//             axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//             commit("auth_success", { token });
//             resolve(resp);
//           })
//           .catch((err) => {
//             commit("auth_error");
//             localStorage.removeItem("token");

//             if (err.response.data.errors) {
//               reject(err.response.data.errors);
//             } else if (err.message === "Network Error") {
//               Promise.reject(new Error("กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เนต"));
//             } else {
//               Promise.reject(new Error(err.message));
//             }
//           });
//       });
//     },

//     logout({ commit }) {
//       return new Promise((resolve) => {
//         axios({
//           method: "POST",
//           url: "admin/logout",
//         });

//         commit("logout");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         localStorage.removeItem("admin");
//         localStorage.removeItem("root");
//         localStorage.removeItem("fullName");

//         delete axios.defaults.headers.common["Authorization"];

//         resolve();
//       });
//     },
//   },
//   getters: {
//     isLoggedIn: (state) => !!state.token,
//     // authStatus: (state) => state.status,
//     // userId: (state) => state.userId,
//     // title: (state) => state.title,
//     // isBack: (state) => state.isBack,
//     // isBackToRoute: (state) => state.isBackToRoute,
//     // isRootAdmin: (state) => state.isRootAdmin,
//     // isAdmin: (state) => state.isAdmin,
//     // isRootAdminMenu: (state) => state.isRootAdminMenu,
//     fullName: () => localStorage.getItem("fullName"),
//   },
//   modules: {},
// });
