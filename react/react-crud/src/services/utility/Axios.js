import axios from "axios";
import { Token } from "../utility/Token";
import { authenticationService } from "../authentication/service/Authentication.service";

const config = {
  baseURL: "",
  params: {
    // baseStorageURL: '',
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

if (process.env.NODE_ENV === "production") {
  // production
  // config.baseStorageURL = 'http://api.bulletoffice.com/api/v1/';
  // config.baseURL = 'http://api.bulletoffice.com/api/v1/';
  // config.baseStorageURL = 'http://test-api.bulletoffice.com/api/v1/';
  // config.baseURL = 'http://test-api.bulletoffice.com/api/v1/';

  config.baseStorageURL = "http://test.bulletoffice.com/api/v1/";
  config.baseURL = "http://test.bulletoffice.com/api/v1/";
  // config.baseStorageURL = 'http://localhost:8083/api/api/v1/';
  // config.baseURL = 'http://localhost:8083/api/api/v1/';
} else {
  // developent
  config.baseStorageURL = "http://localhost:44352/api/v1/storage";
  config.baseURL = "https://localhost:44352/api/v1/";
}

const instance = axios.create(config);

const token = Token.getToken();

instance.defaults.headers.common["Authorization"] = "Bearer " + token;

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response ? error.response.status === 401 : false) {
      console.log("unauthorized, logging out ...");
      authenticationService.doLogout();
    }

    return Promise.reject(error.response);
  }
);

export default instance;
