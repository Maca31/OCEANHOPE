import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Recycle, 
  ShoppingBag, 
  Users, 
  Share2, 
  Lightbulb, 
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface ActionCard {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  impact: string;
  color: string;
  actions: string[];
}

const actionCards: ActionCard[] = [
  {
    id: 'reduce',
    title: 'Reduce Plastic',
    icon: Recycle,
    description: 'Make simple swaps to eliminate single-use plastics from your daily life.',
    impact: 'Prevent 100+ plastic items from entering the ocean annually',
    color: 'from-emerald-500 to-teal-500',
    actions: [
      'Use reusable water bottles and coffee cups',
      'Bring your own bags for shopping',
      'Choose products with minimal packaging',
      'Say no to plastic straws and utensils',
    ],
  },
  {
    id: 'consume',
    title: 'Conscious Consumption',
    icon: ShoppingBag,
    description: 'Support sustainable seafood and ocean-friendly products.',
    impact: 'Help rebuild fish populations and protect marine habitats',
    color: 'from-blue-500 to-cyan-500',
    actions: [
      'Choose certified sustainable seafood',
      'Support eco-friendly brands',
      'Reduce overall consumption',
      'Buy local and seasonal products',
    ],
  },
  {
    id: 'community',
    title: 'Join Cleanups',
    icon: Users,
    description: 'Participate in beach and coastal cleanup initiatives.',
    impact: 'Remove thousands of pounds of debris from shorelines',
    color: 'from-violet-500 to-purple-500',
    actions: [
      'Join local beach cleanup events',
      'Organize your own cleanup day',
      'Pick up litter whenever you visit the coast',
      'Properly dispose of fishing lines and gear',
    ],
  },
  {
    id: 'spread',
    title: 'Spread Awareness',
    icon: Share2,
    description: 'Educate others about ocean conservation and inspire action.',
    impact: 'Multiply your impact by inspiring others to act',
    color: 'from-orange-500 to-red-500',
    actions: [
      'Share ocean conservation content',
      'Talk to friends and family',
      'Support ocean advocacy organizations',
      'Use your voice on social media',
    ],
  },
  {
    id: 'educate',
    title: 'Learn & Teach',
    icon: Lightbulb,
    description: 'Stay informed about ocean issues and share knowledge.',
    impact: 'Create lasting change through education',
    color: 'from-yellow-500 to-amber-500',
    actions: [
      'Watch ocean documentaries',
      'Read about marine conservation',
      'Teach children about ocean life',
      'Attend conservation workshops',
    ],
  },
  {
    id: 'support',
    title: 'Support Conservation',
    icon: Heart,
    description: 'Donate time or resources to ocean protection organizations.',
    impact: 'Fund critical research and conservation projects',
    color: 'from-pink-500 to-rose-500',
    actions: [
      'Donate to marine conservation groups',
      'Adopt a sea creature or coral',
      'Volunteer with ocean organizations',
      'Participate in citizen science projects',
    ],
  },
];

export function InteractiveActionCards() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const toggleAction = (actionId: string) => {
    const newCompleted = new Set(completedActions);
    if (newCompleted.has(actionId)) {
      newCompleted.delete(actionId);
    } else {
      newCompleted.add(actionId);
    }
    setCompletedActions(newCompleted);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
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
            Dive Into Action
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Every action counts. Choose your commitment and start making waves for ocean conservation.
          </p>
          <p
            className="text-sm text-primary"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            💡 Click any card to explore actionable steps you can take today
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {actionCards.map((card, index) => {
            const Icon = card.icon;
            const isSelected = selectedCard === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => setSelectedCard(isSelected ? null : card.id)}
                className="cursor-pointer group"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden magnetic ${
                    isSelected
                      ? 'bg-card border-primary shadow-xl shadow-primary/20'
                      : 'bg-card/50 border-border hover:border-primary/50'
                  }`}
                >
                  {/* Gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-4"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} p-3 shadow-lg`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3
                      className="mb-2"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                      }}
                    >
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-muted-foreground text-sm mb-3"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {card.description}
                    </p>

                    {/* Impact */}
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span style={{ fontFamily: 'var(--font-sans)' }}>{card.impact}</span>
                    </div>

                    {/* Expand indicator */}
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-sm"
                      animate={{ x: isSelected ? 5 : 0 }}
                    >
                      <span style={{ fontFamily: 'var(--font-sans)' }}>
                        {isSelected ? 'Hide details' : 'View action steps'}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Card Details */}
        <AnimatePresence mode="wait">
          {selectedCard && (
            <motion.div
              key={selectedCard}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {(() => {
                const card = actionCards.find((c) => c.id === selectedCard);
                if (!card) return null;

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="p-8 rounded-2xl bg-card border border-primary/50 shadow-2xl"
                  >
                    <h3
                      className="mb-6"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      }}
                    >
                      Your Action Plan: {card.title}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {card.actions.map((action, index) => {
                        const actionId = `${card.id}-${index}`;
                        const isCompleted = completedActions.has(actionId);

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => toggleAction(actionId)}
                            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 magnetic ${
                              isCompleted
                                ? 'bg-primary/10 border-primary'
                                : 'bg-background/50 border-border hover:border-primary/50'
                            }`}
                          >
                            <motion.div
                              animate={{
                                scale: isCompleted ? 1 : 0.8,
                                rotate: isCompleted ? 0 : 0,
                              }}
                              transition={{ type: 'spring', stiffness: 200 }}
                            >
                              <CheckCircle
                                className={`h-5 w-5 flex-shrink-0 ${
                                  isCompleted ? 'text-primary' : 'text-muted-foreground'
                                }`}
                              />
                            </motion.div>
                            <p
                              className={`text-sm ${
                                isCompleted ? 'text-foreground' : 'text-muted-foreground'
                              }`}
                              style={{ fontFamily: 'var(--font-sans)' }}
                            >
                              {action}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20"
                    >
                      <p className="text-sm text-center" style={{ fontFamily: 'var(--font-sans)' }}>
                        ✨ <strong>Progress:</strong> {completedActions.size} actions completed!
                        Keep going to make a bigger impact.
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
