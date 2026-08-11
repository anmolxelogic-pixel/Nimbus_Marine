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

// import express from "express";
// import upload from "../middleware/upload.js";
// import db from "../db/sqldb.js"
// import fs from 'fs/promises';
// import path from 'path';

// const router = express.Router();

// router.post("/upload", upload.any(), (req, res) => {
//     console.log("FILES RECEIVED:", req.files);

//     res.json({
//         message: "Multer test",
//         files: req.files
//     });
// });

// router.get("/", async (req, res) => {
//     try {
//         const files = await fs.readdir("uploads");

//         const imageExtensions = [
//             ".jpg",
//             ".jpeg",
//             ".png",
//             ".gif",
//             ".webp",
//             ".svg"
//         ];

//         const images = files.filter((file) => {
//             return imageExtensions.includes(
//                 path.extname(file).toLowerCase()
//             );
//         });

//         const filesWithUrl = images.map((filename) => ({
//             filename: filename,
//             url: `${req.protocol}://${req.get("host")}/uploads/${filename}`
//         }));
//         res.status(200).json({
//             message: "Files fetched successfully",
//             files: filesWithUrl
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Failed to fetch files"
//         });
//     }
// });

// router.put('/update', async(req,res)=>{
// })


// export default router;

















// import express from "express";
// import upload from "../middleware/upload.js";
// import db from "../db/sqldb.js";

// const router = express.Router();
// router.post("/upload", upload.any("file"), async (req, res) => {
//     try {

//         if (!req.file) {
//             return res.status(400).json({
//                 message: "File is required"
//             });
//         }

//         const {originalname,filename} =req.file;


//         const [result] = await db.execute(
//             `INSERT INTO files
//              (original_name, file_name)
//              VALUES (?, ?)`,
//             [
//                 originalname,
//                 filename
//             ]
//         );


//         res.status(201).json({
//             message: "File uploaded successfully",

//             file: {
//                 id: result.insertId,
//                 originalName: originalname,
//                 fileName: filename
//             }
//         });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             message: "File upload failed"
//         });
//     }
// });

// router.get("/", async (req, res) => {

//     try {

//         const [files] = await db.execute(
//             `SELECT
//                 id,
//                 original_name AS originalName,
//                 file_name AS fileName,
//                 created_at AS createdAt
//              FROM files
//              ORDER BY created_at DESC`
//         );


//         res.status(200).json({
//             files
//         });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             message: "Failed to fetch files"
//         });
//     }
// });


// export default router;