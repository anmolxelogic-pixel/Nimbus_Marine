import express from "express";
import {
    allUser,
    deleteUser,
    updateUserStatus,
    getAdminServices,
    addService,
    updateService,
    deleteService
} from "../Controller/adminController.js";

const router = express.Router();

router.get("/data", allUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id/status", updateUserStatus);

router.get("/services", getAdminServices);
router.post("/services", addService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

export default router;