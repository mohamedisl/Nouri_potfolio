import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  // Smooth scroll and active section observer
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      const topOffset = elem.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-black font-sans relative">
      {/* Animated Interactive Background */}
      <AnimatedBackground />

      {/* Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero with Full Name & Dedicated Profile Picture Studio */}
        <Hero
          onNavigate={handleNavigate}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* 2. AI Engineering & Modern Web Dev Skill Matrix */}
        <SkillsSection />

        {/* 3. Featured AI & Full-Stack Projects with Architecture Modal */}
        <ProjectsSection />

        {/* 4. Contact & Connect Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Printable / Downloadable Resume CV Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
