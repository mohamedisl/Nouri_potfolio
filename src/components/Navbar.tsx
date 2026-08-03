import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, Sun, Moon, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PROFILE_DATA } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800/60 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo & Name */}
          <button
            onClick={() => handleNavClick('hero')}
            className="text-left group focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base sm:text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                NOURI Mohammed Islam
              </span>
            </div>
            <p className="text-xs text-zinc-500 hidden sm:block">
              AI Engineer &amp; Full-Stack Web Developer
            </p>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm transition-colors ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Resume & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all bg-zinc-900/50"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </button>

            <a
              href={PROFILE_DATA.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm"
              title="Download / View CV in Google Drive"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV / Resume</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-900/50 text-zinc-300 border border-zinc-800"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-zinc-800/80 bg-[#0a0a0a]/95 rounded-xl px-3 shadow-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-zinc-900 text-white font-medium'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="pt-3 mt-2 border-t border-zinc-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Switch to Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-blue-600" />
                      <span>Switch to Dark Mode</span>
                    </>
                  )}
                </button>

                <a
                  href={PROFILE_DATA.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800"
                >
                  <FileText className="w-4 h-4 text-zinc-400" />
                  <span>View CV / Resume</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

