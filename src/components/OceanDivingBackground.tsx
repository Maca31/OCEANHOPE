import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTheme } from './ThemeProvider';

export function OceanDivingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  
  // Light mode: Bright daylight ocean colors - INCREASED VISIBILITY
  // Dark mode: Deep nighttime ocean colors - INCREASED VISIBILITY
  const lightModeColors = [
    'rgba(191, 219, 254, 0.25)',  // Very light blue at top
    'rgba(125, 211, 252, 0.35)',  // Light cyan in middle
    'rgba(56, 189, 248, 0.4)',    // Bright sky blue
    'rgba(14, 165, 233, 0.45)',   // Deep cyan at bottom
  ];
  
  const darkModeColors = [
    'rgba(59, 130, 246, 0.08)',   // Light blue at top
    'rgba(14, 165, 233, 0.12)',   // Cyan in middle
    'rgba(6, 95, 212, 0.16)',     // Deeper blue
    'rgba(30, 58, 138, 0.2)',     // Deep ocean blue at bottom
  ];
  
  // Transform scroll progress to depth (color gets darker as you scroll)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    theme === 'light' ? lightModeColors : darkModeColors
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawWave = (
      ctx: CanvasRenderingContext2D,
      yOffset: number,
      amplitude: number,
      frequency: number,
      phase: number,
      opacity: number,
      gradient: boolean = false
    ) => {
      const width = canvas.width;
      const height = canvas.height;
      const isDark = theme === 'dark';

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 2) {
        const y =
          yOffset +
          Math.sin((x / width) * Math.PI * frequency + phase) * amplitude +
          Math.sin((x / width) * Math.PI * frequency * 2 + phase * 1.3) * (amplitude / 2);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      if (gradient) {
        const grad = ctx.createLinearGradient(0, yOffset - amplitude * 2, 0, height);
        if (isDark) {
          // Dark mode: Deep, mysterious ocean
          grad.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
          grad.addColorStop(0.5, `rgba(14, 165, 233, ${opacity * 0.7})`);
          grad.addColorStop(1, `rgba(6, 182, 212, ${opacity * 0.4})`);
        } else {
          // Light mode: Bright, vibrant daylight ocean
          grad.addColorStop(0, `rgba(125, 211, 252, ${opacity * 2})`);
          grad.addColorStop(0.5, `rgba(56, 189, 248, ${opacity * 1.5})`);
          grad.addColorStop(1, `rgba(14, 165, 233, ${opacity})`);
        }
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = isDark 
          ? `rgba(59, 130, 246, ${opacity})` 
          : `rgba(56, 189, 248, ${opacity * 2})`;
      }

      ctx.fill();
    };

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      time += 0.008;

      // Multiple wave layers creating depth effect - INCREASED OPACITY
      const isDark = theme === 'dark';
      const opacityMultiplier = isDark ? 1.5 : 2.5;
      
      // Layer 1 - Deepest (slowest, largest)
      drawWave(ctx, height * 0.8, 60, 1.5, time * 0.5, 0.03 * opacityMultiplier, true);

      // Layer 2 - Deep
      drawWave(ctx, height * 0.7, 50, 2, time * 0.7, 0.05 * opacityMultiplier, true);

      // Layer 3 - Middle
      drawWave(ctx, height * 0.55, 45, 2.5, time * 0.9, 0.06 * opacityMultiplier, true);

      // Layer 4 - Shallow
      drawWave(ctx, height * 0.4, 40, 3, time * 1.1, 0.07 * opacityMultiplier, true);

      // Layer 5 - Surface ripples
      drawWave(ctx, height * 0.25, 30, 4, time * 1.5, 0.08 * opacityMultiplier, true);

      // Add some floating particles (bubbles/plankton effect)
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';
      for (let i = 0; i < 30; i++) {
        const x = (i * width) / 30 + Math.sin(time + i) * 50;
        const y = ((i * 137.5) % height) - (time * 20) % height;
        const size = Math.sin(time + i) * 2 + 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {/* Gradient background that changes with scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor }}
      />
      
      {/* Animated wave canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${
          theme === 'light' ? 'opacity-80' : 'opacity-70'
        }`}
      />
      
      {/* Light rays effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute top-0 w-px bg-gradient-to-b ${
              theme === 'light' 
                ? 'from-cyan-400/40 via-blue-400/20 to-transparent' 
                : 'from-cyan-300/20 via-blue-300/10 to-transparent'
            }`}
            style={{
              left: `${20 + i * 20}%`,
              height: '100%',
              transformOrigin: 'top',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleY: [1, 1.1, 1],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle caustic light effect */}
      <motion.div
        className={`absolute inset-0 ${
          theme === 'light'
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(125,211,252,0.2),transparent_70%)]'
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
