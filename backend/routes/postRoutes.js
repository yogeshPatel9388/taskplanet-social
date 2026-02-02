import express from "express";

import {
  createPost,
  getAllPosts,
  toggleLike,
  addComment,
} from "../controllers/postController.js";

import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Public feed route returns all posts */
router.get("/", getAllPosts);

/* Post creation route supports optional image upload */
router.post("/", protect, upload.single("image"), createPost);

/* Like toggle route updates likes instantly */
router.put("/:id/like", protect, toggleLike);

/* Comment route allows adding comments on posts */
router.post("/:id/comment", protect, addComment);

export default router;
