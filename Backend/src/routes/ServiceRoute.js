import express from "express";



import { protect } from "../middleware/authMiddleware.js";
import { getAdminServices, updateService } from "../Controller/adminController.js";

const router = express.Router();

// USER - get homepage content
router.get("/aa", getAdminServices);

// ADMIN - update homepage content
router.put("/", protect, updateService);

export default router;