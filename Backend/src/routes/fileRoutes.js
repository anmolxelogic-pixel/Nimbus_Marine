import express from "express";
import upload from "../middleware/upload.js";
import db from "../db/sqldb.js";

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "File is required"
            });
        }

        const {
            originalname,
            filename
        } = req.file;


        const [result] = await db.execute(
            `INSERT INTO files
             (original_name, file_name)
             VALUES (?, ?)`,
            [
                originalname,
                filename
            ]
        );


        res.status(201).json({
            message: "File uploaded successfully",

            file: {
                id: result.insertId,
                originalName: originalname,
                fileName: filename
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "File upload failed"
        });
    }
});

router.get("/", async (req, res) => {

    try {

        const [files] = await db.execute(
            `SELECT
                id,
                original_name AS originalName,
                file_name AS fileName,
                created_at AS createdAt
             FROM files
             ORDER BY created_at DESC`
        );


        res.status(200).json({
            files
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch files"
        });
    }
});


export default router;