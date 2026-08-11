import db from "../db/sqldb.js";

const allUser = async (req, res) => {
    try {
        const [users] = await db.execute(`
            SELECT
                id,
                fullname,
                email,
                address,
                phoneNumber,
                isActive,
                created_at
            FROM users
            ORDER BY id DESC
        `);

        res.status(200).json(users);
    } catch (error) {
        console.error("Get users error:", error);

        res.status(500).json({
            message: "Failed to fetch users",
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            "DELETE FROM users WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Delete user error:", error);

        res.status(500).json({
            message: "Failed to delete user",
        });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const [result] = await db.execute(
            "UPDATE users SET isActive = ? WHERE id = ?",
            [isActive ? 1 : 0, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: `User ${isActive ? "activated" : "deactivated"} successfully`,
            isActive
        });
    } catch (error) {
        console.error("Update user status error:", error);

        res.status(500).json({
            message: "Failed to update user status"
        });
    }
};

const getAdminServices = async (req, res) => {

    try {

        const [services] = await db.execute(`
            SELECT
                id,
                title,
                description,
                icon,
                created_at
            FROM services
            ORDER BY id DESC
        `);


        res.status(200).json(services);

    } catch (error) {

        console.error("Get services error:", error);


        res.status(500).json({
            message: "Failed to fetch services",
            error: error.message
        });

    }

};

const addService = async (req, res) => {

    try {

        const { title, description, icon } = req.body;

        console.log("Received service:", req.body);

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const [result] = await db.execute(`INSERT INTO services(title,description,icon)VALUES (?, ?, ?)`, [title, description, icon || null]);

        res.status(201).json({
            message: "Service added successfully",
            service: {
                id: result.insertId,
                title,
                description,
                icon: icon || null
            }
        });

    } catch (error) {
        console.error("Add service error:", error);
        res.status(500).json({
            message: "Failed to add service",
            error: error.message
        });
    }
};
const updateService = async (req, res) => {

    try {
        const { id } = req.params;

        const { title, description, icon } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }


        const [result] = await db.execute(
            `
            UPDATE services
            SET
                title = ?,
                description = ?,
                icon = ?
            WHERE id = ?
            `,
            [
                title,
                description,
                icon || null,
                id
            ]
        );


        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Service not found"
            });

        }

        res.status(200).json({
            message: "Service updated successfully"
        });

    } catch (error) {

        console.error("Update service error:", error);


        res.status(500).json({
            message: "Failed to update service",
            error: error.message
        });

    }

};

const deleteService = async (req, res) => {

    try {
        const { id } = req.params;
        const [result] = await db.execute(`DELETE FROM services WHERE id = ?`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Service not found"
            });
        }
        res.status(200).json({
            message: "Service deleted successfully"
        });

    } catch (error) {

        console.error("Delete service error:", error);
        res.status(500).json({
            message: "Failed to delete service",
            error: error.message
        });

    }

};

export { allUser, deleteUser,updateUserStatus,  getAdminServices, addService, updateService, deleteService };