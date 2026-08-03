import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Copy, 
  Check, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Get in Touch
          </h2>
          <p className="text-base text-zinc-400">
            Interested in collaboration, AI engineering, or technical consultation? Feel free to reach out directly.
          </p>
        </div>

        {/* Contact Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Direct Email Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Primary Email
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs sm:text-sm font-mono font-medium text-zinc-300 break-all">
                    {PROFILE_DATA.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="shrink-0 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {copiedEmail && (
                  <div className="mt-1 inline-flex items-center gap-1.5 text-blue-400 text-xs font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Copied to clipboard!</span>
                  </div>
                )}
              </div>
            </div>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </a>
          </div>

          {/* Twitter / X Card */}
          <a
            href={PROFILE_DATA.twitter || "https://x.com/Nouri_mohaa"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                  Twitter / X
                </h3>
                <p className="text-xs text-zinc-400">
                  Follow &amp; Message
                </p>
              </div>
            </div>
            <span className="text-xs font-medium text-zinc-400 group-hover:translate-x-1 transition-transform">
              Follow →
            </span>
          </a>

          {/* LinkedIn Card */}
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                  LinkedIn Profile
                </h3>
                <p className="text-xs text-zinc-400">
                  Connect on LinkedIn
                </p>
              </div>
            </div>
            <span className="text-xs font-medium text-blue-400 group-hover:translate-x-1 transition-transform">
              Connect →
            </span>
          </a>

          {/* Location & Remote Availability */}
          <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 md:col-span-2 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Available Worldwide &amp; Remote
              </h4>
              <p className="text-xs text-zinc-400">
                Timezone flexible — open to global roles and collaborative research projects.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};



