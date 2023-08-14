import express, { Request, Response, NextFunction } from "express";
import { authorize } from "../middlewares/authorize";
import service from "../services/customer.service";
const router = express.Router();

router.get("/customer", authorize, getAll);
router.get("/customer/?id=:id", authorize, getById);

router.post("/customer", authorize, create);
router.put("/customer", authorize, update);
router.delete("/customer/:id", authorize, deleteById);

export default router;

async function create(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email, phone, birthdate, address } = req.body;
  try {
    const entity = await service.createCustomer({ firstName, lastName, email, phone, birthdate, address });
    res.json(entity);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  const { id, firstName, lastName, email, phone, birthdate, address } = req.body;
  try {
    const entity = await service.updateCustomerById({ id, firstName, lastName, email, phone, birthdate, address });
    res.json(entity);
  } catch (error) {
    next(error);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const entity = await service.getById(req.params.id);
    entity ? res.json(entity) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
}

async function deleteById(req: Request, res: Response, next: NextFunction) {
  try {
    const entity = await service.deleteById(req.params.id);
    entity ? res.json(entity) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
}
