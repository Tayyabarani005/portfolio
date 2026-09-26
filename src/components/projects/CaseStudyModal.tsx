import React, { useEffect, useRef } from 'react';
import { Project } from '../../types.ts';
import { X, ArrowLeft, ArrowRight, Check, Hammer, Lightbulb } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (slug: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation: ESC to close, Arrow keys for prev/next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !project) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
        const nextIndex = (currentIndex + 1) % allProjects.length;
        onSelectProject(allProjects[nextIndex].slug);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
        const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
        onSelectProject(allProjects[prevIndex].slug);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      contentRef.current?.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, project, allProjects, onClose, onSelectProject]);

  if (!isOpen || !project) return null;

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  // Combined tags with ONE consistent styling
  const allTags = [...project.categories, ...project.technologies];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      id="case-study-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1C17]/50 backdrop-blur-sm p-3 sm:p-5 md:p-8 overflow-y-auto"
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#F7F3E8] text-[#1F1C17] border border-[#1F1C17]/15 rounded-2xl shadow-2xl overflow-y-auto"
      >
        {/* Sticky Header inside modal */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#F7F3E8]/95 backdrop-blur-md border-b border-[#1F1C17]/10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="font-body text-xs font-semibold text-[#1F1C17] bg-[#1F1C17]/10 px-2.5 py-1 rounded-md">
              Case Study // {project.number}
            </span>
            <span className="text-sm font-bold text-[#1F1C17] truncate max-w-[200px] sm:max-w-none">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#6E685B]">
              <button
                onClick={() => onSelectProject(prevProject.slug)}
                className="hover:text-[#1F1C17] px-2.5 py-1 rounded border border-[#1F1C17]/15 hover:border-[#1F1C17]/40 transition-colors"
                aria-label="Previous project"
              >
                ← Prev
              </button>
              <button
                onClick={() => onSelectProject(nextProject.slug)}
                className="hover:text-[#1F1C17] px-2.5 py-1 rounded border border-[#1F1C17]/15 hover:border-[#1F1C17]/40 transition-colors"
                aria-label="Next project"
              >
                Next →
              </button>
            </div>

            <button
              id="case-study-close-btn"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F1C17] text-[#F7F3E8] hover:bg-[#1F1C17]/85 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#1F1C17]"
              aria-label="Close case study"
            >
              <span>Close</span>
              <span className="text-[10px] opacity-70">ESC</span>
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="px-6 sm:px-10 py-8 space-y-12">
          {/* Section 1: Hero & Metadata */}
          <div className="space-y-6 border-b border-[#1F1C17]/10 pb-8">
            {/* Darkened, enlarged metadata labels (>= 13-14px) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/70 border border-[#1F1C17]/8">
              <div>
                <span className="text-xs text-[#6E685B] font-medium block">Timeline</span>
                <span className="text-sm sm:text-[15px] font-bold text-[#1F1C17]">
                  {project.year} ({project.timeline})
                </span>
              </div>
              <div>
                <span className="text-xs text-[#6E685B] font-medium block">Role</span>
                <span className="text-sm sm:text-[15px] font-bold text-[#1F1C17]">
                  {project.role}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs text-[#6E685B] font-medium block">Scope</span>
                <span className="text-sm sm:text-[15px] font-bold text-[#1F1C17]">
                  Full-Stack Implementation
                </span>
              </div>
            </div>

            <div>
              <h1
                id="case-study-title"
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1F1C17]"
              >
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-[#6E685B] font-medium mt-2 leading-snug">
                {project.subtitle}
              </p>
            </div>

            {/* Consistent Tag Style (One Style Only) */}
            <div className="flex flex-wrap gap-2 pt-1">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-body px-3 py-1 rounded-lg bg-white border border-[#1F1C17]/12 text-[#1F1C17]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Verified Metrics (Rendered only if verified) */}
            {project.verifiedMetrics && project.verifiedMetrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1F1C17]/10">
                {project.verifiedMetrics.map((metric, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#1F1C17]/10 bg-white/60">
                    <span className="text-xs text-[#6E685B] font-medium block mb-1">
                      {metric.label}
                    </span>
                    <span className="text-2xl font-bold text-[#1F1C17]">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Executive Summary */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase font-semibold tracking-wider text-[#6E685B]">
              Overview
            </h2>
            <p className="text-[17px] text-[#1F1C17] leading-relaxed">
              {project.longOverview}
            </p>
          </div>

          {/* NEW Section: What I Built & What I Learned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* What I built */}
            <div className="p-6 rounded-2xl bg-white border border-[#1F1C17]/10 space-y-4">
              <div className="flex items-center gap-2 text-[#1F1C17]">
                <Hammer className="w-4 h-4 text-[#1F1C17]" />
                <h3 className="text-base font-bold">What I built</h3>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#6E685B]">
                {project.whatIBuilt.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#1F1C17] font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What I learned */}
            <div className="p-6 rounded-2xl bg-white border border-[#1F1C17]/10 space-y-4">
              <div className="flex items-center gap-2 text-[#1F1C17]">
                <Lightbulb className="w-4 h-4 text-[#1F1C17]" />
                <h3 className="text-base font-bold">What I learned</h3>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#6E685B]">
                {project.whatILearned.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#1F1C17] font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: The Challenge */}
          <div className="space-y-6 border-t border-[#1F1C17]/10 pt-8">
            <h2 className="text-xs uppercase font-semibold tracking-wider text-[#6E685B]">
              The Challenge
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[#1F1C17]">
                  Problem Statement
                </h3>
                <p className="text-[15px] text-[#6E685B] leading-relaxed">
                  {project.challenge.problemStatement}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[#1F1C17]">
                  Why It Mattered
                </h3>
                <p className="text-[15px] text-[#6E685B] leading-relaxed">
                  {project.challenge.whyItMattered}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs text-[#6E685B] uppercase tracking-wider font-semibold block">
                Complexity Factors:
              </span>
              <ul className="space-y-2 text-sm text-[#6E685B]">
                {project.challenge.complexityFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#1F1C17] font-bold mt-0.5">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4: System Architecture */}
          <div className="space-y-6 border-t border-[#1F1C17]/10 pt-8">
            <div>
              <h2 className="text-xs uppercase font-semibold tracking-wider text-[#6E685B] mb-1">
                Architecture & Data Flow
              </h2>
              <p className="text-[16px] text-[#1F1C17] font-medium">
                {project.architecture.summary}
              </p>
            </div>

            {/* Pipeline description box */}
            <div className="p-4 rounded-xl border border-[#1F1C17]/10 bg-white space-y-2">
              <span className="text-xs font-semibold text-[#6E685B] uppercase tracking-wider block">
                Execution Flow
              </span>
              <div className="font-body text-xs sm:text-[13px] text-[#1F1C17] overflow-x-auto whitespace-nowrap py-1">
                {project.architecture.pipelineDescription}
              </div>
            </div>

            {/* Component cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.architecture.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#1F1C17]/10 bg-white/70 space-y-1.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-sm text-[#1F1C17]">
                      {comp.name}
                    </h4>
                    <span className="font-body text-[11px] px-2 py-0.5 rounded bg-[#F7F3E8] border border-[#1F1C17]/10 text-[#6E685B]">
                      {comp.tech}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6E685B] leading-relaxed">
                    {comp.responsibility}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Key Technical Decisions */}
          <div className="space-y-6 border-t border-[#1F1C17]/10 pt-8">
            <h2 className="text-xs uppercase font-semibold tracking-wider text-[#6E685B]">
              Technical Decisions
            </h2>

            <div className="space-y-4">
              {project.decisions.map((dec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-[#1F1C17]/10 bg-white/80 space-y-3"
                >
                  <h3 className="text-base font-semibold text-[#1F1C17]">
                    {dec.decision}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm pt-2 border-t border-[#1F1C17]/8">
                    <div>
                      <span className="text-xs text-[#6E685B] uppercase block mb-1">Context</span>
                      <span className="text-[#1F1C17]">{dec.context}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#6E685B] uppercase block mb-1">Tradeoff Considered</span>
                      <span className="text-[#1F1C17]">{dec.tradeoffConsidered}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#6E685B] uppercase block mb-1">Result</span>
                      <span className="font-semibold text-[#1F1C17]">{dec.result}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Verified Outcome & Deliverables */}
          <div className="space-y-6 border-t border-[#1F1C17]/10 pt-8 pb-4">
            <h2 className="text-xs uppercase font-semibold tracking-wider text-[#6E685B]">
              Outcome & Deliverables
            </h2>

            <p className="text-[17px] text-[#1F1C17] font-medium leading-relaxed">
              {project.outcome.summary}
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-xs text-[#6E685B] uppercase tracking-wider font-semibold block">
                Deliverables:
              </span>
              <ul className="space-y-2 text-sm sm:text-[15px] text-[#6E685B]">
                {project.outcome.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1F1C17] mt-1 shrink-0" />
                    <span className="text-[#1F1C17]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Bottom Footer Navigation */}
          <div className="pt-6 border-t border-[#1F1C17]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium">
            <button
              onClick={() => onSelectProject(prevProject.slug)}
              className="hover:text-[#1F1C17] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: {prevProject.title}</span>
            </button>

            <button
              onClick={() => onSelectProject(nextProject.slug)}
              className="hover:text-[#1F1C17] flex items-center gap-1.5 transition-colors"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

