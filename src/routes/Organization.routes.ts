import express from "express";
import { OrganizationController } from "../controllers/Organization.controller";
import { uploadOrganizationFiles } from "../middlewares/Organization.middleware";
const router = express.Router();

router.post("/", uploadOrganizationFiles, OrganizationController.create);
router.get("/", OrganizationController.getAll);
router.get("/:id", OrganizationController.getOne);
router.put("/:id", uploadOrganizationFiles, OrganizationController.update);
router.delete("/:id", OrganizationController.remove);

export default router;
