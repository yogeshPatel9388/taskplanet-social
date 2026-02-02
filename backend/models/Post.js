import mongoose from "mongoose";

/* Post schema stores content, likes, and comments in a single collection */
const postSchema = new mongoose.Schema(
  {
    user: {
      username: String,
      userId: mongoose.Schema.Types.ObjectId,
    },

    text: {
      type: String,
    },

    imageUrl: {
      type: String,
    },

    /* Likes are stored as an array of usernames */
    likes: [String],

    /* Comments store username and comment text */
    comments: [
      {
        username: String,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Post", postSchema);
