const db = require("../db/connect");
import { userModel } from "../models/user.model";
import { registerModel } from "../models/auth.model";
import { userDetails } from "../utils/utils";
import bcrypt from "bcryptjs";
export default {
  getAll,
  getById,
  getRefreshTokens,
  deleteById,
  updateUserById,
  createUser,
};

async function getAll() {
  const users = await db.User.find();
  return users.map((users: userModel) => userDetails(users));
}

async function getById(id: string) {
  const user = await getUser(id);
  return userDetails(user);
}

async function deleteById(id: string) {
  const user = await deleteUser(id);
  return userDetails(user);
}

async function getRefreshTokens(userId: string) {
  await getUser(userId);

  const refreshTokens = await db.RefreshToken.find({ user: userId });
  return refreshTokens;
}

async function updateUserById({ id, firstName, lastName, username }: userModel) {
  const user = await updateUser({ id, firstName, lastName, username });
  return userDetails(user);
}

// helper functions

async function deleteUser(id: string) {
  if (!db.isValidId(id)) throw new Error("User not found");
  const user = await db.User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
}

async function getUser(id: string) {
  if (!db.isValidId(id)) throw new Error("User not found");
  const user = await db.User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
}

async function updateUser({ id, firstName, lastName, username }: userModel) {
  if (!db.isValidId(id)) throw new Error("User not found");
  const user = await db.User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    username,
  });
  if (!user) throw new Error("User not found");
  return user;
}

async function createUser({ firstName, lastName, username, password }: registerModel) {
  const user = await db.User.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: bcrypt.hash(password, 10),
  });

  return {
    ...userDetails(user),
  };
}
