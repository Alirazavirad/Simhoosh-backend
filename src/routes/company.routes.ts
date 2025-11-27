import express from "express";
import { CompanyController } from "../controllers/Company.controller";
import { uploadCompanyFiles } from "../middlewares/company.middleware";

const router = express.Router();

router.post("/", uploadCompanyFiles, CompanyController.create);
router.get("/", CompanyController.getAll);
router.get("/:id", CompanyController.getOne);
router.put("/:id", uploadCompanyFiles, CompanyController.update);
router.delete("/:id", CompanyController.remove);
router.post("/login", CompanyController.Login);

export default router;
