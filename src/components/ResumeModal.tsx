import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  Eye,
  ListFilter,
  Sparkles,
  MapPin,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { profileData } from '../data/profile';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { certificationsData } from '../data/certifications';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'structured'>('preview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl = profileData.resumeUrl || '/Teshav_Sharma_Resume.pdf';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-dark-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-7 border-b border-slate-800 bg-dark-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 id="resume-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Teshav Sharma</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 hidden sm:inline-block">
                  Verified PDF
                </span>
              </h3>
              <p className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <span>Official Curriculum Vitae</span>
                <span>&bull;</span>
                <span className="text-sky-300">AI / ML Engineer</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Download Button */}
            <a
              href={pdfUrl}
              download="Teshav_Sharma_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-95 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              title="Download Resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Open in Tab Button */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-dark-800 hover:bg-dark-750 border border-slate-700 hover:text-white transition-all"
              title="Open PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-dark-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-dark-750 transition-colors ml-1 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-slate-800 bg-dark-950/40 text-xs">
          <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>PDF Document</span>
            </button>
            <button
              onClick={() => setActiveTab('structured')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'structured'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Structured Overview</span>
            </button>
          </div>

          <div className="text-slate-400 text-[11px] font-mono hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Live Document &bull; Teshav Sharma</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'preview' ? (
            /* Embedded PDF Document Preview */
            <div className="w-full h-[68vh] min-h-[460px] rounded-xl overflow-hidden border border-slate-700/80 bg-dark-950 relative shadow-inner flex flex-col">
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0`}
                title="Teshav Sharma Resume PDF"
                className="w-full h-full flex-1 border-none"
              />
              <div className="p-3 bg-dark-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px]">
                  Viewing Teshav_Sharma_Resume.pdf
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Fullscreen</span>
                  </a>
                  <span>&bull;</span>
                  <a
                    href={pdfUrl}
                    download="Teshav_Sharma_Resume.pdf"
                    className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* Structured Resume Overview */
            <div className="space-y-6">
              {/* Header Contact Strip */}
              <div className="p-4 rounded-xl bg-dark-850/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <a href={`mailto:${profileData.email}`} className="hover:text-sky-300 transition-colors">
                    {profileData.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Jaipur, Rajasthan, India</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <a
                    href={profileData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <span>github.com/mynteshav</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={profileData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <span>linkedin.com/in/teshavds</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Summary Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-dark-850 border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Career Summary</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Aspiring AI/ML Engineer with hands-on experience building Generative AI applications (RAG, LangChain, LLMs) and predictive ML models, backed by strong deployment skills using FastAPI, Streamlit, and Docker. Proficient in Python, SQL, Pandas, Scikit-learn, and TensorFlow.
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2 font-semibold">
                  <GraduationCap className="w-4 h-4 text-sky-400" />
                  <span>Academic Credentials</span>
                </h4>
                <div className="space-y-3">
                  {educationData.map((item) => (
                    <div key={item.id} className="p-3.5 rounded-xl bg-dark-850/80 border border-slate-800">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                        <span className="font-bold text-white">{item.institution}</span>
                        {item.cgpa && (
                          <span className="font-mono text-sky-400 font-semibold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 w-fit">
                            {item.cgpa}
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-sky-300 mt-1 font-medium">
                        {item.degree} — {item.field}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{item.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internship Experience */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2 font-semibold">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  <span>Internship Experience</span>
                </h4>
                <div className="space-y-3">
                  {experienceData.map((exp) => (
                    <div key={exp.id} className="p-3.5 rounded-xl bg-dark-850/80 border border-slate-800">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                        <span className="font-bold text-white">
                          {exp.role} &bull; {exp.company}
                          {exp.location && <span className="text-slate-400 font-normal"> ({exp.location})</span>}
                        </span>
                        <span className="font-mono text-slate-400">{exp.period}</span>
                      </div>
                      <ul className="mt-2.5 space-y-1.5">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400/80 shrink-0 mt-0.5" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Certifications Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2 font-semibold">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Verified Industry Certifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certificationsData.map((cert) => (
                    <a
                      key={cert.id}
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-dark-850/70 border border-slate-800 hover:border-sky-500/40 hover:bg-dark-800/90 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-sky-400 mb-1">
                          <span>{cert.issuer}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 group-hover:text-sky-300">
                            Verify <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        </div>
                        <div className="text-xs font-medium text-slate-200 group-hover:text-white leading-snug">
                          {cert.title}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-dark-950/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">
            Available for immediate download & review &bull; Jaipur, India
          </span>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={pdfUrl}
              download="Teshav_Sharma_Resume.pdf"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-dark-800 hover:bg-dark-750 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
