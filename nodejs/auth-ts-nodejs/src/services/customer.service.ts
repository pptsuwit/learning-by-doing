const db = require("../db/connect");
import { customerModel, createCustomerModel } from "../models/customer.model";
export default {
  getAll,
  getById,
  getRefreshTokens,
  deleteById,
  updateCustomerById,
  createCustomer,
};

async function getAll() {
  const entity = await db.Customer.find();
  return entity.map((entity: customerModel) => details(entity));
}

async function getById(id: string) {
  const item = await getCustomer(id);
  return details(item);
}

async function createCustomer({ firstName, lastName, email, phone, birthdate, address }: createCustomerModel) {
  const entity = await db.Customer.create({
    customerId: "001",
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    birthdate: birthdate,
    address: address,
  });

  return {
    ...details(entity),
  };
}
async function updateCustomerById({ id, customerId, firstName, lastName, email, phone, birthdate, address }: customerModel) {
  await updateCustomer({ id, customerId, firstName, lastName, email, phone, birthdate, address });
  const entity = await getCustomer(id);
  return details(entity);
}

async function deleteById(id: string) {
  const entity = await deleteCustomer(id);
  return details(entity);
}

// db functions
async function getCustomer(id: string) {
  if (!db.isValidId(id)) throw new Error("Customer not found");
  const entity = await db.Customer.findById(id);
  if (!entity) throw new Error("Customer not found");
  return entity;
}

async function getRefreshTokens(userId: string) {
  await getCustomer(userId);

  const refreshTokens = await db.RefreshToken.find({ entity: userId });
  return refreshTokens;
}

async function updateCustomer({ id, firstName, lastName, email, phone, birthdate, address }: customerModel) {
  if (!db.isValidId(id)) throw new Error("Customer not found");
  const entity = await db.Customer.findByIdAndUpdate(id, {
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    address,
  });
  if (!entity) throw new Error("Customer not found");
  return entity;
}

async function deleteCustomer(id: string) {
  if (!db.isValidId(id)) throw new Error("Customer not found");
  const entity = await db.Customer.findByIdAndDelete(id);
  if (!entity) throw new Error("Customer not found");
  return entity;
}
export function details(item: customerModel) {
  const { id, customerId, firstName, lastName, email, phone, birthdate, address } = item;
  return { id, customerId, firstName, lastName, email, phone, birthdate, address };
}
