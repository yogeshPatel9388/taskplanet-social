import { useState } from "react";
import axios from "../api/axios";
import CommentBox from "./CommentBox";

import { FaHeart, FaRegCommentDots, FaShareAlt } from "react-icons/fa";

/* PostCard renders each post in the exact TaskPlanet UI layout */
export default function PostCard({ post, refreshFeed }) {
  const [showComments, setShowComments] = useState(false);

  const token = localStorage.getItem("token");

  /* Like toggle request updates likes instantly */
  const handleLike = async () => {
    try {
      await axios.put(
        `/posts/${post._id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      refreshFeed();
    } catch (error) {
      console.error("Like update failed:", error.message);
    }
  };

  /* Share button copies link */
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/posts/${post._id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Post link copied!");
  };

  return (
    <div className="tpPostCard">
      {/* Pin Icon (UI Only) */}
      <div className="tpPinIcon">📌</div>

      {/* Post Header */}
      {/* Post Header */}
      <div className="tpPostHeader">
        {/* Avatar */}
        <div className="tpAvatar">
          {post.user?.username?.charAt(0).toUpperCase()}
        </div>

        {/* User Details */}
        <div className="tpUserDetails">
          <h4>{post.user?.username}</h4>
          <p>@user</p>

          <span>
            {new Date(post.createdAt).toLocaleDateString()} •{" "}
            {new Date(post.createdAt).toLocaleTimeString()}
          </span>
        </div>

        {/* Follow Button (Now Right Side) */}
        <button className="tpFollowBtn">Follow</button>
      </div>

      {/* Post Text */}
      {post.text && <p className="postText">{post.text}</p>}

      {/* Post Image */}
      {post.imageUrl && (
        <img src={post.imageUrl} alt="post" className="postImageTP" />
      )}

      {/* Footer Actions */}
      <div className="tpPostFooter">
        {/* Like */}
        <button onClick={handleLike}>
          <FaHeart /> {post.likes.length}
        </button>

        {/* Comment */}
        <button onClick={() => setShowComments(!showComments)}>
          <FaRegCommentDots /> {post.comments.length}
        </button>

        {/* Share */}
        <button onClick={handleShare}>
          <FaShareAlt /> Share
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <>
          {/* Comment Input */}
          <CommentBox postId={post._id} refreshFeed={refreshFeed} />

          {/* Comment List */}
          <div className="commentsList">
            {post.comments.length === 0 ? (
              <p className="noCommentsText">No comments yet.</p>
            ) : (
              post.comments.map((c, index) => (
                <div key={index} className="singleComment">
                  <strong>{c.username}:</strong> {c.text}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
