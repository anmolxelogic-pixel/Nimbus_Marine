import express from "express";
import { registerUser, loginUser, getSingleUser,} from "../Controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/data/:id", getSingleUser);

export default router;