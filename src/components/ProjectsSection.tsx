import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  Cpu, 
  BarChart2,
  Code2, 
  Sparkles, 
  ArrowUpRight, 
  X
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'web' | 'hybrid'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: PROJECTS.length },
    { id: 'hybrid', label: 'Hybrid AI + Web', count: PROJECTS.filter(p => p.category === 'hybrid').length },
    { id: 'ai', label: 'AI ', count: PROJECTS.filter(p => p.category === 'ai').length },
    { id: 'web', label: 'Web', count: PROJECTS.filter(p => p.category === 'web').length },
  ] as const;

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  const handleProjectClick = (project: Project) => {
    if (project.category === 'web') {
      const url = project.demoUrl || project.githubUrl;
      if (url) {
        window.open(url, '_blank', 'noreferrer');
      }
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <section id="projects" className="py-20 md:py-24 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start">
            {filterTabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'bg-zinc-800 text-white font-medium shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isWebOnly = project.category === 'web';
            return (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={isWebOnly ? `Open live demo for ${project.title}` : `View final metrics and architecture for ${project.title}`}
                className="group rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm cursor-pointer hover:shadow-lg hover:shadow-blue-500/5"
              >
                {/* Top Image Preview */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent"></div>

                  {/* Simple category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-900/90 text-zinc-200 backdrop-blur-sm border border-zinc-700/60">
                      {project.category === 'hybrid' ? 'AI + Web' : project.category === 'ai' ? 'AI / ML' : 'Web Dev'}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-blue-400 mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                      {isWebOnly ? (
                        <>
                          <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 group-hover:text-blue-400 transition-colors">
                            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                            <span>Live Web Application</span>
                          </span>

                          <a
                            href={project.demoUrl || project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-mono font-semibold border border-blue-500/30 transition-colors"
                            title="Open Live Demo"
                          >
                            <span>View Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </>
                      ) : (
                        <>
                          <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 group-hover:text-blue-400 transition-colors">
                            <BarChart2 className="w-3.5 h-3.5 text-blue-400" />
                            <span>Final Metrics &amp; Details</span>
                          </span>

                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-mono font-semibold border border-blue-500/30 transition-colors"
                              title="Open Live Demo"
                            >
                              <span>Demo</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Simplified Architecture & Metrics Modal */}
      {selectedProject && selectedProject.category !== 'web' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-xl max-h-[85vh] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-zinc-800/80 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {selectedProject.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-modal-scrollbar">
              {/* Summary */}
              {selectedProject.architecture && (
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedProject.architecture.summary}
                </p>
              )}

              {/* Tech Stack */}
              {selectedProject.architecture?.techStack && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.architecture.techStack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Final AI Metrics */}
              {selectedProject.stats && selectedProject.stats.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-blue-400" />
                    <span>Final AI Model &amp; Performance Metrics</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProject.stats.map((stat, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-center flex flex-col justify-center gap-1"
                      >
                        <span className="text-xl font-bold font-mono text-blue-400">
                          {stat.value}
                        </span>
                        <span className="text-xs text-zinc-400 font-medium leading-snug">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
