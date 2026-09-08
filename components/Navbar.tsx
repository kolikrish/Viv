"use client";

import React from "react";

interface NavbarProps {
  isArtistsMenuOpen: boolean;
  setIsArtistsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedArtist: string;
  setSelectedArtist: (artist: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isArtistsMenuOpen,
  setIsArtistsMenuOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  selectedArtist,
  setSelectedArtist,
}) => {
  return (
    <>
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between text-xs sm:text-sm font-medium tracking-wide uppercase transition-all">
        {/* Left: Artists Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsArtistsMenuOpen(!isArtistsMenuOpen)}
            className="flex items-center space-x-1.5 hover:opacity-60 transition-opacity cursor-pointer group"
            aria-label="Toggle Artists Menu"
          >
            <span className="text-base leading-none transition-transform group-hover:rotate-90 duration-300">
              {isArtistsMenuOpen ? "✕" : "+"}
            </span>
            <span className="font-semibold tracking-wider">Artists</span>
          </button>
        </div>

        {/* Center/Right: Category Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-black/80">
          <button
            onClick={() => setSelectedArtist("All")}
            className={`hover:text-black transition-colors cursor-pointer ${
              selectedArtist === "All" ? "text-black underline underline-offset-4" : ""
            }`}
          >
            News
          </button>
          <span className="text-black/30">/</span>
          <button
            onClick={() => setSelectedArtist("All")}
            className="hover:text-black transition-colors cursor-pointer"
          >
            About
          </button>
          <span className="text-black/30">/</span>
          <button
            onClick={() => setSelectedArtist("All")}
            className={`hover:text-black transition-colors cursor-pointer ${
              selectedArtist === "All" ? "text-black font-semibold" : ""
            }`}
          >
            All
          </button>
        </div>

        {/* Right: Production Toggle & Mobile Burger */}
        <div className="flex items-center space-x-4">
          <a
            href="#production"
            className="hidden sm:flex items-center space-x-1 hover:opacity-60 transition-opacity font-semibold"
          >
            <span>Production</span>
            <span className="text-base leading-none">+</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-1 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
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
      </nav>
    </>
  );
};

export default Navbar;