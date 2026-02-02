import { useEffect, useState } from "react";
import axios from "../api/axios";

import { FaSearch, FaBell, FaStar } from "react-icons/fa";

import CreatePostBox from "../components/CreatePostBox";
import PostCard from "../components/PostCard";
import BottomNav from "../components/BottomNav";
import FloatingButton from "../components/FloatingButton";

/* Feed renders TaskPlanet Social UI */
export default function Feed({ handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Profile dropdown toggle */
  const [showMenu, setShowMenu] = useState(false);

  /* Fetch all posts */
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to load posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* Instantly add new post to UI */
  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="taskplanetPage">
      {/* ================= TOP HEADER ================= */}
      <div className="tpTopBar">
        <h2>Social</h2>

        <div className="tpTopIcons">
          {/* Coins */}
          <div className="tpCoin">
            <FaStar /> 50
          </div>

          {/* Wallet */}
          <div className="tpWallet">₹0.00</div>

          {/* Notification */}
          <FaBell className="tpBell" />

          {/* ================= PROFILE DROPDOWN ================= */}
          <div className="tpProfileWrapper">
            {/* Profile Circle */}
            <div
              className="tpProfileCircle"
              onClick={() => setShowMenu(!showMenu)}
            >👨‍🦰</div>

            {/* Dropdown Logout Menu */}
            {showMenu && (
              <div className="tpProfileMenu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= SEARCH BAR ================= */}
      <div className="tpSearchRow">
        <input placeholder="Search promotions, users, posts..." />

        <button className="tpSearchBtn">
          <FaSearch />
        </button>
      </div>

      {/* ================= TOP TABS ================= */}
      <div className="tpTabsRow">
        <button className="tpActiveTab">All Posts</button>
        <button className="tpInactiveTab">Promotions</button>
      </div>

      {/* ================= CREATE POST ================= */}
      <CreatePostBox onNewPost={handleNewPost} />

      {/* ================= FILTER CHIPS ================= */}
      <div className="tpFilterRow">
        <button className="chipActive">All Post</button>
        <button className="chip">Most Liked</button>
        <button className="chip">Most Commented</button>
        <button className="chip">Most Shared</button>
      </div>

      {/* ================= POSTS FEED ================= */}
      <div className="tpFeed">
        {loading ? (
          <p className="tpMessage">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="tpMessage">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} refreshFeed={fetchPosts} />
          ))
        )}
      </div>

      {/* Floating Button */}
      <FloatingButton />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
