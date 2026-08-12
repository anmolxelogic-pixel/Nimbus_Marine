import express from "express";
import multer from "multer";
import { getNav, updateNav } from "../Controller/Nav-Controller.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get("/", getNav);
router.put("/:id", upload.single("logo"), updateNav);

export default router;