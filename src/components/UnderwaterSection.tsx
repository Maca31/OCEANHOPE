import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';

interface UnderwaterSectionProps {
  children: React.ReactNode;
  depth?: 'shallow' | 'medium' | 'deep';
  className?: string;
}

export function UnderwaterSection({ 
  children, 
  depth = 'medium',
  className = '' 
}: UnderwaterSectionProps) {
  const { theme } = useTheme();
  
  // Different visual effects based on depth and theme - INCREASED VISIBILITY
  const depthStyles = {
    shallow: {
      overlayLight: 'from-cyan-400/25 to-blue-400/20',
      overlayDark: 'from-cyan-500/12 to-blue-500/10',
      bubbles: 12,
      opacityLight: 0.5,
      opacityDark: 0.3,
    },
    medium: {
      overlayLight: 'from-blue-500/30 to-cyan-500/25',
      overlayDark: 'from-blue-600/15 to-cyan-600/12',
      bubbles: 16,
      opacityLight: 0.55,
      opacityDark: 0.35,
    },
    deep: {
      overlayLight: 'from-blue-700/35 to-indigo-700/30',
      overlayDark: 'from-blue-800/18 to-indigo-900/15',
      bubbles: 20,
      opacityLight: 0.6,
      opacityDark: 0.4,
    },
  };

  const style = depthStyles[depth];
  const overlay = theme === 'light' ? style.overlayLight : style.overlayDark;
  const opacity = theme === 'light' ? style.opacityLight : style.opacityDark;

  return (
    <div className={`relative ${className}`}>
      {/* Depth-based gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay} pointer-events-none`} />
      
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(style.bubbles)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full backdrop-blur-sm ${
              theme === 'light' ? 'bg-white/40' : 'bg-white/20'
            }`}
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              bottom: -20,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, opacity, opacity, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Swimming fish silhouettes */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${
        theme === 'light' ? 'opacity-60' : 'opacity-45'
      }`}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`fish-${i}`}
            className="absolute"
            style={{
              top: `${20 + i * 25}%`,
            }}
            initial={{ x: '-10%' }}
            animate={{
              x: ['110%', '-10%'],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear',
            }}
          >
            <svg
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="currentColor"
              className={theme === 'light' ? 'text-cyan-600/30' : 'text-cyan-400/20'}
            >
              <path d="M0 10 Q10 5, 20 10 Q10 15, 0 10 M20 10 L30 5 L35 10 L30 15 Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Light rays from above */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className={`absolute top-0 w-1 bg-gradient-to-b h-full ${
              theme === 'light'
                ? 'from-cyan-400/20 via-blue-400/10 to-transparent'
                : 'from-cyan-200/10 via-blue-200/5 to-transparent'
            }`}
            style={{
              left: `${25 + i * 20}%`,
              transformOrigin: 'top',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scaleX: [1, 1.5, 1],
              x: ['-5px', '5px', '-5px'],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Depth particles (marine snow effect) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full ${
              theme === 'light' ? 'bg-white/20' : 'bg-white/10'
            }`}
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: -10,
            }}
            animate={{
              y: [0, window.innerHeight + 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, theme === 'light' ? 0.4 : 0.3, theme === 'light' ? 0.4 : 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
}
