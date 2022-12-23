import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCarss/listAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import uploadConfig from '@config/upload';
import multer from 'multer';
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAutheticated";

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listCategoryController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listCategoryController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImageController.handle);

export { carsRoutes };