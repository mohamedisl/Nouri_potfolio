import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="border-t border-zinc-900/80 py-8 text-xs text-zinc-500 relative z-10 bg-zinc-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-mono">
        <p>
          © {new Date().getFullYear()} {PROFILE_DATA.fullName}. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-zinc-400">
          <a
            href={PROFILE_DATA.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter / X
          </a>
          <span>•</span>
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};



