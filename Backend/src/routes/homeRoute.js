import express from "express";

import {
  getHomeContent,
  updateHomeContent,
} from "../Controller/HomeController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getHomeContent);


router.put("/", updateHomeContent);


export default router;