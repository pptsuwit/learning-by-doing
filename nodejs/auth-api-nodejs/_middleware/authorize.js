var { expressjwt: jwt } = require("express-jwt");
// const { secret } = require("../config.json");
const db = require("../db/conn.js");
module.exports = authorize;

function authorize() {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: process.env.SECRET_JWT_TOKEN, algorithms: ["HS256"] }),

    // authorize based on user role
    async (req, res, next) => {
      const user = await db.User.findById(req.auth.id);
      if (!user) {
        // user no longer exists or role not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

      // authentication and authorization successful
      // req.user.role = user.role;
      const refreshTokens = await db.RefreshToken.find({ user: user._id });
      req.auth.ownsToken = (token) => !!refreshTokens.find((x) => x.token === token);
      next();
    },
  ];
}
