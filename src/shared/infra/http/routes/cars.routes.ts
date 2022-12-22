import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAutheticated";

const carsRoutes = Router();

let createCarController = new CreateCarController();
carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

export { carsRoutes };