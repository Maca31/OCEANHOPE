import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Waves, Fish, Droplet, TrendingUp } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: Waves,
    value: 71,
    suffix: '%',
    label: 'Ocean Coverage',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Fish,
    value: 2.2,
    suffix: 'M',
    label: 'Marine Species',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: Droplet,
    value: 97,
    suffix: '%',
    label: 'Water on Earth',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: TrendingUp,
    value: 80,
    suffix: '%',
    label: 'Oxygen from Ocean',
    color: 'from-cyan-500 to-teal-500',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="tabular-nums">
      {count.toFixed(suffix === '%' ? 0 : 1)}
      {suffix}
    </div>
  );
}

export function OceanStatsCounter() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            }}
          >
            Ocean by the Numbers
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Understanding the magnitude of our oceans and why they matter
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden magnetic">
                  {/* Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} p-3 shadow-lg`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>
                    </motion.div>

                    {/* Value */}
                    <div
                      className="mb-2"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                      }}
                    >
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* Label */}
                    <p
                      className="text-muted-foreground"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {stat.label}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-primary/5 blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
