import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  Send, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Get in Touch
          </h2>
          <p className="text-base text-zinc-400">
            Interested in building an autonomous LLM agent, scalable RAG knowledge base, or full-stack React application? Let's discuss your next breakthrough.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Email Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider block mb-2">
                Primary Email
              </span>

              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-lg sm:text-xl font-bold text-white break-all">
                  {PROFILE_DATA.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="shrink-0 p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copiedEmail && (
                <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/15 text-blue-400 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Copied {PROFILE_DATA.email} to clipboard!</span>
                </div>
              )}

              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>
            </div>

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
                    linkedin.com/in/nouri-mohammed-islam
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-blue-400 group-hover:translate-x-1 transition-transform">
                Connect →
              </span>
            </a>

            {/* GitHub Card */}
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    GitHub Open Source
                  </h3>
                  <p className="text-xs text-zinc-400">
                    github.com/nouri-mohammed-islam
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-400 group-hover:translate-x-1 transition-transform">
                Explore →
              </span>
            </a>

            {/* Location & Remote Availability */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Available Worldwide &amp; Remote
                </h4>
                <p className="text-xs text-zinc-400">
                  Timezone flexible — ready to collaborate across global teams.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
              
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                Fill out the form below or send an email directly. I reply within 24 hours.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-blue-500/15 border border-blue-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Received!</h4>
                  <p className="text-sm text-zinc-300">
                    Thank you for reaching out. Your message has been prepared for NOURI Mohammed Islam ({PROFILE_DATA.email}).
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500/60"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500/60"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                      Subject / Project Scope
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Senior AI Engineer role or RAG integration"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500/60"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hello Mohammed Islam, we're impressed by your AI & React portfolio and would love to discuss..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500/60 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

