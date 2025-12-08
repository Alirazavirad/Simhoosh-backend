const express = require("express");
const router = express.Router();

import { getUsers } from "../controllers/User.controller";

router.get("/", getUsers);

export default router;