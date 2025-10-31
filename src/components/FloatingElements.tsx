import React from 'react';
import { motion } from 'motion/react';

const FloatingElement = ({ delay, duration, x, y, size }: {
  delay: number;
  duration: number;
  x: string;
  y: string;
  size: number;
}) => (
  <motion.div
    className="absolute rounded-full opacity-20 blur-xl"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export function FloatingElements() {
  const elements = [
    { delay: 0, duration: 8, x: '10%', y: '20%', size: 100 },
    { delay: 1, duration: 10, x: '80%', y: '30%', size: 150 },
    { delay: 2, duration: 7, x: '60%', y: '70%', size: 80 },
    { delay: 1.5, duration: 9, x: '30%', y: '60%', size: 120 },
    { delay: 0.5, duration: 11, x: '90%', y: '80%', size: 90 },
    { delay: 2.5, duration: 8.5, x: '20%', y: '80%', size: 110 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((props, index) => (
        <FloatingElement key={index} {...props} />
      ))}
    </div>
  );
}
