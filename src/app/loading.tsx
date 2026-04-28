'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Trigger a rotation every 1.2 seconds
    const interval = setInterval(() => {
      setRotation((prev) => prev + 120); // 120 degrees keeps the triangle upright after 3 spins
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-12">
      <motion.div
        className="w-12 h-12 bg-[--text]"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
        animate={{ rotate: rotation }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 10,
          mass: 1
        }}
      />
      <motion.div 
        className="text-xs font-semibold tracking-[0.3em] uppercase text-[--text]"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading
      </motion.div>
    </div>
  );
}
