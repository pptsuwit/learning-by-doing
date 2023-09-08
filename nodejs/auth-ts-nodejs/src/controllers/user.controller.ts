import express, { Request, Response, NextFunction } from "express";
import { authorize } from "../middlewares/authorize";
import service from "../services/user.service";

import logger from "../utils/logger";
const router = express.Router();

router.get("/user", authorize, getAll);
router.get("/user/:id", authorize, getById);

router.post("/user", authorize, create);
router.put("/user", authorize, update);
router.delete("/user/:id", authorize, deleteById);

export default router;

async function create(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, username, password } = req.body;
  try {
    const user = await service.createUser({ firstName, lastName, username, password });
    res.json(user);
  } catch (error) {
    logger.error("Error occurred:", error);
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  const { id, firstName, lastName, username } = req.body;
  try {
    const user = await service.updateUserById({ id, firstName, lastName, username });

    res.json(user);
  } catch (error) {
    logger.error("Error occurred:", error);
    next(error);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (error) {
    logger.error("Error occurred:", error);
    next(error);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  // if (req.params.id !== req.user?.id) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  try {
    const user = await service.getById(req.params.id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (error) {
    logger.error("Error occurred:", error);
    next(error);
  }
}

async function deleteById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.deleteById(req.params.id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (error) {
    logger.error("Error occurred:", error);
    next(error);
  }
}
