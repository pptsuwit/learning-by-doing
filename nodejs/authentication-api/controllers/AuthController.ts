import { Request, Response } from "express";
import { createUser, findUserByEmail, User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const { rows } = await findUserByEmail(email);

    if (rows.length > 0) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const result = await createUser(email, password);
    const user: User = result.rows[0];

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const { rows } = await findUserByEmail(email);

    if (rows.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const user: User = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
