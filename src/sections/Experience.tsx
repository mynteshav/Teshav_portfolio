import React from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { experienceData } from '../data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Practical Work"
          title="Internship & Industry Experience"
          subtitle="Direct technical contributions in data science, computer vision pipelines, and production application engineering."
        />

        {/* Timeline */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-dark-950 border-2 border-sky-400 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              </div>

              {/* Card content */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-dark-850 to-dark-900/90 border border-slate-800/80 hover:border-sky-500/30 transition-all duration-300 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-sky-400 flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-dark-800 border border-slate-700/80 text-slate-300 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-2.5 mb-6">
                  {exp.description.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-sky-400/80 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-dark-900 border border-slate-800 text-slate-400"
                    >
                      {tech}
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
