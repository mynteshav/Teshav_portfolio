import React from 'react';
import { ArrowRight, Mail, Sparkles, Terminal, Cpu, Database, Network, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { profileData } from '../data/profile';
import { quickHeroSkills } from '../data/skills';
import profileImg from '../assets/profile.png';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      {/* Background glow flares */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-violet-600/12 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Framed Profile Portrait with Animation & Status Tray */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group animate-float">
              {/* Multi-tier Ambient Glow Backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-500/25 via-indigo-500/20 to-purple-500/25 rounded-[32px] blur-2xl opacity-65 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-700 pointer-events-none -z-10" />

              {/* Elegant Modern Frame */}
              <div className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-[28px] p-3 sm:p-3.5 bg-gradient-to-b from-slate-800/90 via-dark-850/95 to-dark-900/95 border border-sky-500/30 ring-1 ring-white/10 shadow-2xl shadow-sky-500/15 backdrop-blur-xl group-hover:border-sky-400/60 group-hover:shadow-sky-500/30 transition-all duration-500">
                
                {/* Frame Header Strip */}
                <div className="flex items-center justify-between px-3 py-2 mb-3 bg-dark-950/80 border border-slate-800/80 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                    <span className="font-mono text-[11px] font-semibold text-slate-300 tracking-wide uppercase">AI / ML Engineer</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <span>Jaipur, IN</span>
                  </div>
                </div>

                {/* Portrait Image Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-dark-950 border border-slate-700/60 shadow-inner group">
                  <img
                    src={profileImg}
                    alt="Teshav Sharma - AI & Machine Learning Engineer"
                    className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04] group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  
                  {/* Subtle corner light reflection accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-400/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Frame Footer Tray: Opportunity Status Line */}
                <div className="mt-3 p-3 rounded-xl bg-dark-950/80 border border-slate-800/90 flex items-center gap-2.5 shadow-sm group-hover:border-emerald-500/40 transition-colors">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-medium text-slate-300 leading-snug">
                    {profileData.opportunitiesStatus}
                  </span>
                </div>

                {/* Profile Links Strip inside Frame */}
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <a
                    href={profileData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-dark-950/90 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-white transition-all text-[11px] font-mono group/btn"
                    title="GitHub: https://github.com/mynteshav"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white transition-colors" />
                    <span className="truncate">mynteshav</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover/btn:text-sky-400 transition-colors" />
                  </a>

                  <a
                    href={profileData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-dark-950/90 border border-slate-800 hover:border-sky-500/40 text-slate-300 hover:text-white transition-all text-[11px] font-mono group/btn"
                    title="LinkedIn: https://www.linkedin.com/in/teshavds/"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-sky-400 group-hover/btn:scale-110 transition-transform" />
                    <span className="truncate">teshavds</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover/btn:text-sky-400 transition-colors" />
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Headline, Bio & Actionables */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide border border-sky-400/25 bg-sky-500/10 text-sky-300 shadow-sm shadow-sky-500/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{profileData.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14] mb-6">
              Building intelligent systems that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
                turn data into decisions.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {profileData.supportingText}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all duration-300 group cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-dark-850/90 hover:bg-dark-800 border border-slate-700/80 hover:border-sky-500/40 hover:text-white transition-all duration-200 shadow-sm cursor-pointer"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Let's Connect</span>
              </button>
            </div>

            {/* Technology Labels & Interactive Console Visual */}
            <div className="pt-6 border-t border-slate-800/70 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-3.5">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Core Toolset & Engineering Focus</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5">
                {quickHeroSkills.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-dark-900/80 border border-slate-800 text-slate-300 hover:border-sky-500/40 hover:text-sky-300 transition-colors"
                  >
                    {tech === 'Python' && <Terminal className="w-3 h-3 text-sky-400" />}
                    {tech === 'Machine Learning' && <Cpu className="w-3 h-3 text-emerald-400" />}
                    {tech === 'LLMs' && <Sparkles className="w-3 h-3 text-purple-400" />}
                    {tech === 'RAG' && <Network className="w-3 h-3 text-blue-400" />}
                    {tech === 'FastAPI' && <Database className="w-3 h-3 text-teal-400" />}
                    {tech === 'PyTorch' && <Cpu className="w-3 h-3 text-orange-400" />}
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

