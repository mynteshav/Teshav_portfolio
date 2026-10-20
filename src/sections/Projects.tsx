import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projectsData } from '../data/projects';
import type { Project } from '../types/portfolio';

export const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Generative AI', 'Machine Learning', 'Analytics'];

  const filteredProjects =
    selectedFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Portfolio Showcase"
          title="Featured Engineering Projects"
          subtitle="Real-world implementations spanning LLM RAG pipelines, predictive regression modeling, and large-scale data market analytics."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedFilter === cat
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold shadow-sm shadow-sky-500/10'
                  : 'bg-dark-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-dark-850'
              }`}
            >
              {cat}
              {cat === 'All'
                ? ` (${projectsData.length})`
                : ` (${projectsData.filter((p) => p.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(proj) => setActiveModalProject(proj)}
            />
          ))}
        </div>

        {/* Technical deep dive modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
};
