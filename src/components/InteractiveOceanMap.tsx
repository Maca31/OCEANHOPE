import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, AlertCircle, Heart, Info } from 'lucide-react';

interface OceanZone {
  id: string;
  name: string;
  position: { x: string; y: string };
  status: 'critical' | 'warning' | 'protected';
  description: string;
  stats: {
    pollution: number;
    biodiversity: number;
    temperature: string;
  };
}

const oceanZones: OceanZone[] = [
  {
    id: 'pacific',
    name: 'Pacific Ocean',
    position: { x: '30%', y: '45%' },
    status: 'warning',
    description: 'The largest ocean, facing challenges from plastic pollution and warming temperatures.',
    stats: {
      pollution: 65,
      biodiversity: 82,
      temperature: '+1.2°C',
    },
  },
  {
    id: 'atlantic',
    name: 'Atlantic Ocean',
    position: { x: '52%', y: '40%' },
    status: 'critical',
    description: 'Critical areas affected by overfishing and industrial pollution.',
    stats: {
      pollution: 78,
      biodiversity: 68,
      temperature: '+1.5°C',
    },
  },
  {
    id: 'indian',
    name: 'Indian Ocean',
    position: { x: '65%', y: '60%' },
    status: 'warning',
    description: 'Rising temperatures threaten coral reefs and marine ecosystems.',
    stats: {
      pollution: 62,
      biodiversity: 75,
      temperature: '+1.3°C',
    },
  },
  {
    id: 'arctic',
    name: 'Arctic Ocean',
    position: { x: '50%', y: '15%' },
    status: 'critical',
    description: 'Rapidly melting ice caps affecting global sea levels.',
    stats: {
      pollution: 45,
      biodiversity: 58,
      temperature: '+2.8°C',
    },
  },
  {
    id: 'southern',
    name: 'Southern Ocean',
    position: { x: '50%', y: '85%' },
    status: 'protected',
    description: 'Protected marine reserves helping preserve unique ecosystems.',
    stats: {
      pollution: 38,
      biodiversity: 88,
      temperature: '+0.9°C',
    },
  },
];

const statusConfig = {
  critical: {
    color: 'from-red-500 to-orange-500',
    icon: AlertCircle,
    label: 'Critical',
    dotColor: 'bg-red-500',
  },
  warning: {
    color: 'from-yellow-500 to-orange-500',
    icon: Info,
    label: 'Warning',
    dotColor: 'bg-yellow-500',
  },
  protected: {
    color: 'from-green-500 to-emerald-500',
    icon: Heart,
    label: 'Protected',
    dotColor: 'bg-green-500',
  },
};

export function InteractiveOceanMap() {
  const [selectedZone, setSelectedZone] = useState<OceanZone | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />

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
            Global Ocean Health Monitor
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto mb-6"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Click on any ocean zone to explore real-time conservation data and current challenges
          </p>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {Object.entries(statusConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${config.dotColor}`} />
                  <span className="text-sm text-muted-foreground">{config.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-2xl bg-gradient-to-br from-blue-950/20 to-cyan-950/20 border border-border/50 overflow-hidden p-8"
          >
            {/* Ocean Background Animation */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)',
                backgroundSize: '200% 200%',
              }}
            />

            {/* World Map Outline (Simplified) */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 400">
              <path
                d="M 100 200 Q 200 180 300 200 T 500 200 T 700 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              />
              <ellipse cx="400" cy="200" rx="350" ry="150" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/30" />
            </svg>

            {/* Ocean Zone Markers */}
            {oceanZones.map((zone, index) => {
              const config = statusConfig[zone.status];
              return (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="absolute cursor-pointer magnetic"
                  style={{ left: zone.position.x, top: zone.position.y }}
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => setSelectedZone(zone)}
                >
                  {/* Pulsing Ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${config.dotColor} opacity-30`}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '40px', height: '40px', marginLeft: '-20px', marginTop: '-20px' }}
                  />

                  {/* Dot */}
                  <motion.div
                    className={`relative ${config.dotColor} rounded-full shadow-lg`}
                    style={{ width: '16px', height: '16px', marginLeft: '-8px', marginTop: '-8px' }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />

                  {/* Label on Hover */}
                  <AnimatePresence>
                    {hoveredZone === zone.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: -30 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/95 backdrop-blur-sm px-3 py-1 rounded-lg border border-border shadow-xl"
                      >
                        <p className="text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                          {zone.name}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {selectedZone ? (
                <motion.div
                  key={selectedZone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-8 rounded-2xl bg-card border border-border"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3
                        className="mb-2"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        }}
                      >
                        {selectedZone.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {React.createElement(statusConfig[selectedZone.status].icon, {
                          className: 'h-4 w-4',
                        })}
                        <span className="text-sm text-muted-foreground">
                          Status: {statusConfig[selectedZone.status].label}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedZone(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </motion.button>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                    {selectedZone.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Pollution Level</span>
                        <span className="text-sm">{selectedZone.stats.pollution}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedZone.stats.pollution}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Biodiversity Index</span>
                        <span className="text-sm">{selectedZone.stats.biodiversity}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedZone.stats.biodiversity}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Temperature Change</span>
                        <span className="text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                          {selectedZone.stats.temperature}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 rounded-2xl bg-card/50 border border-dashed border-border flex items-center justify-center min-h-[400px]"
                >
                  <div className="text-center">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                      Select an ocean zone to view details
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
