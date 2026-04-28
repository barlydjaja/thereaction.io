"use client";

import { motion } from "framer-motion";

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

export default function FeedHeader() {
  return (
    <div className="mb-14 pb-14 border-b border-gray-200/20 flex flex-col gap-10">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover="hover"
            className="group block relative p-4 rounded-2xl border border-[--text]/10 bg-[--text]/[0.02] hover:bg-[--text]/[0.04] transition-colors duration-500 overflow-hidden"
          >
            {/* Image Placeholder */}
            <div className="w-full aspect-[4/3] rounded-xl bg-[--text]/5 mb-5 overflow-hidden relative">
              <motion.div
                className="w-full h-full"
                variants={{ hover: { scale: 1.05 } }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* User will add their image here later */}
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

              {/* Overlay gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 mix-blend-overlay"
                variants={{ hover: { opacity: 1 } }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col px-1 pb-1">
              <h3 className="text-lg font-bold tracking-tight text-[--text] flex items-center justify-between mb-1">
                {project.name}
                <motion.span
                  className="text-sm opacity-50"
                  variants={{
                    initial: { x: -5, opacity: 0 },
                    hover: { x: 0, opacity: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  ↗
                </motion.span>
              </h3>
              <p className="text-sm text-[--text]/60 leading-relaxed">
                {project.desc}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
