import React from 'react';
import { motion, useScroll } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 z-[101] origin-left pointer-events-none shadow-[0_0_10px_rgba(34,211,238,0.5)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
