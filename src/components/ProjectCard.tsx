import React from 'react';
import { Layers, ArrowUpRight, ExternalLink, Activity, Sparkles, BarChart, Database } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  // Category badge styling & icon
  const getCategoryConfig = (cat: Project['category']) => {
    switch (cat) {
      case 'Generative AI':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
          badgeClass: 'border-purple-500/30 bg-purple-500/10 text-purple-300'
        };
      case 'Machine Learning':
        return {
          icon: <Activity className="w-3.5 h-3.5 text-sky-400" />,
          badgeClass: 'border-sky-500/30 bg-sky-500/10 text-sky-300'
        };
      case 'Analytics':
        return {
          icon: <BarChart className="w-3.5 h-3.5 text-amber-400" />,
          badgeClass: 'border-amber-500/30 bg-amber-500/10 text-amber-300'
        };
      default:
        return {
          icon: <Database className="w-3.5 h-3.5 text-emerald-400" />,
          badgeClass: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
        };
    }
  };

  const { icon, badgeClass } = getCategoryConfig(project.category);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-dark-800/90 to-dark-900/95 border border-slate-800/80 hover:border-sky-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 overflow-hidden">
      {/* Top subtle highlight glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 sm:p-7">
        {/* Category & Status */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${badgeClass}`}
          >
            {icon}
            <span>{project.category}</span>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <span className="text-[11px] font-mono text-slate-400 border border-slate-800 px-2.5 py-0.5 rounded-md bg-dark-850">
              {project.metrics[0].label}: <strong className="text-sky-400">{project.metrics[0].value}</strong>
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-sky-300 transition-colors">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Key Highlights list (2 items) */}
        <div className="space-y-2 mb-6">
          {project.highlights.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 mt-1.5 shrink-0"></span>
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-dark-850 border border-slate-800/80 text-slate-400 hover:text-slate-300 transition-colors"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-500">
              +{project.tags.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer / Actions */}
      <div className="px-6 py-4 bg-dark-900/60 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors group/btn"
        >
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>System Deep Dive</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-750 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 hover:text-sky-200 border border-sky-500/40 transition-colors"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
