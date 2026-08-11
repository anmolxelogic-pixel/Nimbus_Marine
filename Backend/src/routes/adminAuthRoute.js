import express from "express";
import { adminLogin } from "../Controller/AdminAuthentication.js";

const router = express.Router();

router.post("/login", adminLogin);

export default router;