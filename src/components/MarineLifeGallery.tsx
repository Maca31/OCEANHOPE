import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MarineCreature {
  name: string;
  description: string;
  status: string;
  imageQuery: string;
}

const marineCreatures: MarineCreature[] = [
  {
    name: 'Sea Turtles',
    description: 'Ancient mariners facing threats from plastic pollution and habitat loss.',
    status: 'Endangered',
    imageQuery: 'sea turtle swimming',
  },
  {
    name: 'Coral Reefs',
    description: 'Underwater rainforests supporting 25% of all marine species.',
    status: 'Threatened',
    imageQuery: 'coral reef underwater',
  },
  {
    name: 'Dolphins',
    description: 'Intelligent beings suffering from ocean pollution and noise.',
    status: 'Vulnerable',
    imageQuery: 'dolphin ocean',
  },
  {
    name: 'Whale Sharks',
    description: 'Gentle giants of the ocean requiring our protection.',
    status: 'Endangered',
    imageQuery: 'whale shark',
  },
  {
    name: 'Manta Rays',
    description: 'Graceful swimmers threatened by fishing and tourism.',
    status: 'Vulnerable',
    imageQuery: 'manta ray',
  },
  {
    name: 'Seahorses',
    description: 'Unique creatures losing their habitat to coastal development.',
    status: 'Vulnerable',
    imageQuery: 'seahorse',
  },
];

export function MarineLifeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="marine-life"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background"
    >
      <motion.div style={{ opacity }} className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            style={{ fontFamily: 'var(--font-serif)' }}
            className="mb-6"
          >
            <span className="block text-primary/60" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
              Discover
            </span>
            <span style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1', fontWeight: 600 }}>
              Marine Life We Protect
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-foreground/70 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: '1.8' }}
          >
            Every creature plays a vital role in the ocean's delicate ecosystem.
            Meet the species we're working to protect.
          </motion.p>
        </motion.div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {marineCreatures.map((creature, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [index % 2 === 0 ? 50 : -50, index % 2 === 0 ? -50 : 50]
            );

            return (
              <motion.div
                key={creature.name}
                style={{ y }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl magnetic ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                } ${index === 3 ? 'lg:row-span-2' : ''}`}
              >
                {/* Image */}
                <ImageWithFallback
                  src={`https://source.unsplash.com/featured/?${creature.imageQuery.replace(/ /g, ',')}`}
                  alt={creature.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <motion.div
                  className="absolute inset-0 p-6 flex flex-col justify-end"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {/* Status Badge */}
                  <motion.span
                    className="inline-block px-3 py-1 mb-3 rounded-full text-xs backdrop-blur-md w-fit"
                    style={{
                      backgroundColor:
                        creature.status === 'Endangered'
                          ? 'rgba(239, 68, 68, 0.2)'
                          : creature.status === 'Threatened'
                          ? 'rgba(251, 146, 60, 0.2)'
                          : 'rgba(234, 179, 8, 0.2)',
                      border: `1px solid ${
                        creature.status === 'Endangered'
                          ? 'rgba(239, 68, 68, 0.5)'
                          : creature.status === 'Threatened'
                          ? 'rgba(251, 146, 60, 0.5)'
                          : 'rgba(234, 179, 8, 0.5)'
                      }`,
                      color:
                        creature.status === 'Endangered'
                          ? '#fca5a5'
                          : creature.status === 'Threatened'
                          ? '#fdba74'
                          : '#fde047',
                    }}
                  >
                    {creature.status}
                  </motion.span>

                  <h3
                    className="text-white mb-2"
                    style={{ fontFamily: 'var(--font-serif)', fontSize: index === 0 ? '2rem' : '1.5rem', fontWeight: 600 }}
                  >
                    {creature.name}
                  </h3>
                  <p
                    className="text-white/80 group-hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: index === 0 ? '1rem' : '0.875rem', lineHeight: '1.6' }}
                  >
                    {creature.description}
                  </p>

                  {/* Hover Effect Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p
            className="text-foreground/60 italic"
            style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem' }}
          >
            "In every drop of water, there is a story of life worth protecting."
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
