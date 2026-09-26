import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../../data/site.ts';
import { Copy, X, Menu, ArrowUpRight } from 'lucide-react';

interface FloatingIslandNavProps {
  onNavigate: (sectionId: string) => void;
  onCopyEmail: () => void;
  activeSection: string;
  scrollProgress: number;
}

interface NavLinkItem {
  id: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Changelog' },
  { id: 'about', label: 'Toolbox' },
  { id: 'contact', label: 'Say hello' },
];

export const FloatingIslandNav: React.FC<FloatingIslandNavProps> = ({
  onNavigate,
  onCopyEmail,
  activeSection,
  scrollProgress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Keyboard shortcut listener: Cmd/Ctrl + K or "/" opens navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setIsExpanded((prev) => !prev);
      } else if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => firstFocusableRef.current?.focus(), 50);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  // Section display name mapping
  const getSectionLabel = (id: string) => {
    switch (id) {
      case 'hero':
        return 'Home';
      case 'work':
        return 'Work';
      case 'experience':
        return 'Changelog';
      case 'about':
        return 'Toolbox';
      case 'contact':
        return 'Say hello';
      default:
        return 'Tayyaba';
    }
  };

  const handleLinkClick = (targetId: string) => {
    setIsExpanded(false);
    setTimeout(() => {
      onNavigate(targetId);
    }, 120);
  };

  // Scroll Progress Circle Math (24px diameter, radius 9.5)
  const radius = 9.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <nav
      ref={panelRef}
      aria-label="Floating Navigation Island"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out"
    >
      {!isExpanded ? (
        /* Collapsed Island Pill */
        <div className="flex items-center gap-3 bg-[#FBF9F2]/90 backdrop-blur-xl border border-[#1F1C17]/15 rounded-full px-4 sm:px-5 py-2.5 shadow-[0_8px_30px_rgb(31,28,23,0.08)]">
          {/* Active section name indicator */}
          <button
            onClick={() => onNavigate(activeSection || 'hero')}
            className="text-xs sm:text-sm font-body font-medium text-[#1F1C17] hover:opacity-75 transition-opacity flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1F1C17] rounded-full px-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6DE8D] border border-[#1F1C17]/40" />
            <span>{getSectionLabel(activeSection)}</span>
          </button>

          <span className="w-px h-4 bg-[#1F1C17]/15" aria-hidden="true" />

          {/* Circular SVG Scroll Progress Ring */}
          <div className="relative flex items-center justify-center w-6 h-6" title={`Scroll progress: ${Math.round(scrollProgress * 100)}%`}>
            <svg className="w-6 h-6 -rotate-90 pointer-events-none" viewBox="0 0 24 24">
              {/* Background Track */}
              <circle
                cx="12"
                cy="12"
                r={radius}
                className="stroke-[#1F1C17]/10"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Progress Indicator */}
              <circle
                cx="12"
                cy="12"
                r={radius}
                className="stroke-[#F6DE8D]"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <span className="w-px h-4 bg-[#1F1C17]/15" aria-hidden="true" />

          {/* Menu Trigger Button */}
          <button
            onClick={() => setIsExpanded(true)}
            aria-expanded={false}
            aria-label="Open navigation menu (Ctrl+K or /)"
            className="flex items-center gap-1.5 text-xs font-body font-semibold uppercase tracking-wider text-[#1F1C17] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1F1C17] rounded-full px-1.5 py-0.5"
          >
            <Menu className="w-3.5 h-3.5 text-[#1F1C17]" />
            <span>Menu</span>
            <kbd className="hidden sm:inline-block text-[10px] text-[#6E685B] bg-[#1F1C17]/5 px-1 py-0.5 rounded border border-[#1F1C17]/10 font-body">
              /
            </kbd>
          </button>
        </div>
      ) : (
        /* Expanded Island Modal Panel */
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Panel"
          className="w-[90vw] max-w-sm sm:max-w-md bg-[#FBF9F2]/95 backdrop-blur-2xl border border-[#1F1C17]/15 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(31,28,23,0.18)] flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header row: title & close button */}
          <div className="flex items-center justify-between border-b border-[#1F1C17]/10 pb-4">
            <div>
              <span className="label-caps block">Navigation</span>
              <span className="text-xs text-[#6E685B]">Tayyaba Rani • Portfolio</span>
            </div>
            <button
              ref={firstFocusableRef}
              onClick={() => setIsExpanded(false)}
              aria-label="Close menu"
              className="p-1.5 rounded-full hover:bg-[#1F1C17]/5 text-[#1F1C17] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1C17]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Large Navigation Links in Bricolage Display */}
          <ul className="space-y-3 font-display">
            {navLinks.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className="w-full text-left text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1C17] hover:opacity-75 transition-all link-highlighter py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1C17] rounded"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions: Copy Email & Resume */}
          <div className="pt-4 border-t border-[#1F1C17]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() => {
                onCopyEmail();
                setIsExpanded(false);
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#F6DE8D] text-[#1F1C17] border border-[#1F1C17] rounded-full px-4 py-2 text-xs sm:text-sm font-semibold hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1C17]"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy email</span>
            </button>

            <a
              href={siteConfig.socials.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 text-xs sm:text-sm font-medium text-[#1F1C17] hover:text-[#6E685B] transition-colors link-highlighter py-1"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

