import React, { useEffect, useState } from 'react';
import {
  HeroSection,
  LifeStorySection,
  RosesSection,
  // ParishHistorySection,
  LegacySection,
  IntercessionSection,
  VisitParishSection
} from '../components/About';

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    window.addEventListener('scroll', handleScroll);
    const element = document.getElementById('saint-rita-story');
    if (element) observer.observe(element);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <HeroSection scrollY={scrollY} />
      <LifeStorySection isVisible={isVisible} />
      <RosesSection />
      {/* TODO <ParishHistorySection /> */}
      <LegacySection />
      <IntercessionSection />
      <VisitParishSection />
    </div>
  );
};

export default About;