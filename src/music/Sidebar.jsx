import React from "react";
import { Link } from "react-router";

function Sidebar() {
  return (
    <div className="w-60 bg-gray-800 text-white  p-6">
      <h2 className="text-xl font-semibold mb-6">Music Player</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/" className="text-lg hover:text-gray-400">
              Home
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/search" className="text-lg hover:text-gray-400">
              Search
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/library" className="text-lg hover:text-gray-400">
              Library
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/playlist" className="text-lg hover:text-gray-400">
              Playlist
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
