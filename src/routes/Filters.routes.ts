import express from "express";
import { createFilters, getFilters, updateFilters, deleteFilters } from "../controllers/Filters.controller";

const router = express.Router();

router.post("/", createFilters); 
router.get("/", getFilters);
router.put("/:id", updateFilters);
router.delete("/:id", deleteFilters);   

export default router;