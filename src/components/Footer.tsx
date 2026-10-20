import React from 'react';
import { ArrowUp, Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { profileData } from '../data/profile';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-dark-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden z-10">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-dark-800 border border-sky-500/30 flex items-center justify-center">
                <span className="font-mono font-extrabold text-base text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
                  {profileData.wordmark}
                </span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Teshav Sharma
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Aspiring AI & Machine Learning Engineer focused on RAG architectures, machine learning pipelines, and practical AI applications that convert complex data into intelligent outcomes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-sky-500/40 text-slate-400 hover:text-white transition-all shadow-sm"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-sky-500/40 text-slate-400 hover:text-white transition-all shadow-sm"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-sky-500/40 text-slate-400 hover:text-white transition-all shadow-sm"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick navigation links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-4">
              Explore More
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-sm text-sky-400 hover:text-sky-300 font-medium transition-colors"
                >
                  Direct Inquiry &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <span>&copy; {CURRENT_YEAR} {profileData.name}. All rights reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Engineered with precision</span>
            <Heart className="w-3 h-3 text-sky-500 inline fill-sky-500/20" />
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-slate-700 transition-colors group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
