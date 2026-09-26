import React from 'react';
import { Project } from '../../types.ts';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface AllProjectsViewProps {
  projects: Project[];
  onOpenCaseStudy: (slug: string) => void;
  onBackToHome: () => void;
}

const tintMap = {
  butter: '#F6DE8D',
  sage: '#C5D8A4',
  peach: '#F6C6A8',
} as const;

export const AllProjectsView: React.FC<AllProjectsViewProps> = ({
  projects,
  onOpenCaseStudy,
  onBackToHome,
}) => {
  return (
    <div className="w-full py-12 md:py-20 animate-in fade-in duration-300">
      {/* Back button and header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-body font-semibold text-[#1F1C17] hover:text-[#6E685B] transition-colors mb-8 rounded-full border border-[#1F1C17]/15 bg-[#FBF9F2] px-4 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to overview</span>
        </button>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1F1C17]">
          All Projects
        </h1>
        <p className="font-body text-base sm:text-lg text-[#6E685B] mt-3 max-w-2xl">
          A complete index of production applications, healthcare platforms, open tools, and freelance client engagements.
        </p>
      </div>

      {/* Grid of All Projects with Thumbnail Cover Images */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((project) => {
          const tintColor = tintMap[project.tint];

          return (
            <article
              key={project.slug}
              onClick={() => onOpenCaseStudy(project.slug)}
              className="group bg-[#FBF9F2] border border-[#1F1C17]/15 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Cover Preview Image */}
              <div 
                className="w-full aspect-[16/10] overflow-hidden border-b border-[#1F1C17]/10 relative flex items-center justify-center"
                style={{ backgroundColor: `${tintColor}22` }}
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                  width="640"
                  height="400"
                />
                
                {/* Category chip overlay */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block text-[11px] font-body font-semibold tracking-wider uppercase text-[#1F1C17] bg-[#FBF9F2]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#1F1C17]/15 shadow-xs">
                    {project.categories[0]}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-body text-[#6E685B]">
                    <span className="font-semibold uppercase tracking-wider">{project.number}</span>
                    <span>{project.year}</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F1C17] group-hover:translate-x-1 transition-transform">
                    {project.title}
                  </h2>

                  <p className="font-body text-sm text-[#1F1C17] font-medium">
                    {project.subtitle}
                  </p>

                  <p className="font-body text-sm text-[#6E685B] leading-relaxed">
                    {project.shortSummary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1F1C17]/10 flex items-center justify-between">
                  <span className="font-body text-xs text-[#6E685B] truncate max-w-[200px] sm:max-w-[260px]">
                    {project.techStackSummary}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-[#1F1C17] link-highlighter">
                    <span>Case study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
