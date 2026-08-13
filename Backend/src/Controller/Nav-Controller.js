import db from "../db/sqldb.js";

const getNav = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT id, logo, menu_items, is_active, created_at, updated_at
            FROM nav
            WHERE is_active = 1
            LIMIT 1
        `);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Navbar not found"
            });
        }

        const navbar = rows[0];

        if (typeof navbar.menu_items === "string") {
            navbar.menu_items = JSON.parse(navbar.menu_items);
        }

        return res.status(200).json({
            success: true,
            data: navbar
        });
    } catch (error) {
        console.error("Get Navbar Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get navbar",
            error: error.message
        });
    }
};

const createNav = async (req, res) => {
    try {
        let { menu_items } = req.body;

        if (typeof menu_items === "string") {
            menu_items = JSON.parse(menu_items);
        }

        if (!Array.isArray(menu_items)) {
            return res.status(400).json({
                success: false,
                message: "menu_items must be an array"
            });
        }

        const logo = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        await db.execute(
            `INSERT INTO nav (logo, menu_items) VALUES (?, ?)`,
            [
                logo,
                JSON.stringify(menu_items)
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Navbar created successfully"
        });
    } catch (error) {
        console.error("Create Navbar Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create navbar",
            error: error.message
        });
    }
};

const updateNav = async (req, res) => {
    try {
        const { id } = req.params;

        let { menu_items, is_active } = req.body;

        // console.log("ID:", id);
        // console.log("BODY:", req.body);
        // console.log("FILE:", req.file);

        if (menu_items === undefined) {
            return res.status(400).json({
                success: false,
                message: "menu_items is required"
            });
        }

        if (typeof menu_items === "string") {
            try {
                menu_items = JSON.parse(menu_items);
            } catch {
                return res.status(400).json({
                    success: false,
                    message: "menu_items contains invalid JSON"
                });
            }
        }

        if (!Array.isArray(menu_items)) {
            return res.status(400).json({
                success: false,
                message: "menu_items must be an array"
            });
        }

        const [existingRows] = await db.execute(
            `SELECT logo FROM nav WHERE id = ?`,
            [id]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Navbar not found"
            });
        }

        const logo = req.file
            ? `/uploads/${req.file.filename}`
            : existingRows[0].logo;

        const active =
            is_active === true ||
            is_active === "true" ||
            is_active === 1 ||
            is_active === "1"
                ? 1
                : 0;

        const [result] = await db.execute(
            `UPDATE nav
             SET logo = ?, menu_items = ?, is_active = ?
             WHERE id = ?`,
            [
                logo,
                JSON.stringify(menu_items),
                active,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Navbar not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Navbar updated successfully"
        });
    } catch (error) {
        console.error("Update Navbar Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update navbar",
            error: error.message
        });
    }
};

const deleteNav = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            `DELETE FROM nav WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Navbar not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Navbar deleted successfully"
        });
    } catch (error) {
        console.error("Delete Navbar Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete navbar",
            error: error.message
        });
    }
};

export { getNav, createNav, updateNav, deleteNav};