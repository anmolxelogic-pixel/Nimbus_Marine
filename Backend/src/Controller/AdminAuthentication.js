import db from "../db/sqldb.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const [rows] = await db.execute(
            "SELECT * FROM ADMINLOGIN WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Admin account not found"
            });
        }

        const admin = rows[0];

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken(admin.id, "admin");

        res.status(200).json({
            message: "Admin login successful",
            token,
            user: {
                id: admin.id,
                email: admin.email,
                role: "admin"
            }
        });
    } catch (error) {
        console.error("Admin login error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export { adminLogin };