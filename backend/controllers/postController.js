import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/* Post creation controller with optional Cloudinary image upload */
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let imageUrl = "";

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);

        imageUrl = result.secure_url;

        fs.unlink(req.file.path, () => {});
      } catch (err) {
        console.error("Cloudinary Upload Failed:", err.message);

        return res.status(500).json({
          message: "Image upload failed",
          error: err.message,
        });
      }
    }


    /* Validation ensures at least text or image exists */
    if (!text && !imageUrl) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    const post = await Post.create({
      user: {
        username: req.user.username,
        userId: req.user.id,
      },
      text,
      imageUrl,
      likes: [],
      comments: [],
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Feed retrieval controller */
export const getAllPosts = async (req, res) => {
  try {
    /* Posts are sorted by newest first */
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Like/unlike controller */
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    /* Validation ensures post exists */
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const username = req.user.username;

    /* Like is toggled based on user existence in array */
    if (post.likes.includes(username)) {
      post.likes = post.likes.filter((u) => u !== username);
    } else {
      post.likes.push(username);
    }

    await post.save();

    res.json({
      message: "Like updated successfully",
      totalLikes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Comment addition controller */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    /* Validation ensures comment is not empty */
    if (!text) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const post = await Post.findById(req.params.id);

    /* Validation ensures post exists */
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    /* Comment is appended with username */
    post.comments.push({
      username: req.user.username,
      text,
    });

    await post.save();

    res.json({
      message: "Comment added successfully",
      totalComments: post.comments.length,
      post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
