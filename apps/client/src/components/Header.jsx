import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between"
      style={{
        backgroundColor: "rgba(20, 20, 20, 0.9)",
        color: "var(--color-primary-text)",
      }}
    >
      <div className="flex items-center">
        <Link
          to="/"
          className="text-3xl md:text-4xl font-bold"
          style={{ color: "var(--color-accent)" }}
        >
          BINNYS
        </Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>
      </div>
      <nav
        className={`md:flex ${isMenuOpen ? "block" : "hidden"} absolute md:relative top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0`}
      >
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <li>
            <Link
              to="/"
              className="text-lg hover:text-gray-300 transition duration-300"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tvshows"
              className="text-lg hover:text-gray-300 transition duration-300"
              onClick={toggleMenu}
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className="text-lg hover:text-gray-300 transition duration-300"
              onClick={toggleMenu}
            >
              Movies
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
