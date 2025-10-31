import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';

export function OceanFloor() {
  const { theme } = useTheme();
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
      {/* Seaweed/Kelp silhouettes */}
      <svg
        className={`absolute bottom-0 w-full h-full ${
          theme === 'light' ? 'opacity-50' : 'opacity-35'
        }`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        {/* Seaweed strands */}
        {[...Array(15)].map((_, i) => {
          const x = (i * 80) + (Math.random() * 40);
          return (
            <motion.g
              key={i}
              animate={{
                transform: [`translateX(${x}px) rotate(0deg)`, `translateX(${x}px) rotate(${3 + Math.random() * 3}deg)`, `translateX(${x}px) rotate(0deg)`],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
              style={{ transformOrigin: 'bottom center' }}
            >
              <path
                d={`M ${x} 120 Q ${x - 10} ${90 - Math.random() * 20} ${x} ${60 - Math.random() * 20} Q ${x + 10} ${30 - Math.random() * 10} ${x} ${Math.random() * 10}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={theme === 'light' ? 'text-emerald-600/60' : 'text-emerald-600/40'}
              />
              {/* Leaves */}
              <ellipse
                cx={x - 8}
                cy={80 - Math.random() * 30}
                rx="5"
                ry="8"
                fill="currentColor"
                className={theme === 'light' ? 'text-emerald-600/50' : 'text-emerald-600/30'}
              />
              <ellipse
                cx={x + 8}
                cy={60 - Math.random() * 20}
                rx="5"
                ry="8"
                fill="currentColor"
                className={theme === 'light' ? 'text-emerald-600/50' : 'text-emerald-600/30'}
              />
            </motion.g>
          );
        })}

        {/* Coral shapes */}
        {[...Array(8)].map((_, i) => {
          const x = 150 + (i * 140) + (Math.random() * 50);
          const height = 20 + Math.random() * 30;
          return (
            <g key={`coral-${i}`}>
              {/* Branching coral */}
              <path
                d={`
                  M ${x} 120 
                  L ${x} ${120 - height}
                  M ${x - 10} ${120 - height * 0.7} L ${x} ${120 - height * 0.6}
                  M ${x + 10} ${120 - height * 0.5} L ${x} ${120 - height * 0.4}
                  M ${x - 8} ${120 - height * 0.3} L ${x} ${120 - height * 0.2}
                `}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className={theme === 'light' ? 'text-rose-400/50' : 'text-rose-400/30'}
              />
              {/* Coral polyps */}
              <circle cx={x} cy={120 - height} r="4" fill="currentColor" className={theme === 'light' ? 'text-rose-300/60' : 'text-rose-300/40'} />
              <circle cx={x - 10} cy={120 - height * 0.7} r="3" fill="currentColor" className={theme === 'light' ? 'text-rose-300/60' : 'text-rose-300/40'} />
              <circle cx={x + 10} cy={120 - height * 0.5} r="3" fill="currentColor" className={theme === 'light' ? 'text-rose-300/60' : 'text-rose-300/40'} />
            </g>
          );
        })}

        {/* Rock formations */}
        {[...Array(6)].map((_, i) => {
          const x = 100 + (i * 200);
          const width = 40 + Math.random() * 60;
          const height = 15 + Math.random() * 25;
          return (
            <ellipse
              key={`rock-${i}`}
              cx={x}
              cy={120}
              rx={width}
              ry={height}
              fill="currentColor"
              className={theme === 'light' ? 'text-slate-500/30' : 'text-slate-600/20'}
            />
          );
        })}

        {/* Sand dunes (gentle curves at bottom) */}
        <path
          d="M 0 120 Q 300 100, 600 120 T 1200 120 L 1200 130 L 0 130 Z"
          fill="currentColor"
          className={theme === 'light' ? 'text-amber-700/20' : 'text-amber-800/10'}
        />
      </svg>

      {/* Gradient fade to hide harsh edges */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
  );
}
