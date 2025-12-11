import express from "express";
const router = express.Router();

import AutomationController from "../controllers/Automation.controller";

router.post("/", AutomationController.createAutomation);
router.get("/", AutomationController.getAllAutomation);
router.get("/:id", AutomationController.getOneAutomation);
router.put("/:id", AutomationController.updateAutomation);
router.delete("/:id", AutomationController.removeAutomation);

export default router;
