const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../db/conn.js");

module.exports = {
  getAll,
  getById,
  getRefreshTokens,
  deleteById,
  updateUserById,
};

async function getAll() {
  const users = await db.User.find();
  return users.map((x) => basicDetails(x));
}

async function getById(id) {
  const user = await getUser(id);
  return basicDetails(user);
}

async function deleteById(id) {
  const user = await deleteUser(id);
  return basicDetails(user);
}

async function getRefreshTokens(userId) {
  // check that user exists
  await getUser(userId);

  // return refresh tokens for user
  const refreshTokens = await db.RefreshToken.find({ user: userId });
  return refreshTokens;
}

async function updateUserById({ id, firstName, lastName, username }) {
  const user = await updateUser({ id, firstName, lastName, username });
  return basicDetails(user);
}

// helper functions

async function deleteUser(id) {
  if (!db.isValidId(id)) throw "User not found";
  const user = await db.User.findByIdAndDelete(id);
  if (!user) throw "User not found";
  else {
    await db.User.findByIdAndDelete(id);
  }
  return user;
}

async function getUser(id) {
  if (!db.isValidId(id)) throw "User not found";
  const user = await db.User.findById(id);
  if (!user) throw "User not found";
  return user;
}

async function updateUser({ id, firstName, lastName, username }) {
  if (!db.isValidId(id)) throw "User not found";
  const user = await db.User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    username,
  });
  if (!user) throw "User not found";
  return user;
}

function basicDetails(user) {
  const { id, firstName, lastName, username } = user;
  return { id, firstName, lastName, username };
}
