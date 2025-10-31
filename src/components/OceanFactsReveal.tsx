import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Waves, AlertTriangle, Heart, Lightbulb } from 'lucide-react';

interface Fact {
  icon: React.ElementType;
  stat: string;
  description: string;
  color: string;
}

const facts: Fact[] = [
  {
    icon: Waves,
    stat: '8 Million Tons',
    description: 'of plastic enter our oceans every year—equivalent to dumping a garbage truck every minute.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: AlertTriangle,
    stat: '90% Depleted',
    description: 'of large fish populations have been depleted since industrial fishing began.',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Heart,
    stat: '50% Lost',
    description: 'of coral reefs have died in the last 30 years due to climate change and pollution.',
    color: 'from-yellow-500 to-emerald-500',
  },
  {
    icon: Lightbulb,
    stat: 'We Can Fix This',
    description: 'With collective action, we can restore ocean health within a generation. Your choices matter.',
    color: 'from-emerald-500 to-cyan-500',
  },
];

export function OceanFactsReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      
      {/* Decorative waves */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <motion.path
            d="M0,100 Q300,150 600,100 T1200,100 L1200,400 L0,400 Z"
            fill="currentColor"
            className="text-primary"
            animate={{
              d: [
                'M0,100 Q300,150 600,100 T1200,100 L1200,400 L0,400 Z',
                'M0,120 Q300,80 600,120 T1200,120 L1200,400 L0,400 Z',
                'M0,100 Q300,150 600,100 T1200,100 L1200,400 L0,400 Z',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

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
            The Urgent Reality
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Understanding the scale of the challenge helps us appreciate the importance of action
          </p>
        </motion.div>

        <div className="space-y-32">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`flex items-center gap-12 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                } flex-col lg:flex-row`}
              >
                {/* Icon Side */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0"
                >
                  <div
                    className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${fact.color} p-8 shadow-2xl relative overflow-hidden`}
                  >
                    <Icon className="w-full h-full text-white relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>

                {/* Content Side */}
                <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'} text-center lg:text-inherit`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <div className="inline-block p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500">
                      <h3
                        className="mb-4"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(2rem, 4vw, 3rem)',
                        }}
                      >
                        {fact.stat}
                      </h3>
                      <p
                        className="text-muted-foreground max-w-md"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                        }}
                      >
                        {fact.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="inline-block p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-cyan-500/20 to-primary/20 border border-primary/30 backdrop-blur-sm">
            <h3
              className="mb-4"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              }}
            >
              Every Second Counts
            </h3>
            <p
              className="text-muted-foreground mb-8 max-w-lg mx-auto"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              The ocean doesn't need our pity—it needs our action. Start making a difference today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const target = document.querySelector('#action');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-10 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors magnetic shadow-xl shadow-primary/30"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Commit to Action
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
