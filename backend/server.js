import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

/* Database connection is initialized before starting the server */
connectDB();

const app = express();

/* Middleware is enabled for JSON parsing and cross-origin requests */
app.use(cors());
app.use(express.json());

/* API routes are registered here */
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

/* Server is started on the defined port */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
