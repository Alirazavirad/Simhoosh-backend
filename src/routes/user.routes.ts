const express = require("express");
const router = express.Router();

import { getUsers, loginUser } from "../controllers/User.controller";

router.get("/", getUsers);
router.post("/login", loginUser);

export default router;