import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Waves, Fish, Anchor, AlertTriangle } from 'lucide-react';

interface DepthZone {
  name: string;
  depth: string;
  description: string;
  icon: any;
  threat: string;
  color: string;
}

const depthZones: DepthZone[] = [
  {
    name: 'Surface Zone',
    depth: '0 - 200m',
    description: 'The sunlit zone where most marine life thrives. Home to coral reefs and diverse ecosystems.',
    icon: Waves,
    threat: 'Plastic pollution and oil spills',
    color: 'from-blue-400 to-blue-500',
  },
  {
    name: 'Twilight Zone',
    depth: '200 - 1000m',
    description: 'A mysterious realm where sunlight fades. Many species migrate here daily.',
    icon: Fish,
    threat: 'Overfishing and deep-sea trawling',
    color: 'from-blue-600 to-blue-700',
  },
  {
    name: 'Midnight Zone',
    depth: '1000 - 4000m',
    description: 'Complete darkness where bioluminescent creatures create their own light.',
    icon: Anchor,
    threat: 'Deep-sea mining and waste dumping',
    color: 'from-blue-800 to-blue-900',
  },
  {
    name: 'Abyss',
    depth: '4000m+',
    description: 'The deepest, most unexplored part of our oceans. A frontier we must protect.',
    icon: AlertTriangle,
    threat: 'Climate change and acidification',
    color: 'from-blue-950 to-black',
  },
];

export function OceanDepthExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="depths"
      ref={containerRef}
      className="relative min-h-[400vh] bg-gradient-to-b from-background to-blue-950"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient that changes with scroll */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 0.25, 0.5, 0.75, 1],
              [
                'linear-gradient(to bottom, #60a5fa, #3b82f6)',
                'linear-gradient(to bottom, #2563eb, #1d4ed8)',
                'linear-gradient(to bottom, #1e40af, #1e3a8a)',
                'linear-gradient(to bottom, #1e3a8a, #172554)',
                'linear-gradient(to bottom, #0c1844, #000000)',
              ]
            ),
          }}
        />

        {/* Depth Indicator */}
        <motion.div
          className="absolute left-10 top-1/2 -translate-y-1/2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
          }}
        >
          <div className="flex items-center gap-4">
            <div className="h-64 w-1 bg-white/20 rounded-full relative">
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary rounded-full"
                style={{
                  height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                }}
              />
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50"
                style={{
                  top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                }}
              />
            </div>
            <motion.div
              className="text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <motion.p
                className="text-sm opacity-70 mb-1"
              >
                Depth
              </motion.p>
              <motion.p
                className="text-2xl font-semibold"
                style={{
                  opacity: useTransform(scrollYProgress, [0, 1], [1, 1]),
                }}
              >
                {useTransform(scrollYProgress, [0, 1], (value) => {
                  const depth = Math.floor(value * 6000);
                  return `${depth}m`;
                })}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6">
          {depthZones.map((zone, index) => {
            const start = index / depthZones.length;
            const end = (index + 1) / depthZones.length;
            const Icon = zone.icon;

            const opacity = useTransform(
              scrollYProgress,
              [start - 0.1, start, end, end + 0.1],
              [0, 1, 1, 0]
            );

            const scale = useTransform(
              scrollYProgress,
              [start - 0.1, start, end, end + 0.1],
              [0.8, 1, 1, 0.8]
            );

            const y = useTransform(
              scrollYProgress,
              [start - 0.1, start, end, end + 0.1],
              [100, 0, 0, -100]
            );

            return (
              <motion.div
                key={zone.name}
                style={{ opacity, scale, y }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-3xl text-center text-white">
                  {/* Icon */}
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/20"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-10 h-10" />
                  </motion.div>

                  {/* Zone Name */}
                  <motion.h2
                    style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 600 }}
                    className="mb-4"
                  >
                    {zone.name}
                  </motion.h2>

                  {/* Depth */}
                  <motion.p
                    className="text-primary text-xl mb-6"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {zone.depth}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    className="text-white/80 text-lg mb-8 leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {zone.description}
                  </motion.p>

                  {/* Threat Warning */}
                  <motion.div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/20 border border-red-500/30 backdrop-blur-md"
                    whileHover={{ scale: 1.05 }}
                  >
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-red-200" style={{ fontFamily: 'var(--font-sans)' }}>
                      Threat: {zone.threat}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
