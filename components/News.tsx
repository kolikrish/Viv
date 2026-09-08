"use client";

import React from "react";
import Image from "next/image";

interface NewsItem {
  id: number;
  imageSrc: string;
  caption: string;
  badge?: {
    text: string;
    position: "top-left" | "top-right";
    style: "stylist" | "nyc";
  };
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    imageSrc: "/assets/18.jpg",
    caption: "ARTURO TORRES x MARINE LAYER",
  },
  {
    id: 2,
    imageSrc: "/assets/5.jpg",
    caption: "DANIELLE MOORE x OLD NAVY BTS",
    badge: {
      text: "Featuring THE STYLIST",
      position: "top-left",
      style: "stylist",
    },
  },
  {
    id: 3,
    imageSrc: "/assets/8.jpg",
    caption: "JONATHAN MANNION x NIKE",
    badge: {
      text: "NYC",
      position: "top-right",
      style: "nyc",
    },
  },

  {
    id: 4,
    imageSrc: "/assets/11.jpg",
    caption: "ARTURO TORRES x MARINE LAYER",
  },
  {
    id: 5,
    imageSrc: "/assets/12.jpg",
    caption: "DANIELLE MOORE x OLD NAVY BTS",
    badge: {
      text: "Featuring THE STYLIST",
      position: "top-left",
      style: "stylist",
    },
  },
  {
    id: 6,
    imageSrc: "/assets/9.jpg",
    caption: "JONATHAN MANNION x NIKE",
    badge: {
      text: "NYC",
      position: "top-right",
      style: "nyc",
    },
  },
];

const News = () => {
  return (
    <section className="w-full bg-white text-black pt-8 pb-16 px-4 sm:px-8">
      <div className="max-w-[1800px] mx-auto">

        {/* Section Heading */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-black leading-none">
            News
          </h2>
        </div>

        {/* News Items 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5">
          {NEWS_ITEMS.map((item) => (
            <div key={item.id} className="group flex flex-col cursor-pointer">
              {/* Image Container with Badges */}
              <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4] w-full">
                <Image
                  src={item.imageSrc}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover w-full h-full"
                />

                {/* Stylist Badge Overlay */}
                {item.badge && item.badge.style === "stylist" && (
                  <div className="absolute top-4 left-4 z-10 text-left select-none pointer-events-none">
                    <span className="block text-[11px] sm:text-xs font-serif italic text-white drop-shadow-md">
                      Featuring
                    </span>
                    <span className="block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white drop-shadow-md leading-tight">
                      THE STYLIST
                    </span>
                  </div>
                )}

                {/* NYC Swoosh Badge Overlay */}
                {item.badge && item.badge.style === "nyc" && (
                  <div className="absolute top-4 right-4 z-10 select-none pointer-events-none">
                    <div className="bg-white/90 text-black px-2 py-0.5 rounded border border-black/10 shadow flex items-center space-x-1 font-mono text-[11px] font-bold tracking-tight">
                      <span>NYC</span>
                      <span className="text-black font-extrabold">✓</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Caption Text */}
              <div className="mt-3.5">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/90 group-hover:text-black transition-colors">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALL NEWS Button Container */}
      <div className="w-full bg-white py-32 flex items-center justify-center">
        <button className="bg-[#EBEBEB] transition-colors px-8 py-4 text-black text-xs sm:text-sm font-semibold tracking-widest uppercase cursor-pointer">
          ALL NEWS
        </button>
      </div>
    </section>
  );
};

export default News;
