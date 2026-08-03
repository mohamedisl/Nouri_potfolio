// import React, { useState } from 'react';
// import { 
//   ArrowRight, 
//   Github, 
//   Linkedin, 
//   Mail, 
//   Check
// } from 'lucide-react';
// import { PROFILE_DATA } from '../data/portfolioData';

// interface HeroProps {
//   onNavigate: (sectionId: string) => void;
//   onOpenResume: () => void;
// }

// export const Hero: React.FC<HeroProps> = ({
//   onNavigate,
//   onOpenResume,
// }) => {
//   const [emailCopied, setEmailCopied] = useState<boolean>(false);

//   const handleCopyEmail = () => {
//     navigator.clipboard.writeText(PROFILE_DATA.email);
//     setEmailCopied(true);
//     setTimeout(() => setEmailCopied(false), 2000);
//   };

//   return (
//     <section id="hero" className="relative pt-32 sm:pt-40 pb-16 md:pb-24 overflow-hidden">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
//           {/* Left Column: Headline, Bio & CTAs (7 cols) */}
//           <div className="lg:col-span-7 flex flex-col items-start text-left">
            
//             {/* Full Name & Title */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-5">
//               NOURI Mohammed Islam
//             </h1>

//             {/* Role subtitle */}
//             <p className="text-lg sm:text-xl font-medium text-blue-400 mb-6">
//               AI Engineer &amp; Full-Stack Web Developer
//             </p>

//             {/* Bio paragraph */}
//             <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed mb-8">
//               AI Engineer, Data Analyst, Computer Vision, and Full-Stack Developer with a strong background in Machine Learning, Deep Learning, and Software Engineering. Experienced in analyzing and transforming data into actionable insights using Python, SQL, and data visualization, while also building intelligent vision systems and AI-powered web applications with PyTorch, TensorFlow, OpenCV, YOLO, React, Node.js, and MongoDB.
// Passionate about solving real-world problems through data and AI, with a particular interest in medical AI, computer vision, and scalable software development. Always eager to collaborate on innovative projects, leverage data-driven decision-making, and contribute to advancing Artificial Intelligence.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-10">
//               <button
//                 onClick={() => onNavigate('projects')}
//                 className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/20"
//               >
//                 <span>Explore Projects</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>

//               <button
//                 onClick={() => onNavigate('contact')}
//                 className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-all"
//               >
//                 <Mail className="w-4 h-4 text-blue-400" />
//                 <span>Contact Me</span>
//               </button>

//               <button
//                 onClick={onOpenResume}
//                 className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium text-sm text-zinc-400 hover:text-white transition-all"
//               >
//                 <span>View CV</span>
//               </button>
//             </div>

//             {/* Social Links & Quick Contact */}
//             <div className="flex flex-wrap items-center gap-5 pt-6 border-t border-zinc-800/80 w-full text-sm">
//               <span className="text-xs uppercase text-zinc-500 font-medium tracking-wider">Connect</span>
              
//               <a
//                 href={PROFILE_DATA.github}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
//               >
//                 <Github className="w-4 h-4" />
//                 <span>GitHub</span>
//               </a>

//               <a
//                 href={PROFILE_DATA.linkedin}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
//               >
//                 <Linkedin className="w-4 h-4 text-blue-400" />
//                 <span>LinkedIn</span>
//               </a>

