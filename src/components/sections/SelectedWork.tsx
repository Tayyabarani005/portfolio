import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../../types.ts';
import { ArrowUpRight } from 'lucide-react';

interface SelectedWorkProps {
  projects: Project[];
  onOpenCaseStudy: (slug: string) => void;
  onViewAllProjects: () => void;
}

const tintMap = {
  butter: '#F6DE8D',
  sage: '#C5D8A4',
  peach: '#F6C6A8',
} as const;

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  projects,
  onOpenCaseStudy,
  onViewAllProjects,
}) => {
  // Show the top 3 featured projects for a concise homepage preview
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPointerDevice, setIsPointerDevice] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsPointerDevice(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPointerDevice) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const hoveredProject = featuredProjects.find((p) => p.slug === hoveredSlug);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected Work"
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: hoveredProject ? `${tintMap[hoveredProject.tint]}14` : 'transparent',
      }}
      className="w-full py-20 md:py-28 transition-colors duration-500 relative"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1F1C17]">
            Things I've built
          </h2>
          <p className="font-body text-base text-[#6E685B] mt-2">
            Selected work across multi-tenant SaaS, clinical healthcare, and institutional platforms.
          </p>
        </div>

        {/* View all projects action */}
        <button
          onClick={onViewAllProjects}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-sm font-body font-semibold text-[#1F1C17] link-highlighter py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1F1C17] rounded"
        >
          <span>View all projects</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Featured Projects List */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 border-t border-[#1F1C17]/15">
        {featuredProjects.map((project) => {
          const isHovered = hoveredSlug === project.slug;
          const isDimmed = hoveredSlug !== null && !isHovered;
          const tintColor = tintMap[project.tint];

          return (
            <div
              key={project.slug}
              className={`border-b border-[#1F1C17]/15 transition-opacity duration-300 ${
                isDimmed ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpenCaseStudy(project.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenCaseStudy(project.slug);
                  }
                }}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                /* Subtler hover treatment: background tint, no hard square outline */
                className={`py-7 sm:py-9 px-3 -mx-3 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer group transition-colors duration-200 rounded-xl ${
                  isHovered ? 'bg-[#FBF9F2]/70' : 'bg-transparent'
                }`}
                aria-label={`Project: ${project.title}`}
              >
                {/* Left: Thumbnail image & Title */}
                <div className="flex items-center gap-5 sm:gap-6">
                  {/* Embedded Thumbnail preview image */}
                  <div 
                    className="w-20 h-14 sm:w-28 sm:h-18 rounded-xl overflow-hidden border border-[#1F1C17]/12 shrink-0 relative flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: `${tintColor}25` }}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="112"
                      height="72"
                    />
                  </div>

                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-body text-xs font-semibold text-[#6E685B] uppercase tracking-wider">
                        {project.number}
                      </span>
                      <h3 className="font-display display-morph text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1F1C17] group-hover:translate-x-1 transition-transform duration-200">
                        {project.title}
                      </h3>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-[#6E685B] mt-1 line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Summary, Year, Arrow */}
                <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-8 font-body">
                  <span className="text-sm text-[#6E685B] max-w-sm text-left lg:text-right hidden md:inline-block">
                    {project.shortSummary}
                  </span>

                  <span className="text-xs sm:text-sm font-medium text-[#1F1C17] whitespace-nowrap">
                    {project.year}
                  </span>

                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#1F1C17]/15 group-hover:bg-[#1F1C17] group-hover:text-[#F7F3E8] group-hover:border-[#1F1C17] transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom link to view all projects */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 pt-10 flex items-center justify-center">
        <button
          onClick={onViewAllProjects}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F6DE8D] text-[#1F1C17] border border-[#1F1C17] font-body font-semibold text-sm hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1C17]"
        >
          <span>View all projects</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Desktop Floating Preview Thumbnail following cursor */}
      {isPointerDevice && hoveredProject && (
        <div
          className="fixed pointer-events-none z-30 w-64 h-40 rounded-2xl overflow-hidden shadow-2xl border border-[#1F1C17]/20 transition-transform duration-75 ease-out"
          style={{
            left: `${mousePos.x + 24}px`,
            top: `${mousePos.y - 80}px`,
            backgroundColor: '#FBF9F2',
          }}
        >
          <img
            src={hoveredProject.image}
            alt={hoveredProject.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </section>
  );
};
