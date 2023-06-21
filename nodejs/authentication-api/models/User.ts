import { Pool, QueryResult } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export interface User {
  id: number;
  email: string;
  password: string;
}

export async function createUser(email: string, password: string): Promise<QueryResult<User>> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
  const values = [email, hashedPassword];

  return pool.query(query, values);
}

export async function findUserByEmail(email: string): Promise<QueryResult<User>> {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  return pool.query(query, values);
}
