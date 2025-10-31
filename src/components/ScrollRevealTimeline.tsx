import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, TrendingDown, Target, Zap } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const events: TimelineEvent[] = [
  {
    year: '1950s',
    title: 'The Beginning of Decline',
    description: 'Industrial fishing and pollution begin to significantly impact ocean ecosystems worldwide.',
    icon: Calendar,
    color: 'from-red-500 to-orange-500',
  },
  {
    year: '1970s',
    title: 'Rising Awareness',
    description: 'Scientists and activists start documenting marine degradation and calling for ocean protection.',
    icon: TrendingDown,
    color: 'from-orange-500 to-yellow-500',
  },
  {
    year: '2000s',
    title: 'Global Action',
    description: 'International agreements and marine protected areas expand, but challenges intensify.',
    icon: Target,
    color: 'from-yellow-500 to-green-500',
  },
  {
    year: 'Today',
    title: 'Critical Moment',
    description: 'We have the technology and knowledge to reverse damage—but time is running out.',
    icon: Zap,
    color: 'from-green-500 to-cyan-500',
  },
];

export function ScrollRevealTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background - more transparent for ocean effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            }}
          >
            Our Ocean's Journey
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            From industrial impact to conservation action—how we got here and where we're going
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary to-cyan-500"
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-24">
            {events.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col gap-8`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="inline-block w-full"
                    >
                      <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 magnetic">
                        <div className={`mb-4 ${isEven ? 'md:flex md:justify-end' : 'md:flex md:justify-start'} flex justify-center`}>
                          <span
                            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            {event.year}
                          </span>
                        </div>
                        <h3
                          className="mb-3"
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                          }}
                        >
                          {event.title}
                        </h3>
                        <p
                          className="text-muted-foreground"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    className="relative z-10 hidden md:block"
                  >
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${event.color} p-4 shadow-xl border-4 border-background`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.div>

                  {/* Mobile Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    className="md:hidden"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${event.color} p-3 shadow-xl`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </div>
                  </motion.div>

                  {/* Spacer for even layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action at the end */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 text-center"
          >
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/30">
              <h3
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                }}
              >
                The Future is Unwritten
              </h3>
              <p
                className="text-muted-foreground mb-6 max-w-md mx-auto"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Together, we can write a new chapter—one where our oceans thrive and future generations inherit a blue planet full of life.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors magnetic"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Join the Movement
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
