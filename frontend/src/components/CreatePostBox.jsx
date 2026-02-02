import { useState } from "react";
import axios from "../api/axios";

import { FaImage, FaSmile, FaBullhorn, FaPaperPlane } from "react-icons/fa";

/* CreatePostBox renders TaskPlanet-style Create Post UI */
export default function CreatePostBox({ onNewPost }) {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);

  /* Handles post submission */
  const handlePost = async () => {
    if (!text && !imageFile) {
      return alert("Post cannot be empty!");
    }

    const token = localStorage.getItem("token");

    /* FormData supports text + image upload */
    const formData = new FormData();
    formData.append("text", text);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await axios.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      /* Instantly add post in UI */
      onNewPost(res.data);

      /* Reset inputs */
      setText("");
      setImageFile(null);
    } catch (error) {
      console.error(
        "Post upload failed:",
        error.response?.data || error.message,
      );

      alert("Post upload failed. Please try again.");
    }
  };

  return (
    <div className="tpCreateCard">
      {/* Header */}
      <div className="tpCreateHeader">
        <h3>Create Post</h3>
      </div>

      {/* Input Row */}
      <div className="tpInputRow">
        <div className="tpDrop"></div>

        <input
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Selected Image Preview Text */}
      {imageFile && (
        <p style={{ fontSize: "12px", color: "gray", marginTop: "6px" }}>
          Selected: {imageFile.name}
        </p>
      )}

      {/* Divider */}
      <div className="tpDivider"></div>

      {/* Action Icons */}
      <div className="tpActionRow">
        {/* Upload Button */}
        <label className="tpIconBtn">
          <FaImage />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </label>

        {/* Emoji Button (UI Only) */}
        <button className="tpIconBtn" type="button">
          <FaSmile />
        </button>

        {/* Promote Button (UI Only) */}
        <div className="tpPromote">
          <FaBullhorn /> Promote
        </div>

        {/* Post Submit Button */}
        <button
          className="tpPostBtn"
          disabled={!text && !imageFile}
          onClick={handlePost}
        >
          <FaPaperPlane /> Post
        </button>
      </div>
    </div>
  );
}
