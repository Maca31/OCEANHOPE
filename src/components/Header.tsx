import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Waves, Droplet, Heart, Users } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Our Story', href: '#story', icon: Heart },
    { name: 'Global Impact', href: '#impact', icon: Droplet },
    { name: 'Take Action', href: '#action', icon: Users },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-background/98 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-primary/10'
          : 'bg-background/40 backdrop-blur-md'
      }`}
    >
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo with Ocean Wave Animation */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 group magnetic"
        >
          <motion.div
            className="relative"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Waves className="h-8 w-8 text-primary relative z-10" />
            <motion.div
              className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              Ocean Hope
            </span>
            <motion.span
              className="text-xs text-muted-foreground tracking-wide"
              style={{ fontFamily: 'var(--font-sans)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Protecting Our Oceans
            </motion.span>
          </div>
        </motion.a>

        {/* Navigation Items with Icons */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="relative group magnetic flex items-center gap-2 cursor-pointer"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <Icon className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  {item.name}
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-primary to-primary/50"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Theme Toggle with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="magnetic rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </nav>
    </motion.header>
  );
}
