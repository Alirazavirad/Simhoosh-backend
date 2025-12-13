import express from "express";
import { createConfig, getConfig, updateConfig, deleteConfig, deleteValue } from "../controllers/Configs.controller";

const router = express.Router();

router.post("/", createConfig); 
router.get("/", getConfig);
router.put("/:id", updateConfig);
router.delete("/:id", deleteConfig);
router.delete("/value/:id",deleteValue)

export default router;