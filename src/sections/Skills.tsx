import React, { useState } from 'react';
import {
  Sparkles,
  GitBranch,
  Network,
  Terminal,
  Server,
  BarChart2,
  Check
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { skillCategories } from '../data/skills';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-sky-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-indigo-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-teal-400" />;
      case 'BarChart2':
        return <BarChart2 className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-sky-400" />;
    }
  };

  const filteredCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Technical Stack"
          title="Skills & Technologies"
          subtitle="A methodical inventory of frameworks, algorithmic domains, and tools I use to construct reliable AI workflows and machine learning systems."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold shadow-sm shadow-sky-500/10'
                : 'bg-dark-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-dark-850'
            }`}
          >
            All Disciplines ({skillCategories.length})
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold shadow-sm shadow-sky-500/10'
                  : 'bg-dark-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-dark-850'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col justify-between rounded-2xl bg-gradient-to-b from-dark-850 to-dark-900/90 border border-slate-800/80 hover:border-sky-500/30 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 group"
            >
              <div>
                {/* Header with category icon */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-dark-800 border border-slate-700/60 flex items-center justify-center group-hover:border-sky-500/40 transition-colors">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-dark-900/90 border border-slate-800 text-slate-300 hover:border-sky-500/40 hover:text-sky-300 hover:bg-sky-500/5 transition-all duration-150"
                    >
                      <Check className="w-3 h-3 text-sky-400/80 shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom stats/count indicator */}
              <div className="pt-6 mt-6 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Verified Toolset</span>
                <span className="text-slate-400">{category.skills.length} Items</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
