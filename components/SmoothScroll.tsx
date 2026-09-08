"use client";

import React, { useEffect } from "react";
import "locomotive-scroll/locomotive-scroll.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    let locomotiveScroll: { destroy: () => void } | null = null;

    (async () => {
      try {
        const LocomotiveScrollModule = await import("locomotive-scroll");
        const LocomotiveScroll = LocomotiveScrollModule.default;
        locomotiveScroll = new LocomotiveScroll({
          lenisOptions: {
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.07,
            duration: 1.4,
            easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5,
            infinite: false,
          },
        });

        ScrollTrigger.refresh();
      } catch (error) {
        console.error("Failed to initialize LocomotiveScroll:", error);
      }
    })();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}


