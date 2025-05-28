import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black/95 fixed w-full backdrop-blur-sm border-b border-pink-900/40 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href={"/"}
            className="font-caveat text-3xl sm:text-4xl font-bold text-pink-600 hover:text-pink-500 transition-colors"
          >
            Q-Jam
          </Link>

          <div className="hidden sm:flex items-center gap-4">
            <Link
              href={"/signin"}
              className="px-4 py-2 text-pink-400 border border-pink-500/50 rounded-lg 
                hover:bg-pink-500/10 transition-all duration-200 text-sm font-medium"
            >
              Sign in
            </Link>
            <Link
              href={"/signup"}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg 
                hover:bg-pink-700 transition-all duration-200 text-sm font-medium"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-lg text-pink-400 hover:bg-pink-500/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden mt-2">
            <Link
              href={"/signin"}
              className="block px-4 py-2 text-pink-400 border border-pink-500/50 rounded-lg 
                hover:bg-pink-500/10 transition-all duration-200 text-sm font-medium"
            >
              Sign in
            </Link>
            <Link
              href={"/signup"}
              className="block px-4 py-2 bg-pink-600 text-white rounded-lg 
                hover:bg-pink-700 transition-all duration-200 text-sm font-medium mt-2"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
