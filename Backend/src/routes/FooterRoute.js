import express from "express";
import {
    getFooter,
    updateFooter
} from "../Controller/FooterController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getFooter);

router.put(
    "/",
    upload.single("logo"),
    updateFooter
);

export default router;