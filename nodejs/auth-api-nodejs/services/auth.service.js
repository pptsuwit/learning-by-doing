const jwt = require("jsonwebtoken");
const dbo = require("../db/conn");
module.exports = {
  authenticate,
  getAll,
  omitPassword,
};

async function authenticate({ username, password }) {
  console.log(username, password);
  let db_connect = dbo.getDB();
  // const users = await db_connect.collection("users").find({}).toArray();
  const user = await db_connect.collection("users").findOne({
    username: username,
    password: password,
  });

  if (!user) throw "Username or password is incorrect";

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, process.env.SECRET_JWT_TOKEN, {
    expiresIn: "7d",
  });

  return {
    ...omitPassword(user),
    token,
  };
}

async function getAll() {
  let db_connect = dbo.getDB("test_db");
  const users = await db_connect.collection("users").find({}).toArray();
  return users.map((u) => omitPassword(u));
}

// helper functions

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
