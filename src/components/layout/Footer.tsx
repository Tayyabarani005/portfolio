import React from 'react';
import { siteConfig } from '../../data/site.ts';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onCopyEmail?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="w-full border-t border-[#1F1C17]/10 py-8 transition-colors pb-24 sm:pb-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 text-xs sm:text-sm font-body text-[#6E685B]">
        {/* Left: Copyright */}
        <p>
           {currentYear} {siteConfig.name}
        </p>

        {/* Right: Quiet Back to Top */}
        <button
          onClick={() => onNavigate('hero')}
          className="hover:text-[#1F1C17] transition-colors inline-flex items-center gap-1.5 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1F1C17] rounded px-1.5 py-0.5"
          aria-label="Back to top of page"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
