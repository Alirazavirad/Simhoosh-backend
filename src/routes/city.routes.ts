import { Router } from "express";
import { createCity, getAllCities, UpdateCity,DeleteCity } from "../controllers/City.controller";
const router = Router();

router.post("/", createCity);
router.get("/", getAllCities);
router.put("/:id", UpdateCity);
router.delete("/:id", DeleteCity);

export default router;