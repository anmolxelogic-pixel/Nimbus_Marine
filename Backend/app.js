import express from "express";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js";
import adminRoute from "./src/routes/adminRoute.js";
import serviceRoutes from "./src/routes/serviceRoute.js";
import homeRoute from "./src/routes/homeRoute.js";
import fileRoute from './src/routes/fileRoutes.js'
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));




app.use("/api/user", userRoutes);


app.use("/api/admin", adminRoute);


app.use("/api/services", serviceRoutes);



app.use("/api/home", homeRoute);
app.use("/api/files", fileRoute)


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
  });
});

export default app;