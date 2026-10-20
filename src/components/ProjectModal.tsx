import React, { useEffect } from 'react';
import { X, CheckCircle2, Layers, Cpu, Database, ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import type { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-900 border border-slate-700/70 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase mb-2 border border-sky-500/25 bg-sky-500/10 text-sky-400">
              {project.category}
            </div>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-dark-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-dark-750 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">Project Overview</h4>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Problem vs Approach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-dark-850/80 border border-slate-800">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider mb-2 font-semibold">
                <Database className="w-4 h-4" />
                The Problem
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-850/80 border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2 font-semibold">
                <Cpu className="w-4 h-4" />
                Engineering Approach
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Architecture details if available */}
          {project.architectureDetails && project.architectureDetails.length > 0 && (
            <div className="p-5 rounded-xl bg-dark-850/60 border border-sky-500/15">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono uppercase tracking-wider mb-3 font-semibold">
                <Layers className="w-4 h-4" />
                System & Architecture Pipeline
              </div>
              <ul className="space-y-2">
                {project.architectureDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0"></span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Outcome */}
          <div className="p-4 rounded-xl bg-dark-850/80 border border-slate-800">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2 font-semibold">
              Verified Outcome & Impact
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.outcome}
            </p>
          </div>

          {/* Verified Metrics Chips */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-3">
                Key Parameters & Verified Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-dark-800 border border-slate-800 text-center">
                    <div className="text-xs text-slate-400 mb-1">{metric.label}</div>
                    <div className="text-sm sm:text-base font-bold font-mono text-sky-400">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Implementation Highlights */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-3">
              Implementation Highlights
            </h4>
            <div className="space-y-2">
              {project.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Tags */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2.5">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-dark-800 border border-slate-700/60 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links / Status */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400 font-mono">
              {project.githubUrl ? 'Source available' : 'Source code & walkthrough available upon interview / inquiry.'}
            </div>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-dark-800 hover:bg-dark-750 border border-slate-700 text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
