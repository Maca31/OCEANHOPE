import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The ocean is the lifeblood of our planet. Without healthy oceans, there is no healthy future for humanity.",
    author: "Dr. Sylvia Earle",
    role: "Marine Biologist & Explorer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    quote: "We need the ocean more than it needs us. It's time we recognize that relationship and act accordingly.",
    author: "Philippe Cousteau Jr.",
    role: "Ocean Advocate",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    quote: "Every drop of water, every creature, every ecosystem matters. The ocean connects us all.",
    author: "Dr. Ayana Elizabeth Johnson",
    role: "Marine Biologist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
];

export function ParallaxTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -200]);

  const yTransforms = [y1, y2, y3];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-primary/5" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

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
            Voices for the Ocean
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Inspiring words from leaders in ocean conservation and marine science
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              style={{ y: yTransforms[index] }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 h-full flex flex-col magnetic">
                {/* Quote Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Quote */}
                <blockquote
                  className="mb-8 flex-grow italic text-foreground/90"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <div>
                    <p
                      className="mb-1"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Decorative gradient */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
