"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  selectedArtist: string;
  setSelectedArtist: (artist: string) => void;
}

const Hero: React.FC<HeroProps> = ({ selectedArtist, setSelectedArtist }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const titleP1Ref = useRef<HTMLParagraphElement>(null);
  const titleP2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let animFrameId: number;

    const breakpoints = [
      { maxWidth: 1000, translateY: -135, movMultiplier: 450 },
      { maxWidth: 1100, translateY: -130, movMultiplier: 500 },
      { maxWidth: 1200, translateY: -125, movMultiplier: 550 },
      { maxWidth: 1300, translateY: -120, movMultiplier: 600 },
    ];

    const getValues = () => {
      const width = window.innerWidth;
      for (const bp of breakpoints) {
        if (width <= bp.maxWidth) return bp;
      }
      return { translateY: -110, movMultiplier: 650 };
    };

    const state = {
      scroll: 0,
      ...getValues(),
      scale: 0.25,
      fontSize: 80,
      gap: 2,
      targetX: 0,
      currentX: 0,
    };

    const handleResize = () => {
      Object.assign(state, getValues());
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      state.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const trigger = ScrollTrigger.create({
      trigger: introRef.current,
      start: "top bottom",
      end: "top 10%",
      scrub: true,
      onUpdate: (self) => {
        state.scroll = self.progress;
        state.scale = gsap.utils.interpolate(0.25, 1, state.scroll);
        state.fontSize = gsap.utils.interpolate(80, 20, state.scroll);
        state.gap = gsap.utils.interpolate(2, 1, state.scroll);
      },
    });

    const animate = () => {
      if (desktopContainerRef.current) {
        const movement = (1 - state.scale) * state.movMultiplier;
        state.currentX = gsap.utils.interpolate(
          state.currentX,
          state.targetX * movement,
          0.05
        );

        const currentTY = gsap.utils.interpolate(
          state.translateY,
          0,
          state.scroll
        );

        desktopContainerRef.current.style.transform = `translateY(${currentTY}%) translateX(${state.currentX}px) scale(${state.scale})`;
        desktopContainerRef.current.style.gap = `${state.gap}em`;

        if (titleP1Ref.current) {
          titleP1Ref.current.style.fontSize = `${state.fontSize}px`;
        }
        if (titleP2Ref.current) {
          titleP2Ref.current.style.fontSize = `${state.fontSize}px`;
        }
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameId);
      trigger.kill();
    };
  }, []);

  return (
    <div className="w-full text-[#1a1a1a] relative">
      {/* Hero Header Section */}
      <header className="pt-20 sm:pt-24 pb-8 px-6 sm:px-10 max-w-[1800px] w-full mx-auto flex flex-col justify-between h-[85vh] sm:h-screen relative z-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          {/* Vucko Title / Logo */}
          <div className="flex-1">
            <h1 className="text-[18vw] sm:text-[15vw] md:text-[12vw] font-semibold uppercase tracking-tighter leading-none select-none">
              VUCKO
            </h1>
          </div>
          {/* Tagline */}
          <div className="md:mb-4 md:pl-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-black/90">
              One follow, endless web design.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end pt-8 pb-4 text-base sm:text-lg font-medium border-b border-black/10">
          <span>Artist management + production</span>
          <span className="animate-bounce">(Scroll)</span>
        </div>

        {/* Selected Artist Filter Indicator */}
        {selectedArtist !== "All" && (
          <div className="pt-4 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-black/60 uppercase tracking-wider">
              Showing work by: <strong className="text-black">{selectedArtist}</strong>
            </span>
            <button
              onClick={() => setSelectedArtist("All")}
              className="underline text-black/70 hover:text-black cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}
      </header>

      {/* Vucko Video Intro Section with ScrollTrigger Animation */}
      <section ref={introRef} className="w-full px-6 sm:px-10 py-6 relative z-10 min-h-screen">
        {/* Desktop Interactive Scalable Video Container */}
        <div
          ref={desktopContainerRef}
          className="hidden md:flex flex-col relative z-20 will-change-transform"
          style={{ transform: "translateY(-105%) scale(0.25)", gap: "2em" }}
        >
          <div className="relative w-full aspect-video rounded-3xl bg-[#b9b9b3] overflow-hidden shadow-2xl">
            <video
              src="/assets/video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover rounded-3xl pointer-events-none"
            />
          </div>

          <div className="flex justify-between items-center text-[#1a1a1a] font-medium px-2">
            <p ref={titleP1Ref} style={{ fontSize: "80px" }} className="leading-tight transition-all duration-75">
              PRO Showreel
            </p>
            <p ref={titleP2Ref} style={{ fontSize: "80px" }} className="leading-tight transition-all duration-75">
              2025-2026
            </p>
          </div>
        </div>

        {/* Mobile Video Container */}
        <div className="flex md:hidden flex-col gap-4">
          <div className="relative w-full aspect-video rounded-2xl bg-[#b9b9b3] overflow-hidden shadow-xl">
            <video
              src="/assets/video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover rounded-2xl pointer-events-none"
            />
          </div>
          <div className="flex justify-between items-center text-lg sm:text-xl font-medium px-1">
            <p>PRO Showreel</p>
            <p>2025-2026</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

