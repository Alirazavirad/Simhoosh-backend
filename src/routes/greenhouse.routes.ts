import express from "express";
import { GreenHouseController } from "../controllers/GreenHouse.controller";
import { uploadGreenHouseFiles } from "../middlewares/greenhouse.middlware";

const router = express.Router();

router.post("/", uploadGreenHouseFiles,GreenHouseController.create);
router.get("/", GreenHouseController.getAll);
router.get("/:id", GreenHouseController.getOne);
router.patch("/:id", GreenHouseController.update);
router.delete("/:id", GreenHouseController.remove);
router.post("/login",GreenHouseController.Login);

export default router;