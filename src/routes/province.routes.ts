import { Router } from "express";
const provinceRouter = Router();
import { createProvince, getAllProvinces, UpdateProvince,DeleteProvince } from "../controllers/Province.controller";

provinceRouter.post("/", createProvince);
provinceRouter.get("/", getAllProvinces);
provinceRouter.put("/:id", UpdateProvince);
provinceRouter.delete("/:id", DeleteProvince);
export default provinceRouter;