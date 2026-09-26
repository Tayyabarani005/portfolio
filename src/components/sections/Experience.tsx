import React from 'react';
import { experiences } from '../../data/experience.ts';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      aria-label="The Changelog"
      className="w-full py-20 md:py-28"
    >
      {/* Heading: The changelog */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mb-14 sm:mb-20">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1F1C17]">
          The changelog
        </h2>
        <p className="font-body text-base text-[#6E685B] mt-2">
          Where I have built and what shifted along the way.
        </p>
      </div>

      {/* Release Notes Chronology */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 space-y-16 sm:space-y-24">
        {experiences.map((item) => (
          <article
            key={item.id}
            id={`changelog-${item.id}`}
            className="grid grid-cols-12 gap-4 sm:gap-8 lg:gap-12 relative"
          >
            {/* Sticky Year Column (Left) */}
            <div className="col-span-12 sm:col-span-3 lg:col-span-2">
              <div className="sm:sticky sm:top-28">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#1F1C17]/20 select-none block">
                  {item.year}
                </span>
                <span className="font-body text-xs font-semibold text-[#6E685B] uppercase tracking-wider block mt-1">
                  {item.period}
                </span>
              </div>
            </div>

            {/* Entry Content (Right) with vertical hairline and node */}
            <div className="col-span-12 sm:col-span-9 lg:col-span-10 relative pl-6 sm:pl-8 border-l border-[#1F1C17]/15">
              {/* Node dot on the hairline */}
              <div 
                aria-hidden="true"
                className="absolute -left-[5.5px] top-2 w-2.5 h-2.5 rounded-full bg-[#F6DE8D] border-2 border-[#F7F3E8] shadow-xs" 
              />

              {/* Roles progression header: current role title */}
              <div className="space-y-1">
                <div className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1F1C17]">
                  {item.roles[0].title}
                </div>

                <div className="flex items-center gap-2 text-sm font-body text-[#6E685B]">
                  <strong className="font-semibold text-[#1F1C17]">{item.company}</strong>
                  <span></span>
                  <span>{item.location}</span>
                </div>
              </div>

              {/* What Changed One-Liner */}
              <p className="mt-4 font-body text-[16px] sm:text-[17px] font-medium text-[#1F1C17] italic leading-relaxed">
                "{item.whatChanged}"
              </p>

              {/* Bullets: minimal round dots, zero triangles/arrows */}
              <ul className="mt-4 space-y-2.5 font-body text-[15px] sm:text-[16px] text-[#6E685B] leading-relaxed">
                {item.highlights.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1F1C17]/35 mt-2.5 shrink-0" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="mt-6 pt-4 border-t border-[#1F1C17]/10 text-xs sm:text-sm font-body text-[#6E685B]">
                <strong className="font-semibold text-[#1F1C17]">Built with:</strong>{' '}
                <span>{item.techString}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
