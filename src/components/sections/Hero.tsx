import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../data/site.ts';
import { ArrowDown, Mail } from 'lucide-react';
import { RotatingBadge } from '../ui/RotatingBadge.tsx';

interface HeroProps {
  onScrollToWork: () => void;
  onNavigateToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToWork, onNavigateToContact }) => {
  const [islamabadTime, setIslamabadTime] = useState<string>('');

  // Live local time in Islamabad (Asia/Karachi, UTC+5)
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setIslamabadTime(formatter.format(new Date()));
      } catch {
        setIslamabadTime('PKT (UTC+5)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative w-full pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden"
    >
      {/* Rotating Badge in corner */}
      <div className="absolute right-0 top-12 md:right-4 md:top-20 hidden sm:block z-10">
        <RotatingBadge />
      </div>

      <div className="max-w-5xl space-y-8 md:space-y-10 relative z-10">
        {/* Status chip & Live time row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          {/* Pulsing Sage Dot Status Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5D8A4]/30 border border-[#C5D8A4]/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7CA047] animate-pulse" />
            <span className="text-xs sm:text-sm font-body font-medium text-[#1F1C17]">
              {siteConfig.availability}
            </span>
          </div>

          <span className="hidden sm:inline-block text-xs text-[#6E685B]">•</span>

          {/* Live Peshawar Time */}
          <div className="text-xs sm:text-sm font-body text-[#6E685B] flex items-center gap-1.5">
            <span>Peshawar, PK</span>
            <span>/</span>
            <span className="font-semibold text-[#1F1C17]">{islamabadTime || '12:00 PM'}</span>
          </div>
        </div>

        {/* Oversized Typographic Display Headline */}
        <h1 className="font-display display-morph text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight text-[#1F1C17] leading-[1.06] text-balance">
          {siteConfig.headline}
        </h1>

        {/* Plain Concrete Subtitle */}
        <p className="text-lg sm:text-xl text-[#6E685B] leading-relaxed max-w-2xl font-body font-normal">
          {siteConfig.subheadline}
        </p>

        {/* Action Buttons: Butter fill with ink border & Outlined */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          {/* Primary: See what I've built */}
          <button
            id="hero-view-work-button"
            onClick={onScrollToWork}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-body font-semibold rounded-full bg-[#F6DE8D] text-[#1F1C17] border border-[#1F1C17] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1C17]"
          >
            <span>See what I've built</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          {/* Secondary: Say hello */}
          <button
            id="hero-contact-button"
            onClick={onNavigateToContact}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-body font-semibold rounded-full border border-[#1F1C17]/25 text-[#1F1C17] bg-white/40 hover:bg-white hover:border-[#1F1C17] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1C17]"
          >
            <span>Let's talk</span>
            <Mail className="w-4 h-4 text-[#6E685B]" />
          </button>
        </div>

        {/* Currently Building Footnote */}
        <div className="pt-4 flex items-center gap-2 text-xs sm:text-sm text-[#6E685B] font-body">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F1C17]/40" />
          <span>
            <strong className="font-semibold text-[#1F1C17]">Right now:</strong>{' '}
            {siteConfig.currentlyBuilding}
          </span>
        </div>
      </div>
    </section>
  );
};



