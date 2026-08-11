import express from "express";

import {getNavbar,updateNavbar,} from "../Controller/NavbarController.js";

import upload from "../middleware/upload.js";

const router = express.Router();


router.get("/", getNavbar);


router.put("/",upload.single("logo"),updateNavbar);


export default router;