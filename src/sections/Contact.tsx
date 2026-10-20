import React, { useState } from 'react';
import {
  Mail,
  Send,
  MapPin,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  FileText,
  Download
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { SectionHeading } from '../components/SectionHeading';
import { profileData } from '../data/profile';
import { sendContactMessage } from '../services/contactService';
import type { ContactFormData } from '../services/contactService';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
    showMailtoFallback?: boolean;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field upon typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate concurrent submissions
    setStatusMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        setStatusMessage({
          type: 'success',
          text: result.message
        });
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        setErrors({});
      } else {
        setStatusMessage({
          type: 'error',
          text: result.message,
          showMailtoFallback: true
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'An unexpected connection error occurred. Please reach out directly via email.',
        showMailtoFallback: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Hi Teshav,\n\n${formData.message}\n\nFrom: ${formData.name || 'Visitor'} (${formData.email || 'No email provided'})`
    );
    return `mailto:${profileData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Initiate Contact"
          title="Let's Discuss Projects & Opportunities"
          subtitle="Interested in collaborating on AI/ML pipelines, exploring internships, or discussing technical architecture? Reach out directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-gradient-to-b from-dark-850 to-dark-900 border border-slate-800/90 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Direct Channels
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Feel free to email directly, connect on professional networks, or submit the inquiry form. Responses typically sent within 24 to 48 hours.
              </p>

              {/* Email Card with Copy button */}
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-sm font-semibold text-white hover:text-sky-300 transition-colors truncate block"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-dark-800 hover:bg-dark-750 text-slate-400 hover:text-white border border-slate-700/60 transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Location
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {profileData.location}
                  </div>
                </div>
              </div>

              {/* Resume PDF Download Card */}
              <a
                href={profileData.resumeUrl}
                download="Teshav_Sharma_Resume.pdf"
                className="p-4 rounded-xl bg-dark-900 border border-slate-800 hover:border-sky-500/40 flex items-center justify-between gap-3 group transition-all"
                title="Download Teshav Sharma Resume (PDF)"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Official Resume
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                      Download Resume (PDF)
                    </div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
              </a>

              {/* Social Profiles */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Online Profiles
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profileData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-dark-800 hover:bg-dark-750 border border-slate-700/70 text-slate-200 hover:text-white transition-all text-xs font-semibold group"
                  >
                    <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </a>

                  <a
                    href={profileData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-dark-800 hover:bg-dark-750 border border-slate-700/70 text-slate-200 hover:text-white transition-all text-xs font-semibold group"
                  >
                    <LinkedinIcon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Architecture note card */}
            <div className="p-5 rounded-2xl bg-dark-900/60 border border-slate-800/80 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-semibold font-mono uppercase tracking-wider text-[11px]">
                <span>Integration Ready</span>
              </div>
              <p>
                The contact form is architected to communicate with a decoupled FastAPI endpoint (<code className="text-sky-300">/api/contact</code>). Configure the environment variable <code className="text-sky-300">VITE_API_URL</code> or <code className="text-sky-300">VITE_API_BASE_URL</code> to connect a live SMTP or mail dispatch worker.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-7 sm:p-9 rounded-2xl bg-gradient-to-b from-dark-850 to-dark-900 border border-slate-800/90 shadow-xl space-y-5"
            >
              <h3 className="text-xl font-bold text-white tracking-tight">
                Send a Message
              </h3>

              {/* Status Alert Banner */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl border text-sm flex flex-col gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                  role="alert"
                >
                  <div className="flex items-start gap-2.5">
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{statusMessage.text}</span>
                  </div>

                  {statusMessage.showMailtoFallback && (
                    <div className="mt-2 pt-2 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs text-slate-300">
                        Launch your mail app with these details prefilled:
                      </span>
                      <a
                        href={getMailtoUrl()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-white border border-rose-500/40 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Mail Client</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Anti-spam honeypot field - hidden from real visitors, traps bots */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website || ''}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Chen"
                    className={`w-full px-4 py-3 rounded-xl bg-dark-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.name
                        ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Your Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-dark-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.email
                        ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Subject <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  disabled={isSubmitting}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. AI Engineering Internship / Project Collaboration"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                    errors.subject
                      ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50'
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details regarding your team, role requirements, or project scope..."
                  className={`w-full px-4 py-3 rounded-xl bg-dark-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-y disabled:opacity-60 disabled:cursor-not-allowed ${
                    errors.message
                      ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50'
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-xs text-rose-400 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
