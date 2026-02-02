import { useState } from "react";
import axios from "../api/axios";
import { FaPaperPlane } from "react-icons/fa";

/* CommentBox renders the TaskPlanet-style comment input section */
export default function CommentBox({ postId, refreshFeed }) {
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  /* Comment submission sends request to backend */
  const handleComment = async () => {
    try {
      await axios.post(
        `/posts/${postId}/comment`,
        { text: comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      /* Input is cleared after successful comment */
      setComment("");
      refreshFeed();
    } catch (error) {
      console.error("Comment failed:", error.message);
    }
  };

  return (
    <div className="tpCommentBox">
      {/* Rounded Comment Input */}
      <input
        className="tpCommentInput"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Send Button */}
      <button className="tpSendBtn" disabled={!comment} onClick={handleComment}>
        <FaPaperPlane />
      </button>
    </div>
  );
}
