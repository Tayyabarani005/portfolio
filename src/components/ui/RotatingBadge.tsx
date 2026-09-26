import React from 'react';

interface RotatingBadgeProps {
  className?: string;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 sm:w-28 sm:h-28 animate-[spin_16s_linear_infinite] motion-reduce:animate-none pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <path
            id="circlePath"
            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text className="font-body text-[10px] uppercase tracking-[0.24em] fill-[#6E685B] font-semibold">
          <textPath href="#circlePath" startOffset="0%">
            Software Engineer • Algorithm •
          </textPath>
        </text>
      </svg>
      {/* Center dot/monogram */}
      <div className="absolute w-3 h-3 rounded-full bg-[#F6DE8D] border border-[#1F1C17]/40 shadow-sm" />
    </div>
  );
};
