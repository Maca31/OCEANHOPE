import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { MagneticCursor } from './components/MagneticCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OceanDivingBackground } from './components/OceanDivingBackground';
import { UnderwaterSection } from './components/UnderwaterSection';
import { OceanFloor } from './components/OceanFloor';
import { StorySection } from './components/StorySection';
import { ImpactSection } from './components/ImpactSection';
import { ScrollRevealTimeline } from './components/ScrollRevealTimeline';
import { ActionSection } from './components/ActionSection';
import { Footer } from './components/Footer';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // GSAP scroll trigger setup (if needed for additional effects)
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.body.style.setProperty('--scroll', scrolled.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative overflow-x-hidden" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Ocean Diving Background Effect */}
      <OceanDivingBackground />
      
      <Header />
      <ScrollProgress />
      <MagneticCursor />
      <ScrollToTop />
      
      <main id="main" className="relative z-10">
        <HeroSection />
        
        <UnderwaterSection depth="shallow">
          <section id="story">
            <StorySection />
          </section>
        </UnderwaterSection>
        
        <UnderwaterSection depth="medium">
          <section id="impact">
            <ImpactSection />
            <ScrollRevealTimeline />
          </section>
        </UnderwaterSection>
        
        <UnderwaterSection depth="deep">
          <section id="action" className="relative">
            <ActionSection />
            <OceanFloor />
          </section>
        </UnderwaterSection>
      </main>

      <Footer />

      {/* Accessibility: Skip to main content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}