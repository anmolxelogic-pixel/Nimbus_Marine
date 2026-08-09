import express from "express";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js";
import adminRoute from "./src/routes/adminRoute.js";
import serviceRoutes from "./src/routes/serviceRoute.js";
import homeRoute from "./src/routes/homeRoute.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// User
app.use("/api/user", userRoutes);


// Admin
app.use("/api/admin", adminRoute);


// Services
app.use("/api/services", serviceRoutes);


// Homepage
app.use("/api/home", homeRoute);


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
  });
});

export default app;