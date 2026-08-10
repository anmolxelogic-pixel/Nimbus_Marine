import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAdminServices, updateService } from "../Controller/adminController.js";

const router = express.Router();

router.get("/aa", getAdminServices);

router.put("/", protect, updateService);

export default router;