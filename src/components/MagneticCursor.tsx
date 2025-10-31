import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { useTheme } from './ThemeProvider';

export function MagneticCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const { theme } = useTheme();

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      setPosition({ x: newX, y: newY });
      cursorX.set(newX);
      cursorY.set(newY);

      // Create bubble trail randomly
      if (Math.random() > 0.92) {
        const newBubble = {
          id: Date.now() + Math.random(),
          x: newX + (Math.random() - 0.5) * 20,
          y: newY + (Math.random() - 0.5) * 20,
        };
        setBubbles(prev => [...prev.slice(-8), newBubble]);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.classList && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('magnetic'))) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [cursorX, cursorY]);

  // Clean up old bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => prev.slice(-6));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Bubble trail effect */}
      {bubbles.map((bubble, index) => (
        <motion.div
          key={bubble.id}
          className="pointer-events-none fixed z-[9999]"
          initial={{ 
            x: bubble.x, 
            y: bubble.y,
            opacity: 0.6,
            scale: 0.5,
          }}
          animate={{
            y: bubble.y - 100,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
          }}
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className={`h-2 w-2 rounded-full ${
              theme === 'light' 
                ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
                : 'bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.6)]'
            }`}
          />
        </motion.div>
      ))}

      {/* Main cursor - Ocean bubble */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Outer glow */}
        <motion.div
          animate={{
            scale: isHovering ? 2.5 : 1.8,
            opacity: isHovering ? 0.3 : 0.2,
          }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 rounded-full blur-xl ${
            theme === 'light'
              ? 'bg-cyan-400'
              : 'bg-blue-400'
          }`}
          style={{
            width: '32px',
            height: '32px',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Main bubble */}
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
          className={`relative rounded-full border-2 backdrop-blur-sm ${
            theme === 'light'
              ? 'bg-gradient-to-br from-cyan-300/30 to-blue-400/20 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.5)]'
              : 'bg-gradient-to-br from-blue-400/20 to-cyan-300/10 border-blue-300/40 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
          }`}
          style={{
            width: '24px',
            height: '24px',
          }}
        >
          {/* Bubble highlight */}
          <div 
            className={`absolute top-1 left-1 w-2 h-2 rounded-full ${
              theme === 'light' ? 'bg-white/60' : 'bg-white/40'
            }`}
          />
          
          {/* Inner shimmer */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute inset-0 rounded-full ${
              theme === 'light'
                ? 'bg-gradient-to-br from-cyan-200/40 to-transparent'
                : 'bg-gradient-to-br from-blue-200/30 to-transparent'
            }`}
          />
        </motion.div>

        {/* Ripple effect on hover */}
        {isHovering && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ 
              scale: 2.5, 
              opacity: 0,
            }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className={`absolute inset-0 rounded-full border-2 ${
              theme === 'light'
                ? 'border-cyan-400'
                : 'border-blue-400'
            }`}
            style={{
              width: '24px',
              height: '24px',
            }}
          />
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          animate={{
            scale: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className={`h-1.5 w-1.5 rounded-full ${
            theme === 'light'
              ? 'bg-cyan-500'
              : 'bg-blue-400'
          }`}
        />
      </motion.div>
    </>
  );
}