import cookie from "js-cookie";
const token = "_token_name";

export const Token = {
  getTokenName,
  getToken,
  isAuth,
};

function isAuth() {
  const auth = cookie.get(token) !== undefined;
  return auth;
}

function getToken() {
  const _token = cookie.get(token);
  return _token;
}

function getTokenName() {
  return token;
}
