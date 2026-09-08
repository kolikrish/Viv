"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ShowcaseCard {
  id: number;
  title: string;
  category: string;
  artist: string;
  imgSrc: string;
}

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 1,
    title: "MONOCHROME JOY EDITORIAL",
    category: "FASHION & BEAUTY",
    artist: "Beth Sternbaum",
    imgSrc: "/assets/2.jpg",
  },
  {
    id: 2,
    title: "COASTAL FREEDOM CAMPAIGN",
    category: "LIFESTYLE & MOTION",
    artist: "Garrett Byrum",
    imgSrc: "/assets/3.jpg",
  },
  {
    id: 3,
    title: "PRISM LIGHT STUDY",
    category: "STILL LIFE & ART",
    artist: "Jason Kent",
    imgSrc: "/assets/7.jpg",
  },
  {
    id: 4,
    title: "CELEBRITY ARCHIVE PORTRAIT",
    category: "PORTRAITS & HIP-HOP",
    artist: "Jonathan Mannion",
    imgSrc: "/assets/8.jpg",
  },
];

export default function OrkenCanvasGeometry() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const outlineCanvasRef = useRef<HTMLCanvasElement>(null);
  const fillCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stickyEl = stickyRef.current;
    const outlineCanvas = outlineCanvasRef.current;
    const fillCanvas = fillCanvasRef.current;
    if (!stickyEl || !outlineCanvas || !fillCanvas) return;

    const outlineCtx = outlineCanvas.getContext("2d");
    const fillCtx = fillCanvas.getContext("2d");
    if (!outlineCtx || !fillCtx) return;

    const triangleSize = 140;
    const lineWidth = 1;
    const SCALE_THRESHOLD = 0.01;
    const triangleStates = new Map<
      string,
      { order: number; scale: number; row: number; col: number }
    >();
    let animationFrameId: number | null = null;
    let canvasXPosition = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      outlineCanvas.width = w * dpr;
      outlineCanvas.height = h * dpr;
      outlineCanvas.style.width = `${w}px`;
      outlineCanvas.style.height = `${h}px`;
      outlineCtx.scale(dpr, dpr);

      fillCanvas.width = w * dpr;
      fillCanvas.height = h * dpr;
      fillCanvas.style.width = `${w}px`;
      fillCanvas.style.height = `${h}px`;
      fillCtx.scale(dpr, dpr);
    };

    setCanvasSize();

    const drawTriangle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      fillScale = 0,
      flipped = false
    ) => {
      const halfSize = triangleSize / 2;

      if (fillScale < SCALE_THRESHOLD) {
        ctx.beginPath();
        if (!flipped) {
          ctx.moveTo(x, y - halfSize);
          ctx.lineTo(x + halfSize, y + halfSize);
          ctx.lineTo(x - halfSize, y + halfSize);
        } else {
          ctx.moveTo(x, y + halfSize);
          ctx.lineTo(x + halfSize, y - halfSize);
          ctx.lineTo(x - halfSize, y - halfSize);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      if (fillScale >= SCALE_THRESHOLD) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(fillScale, fillScale);
        ctx.translate(-x, -y);

        ctx.beginPath();
        if (!flipped) {
          ctx.moveTo(x, y - halfSize);
          ctx.lineTo(x + halfSize, y + halfSize);
          ctx.lineTo(x - halfSize, y + halfSize);
        } else {
          ctx.moveTo(x, y + halfSize);
          ctx.lineTo(x + halfSize, y - halfSize);
          ctx.lineTo(x - halfSize, y - halfSize);
        }
        ctx.closePath();

        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = lineWidth;

        ctx.stroke();
        ctx.fill();
        ctx.restore();
      }
    };

    const drawGrid = (scrollProgress = 0) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      const w = window.innerWidth;
      const h = window.innerHeight;

      outlineCtx.clearRect(0, 0, w, h);
      fillCtx.clearRect(0, 0, w, h);

      const animationProgress =
        scrollProgress <= 0.65 ? 0 : (scrollProgress - 0.65) / 0.35;

      let needsUpdate = false;
      const animationSpeed = 0.15;

      triangleStates.forEach((state) => {
        if (state.scale < 1) {
          const x =
            state.col * (triangleSize * 0.5) + triangleSize / 2 + canvasXPosition;
          const y = state.row * triangleSize + triangleSize / 2;
          const flipped = (state.row + state.col) % 2 !== 0;

          drawTriangle(outlineCtx, x, y, 0, flipped);
        }
      });

      triangleStates.forEach((state) => {
        const shouldBeVisible = state.order <= animationProgress;
        const targetScale = shouldBeVisible ? 1 : 0;
        const newScale =
          state.scale + (targetScale - state.scale) * animationSpeed;

        if (Math.abs(newScale - state.scale) > 0.001) {
          state.scale = newScale;
          needsUpdate = true;
        }

        if (state.scale >= SCALE_THRESHOLD) {
          const x =
            state.col * (triangleSize * 0.5) + triangleSize / 2 + canvasXPosition;
          const y = state.row * triangleSize + triangleSize / 2;
          const flipped = (state.row + state.col) % 2 !== 0;

          drawTriangle(fillCtx, x, y, state.scale, flipped);
        }
      });

      if (needsUpdate) {
        animationFrameId = requestAnimationFrame(() => drawGrid(scrollProgress));
      }
    };

    const initializeTriangles = () => {
      const cols = Math.ceil(window.innerWidth / (triangleSize * 0.5)) + 6;
      const rows = Math.ceil(window.innerHeight / (triangleSize * 0.5));
      const totalTriangles = rows * cols;

      const positions: { row: number; col: number; key: string }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          positions.push({ row: r, col: c, key: `${r}-${c}` });
        }
      }

      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
      }

      positions.forEach((pos, index) => {
        triangleStates.set(pos.key, {
          order: index / totalTriangles,
          scale: 0,
          row: pos.row,
          col: pos.col,
        });
      });
    };

    initializeTriangles();
    drawGrid(0);

    const handleResize = () => {
      setCanvasSize();
      triangleStates.clear();
      initializeTriangles();
      drawGrid(0);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const trigger = ScrollTrigger.create({
      trigger: stickyEl,
      start: "top top",
      end: "+=2200px",
      pin: true,
      onUpdate: (self) => {
        canvasXPosition = -self.progress * 200;
        drawGrid(self.progress);

        if (cardsRef.current) {
          const cardProgress = Math.min(self.progress / 0.65, 1);
          gsap.set(cardsRef.current, {
            x: -cardProgress * window.innerWidth * 1.8,
          });
        }
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      trigger.kill();
    };
  }, []);

  return (
    <section className="w-full bg-black text-white overflow-hidden relative font-sans">

      {/* Sticky Scroll Container */}
      <div ref={stickyRef} className="relative w-full h-screen overflow-hidden bg-black">
        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src="/assets/1.jpg"
            alt="Background Texture"
            fill
            sizes="100vw"
            className="object-cover grayscale"
          />
        </div>

        {/* Outline Canvas Layer */}
        <canvas
          ref={outlineCanvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        />

        {/* Horizontal Cards Showcase Container */}
        <div
          ref={cardsRef}
          className="absolute top-0 left-0 w-[280vw] sm:w-[220vw] h-full flex items-center justify-around z-20 px-8 will-change-transform"
        >
          {SHOWCASE_CARDS.map((card) => (
            <div
              key={card.id}
              className="relative w-[75vw] sm:w-[32vw] md:w-[26vw] h-[65vh] bg-neutral-900/90 border border-white/15 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative w-full flex-1 overflow-hidden bg-black mb-4">
                <Image
                  src={card.imgSrc}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 75vw, 30vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono text-white/50 tracking-wider">
                  {card.category} — {card.artist}
                </span>
                <h3 className="text-lg sm:text-xl font-medium tracking-tight uppercase">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Fill Canvas Layer */}
        <canvas
          ref={fillCanvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-30"
        />
      </div>
    </section>
  );
}
