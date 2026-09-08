"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Text from "@/components/Text";
import Hero from "@/components/Hero";
import News from "@/components/News";
import OrkenCanvasGeometry from "@/components/OrkenCanvasGeometry";

interface ImageItem {
  id: number;
  src: string;
  artist: string;
  category: string;
  title: string;
  aspectRatio: string;
  width: number;
  height: number;
}

const GALLERY_IMAGES: ImageItem[] = [
  {
    id: 1,
    src: "/assets/1.jpg",
    artist: "Arturo Torres",
    category: "Fashion",
    title: "Urban Athletic Studio",
    aspectRatio: "3/4",
    width: 750,
    height: 1125,
  },
  {
    id: 2,
    src: "/assets/2.jpg",
    artist: "Beth Sternbaum",
    category: "Beauty",
    title: "Mono Joy Portrait",
    aspectRatio: "3/4",
    width: 750,
    height: 1000,
  },
  {
    id: 3,
    src: "/assets/3.jpg",
    artist: "Garrett Byrum",
    category: "Lifestyle",
    title: "Coastal Cycling Freedom",
    aspectRatio: "3/4",
    width: 750,
    height: 1125,
  },
  {
    id: 4,
    src: "/assets/4.jpg",
    artist: "Cera Hensley",
    category: "Beauty",
    title: "Teal Studio & Makeup",
    aspectRatio: "3/4",
    width: 750,
    height: 1000,
  },
  {
    id: 5,
    src: "/assets/5.jpg",
    artist: "Danielle Moore",
    category: "Fashion",
    title: "Kodak 400 Editorial",
    aspectRatio: "3/4",
    width: 600,
    height: 800,
  },
  {
    id: 6,
    src: "/assets/6.jpg",
    artist: "Quinn Gravier",
    category: "Portraits",
    title: "White Stetson Heritage",
    aspectRatio: "4/5",
    width: 600,
    height: 750,
  },
  {
    id: 7,
    src: "/assets/7.jpg",
    artist: "Jason Kent",
    category: "Still Life",
    title: "Prism Light Composition",
    aspectRatio: "3/4",
    width: 750,
    height: 1000,
  },
  {
    id: 8,
    src: "/assets/8.jpg",
    artist: "Jonathan Mannion",
    category: "Hip-Hop",
    title: "Iconic Archive Portrait",
    aspectRatio: "4/5",
    width: 750,
    height: 937,
  },
  {
    id: 9,
    src: "/assets/9.jpg",
    artist: "Arturo Torres",
    category: "Fashion",
    title: "Modern Streetwear Lookbook",
    aspectRatio: "3/4",
    width: 750,
    height: 1100,
  },
  {
    id: 10,
    src: "/assets/10.jpg",
    artist: "Beth Sternbaum",
    category: "Lifestyle",
    title: "Golden Hour Horizon",
    aspectRatio: "3/2",
    width: 600,
    height: 400,
  },
  {
    id: 11,
    src: "/assets/11.jpg",
    artist: "Cera Hensley",
    category: "Still Life",
    title: "Cosmetics Geometry",
    aspectRatio: "3/4",
    width: 750,
    height: 1024,
  },
  {
    id: 12,
    src: "/assets/12.jpg",
    artist: "Edward Tran",
    category: "Motion",
    title: "High Octane Commercial",
    aspectRatio: "4/5",
    width: 600,
    height: 751,
  },
  {
    id: 13,
    src: "/assets/13.jpg",
    artist: "Garrett Byrum",
    category: "Sports",
    title: "Hydrostrong Performance",
    aspectRatio: "3/4",
    width: 750,
    height: 1000,
  },
  {
    id: 14,
    src: "/assets/14.jpg",
    artist: "Jason Kent",
    category: "Beauty",
    title: "Soft Focus Silhouette",
    aspectRatio: "3/4",
    width: 750,
    height: 1125,
  },
  {
    id: 15,
    src: "/assets/15.jpg",
    artist: "Jonathan Mannion",
    category: "Portraits",
    title: "Celebrity Spotlight",
    aspectRatio: "3/4",
    width: 750,
    height: 1125,
  },
  {
    id: 16,
    src: "/assets/16.jpg",
    artist: "Quinn Gravier",
    category: "Fashion",
    title: "Desert Couture",
    aspectRatio: "3/4",
    width: 750,
    height: 1124,
  },
  {
    id: 17,
    src: "/assets/17.jpg",
    artist: "Danielle Moore",
    category: "Editorial",
    title: "Square Format Minimalist",
    aspectRatio: "1/1",
    width: 750,
    height: 750,
  },
  {
    id: 18,
    src: "/assets/18.jpg",
    artist: "Arturo Torres",
    category: "Fashion",
    title: "Marine Layer Campaign",
    aspectRatio: "3/4",
    width: 750,
    height: 1125,
  },
  {
    id: 19,
    src: "/assets/19.jpg",
    artist: "Beth Sternbaum",
    category: "Beauty",
    title: "Skin & Glow Series",
    aspectRatio: "4/5",
    width: 750,
    height: 941,
  },
  {
    id: 20,
    src: "/assets/20.jpg",
    artist: "Cera Hensley",
    category: "Beverage",
    title: "Citrus Refreshment",
    aspectRatio: "2/3",
    width: 600,
    height: 900,
  },
  {
    id: 21,
    src: "/assets/21.jpg",
    artist: "Garrett Byrum",
    category: "Sports",
    title: "Nike Basketball Studio",
    aspectRatio: "4/5",
    width: 600,
    height: 750,
  },
  {
    id: 22,
    src: "/assets/22.jpg",
    artist: "Jason Kent",
    category: "Beauty",
    title: "Morphe II Color Lock",
    aspectRatio: "4/5",
    width: 750,
    height: 938,
  },
];

