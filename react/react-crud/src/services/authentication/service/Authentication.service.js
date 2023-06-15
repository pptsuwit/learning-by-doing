import { BehaviorSubject } from "rxjs";
// import config from 'config';
// import { handleResponse } from '../_helpers/index';
import axios from "../../utility/Axios";
import { history } from "../_helpers";
import cookie from "js-cookie";
import { Token } from "../../utility/Token";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  doLogout,
  mockLogin,
};

function login(username, password, remember) {
  const params = {
    username,
    password,
  };

  const api_url = "/master/useraccount/login";

  var promise = new Promise(function (resolve, reject) {
    axios
      .post(api_url, params)
      .then((res) => {
        cookie.set(Token.getTokenName(), res.data.token);
        const currentUser = res.data.user;
        const menu = res.data.menu;
        console.log(currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("menu", JSON.stringify(menu));
        currentUserSubject.next(currentUser);
        resolve(currentUser);
      })
      .catch((res) => {
        reject(res);
      });
  });
  return promise;
}

function logout() {
  // swal({
  //   title: "Logout",
  //   text: "คุณต้องการออกจากระบบหรือไม่",
  //   icon: "warning",
  //   buttons: true,
  //   dangerMode: true,
  // }).then((logout) => {
  //   if (logout) {
  //     // remove user from local storage to log user out
  this.doLogout();
  //   }
  // });
}

function doLogout() {
  localStorage.removeItem("currentUser");
  localStorage.clear();
  cookie.remove(Token.getTokenName);
  history.push("/");
}

function mockLogin() {
  const mock_user = {
    username: "test",
    password: "test",
    role: "admin",
    is_admin: true,
    fullname: "admin",
  };
  cookie.set(Token.getTokenName(), Token.mockToken());
  localStorage.setItem("currentUser", JSON.stringify(mock_user));
}
