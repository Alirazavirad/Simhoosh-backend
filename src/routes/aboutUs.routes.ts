import express from "express";
import AboutUscontroller from "../controllers/AboutUs.controller";
import { uploadAboutUsFiles } from "../middlewares/AboutUs.middleware"
const router = express.Router();

router.get("/", AboutUscontroller.getAllAboutUs);
router.put("/", uploadAboutUsFiles, AboutUscontroller.createOrUpdateAboutUs);

export default router;
