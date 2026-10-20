import React from 'react';
import { GraduationCap, Calendar, CheckCircle2, Award } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { educationData } from '../data/education';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Academic Background"
          title="Education & Formal Training"
          subtitle="A structured educational pathway specializing in Computer Applications, Machine Learning, and Data Science."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {educationData.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-dark-850 to-dark-900 border border-slate-800/80 hover:border-sky-500/30 transition-all duration-300 shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-dark-800 border border-slate-700/70 flex items-center justify-center text-sky-400 group-hover:border-sky-500/40 transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${
                      item.status === 'In Progress'
                        ? 'border-sky-500/30 bg-sky-500/10 text-sky-300'
                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'In Progress' ? 'bg-sky-400 animate-pulse' : 'bg-emerald-400'
                      }`}
                    ></span>
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-sky-300 transition-colors">
                  {item.degree}
                </h3>
                <div className="text-sm font-semibold text-sky-400 mb-2">
                  {item.field}
                </div>
                <div className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.institution}</span>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-2 mt-4 pt-4 border-t border-slate-800/80">
                    {item.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400/80 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Timeline</span>
                </span>
                <span className="font-semibold text-slate-300">{item.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
