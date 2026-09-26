import React, { useState } from 'react';
import { siteConfig } from '../../data/site.ts';
import { Copy, ArrowUpRight, Send, Check, AlertCircle, LoaderCircle } from 'lucide-react';

interface ContactProps {
  onCopyEmail: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onCopyEmail }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    const cleanName = name.trim().replace(/[\u0000-\u001F\u007F]/g, '');
    const cleanEmail = email.trim().replace(/[\u0000-\u001F\u007F]/g, '');
    const cleanMessage = message.trim().replace(/[\u0000-\u001F\u007F]/g, '');
    if (cleanName.length < 2 || cleanName.length > 80) errors.name = 'Name must be 2 to 80 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) errors.email = 'Enter a valid email address.';
    if (cleanMessage.length < 10 || cleanMessage.length > 2000) errors.message = 'Message must be 10 to 2000 characters.';
    setFieldErrors(errors);
    return { errors, cleanName, cleanEmail, cleanMessage };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { errors, cleanName, cleanEmail, cleanMessage } = validate();
    if (Object.keys(errors).length > 0) {
      setStatus('error');
      setStatusMessage('Please check the highlighted fields.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          website: '',
          startedAt: formStartedAt,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        return;
      }
      const result = await response.json().catch(() => ({}));
      setFieldErrors(result.errors || {});
      setStatus('error');
      setStatusMessage(result.message || "Couldn't send right now.");
    } catch {
      setStatus('error');
      setStatusMessage("Couldn't send right now.");
    }
  };

  const [formStartedAt] = useState(() => Date.now());
  const resetForm = () => {
    setStatus('idle');
    setStatusMessage('');
    setFieldErrors({});
  };

  return (
    <section
      id="contact"
      aria-label="Let's work together"
      className="w-full pt-20 pb-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-4 space-y-12 sm:space-y-16">
        {/* Section Heading & Persuasive Understated Copy */}
        <div className="space-y-4 max-w-3xl">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1F1C17] leading-[1.08]">
            Let's work together.
          </h2>
          <p className="font-body text-lg sm:text-xl text-[#6E685B] leading-relaxed">
            I am open to full-time engineering roles, high-impact product contracts, and technical collaborations. If you are solving a hard problem and value clean execution, drop me a note below.
          </p>
        </div>

        {/* Contact Form & Side Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Primary Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#FBF9F2] border border-[#1F1C17]/15 rounded-3xl p-6 sm:p-9 shadow-sm">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1F1C17] mb-2">
              Send a direct message
            </h3>
            <p className="font-body text-sm text-[#6E685B] mb-6">
              Delivered directly to my personal inbox at rtayyaba669@gmail.com.
            </p>

            {status === 'success' ? (
              <div aria-live="polite" className="flex flex-col items-center gap-4 rounded-2xl border border-[#C5D8A4]/70 bg-[#C5D8A4]/30 p-8 text-center text-[#1F1C17]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C5D8A4] motion-safe:animate-[pulse_1.5s_ease-in-out_1]">
                  <Check className="h-5 w-5" />
                </span>
                <p className="font-display text-lg font-bold">Message sent. I'll get back to you soon.</p>
                <button type="button" onClick={resetForm} className="rounded-full border border-[#1F1C17] bg-[#F6DE8D] px-4 py-2 text-xs font-semibold">Send another</button>
              </div>
            ) : <form onSubmit={handleSubmit} className="space-y-4 font-body" noValidate>
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#1F1C17] uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8] border border-[#1F1C17]/15 text-[#1F1C17] text-sm placeholder:text-[#6E685B]/60 focus:outline-none focus:ring-2 focus:ring-[#1F1C17] transition-all"
                />
                {fieldErrors.name && <p id="contact-name-error" className="mt-1 text-xs text-[#9A4B35]">{fieldErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#1F1C17] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8] border border-[#1F1C17]/15 text-[#1F1C17] text-sm placeholder:text-[#6E685B]/60 focus:outline-none focus:ring-2 focus:ring-[#1F1C17] transition-all"
                />
                {fieldErrors.email && <p id="contact-email-error" className="mt-1 text-xs text-[#9A4B35]">{fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[#1F1C17] uppercase tracking-wider mb-1.5">
                  Project or Role Overview
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                  placeholder="Tell me about the system, product, or team you're building..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8] border border-[#1F1C17]/15 text-[#1F1C17] text-sm placeholder:text-[#6E685B]/60 focus:outline-none focus:ring-2 focus:ring-[#1F1C17] transition-all resize-none"
                />
                {fieldErrors.message && <p id="contact-message-error" className="mt-1 text-xs text-[#9A4B35]">{fieldErrors.message}</p>}
              </div>

              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

              {/* Status alerts */}
              {status === 'error' && (
                <div aria-live="polite" className="space-y-1 rounded-xl border border-[#F6C6A8]/60 bg-[#F6C6A8]/30 p-3 text-xs text-[#1F1C17] sm:text-sm">
                  <AlertCircle className="w-4 h-4 text-[#1F1C17] shrink-0" />
                  <span>{statusMessage}</span>
                  <span className="block">Or email me directly at <a className="font-semibold underline" href={`mailto:${siteConfig.socials.email}`}>{siteConfig.socials.email}</a> <button type="button" onClick={onCopyEmail} className="font-semibold underline">Copy</button></span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#F6DE8D] text-[#1F1C17] border border-[#1F1C17] rounded-full px-7 py-3.5 text-sm font-semibold hover:shadow-md transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                {status === 'submitting' ? <LoaderCircle className="w-4 h-4 motion-safe:animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{status === 'submitting' ? 'Sending...' : 'Send message'}</span>
              </button>
            </form>}
          </div>

          {/* Secondary Direct Channels & Socials (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8 font-body">
            <div className="space-y-3">
              <span className="label-caps block">Direct Contact</span>
              <a
                href={`mailto:${siteConfig.socials.email}`}
                className="inline-block font-display text-xl sm:text-2xl font-bold text-[#1F1C17] link-highlighter"
              >
                {siteConfig.socials.email}
              </a>
              <div className="pt-2">
                <button
                  onClick={onCopyEmail}
                  className="inline-flex items-center gap-2 bg-[#FBF9F2] hover:bg-[#F6DE8D]/40 text-[#1F1C17] border border-[#1F1C17]/20 rounded-full px-4 py-2 text-xs font-semibold transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy email</span>
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#1F1C17]/10">
              <span className="label-caps block">Profiles &amp; Background</span>
              
              <div className="flex flex-col space-y-3 text-base">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between font-semibold text-[#1F1C17] link-highlighter py-1"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-4 h-4 text-[#6E685B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between font-semibold text-[#1F1C17] link-highlighter py-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 text-[#6E685B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={siteConfig.socials.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between font-semibold text-[#1F1C17] link-highlighter py-1"
                >
                  <span>Resume</span>
                  <ArrowUpRight className="w-4 h-4 text-[#6E685B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Banner Band in Peach */}
      <div 
        className="w-full mt-20 sm:mt-28 py-3.5 overflow-hidden select-none border-y border-[#1F1C17]/10"
        style={{ backgroundColor: 'rgba(246, 198, 168, 0.35)' }}
      >
        <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
          <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#1F1C17]/80 px-4">
            Let's build something • Open to opportunities • Peshawar UTC+5 • Full-stack products with a designer's eye • Calm on the outside, clever underneath • 
          </span>
          <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#1F1C17]/80 px-4" aria-hidden="true">
            Let's build something • Open to opportunities • Peshawar UTC+5 • Full-stack products with a designer's eye • Calm on the outside, clever underneath • 
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
