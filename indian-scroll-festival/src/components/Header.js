import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {/* Festival Logo */}
        <div className="w-10 h-10 flex items-center justify-center">
          <span
            className="text-2xl font-bold"
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#ffd700" }}
          >
            ISF
          </span>
        </div>
        <span
          className="text-sm tracking-widest uppercase"
          style={{ color: "#ffd700", fontFamily: "Bebas Neue, sans-serif" }}
        >
          Indian Scroll Festival
        </span>
      </div>

      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className="text-sm tracking-wider uppercase hover:text-yellow-400 transition-colors"
          style={{ color: "#ffd700", fontFamily: "Bebas Neue, sans-serif" }}
        >
          Home
        </Link>
        <Link
          to="/submission"
          className="text-sm tracking-wider uppercase hover:text-yellow-400 transition-colors"
          style={{ color: "#ffd700", fontFamily: "Bebas Neue, sans-serif" }}
        >
          Submit
        </Link>
        <Link
          to="/submission"
          className="btn-festival text-sm px-6 py-2"
        >
          Start Submission
        </Link>
      </nav>
    </header>
  );
};

export default Header;