const ARTISTS_LIST = [
  "All",
  "Arturo Torres",
  "Beth Sternbaum",
  "Cera Hensley",
  "Danielle Moore",
  "Edward Tran",
  "Garrett Byrum",
  "Jason Kent",
  "Jonathan Mannion",
  "Quinn Gravier",
];

export default function Home() {
  const [selectedArtist, setSelectedArtist] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isArtistsMenuOpen, setIsArtistsMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [panX, setPanX] = useState<number>(0);

  const filteredImages =
    selectedArtist === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.artist === selectedArtist);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let currentX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      if (!width) return;
      // Calculate normalized X position relative to viewport center (-1 to +1)
      const normalized = (e.clientX / width - 0.5) * 2;
      const maxShift = Math.min(width * 0.18, 280);
      targetX = -normalized * maxShift;
    };

    const updatePan = () => {
      // Fluid lerp factor for buttery smooth gallery inertia
      currentX += (targetX - currentX) * 0.06;
      setPanX(currentX);
      animationFrameId = requestAnimationFrame(updatePan);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(updatePan);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev === 0 ? filteredImages.length - 1 : prev - 1) : null
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev === filteredImages.length - 1 ? 0 : prev + 1) : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Navigation Header Component */}
      <Navbar
        isArtistsMenuOpen={isArtistsMenuOpen}
        setIsArtistsMenuOpen={setIsArtistsMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        selectedArtist={selectedArtist}
        setSelectedArtist={setSelectedArtist}
      />

      {/* Artists Filter Slide-Down Bar */}
      {isArtistsMenuOpen && (
        <div className="fixed top-[57px] left-0 right-0 z-30 bg-black text-white px-4 sm:px-8 py-4 border-b border-white/10 shadow-2xl animate-fade-in">
          <div className="max-w-[1800px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium tracking-wide">
            <span className="text-white/50 uppercase text-[11px] font-mono">
              Filter by Artist:
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {ARTISTS_LIST.map((artist) => (
                <button
                  key={artist}
                  onClick={() => {
                    setSelectedArtist(artist);
                    setIsArtistsMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    selectedArtist === artist
                      ? "bg-white text-black border-white font-semibold"
                      : "border-white/20 text-white/80 hover:border-white hover:text-white"
                  }`}
                >
                  {artist}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-8 animate-fade-in md:hidden">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold tracking-widest">ViV MGMT</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col space-y-6 text-2xl font-light tracking-wide my-auto">
            <button
              onClick={() => {
                setSelectedArtist("All");
                setIsMobileMenuOpen(false);
              }}
              className="text-left hover:opacity-60"
            >
              Artists
            </button>
            <button
              onClick={() => {
                setSelectedArtist("All");
                setIsMobileMenuOpen(false);
              }}
              className="text-left hover:opacity-60"
            >
              News
            </button>
            <button
              onClick={() => {
                setSelectedArtist("All");
                setIsMobileMenuOpen(false);
              }}
              className="text-left hover:opacity-60"
            >
              About
            </button>
            <button
              onClick={() => {
                setSelectedArtist("All");
                setIsMobileMenuOpen(false);
              }}
              className="text-left hover:opacity-60"
            >
              Production
            </button>
          </div>
          <div className="text-xs text-white/50 border-t border-white/20 pt-4">
            katie@vivmgmt.com
          </div>
        </div>
      )}

      {/* Modular Hero Section Component */}
      <Hero
        selectedArtist={selectedArtist}
        setSelectedArtist={setSelectedArtist}
      />

      {/* Main Pinterest Masonry Layout with Interactive Hover Parallax */}
      <main data-scroll data-scroll-speed="-0.1" className="flex-1 pb-16 w-full mt-30">
        <div
          className="w-[126vw] sm:w-[120vw] md:w-[118vw] lg:w-[115vw] -ml-[13vw] sm:-ml-[10vw] md:-ml-[9vw] lg:-ml-[7.5vw] transform-gpu will-change-transform"
          style={{ transform: `translate3d(${panX}px, 0, 0)` }}
        >
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-3.5 gap-3 sm:gap-4 lg:gap-4 space-y-3 sm:space-y-4 lg:space-y-4 masonry-grid px-2">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setLightboxIndex(index)}
                className="masonry-item relative overflow-hidden cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={`${image.artist} - ${image.title}`}
                  width={image.width * 2}
                  height={image.height * 2}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 6 ? "eager" : "lazy"}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col justify-between p-4 sm:p-8 animate-fade-in backdrop-blur-lg">
          {/* Lightbox Header */}
          <div className="flex justify-between items-center max-w-[1800px] w-full mx-auto text-xs sm:text-sm font-mono text-white/70">
            <div>
              <span>
                {lightboxIndex + 1} / {filteredImages.length}
              </span>
              <span className="mx-2">•</span>
              <span className="text-white font-sans font-medium">
                {filteredImages[lightboxIndex].artist}
              </span>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="text-2xl text-white hover:opacity-60 cursor-pointer p-2"
              aria-label="Close Lightbox"
            >
              ✕
            </button>
          </div>

          {/* Lightbox Image Container */}
          <div className="relative flex-1 flex items-center justify-center py-4 my-auto max-w-5xl mx-auto w-full">
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null
                    ? prev === 0
                      ? filteredImages.length - 1
                      : prev - 1
                    : null
                )
              }
              className="absolute left-2 sm:left-4 z-10 text-3xl sm:text-4xl text-white/70 hover:text-white p-3 bg-black/40 rounded-full backdrop-blur-sm transition-all cursor-pointer select-none"
              aria-label="Previous Image"
            >
              ‹
            </button>

            <div className="relative max-h-[80vh] max-w-full flex items-center justify-center">
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                width={filteredImages[lightboxIndex].width}
                height={filteredImages[lightboxIndex].height}
                className="max-h-[78vh] w-auto max-w-full object-contain rounded-sm shadow-2xl"
              />
            </div>

            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null
                    ? prev === filteredImages.length - 1
                      ? 0
                      : prev + 1
                    : null
                )
              }
              className="absolute right-2 sm:right-4 z-10 text-3xl sm:text-4xl text-white/70 hover:text-white p-3 bg-black/40 rounded-full backdrop-blur-sm transition-all cursor-pointer select-none"
              aria-label="Next Image"
            >
              ›
            </button>
          </div>

          {/* Lightbox Footer Caption */}
          <div className="max-w-[1800px] w-full mx-auto text-center text-xs sm:text-sm text-white/80 pb-2">
            <p className="font-semibold text-white">
              {filteredImages[lightboxIndex].title}
            </p>
            <p className="text-white/60 font-light">
              Represented by ViV MGMT — {filteredImages[lightboxIndex].category}
            </p>
          </div>
        </div>
      )}

      <OrkenCanvasGeometry />
      <Text />
      <News />

      {/* Modular Footer Component */}
      <Footer
        artistsList={ARTISTS_LIST}
        setSelectedArtist={setSelectedArtist}
      />
    </div>
  );
}

