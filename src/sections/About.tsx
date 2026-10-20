import React from 'react';
import { Brain, Cpu, Layers, BarChart3, GraduationCap, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { profileData } from '../data/profile';
import profileImg from '../assets/profile.png';

export const About: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-5 h-5 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-teal-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-amber-400" />;
      default:
        return <Brain className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Background & Focus"
          title="Bridging Theoretical AI with Practical Production"
          subtitle="Combining academic rigor in AI and Data Science with an emphasis on production microservices and reliable model deployments."
        />

        {/* Narrative & Education Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-5 bg-gradient-to-b from-dark-800/80 to-dark-900/90 border border-slate-800/90 rounded-2xl p-7 sm:p-9 shadow-lg">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800/80">
              <div className="relative">
                <img
                  src={profileImg}
                  alt="Teshav Sharma"
                  className="w-12 h-12 rounded-xl object-cover object-top border border-sky-400/30 shadow-md shadow-sky-500/10"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-dark-900" title="Active"></span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Teshav Sharma</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    MCA Candidate
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Engineering Narrative & Practical Focus</p>
              </div>
            </div>
            {profileData.bioNarrative.map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Production API & Containerization Mindset</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RAG Retrieval & Vector Embeddings</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Empirical EDA & Metric Validation</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Open-Source LLMs & Tooling (Ollama, HF)</span>
              </div>
            </div>
          </div>

          {/* Academic Foundation Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-dark-850/90 border border-sky-500/20 rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Academic Path</h4>
                  <p className="text-xs font-mono text-sky-400">Computer Applications & AI</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-white">JECRC University</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      Pursuing
                    </span>
                  </div>
                  <div className="font-medium text-slate-200 text-xs sm:text-sm">
                    Master of Computer Applications (MCA)
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-mono">
                    Specialization in AI & Data Science
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-white">Poornima University</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Graduated 2024
                    </span>
                  </div>
                  <div className="font-medium text-slate-200 text-xs sm:text-sm">
                    Bachelor of Computer Applications (BCA)
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-mono">
                    Foundational Software Systems
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-850/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <span className="text-slate-200 font-semibold block mb-1">Primary Objective:</span>
              To apply applied machine learning, RAG pipelines, and intelligent data systems within collaborative engineering teams, solving real product challenges with clean and measurable code.
            </div>
          </div>
        </div>

        {/* 4 Pillars of Focus */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-6 text-center">
            Core Engineering Pillars
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {profileData.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-dark-850/80 border border-slate-800/80 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-xl bg-dark-800 border border-slate-700/60 flex items-center justify-center mb-4 group-hover:border-sky-500/40 transition-colors">
                  {getIcon(area.icon)}
                </div>
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {area.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
