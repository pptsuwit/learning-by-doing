import cookie from "js-cookie";
const token = "_token_name";

export const Token = {
  getTokenName,
  getToken,
  isAuth,
  mockToken,
};

function isAuth() {
  const auth = cookie.get(token) !== undefined;
  console.log(auth);
  return auth;
}

function getToken() {
  const _token = cookie.get(token);
  return _token;
}

function getTokenName() {
  return token;
}

function mockToken() {
  return "this is mock token";
}
