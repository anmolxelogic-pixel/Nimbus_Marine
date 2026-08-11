import db from "../db/sqldb.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
    try {
        const {fullname,email,password,address,phoneNumber} = req.body;

        if (!fullname ||!email ||!password ||!address ||!phoneNumber) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const [rows] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            `INSERT INTO users
            (fullname, email, password, address, phoneNumber)
            VALUES (?, ?, ?, ?, ?)`,
            [
                fullname,
                email,
                hashedPassword,
                address,
                phoneNumber,
            ]
        );

        const token = generateToken(result.insertId, "user");

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: result.insertId,
                fullname,
                email,
                address,
                phoneNumber,
                isActive: true,
            },
        });
    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const [rows] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const user = rows[0];

        if (!user.isActive) {
            return res.status(403).json({
                message: "Your account has been deactivated by admin",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = generateToken(user.id, "user");

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
                isActive: user.isActive,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [users] = await db.execute(
            `SELECT
                id,
                fullname,
                email,
                address,
                phoneNumber,
                isActive,
                created_at
            FROM users
            WHERE id = ?`,
            [id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(users[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export {
    registerUser,
    loginUser,
    getSingleUser,
};