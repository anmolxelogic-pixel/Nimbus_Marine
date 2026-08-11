import express from "express";
import upload from "../middleware/upload.js";
import db from "../db/sqldb.js";
import fs from "fs/promises";
import path from "path";

const router = express.Router();

router.post("/hero", upload.single("hero"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const [result] = await db.execute(
            `INSERT INTO files
            (original_name, file_name, file_path, mime_type, file_size, type)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                req.file.originalname,
                req.file.filename,
                req.file.path,
                req.file.mimetype,
                req.file.size,
                "hero"
            ]
        );

        res.status(201).json({
            message: "Hero image uploaded successfully",
            data: {
                id: result.insertId,
                filename: req.file.filename,
                url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
            }
        });
    } catch (error) {
        console.error("Hero upload error:", error);
        res.status(500).json({ message: "Failed to upload hero image" });
    }
});

router.get("/get", async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT file_name, file_path, type
             FROM files
             WHERE type = 'hero'
             ORDER BY id DESC
             LIMIT 1`
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hero image not found"
            });
        }

        const image = rows[0];

        res.status(200).json({
            success: true,
            data: {
                filename: image.file_name,
                url: `${req.protocol}://${req.get("host")}/uploads/${image.file_name}`
            }
        });

    } catch (error) {
        console.error("Get image error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch image"
        });
    }
});

router.put("/hero", upload.single("hero"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const [oldImage] = await db.execute(
            `SELECT * FROM files WHERE type = 'hero' LIMIT 1`
        );

        if (oldImage.length > 0) {
            await db.execute(
                `DELETE FROM files WHERE id = ?`,
                [oldImage[0].id]
            );

            try {
                await fs.unlink(
                    path.join("uploads", oldImage[0].file_name)
                );
            } catch (error) {
                console.log("Old image file not found");
            }
        }

        const [result] = await db.execute(
            `INSERT INTO files
            (original_name, file_name, file_path, mime_type, file_size, type)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                req.file.originalname,
                req.file.filename,
                req.file.path,
                req.file.mimetype,
                req.file.size,
                "hero"
            ]
        );

        res.status(200).json({
            message: "Hero image updated successfully",
            data: {
                id: result.insertId,
                filename: req.file.filename,
                url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
            }
        });
    } catch (error) {
        console.error("Hero update error:", error);
        res.status(500).json({
            message: "Failed to update hero image"
        });
    }
});


export default router;
