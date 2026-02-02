import { FaHome, FaClipboardList, FaGlobe, FaStar } from "react-icons/fa";

/* BottomNav renders the TaskPlanet bottom navigation bar */
export default function BottomNav() {
  return (
    <div className="tpBottomNav">
      {/* Home */}
      <button className="navIcon">
        <FaHome />
      </button>

      {/* Tasks */}
      <button className="navIcon">
        <FaClipboardList />
      </button>

      {/* Social (Active) */}
      <button className="navIcon activeNavIcon">
        <FaGlobe />
      </button>

      {/* Rewards */}
      <button className="navIcon">
        <FaStar />
      </button>
    </div>
  );
}