//               <button
//                 onClick={handleCopyEmail}
//                 className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
//               >
//                 {emailCopied ? (
//                   <>
//                     <Check className="w-4 h-4 text-blue-400" />
//                     <span className="text-blue-400">Email Copied</span>
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4" />
//                     <span>{PROFILE_DATA.email}</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Right Column: Clean, simple portrait photo (5 cols) */}
//           <div className="lg:col-span-5 flex justify-center lg:justify-end">
//             <div className="w-full max-w-sm">
//               <div className="aspect-4/5 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-xl group">
//                 <img
//                   src={PROFILE_DATA.defaultPicture}
//                   alt="NOURI Mohammed Islam - AI Engineer & Web Developer"
//                   className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Stats Strip */}
//         <div className="mt-16 md:mt-20 pt-10 border-t border-zinc-800/60 grid grid-cols-2 lg:grid-cols-4 gap-8">
//           {PROFILE_DATA.stats.map((stat, i) => (
//             <div key={i} className="flex flex-col">
//               <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
//                 {stat.value}
//               </span>
//               <span className="text-xs sm:text-sm text-zinc-500">
//                 {stat.label}
//               </span>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Check,
  Cpu,
  Award,
  GraduationCap,
  Building2,
  BookOpen,
  CheckCircle2,
  Calendar,
  MapPin
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onOpenResume,
}) => {
  const [emailCopied, setEmailCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-32 sm:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Status Badge */}
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>Computer Engineering Graduate (2021-2026)</span>
            </div> */}

            {/* Full Name & Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-5">
              NOURI Mohammed Islam
            </h1>

            {/* Role subtitle */}
            <p className="text-lg sm:text-xl font-semibold text-blue-400 mb-6 flex items-center gap-2">
              
              <span>{PROFILE_DATA.role}</span>
            </p>

            {/* Bio paragraph */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed mb-8">
              AI Engineer, Data Analyst, Computer Vision, and Full-Stack Developer with a strong background in Machine Learning, Deep Learning, and Software Engineering. Experienced in analyzing and transforming data into actionable insights using Python, SQL, and data visualization, while also building intelligent vision systems and AI-powered web applications with PyTorch, TensorFlow, OpenCV, YOLO, React, Node.js, and MongoDB.
              Passionate about solving real-world problems through data and AI, with a particular interest in medical AI, computer vision, and scalable software development. Always eager to collaborate on innovative projects, leverage data-driven decision-making, and contribute to advancing Artificial Intelligence..
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-10">
              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-all"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Contact Me</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium text-sm text-zinc-400 hover:text-white transition-all"
              >
                <span>View CV</span>
              </button>
            </div>

            {/* Social Links & Quick Contact */}
            <div className="flex flex-wrap items-center gap-5 pt-6 border-t border-zinc-800/80 w-full text-sm">
              <span className="text-xs uppercase text-zinc-500 font-medium tracking-wider">Connect</span>
              
              <a
                href={PROFILE_DATA.twitter || "https://x.com/nouri_islam_ai"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span></span>
              </a>

              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                {emailCopied ? (
                  <>
                    <Check className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">Email Copied</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>{PROFILE_DATA.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Clean portrait photo with engineering badges (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm relative">
              
              {/* Outer decorative glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-indigo-600/30 blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
                <img
                  src={PROFILE_DATA.defaultPicture}
                  alt="NOURI Mohammed Islam - Computer Engineer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Tech Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">Turning Your Ideas into Intelligent Digital Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Simple & Clean Education Section */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-zinc-800/80">
          <div className="max-w-3xl">
            
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 flex items-center gap-2.5">

              <span>Education</span>
            </h2>

            {/* Plain text representation */}
            <div className="space-y-2 text-left">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-100">
                  State Engineering Degree in Computer Engineering
                </h3>
                <span className="text-sm font-mono text-blue-400 font-medium">
                  2021 – 2026
                </span>
              </div>

              <p className="text-base text-blue-400 font-medium">
                National Higher School of Renewable Energies, Environment &amp; Sustainable Development — Batna, Algeria
              </p>

              <p className="text-sm text-zinc-400">
                <strong className="text-zinc-200">Specialization:</strong> Artificial Intelligence, Data Science &amp; Industrial Networks
              </p>

              <p className="text-sm text-zinc-400 pt-1">
                <strong className="text-zinc-200">Honors &amp; Focus:</strong> • Deep Learning &amp; Computer Vision
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};


