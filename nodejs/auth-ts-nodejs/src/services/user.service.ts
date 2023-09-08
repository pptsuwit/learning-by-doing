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
  const entity = await db.User.find();
  return entity.map((entity: userModel) => userDetails(entity));
}

async function getById(id: string) {
  const entity = await getUser(id);
  return userDetails(entity);
}

async function createUser({ firstName, lastName, username, password }: registerModel) {
  const entity = await db.User.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: bcrypt.hashSync(password, 10),
  });

  return {
    ...userDetails(entity),
  };
}
async function updateUserById({ id, firstName, lastName, username }: userModel) {
  await updateUser({ id, firstName, lastName, username });
  const entity = await getUser(id);
  return userDetails(entity);
}

async function deleteById(id: string) {
  const entity = await deleteUser(id);
  return userDetails(entity);
}

// db functions
async function getUser(id: string) {
  if (!db.isValidId(id)) throw new Error("User not found");
  const entity = await db.User.findById(id);
  if (!entity) throw new Error("User not found");
  return entity;
}

async function getRefreshTokens(id: string) {
  await getUser(id);

  const refreshTokens = await db.RefreshToken.find({ entity: id });
  return refreshTokens;
}

async function updateUser({ id, firstName, lastName, username }: userModel) {
  if (!db.isValidId(id)) throw new Error("User not found");
  const entity = await db.User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    username,
  });
  if (!entity) throw new Error("User not found");
  return entity;
}

async function deleteUser(id: string) {
  if (!db.isValidId(id)) throw new Error("User not found");
  const entity = await db.User.findByIdAndDelete(id);
  if (!entity) throw new Error("User not found");
  return entity;
}
