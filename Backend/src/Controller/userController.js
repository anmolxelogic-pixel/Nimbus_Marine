import db from "../db/sqldb.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const ALLOWED_ROLES = ["user", "admin"];

const registerUser = async (req, res) => {

    try {
        const { fullname, email, password, address, phoneNumber, role } = req.body;

        if (!fullname || !email || !password || !address || !phoneNumber) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const selectedRole = role || "user";

        if (!ALLOWED_ROLES.includes(selectedRole)) {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        const [rows] = await db.execute(
            "SELECT * FROM users WHERE email=?",
            [email]
        );

        if (rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            `INSERT INTO users( fullname, email, password, address, phoneNumber, role)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [fullname, email, hashedPassword, address, phoneNumber, selectedRole]);

        const token = generateToken(result.insertId, selectedRole);

        return res.status(201).json({
            message: `${selectedRole === "admin" ? "Admin" : "User"} Registered Successfully`,
            token,
            user: {
                id: result.insertId,
                fullname,
                email,
                address,
                phoneNumber,
                role: selectedRole
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });

    }
};

const loginUser = async (req, res) => {

    try {

        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const selectedRole = role || "user";

        if (!ALLOWED_ROLES.includes(selectedRole)) {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        const [rows] = await db.execute(
            "SELECT * FROM users WHERE email=? AND role=?",
            [email, selectedRole]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No ${selectedRole} account found with this email`
            });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const token = generateToken(user.id, user.role);

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.execute(`
            SELECT
                id,
                fullname,
                email,
                address,
                phoneNumber,
                role,
                created_at
            FROM users
        `);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [user] = await db.execute(
            "SELECT id, fullname, email, address, phoneNumber, role, created_at FROM users WHERE id = ?",
            [id]
        );

        if (user.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export { registerUser, loginUser, getAllUsers, getSingleUser };
