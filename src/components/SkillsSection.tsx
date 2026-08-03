import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-24 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Core Expertise &amp; Stack
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            A focused overview of my technical stack across artificial intelligence, computer vision, modern web development, and data analytics.
          </p>
        </div>

        {/* Simple 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                  <span className="text-xs text-zinc-500">
                    {category.badge}
                  </span>
                </div>

                {/* Short category description */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Simple Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 font-medium hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};



