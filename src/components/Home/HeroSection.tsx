"use client";

import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  { name: "Barly Djaja", desc: "DriveFolio", url: "https://barlydjaja.com" },
  {
    name: "Gravity (Anti)",
    desc: "Creative UI Engineering",
    url: "https://gravity.thereaction.io",
  },
  {
    name: "Heavy",
    desc: "Weightlift Tracker app",
    url: "https://heavy.thereaction.io",
  },
  { name: "About Me", desc: "About Me", url: "https://me.thereaction.io" },
];

const LOOP_DURATION_S = 30;
const PAUSE_AFTER_NAV_MS = 3000;
const SPRING = { type: "spring" as const, stiffness: 220, damping: 28 };
const DRAG_THRESHOLD = 5;

export default function FeedHeader() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [step, setStep] = useState(240);
  const reduced = useReducedMotion();

  const hoverPausedRef = useRef(false);
  const navPausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const navPauseTimeoutRef = useRef<number | null>(null);
  const pointerStartRef = useRef<{ x: number; mv: number } | null>(null);

  useEffect(() => {
    const update = () => {
      if (!trackRef.current) return;
      const children = Array.from(trackRef.current.children) as HTMLElement[];
      if (children.length < PROJECTS.length) return;
      const styles = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(styles.columnGap || "24") || 24;
      let single = 0;
      for (let i = 0; i < PROJECTS.length; i++) {
        single += children[i].offsetWidth + gap;
      }
      setSingleSetWidth(single);
      setStep(children[0].offsetWidth + gap);
    };
    const raf = window.requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, []);

  const xWrapped = useTransform(x, (v) =>
    singleSetWidth > 0 ? wrap(-singleSetWidth, 0, v) : 0,
  );

  useAnimationFrame((_, delta) => {
    if (
      reduced ||
      hoverPausedRef.current ||
      navPausedRef.current ||
      draggingRef.current ||
      singleSetWidth === 0
    ) {
      return;
    }
    const pxPerMs = singleSetWidth / (LOOP_DURATION_S * 1000);
    x.set(x.get() - delta * pxPerMs);
  });

  const pauseForNav = (ms: number) => {
    navPausedRef.current = true;
    if (navPauseTimeoutRef.current !== null) {
      window.clearTimeout(navPauseTimeoutRef.current);
    }
    navPauseTimeoutRef.current = window.setTimeout(() => {
      navPausedRef.current = false;
      navPauseTimeoutRef.current = null;
    }, ms);
  };

  useEffect(() => {
    return () => {
      if (navPauseTimeoutRef.current !== null) {
        window.clearTimeout(navPauseTimeoutRef.current);
      }
    };
  }, []);

  const goNext = () => {
    animate(x, x.get() - step, SPRING);
    pauseForNav(PAUSE_AFTER_NAV_MS);
  };
  const goPrev = () => {
    animate(x, x.get() + step, SPRING);
    pauseForNav(PAUSE_AFTER_NAV_MS);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    dragMovedRef.current = false;
    pointerStartRef.current = { x: e.clientX, mv: x.get() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !pointerStartRef.current) return;
    const delta = e.clientX - pointerStartRef.current.x;
    if (Math.abs(delta) > DRAG_THRESHOLD) dragMovedRef.current = true;
    x.set(pointerStartRef.current.mv + delta);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    draggingRef.current = false;
    pointerStartRef.current = null;
    window.setTimeout(() => {
      dragMovedRef.current = false;
    }, 50);
  };

  const items = [...PROJECTS, ...PROJECTS];

  return (
    <div className="pb-14 border-b border-gray-200/20 flex flex-col gap-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[--text] mb-4">
            Explorations
          </h1>
          <p className="text-lg text-[--text] opacity-60">
            Musings on engineering, life, and everything in between
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-3 self-end sm:self-auto"
        >
          <CarouselButton onClick={goPrev} dir="prev" />
          <CarouselButton onClick={goNext} dir="next" />
        </motion.div>
      </div>

      <div
        ref={viewportRef}
        className="overflow-hidden -mx-6 px-6 select-none touch-pan-y"
        onMouseEnter={() => {
          hoverPausedRef.current = true;
        }}
        onMouseLeave={() => {
          hoverPausedRef.current = false;
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          style={{ x: xWrapped }}
        >
          {items.map((project, i) => {
            const isClone = i >= PROJECTS.length;
            return (
              <motion.a
                key={`${project.name}-${i}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                onClick={(e) => {
                  if (dragMovedRef.current) e.preventDefault();
                }}
                aria-hidden={isClone || undefined}
                tabIndex={isClone ? -1 : 0}
                initial={isClone ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  isClone
                    ? { duration: 0 }
                    : {
                        duration: 0.6,
                        delay: 0.2 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                whileHover="hover"
                className="group relative flex-none w-[78vw] sm:w-[220px] md:w-[240px] p-4 rounded-2xl border border-[--text]/10 bg-[--text]/[0.02] hover:bg-[--text]/[0.04] transition-colors duration-500 overflow-hidden"
              >
                <div className="w-full aspect-[4/3] rounded-xl bg-[--text]/5 mb-5 overflow-hidden relative">
                  <motion.div
                    className="w-full h-full"
                    variants={{ hover: { scale: 1.05 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[--text]/20">
                      <svg
                        className="w-8 h-8 mb-2 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs font-semibold uppercase tracking-widest">
                        Image Space
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 mix-blend-overlay"
                    variants={{ hover: { opacity: 1 } }}
                  />
                </div>

                <div className="relative z-10 flex flex-col px-1 pb-1">
                  <h3 className="text-lg font-bold tracking-tight text-[--text] flex items-center justify-between mb-1">
                    {project.name}
                    <motion.span
                      className="text-sm opacity-50"
                      variants={{
                        initial: { x: -5, opacity: 0 },
                        hover: { x: 0, opacity: 1 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      ↗
                    </motion.span>
                  </h3>
                  <p className="text-sm text-[--text]/60 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function CarouselButton({
  onClick,
  dir,
}: {
  onClick: () => void;
  dir: "prev" | "next";
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="w-11 h-11 rounded-full border border-[--text]/10 bg-[--text]/[0.02] hover:bg-[--text]/[0.06] hover:border-[--text]/20 transition-colors flex items-center justify-center text-[--text]/70 hover:text-[--text]"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={dir === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </motion.button>
  );
}
