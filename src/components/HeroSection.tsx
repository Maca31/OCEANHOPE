import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { ParticleField } from './ParticleField';
import { OceanWaves } from './OceanWaves';
import { FloatingElements } from './FloatingElements';
import { useTheme } from './ThemeProvider';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const celestialY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100vh',
        height: 'calc(100vh - var(--navbar-height, 84px))',
        paddingTop: 'var(--navbar-height, 84px)',
      }}
    >
      {/* Particle Field */}
      <ParticleField />
      
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Sun/Moon with Ocean Reflection */}
      <motion.div 
        style={{ y: celestialY }}
        className="absolute top-24 right-1/4 z-0"
      >
        {theme === 'light' ? (
          // Sun
          <div className="relative">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400 shadow-2xl"
              animate={{
                boxShadow: [
                  '0 0 60px 20px rgba(251, 191, 36, 0.4)',
                  '0 0 80px 30px rgba(251, 191, 36, 0.6)',
                  '0 0 60px 20px rgba(251, 191, 36, 0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Sun rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-transparent to-amber-300/40 origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scaleY: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        ) : (
          // Moon
          <div className="relative">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-2xl"
              animate={{
                boxShadow: [
                  '0 0 40px 15px rgba(148, 163, 184, 0.3)',
                  '0 0 60px 25px rgba(148, 163, 184, 0.5)',
                  '0 0 40px 15px rgba(148, 163, 184, 0.3)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Moon craters */}
              <div className="absolute top-4 right-6 w-4 h-4 rounded-full bg-slate-300/50" />
              <div className="absolute top-12 right-4 w-3 h-3 rounded-full bg-slate-300/40" />
              <div className="absolute bottom-8 left-6 w-5 h-5 rounded-full bg-slate-300/30" />
            </motion.div>
            {/* Moon glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-slate-200/20 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        )}
        
        {/* Ocean Reflection */}
        <motion.div
          className="absolute top-48 left-1/2 -translate-x-1/2 w-full"
          initial={{ opacity: 0.6 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scaleY: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className={`w-32 h-48 ${
              theme === 'light'
                ? 'bg-gradient-to-b from-amber-400/30 via-yellow-300/20 to-transparent'
                : 'bg-gradient-to-b from-slate-200/20 via-slate-300/10 to-transparent'
            } blur-sm`}
            style={{
              clipPath: 'polygon(40% 0%, 60% 0%, 80% 100%, 20% 100%)',
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Animated Ocean Waves */}
      <OceanWaves />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="mb-6"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: '1.1', fontWeight: 600 }}
        >
          Protecting Our Oceans,
          <br />
          <span className="text-primary">Preserving Our Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="mb-12 text-foreground/70 max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: '1.6' }}
        >
          Every wave carries a story. Every action creates ripples of change.
          Join us in our mission to restore and protect the world's oceans
          for generations to come.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="magnetic px-8 py-6 group relative overflow-hidden"
            onClick={() => {
              const target = document.querySelector('#action');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <span className="relative z-10" style={{ fontFamily: 'var(--font-sans)' }}>Take Action Now</span>
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="magnetic px-8 py-6"
            style={{ fontFamily: 'var(--font-sans)' }}
            onClick={() => {
              const target = document.querySelector('#story');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Learn More
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-6 w-6 text-foreground/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}