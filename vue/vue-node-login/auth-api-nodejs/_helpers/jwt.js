const expressJwt = require("express-jwt");

module.exports = jwt;

function jwt() {
  const secret = process.env.SECRET_JWT_TOKEN;

  return expressJwt({ secret: secret, algorithms: ["HS256"] }).unless({
    path: [
      // public routes that don't require authentication
      "/api/login",
      "/api/register",
    ],
  });
}
