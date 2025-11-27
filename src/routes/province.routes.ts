import { Router } from "express";
import { getProvince, getCity } from "../controllers/Province.controller";
const provinceRouter = Router();
provinceRouter.get("/getProvince", getProvince);
provinceRouter.post("/getCity", getCity);
export default provinceRouter;