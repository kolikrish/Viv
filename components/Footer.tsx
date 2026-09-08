"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FooterProps {
  artistsList: string[];
  setSelectedArtist: (artist: string) => void;
}

interface ArtistInfo {
  image: string;
  color: string;
  isDark: boolean;
}

const ARTIST_DATA: Record<string, ArtistInfo> = {
  "Arturo Torres": {
    image: "/assets/18.jpg",
    color: "#C8522E", // Warm Terracotta Red from 18.jpg
    isDark: true,
  },
  "Beth Sternbaum": {
    image: "/assets/2.jpg",
    color: "#E2D8CE", // Soft Warm Cream from 2.jpg
    isDark: false,
  },
  "Cera Hensley": {
    image: "/assets/4.jpg",
    color: "#28585D", // Deep Studio Teal from 4.jpg
    isDark: true,
  },
  "Danielle Moore": {
    image: "/assets/5.jpg",
    color: "#9E3224", // Desert Red from 5.jpg
    isDark: true,
  },
  "Edward Tran": {
    image: "/assets/12.jpg",
    color: "#242A32", // Dark Slate Motion Blue from 12.jpg
    isDark: true,
  },
  "Garrett Byrum": {
    image: "/assets/3.jpg",
    color: "#E5B842", // Citrus Yellow Gold from 3.jpg
    isDark: false,
  },
  "Jason Kent": {
    image: "/assets/7.jpg",
    color: "#4A5260", // Dusk Slate Gray from 7.jpg
    isDark: true,
  },
  "Jonathan Mannion": {
    image: "/assets/8.jpg",
    color: "#8D4B3E", // Rosewood Brown from 8.jpg
    isDark: true,
  },
  "Quinn Gravier": {
    image: "/assets/6.jpg",
    color: "#D4C5B9", // Soft Sand Cream from 6.jpg
    isDark: false,
  },
};

const Footer: React.FC<FooterProps> = ({ artistsList, setSelectedArtist }) => {
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);
  const activeArtist = hoveredArtist ? ARTIST_DATA[hoveredArtist] : null;

  return (
    <footer
      className="pt-16 sm:pt-12 pb-8 px-6 sm:px-12 md:px-4 mt-auto transition-colors duration-700 ease-out"
      style={{
        backgroundColor: activeArtist ? activeArtist.color : "#EBEBEB",
        color: activeArtist ? (activeArtist.isDark ? "#FFFFFF" : "#000000") : "#000000",
      }}
    >
      <div className="max-w-[1800px] mx-auto flex flex-col justify-between min-h-[90vh]">
        {/* Top Section: Tagline Left + Nav Links Right */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 mb-16">
          {/* Left: Serif Taglines */}
          <div className="max-w-2xl font-serif text-3xl sm:text-4xl md:text-4xl leading-[1.25] tracking-tight space-y-6">
            <div>
              <p>
                ViV <span className="italic font-serif">is artist management.</span>
              </p>
              <p>
                ViV <span className="italic font-serif">is production.</span>
              </p>
            </div>

            <div className="pt-4">
              <p>
                We make <span className="italic font-serif">beautiful</span> work.
              </p>
              <p>
                Come <span className="italic font-serif">create</span> with us.
              </p>
            </div>
          </div>

          {/* Right: Lists for Artists, Explore, Connect */}
          <div className="flex flex-wrap sm:flex-nowrap gap-12 sm:gap-16 md:gap-24 text-sm sm:text-base font-sans">
            {/* Col 1: Artists */}
            <div className="relative">
              <h3
                className={`text-xs sm:text-sm font-medium mb-4 font-sans transition-colors duration-500 ${
                  activeArtist
                    ? activeArtist.isDark
                      ? "text-white/60"
                      : "text-black/60"
                    : "text-black/60"
                }`}
              >
                Artists
              </h3>
              <ul
                className="space-y-1.5 font-normal"
                onMouseLeave={() => setHoveredArtist(null)}
              >
                {artistsList
                  .filter((a) => a !== "All")
                  .map((artist) => {
                    const info = ARTIST_DATA[artist];
                    return (
                      <li key={artist} className="relative group flex items-center">
                        {/* Hover Preview Image on Left Side of Text */}
                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/10 w-32 sm:w-56 aspect-[3/4] overflow-hidden pointer-events-none opacity-0 scale-90 -translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-40 border border-white/20 shadow-2xl bg-neutral-900">
                          <Image
                            src={info?.image || "/assets/1.jpg"}
                            alt={artist}
                            fill
                            sizes="180px"
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <button
                          onMouseEnter={() => setHoveredArtist(artist)}
                          onClick={() => {
                            setSelectedArtist(artist);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="hover:opacity-70 group-hover:translate-x-1 transition-all cursor-pointer text-left block py-0.5"
                        >
                          {artist}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* Col 2: Explore */}
            <div>
              <h3
                className={`text-xs sm:text-sm font-medium mb-4 font-sans transition-colors duration-500 ${
                  activeArtist
                    ? activeArtist.isDark
                      ? "text-white/60"
                      : "text-black/60"
                    : "text-black/60"
                }`}
              >
                Explore
              </h3>
              <ul className="space-y-1.5 font-normal">
                <li>
                  <a
                    href="#production"
                    className="hover:opacity-60 transition-opacity block"
                  >
                    Production
                  </a>
                </li>
                <li>
                  <a
                    href="#news"
                    className="hover:opacity-60 transition-opacity block"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:opacity-60 transition-opacity block"
                  >
                    About
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedArtist("All");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:opacity-60 transition-opacity cursor-pointer text-left block"
                  >
                    All
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Connect */}
            <div>
              <h3
                className={`text-xs sm:text-sm font-medium mb-4 font-sans transition-colors duration-500 ${
                  activeArtist
                    ? activeArtist.isDark
                      ? "text-white/60"
                      : "text-black/60"
                    : "text-black/60"
                }`}
              >
                Connect
              </h3>
              <ul className="space-y-1.5 font-normal">
                <li>
                  <a
                    href="mailto:katie@vivmgmt.com"
                    className="hover:opacity-60 transition-opacity block"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/vivmgmt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity block"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/vivmgmt_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity block"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Huge ViV SVG Logo + Copyright */}
        <div className="flex flex-col sm:flex-row items-end justify-between gap-6 pt-8 mt-auto">
          {/* Huge ViV SVG Logo */}
          <div className="w-full sm:w-auto -ml-2 sm:-ml-4">
            <Image
              src="/hero.svg"
              alt="ViV Logo"
              width={543}
              height={216}
              className={`w-[280px] sm:w-[420px] md:w-[520px] lg:w-[580px] h-auto object-contain transition-all duration-700 ${
                activeArtist?.isDark ? "invert" : ""
              }`}
              priority
            />
          </div>

          {/* Copyright text */}
          <div className="text-xs font-sans font-bold tracking-tight pb-2 sm:pb-4 transition-colors duration-700">
            © {new Date().getFullYear()} ViV MGMT, All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
