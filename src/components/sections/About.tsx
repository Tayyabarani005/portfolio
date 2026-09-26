import React, { useState, useEffect, useRef, useMemo } from 'react';

interface ProjectRef {
  slug: string;
  title: string;
  shortTitle: string;
}

const PROJECT_MAP: Record<string, ProjectRef> = {
  outpost: { slug: 'outpost', title: 'Outpost', shortTitle: 'Outpost' },
  medlens: { slug: 'medlens', title: 'MedLens', shortTitle: 'MedLens' },
  healers: { slug: 'healers', title: 'Healers Institute Care Platform', shortTitle: 'Healers Institute' },
  skillswap: { slug: 'skillswap', title: 'SkillSwap', shortTitle: 'SkillSwap' },
  emfive: { slug: 'emfive', title: 'Emfive Business Services', shortTitle: 'Emfive' },
  'sunnah-table': { slug: 'sunnah-table', title: 'Sunnah Table', shortTitle: 'Sunnah Table' },
};

type Category = 'Interface' | 'Server' | 'Data' | 'Shipping' | 'Product';

interface SkillItem {
  id: string;
  name: string;
  category: Category;
  shape: 'pill' | 'rect' | 'squircle' | 'circle';
  color: string;
  isPaperWhite?: boolean;
  projectSlugs: string[];
  rotation?: number;
  isPhoto?: boolean;
  photoUrl?: string;
}

const BASE_SKILLS: SkillItem[] = [
  // Interface: butter #F6DE8D
  { id: 'typescript', name: 'TypeScript', category: 'Interface', shape: 'pill', color: '#F6DE8D', projectSlugs: ['outpost', 'medlens', 'skillswap', 'emfive'], rotation: -1.5 },
  { id: 'react', name: 'React', category: 'Interface', shape: 'rect', color: '#F6DE8D', projectSlugs: ['outpost', 'medlens', 'healers', 'sunnah-table'], rotation: 1.2 },
  { id: 'tanstack-router', name: 'TanStack Router', category: 'Interface', shape: 'rect', color: '#F6DE8D', projectSlugs: ['outpost', 'medlens'], rotation: -2 },
  { id: 'tanstack-query', name: 'TanStack Query', category: 'Interface', shape: 'squircle', color: '#F6DE8D', projectSlugs: ['outpost', 'medlens', 'healers'], rotation: 1.8 },
  { id: 'mantine-ui', name: 'Mantine UI', category: 'Interface', shape: 'squircle', color: '#F6DE8D', projectSlugs: ['outpost', 'medlens'], rotation: -1 },
  { id: 'shadcn-ui', name: 'shadcn/ui', category: 'Interface', shape: 'rect', color: '#F6DE8D', projectSlugs: ['healers', 'skillswap'], rotation: 2 },
  { id: 'tailwind-css', name: 'Tailwind CSS', category: 'Interface', shape: 'squircle', color: '#F6DE8D', projectSlugs: ['skillswap', 'emfive', 'sunnah-table'], rotation: -1.8 },
  { id: 'astro', name: 'Astro', category: 'Interface', shape: 'pill', color: '#F6DE8D', projectSlugs: ['medlens', 'emfive'], rotation: 1.5 },

  // Server: sage #C5D8A4
  { id: 'nodejs', name: 'Node.js', category: 'Server', shape: 'pill', color: '#C5D8A4', projectSlugs: ['outpost', 'medlens', 'healers'], rotation: 1.4 },
  { id: 'express', name: 'Express', category: 'Server', shape: 'rect', color: '#C5D8A4', projectSlugs: ['outpost', 'medlens', 'healers'], rotation: -1.6 },
  { id: 'rest-apis', name: 'REST APIs', category: 'Server', shape: 'squircle', color: '#C5D8A4', projectSlugs: ['outpost', 'healers'], rotation: 2 },
  { id: 'auth-roles', name: 'Auth and roles', category: 'Server', shape: 'squircle', color: '#C5D8A4', projectSlugs: ['outpost', 'healers'], rotation: -1.2 },
  { id: 'multitenant', name: 'Multi-tenant architecture', category: 'Server', shape: 'rect', color: '#C5D8A4', projectSlugs: ['outpost'], rotation: 1.5 },

  // Data: peach #F6C6A8
  { id: 'mongodb', name: 'MongoDB', category: 'Data', shape: 'rect', color: '#F6C6A8', projectSlugs: ['outpost', 'healers'], rotation: -1.8 },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Data', shape: 'squircle', color: '#F6C6A8', projectSlugs: ['medlens', 'skillswap'], rotation: 1.2 },
  { id: 'prisma', name: 'Prisma', category: 'Data', shape: 'pill', color: '#F6C6A8', projectSlugs: ['skillswap'], rotation: -2 },
  { id: 'supabase', name: 'Supabase', category: 'Data', shape: 'squircle', color: '#F6C6A8', projectSlugs: ['skillswap'], rotation: 1.8 },
  { id: 'neon', name: 'Neon', category: 'Data', shape: 'pill', color: '#F6C6A8', projectSlugs: [], rotation: -1 },

  // Shipping: paper white with an ink outline
  { id: 'git', name: 'Git', category: 'Shipping', shape: 'pill', color: '#FFFFFF', isPaperWhite: true, projectSlugs: [], rotation: 1.6 },
  { id: 'render', name: 'Render', category: 'Shipping', shape: 'rect', color: '#FFFFFF', isPaperWhite: true, projectSlugs: ['skillswap'], rotation: -1.5 },
  { id: 'vercel', name: 'Vercel', category: 'Shipping', shape: 'pill', color: '#FFFFFF', isPaperWhite: true, projectSlugs: ['sunnah-table'], rotation: 1.2 },

  // Product & Craft
  { id: 'product-eng', name: 'Product engineering', category: 'Product', shape: 'rect', color: '#F6DE8D', projectSlugs: ['outpost', 'medlens', 'skillswap'], rotation: -1.4 },
  { id: 'problem-solving', name: 'Problem solving', category: 'Product', shape: 'squircle', color: '#C5D8A4', projectSlugs: ['outpost', 'medlens', 'healers', 'skillswap'], rotation: 1.6 },
  { id: 'designing', name: 'Designing', category: 'Product', shape: 'pill', color: '#F6C6A8', projectSlugs: ['medlens', 'outpost', 'emfive', 'sunnah-table'], rotation: -1.8 },
];

const CATEGORIES: Category[] = ['Interface', 'Server', 'Data', 'Shipping', 'Product'];

export const About: React.FC = () => {
  // Configurable photo path: if filled in later, becomes ONE round sticker among others
  const photoPath = '[YOU FILL: photo path e.g. /images/tayyaba.jpg]';
  const hasRealPhoto = Boolean(photoPath && !photoPath.includes('[YOU FILL'));

  const allSkills = useMemo<SkillItem[]>(() => {
    if (!hasRealPhoto) return BASE_SKILLS;
    return [
      ...BASE_SKILLS,
      {
        id: 'photo-sticker',
        name: 'Tayyaba',
        category: 'Interface',
        shape: 'circle',
        color: '#F7F3E8',
        projectSlugs: [],
        rotation: 0,
        isPhoto: true,
        photoUrl: photoPath,
      },
    ];
  }, [hasRealPhoto, photoPath]);

  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [isPinnedByClick, setIsPinnedByClick] = useState<boolean>(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard accessibility: Escape closes tag
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSkillId(null);
        setIsPinnedByClick(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll to project card in "Things I've built"
  const handleProjectClick = (e: React.MouseEvent, proj: ProjectRef) => {
    e.preventDefault();
    e.stopPropagation();

    const target =
      document.querySelector(`[aria-label="Project: ${proj.title}"]`) ||
      document.querySelector(`[aria-label*="${proj.title}"]`) ||
      document.querySelector(`[aria-label*="${proj.slug}"]`) ||
      document.getElementById('work');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('ring-2', 'ring-[#1F1C17]/30');
      setTimeout(() => {
        target.classList.remove('ring-2', 'ring-[#1F1C17]/30');
      }, 1400);
    } else {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStickerClick = (skill: SkillItem) => {
    if (activeSkillId === skill.id && isPinnedByClick) {
      setActiveSkillId(null);
      setIsPinnedByClick(false);
    } else {
      setActiveSkillId(skill.id);
      setIsPinnedByClick(true);
    }
  };

  const handleStickerMouseEnter = (skill: SkillItem) => {
    if (isPinnedByClick) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveSkillId(skill.id);
  };

  const handleStickerMouseLeave = () => {
    if (isPinnedByClick) return;
    closeTimeoutRef.current = setTimeout(() => {
      setActiveSkillId(null);
    }, 150);
  };

  const handleStickerFocus = (skill: SkillItem) => {
    setActiveSkillId(skill.id);
  };

  const handleStickerBlur = () => {
    if (!isPinnedByClick) {
      setActiveSkillId(null);
    }
  };

  return (
    <section
      id="about"
      aria-label="The toolbox"
      className="w-full py-20 md:py-28 overflow-visible"
    >
      {/* Header (left-aligned, above tray) */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mb-10 sm:mb-12">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1F1C17]">
          The toolbox
        </h2>
        <p className="font-body text-base sm:text-lg text-[#6E685B] mt-2">
          Pick one up. It'll tell you where I've used it.
        </p>
      </div>

      {/* The Tray */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 overflow-visible">
        <div
          role="region"
          aria-label="Skills sticker tray"
          className="relative w-full rounded-[28px] border border-[#1F1C17]/10 bg-[#FBF9F2] shadow-[inset_0_2px_14px_rgba(31,28,23,0.06)] pt-16 sm:pt-20 pb-8 sm:pb-10 px-6 sm:px-10 overflow-visible transition-colors"
          style={{
            backgroundImage: 'radial-gradient(#C5D8A4 1.25px, transparent 1.25px)',
            backgroundSize: '22px 22px',
          }}
        >
          {/* Categorized Skills View */}
          <div className="flex flex-col gap-7 sm:gap-9">
            {CATEGORIES.map((catName) => {
              const catSkills = allSkills.filter((s) => s.category === catName);
              if (catSkills.length === 0) return null;

              const isRowActive = catSkills.some((s) => s.id === activeSkillId);

              return (
                <div
                  key={catName}
                  className={`flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 border-b border-[#1F1C17]/8 pb-6 last:border-none last:pb-0 relative ${
                    isRowActive ? 'z-30' : 'z-10'
                  }`}
                >
                  {/* Category Label */}
                  <div className="w-24 shrink-0">
                    <span className="font-display text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#6E685B]">
                      {catName}
                    </span>
                  </div>

                  {/* Stickers Grid */}
                  <div className="flex flex-wrap gap-3 sm:gap-3.5 items-center">
                    {catSkills.map((skill) => {
                      const isSkillActive = activeSkillId === skill.id;
                      const activeProjects = skill.projectSlugs
                        .map((slug) => PROJECT_MAP[slug])
                        .filter(Boolean);

                      return (
                        <div
                          key={skill.id}
                          className={`relative ${isSkillActive ? 'z-40' : 'z-10'}`}
                        >
                          <button
                            type="button"
                            onClick={() => handleStickerClick(skill)}
                            onMouseEnter={() => handleStickerMouseEnter(skill)}
                            onMouseLeave={handleStickerMouseLeave}
                            onFocus={() => handleStickerFocus(skill)}
                            onBlur={handleStickerBlur}
                            className={`group relative inline-flex items-center text-[#1F1C17] font-display font-bold text-xs sm:text-sm tracking-tight px-4 py-2 sm:px-4.5 sm:py-2.5 border-2 border-white shadow-[0_4px_12px_rgba(31,28,23,0.1)] hover:shadow-[0_8px_20px_rgba(31,28,23,0.16)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer select-none active:scale-95 focus-visible:ring-2 focus-visible:ring-[#1F1C17] focus-visible:ring-offset-2 outline-none ${
                              skill.shape === 'pill'
                                ? 'rounded-full'
                                : skill.shape === 'rect'
                                ? 'rounded-2xl'
                                : skill.shape === 'circle'
                                ? 'rounded-full p-1'
                                : 'rounded-[20px]'
                            } ${
                              skill.isPaperWhite ? 'ring-1 ring-[#1F1C17]/25' : ''
                            }`}
                            style={{
                              backgroundColor: skill.color,
                              transform: `rotate(${skill.rotation || 0}deg)`,
                            }}
                            aria-label={`${skill.name} (${skill.category})`}
                          >
                            {skill.isPhoto && skill.photoUrl ? (
                              <img
                                src={skill.photoUrl}
                                alt="Tayyaba Rani"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <span className="group-hover:tracking-normal transition-all">
                                {skill.name}
                              </span>
                            )}
                          </button>

                          {/* Attached Tag Card Tooltip: All stickers open on ABOVE side without cutting */}
                          {isSkillActive && (
                            <div
                              role="tooltip"
                              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 z-50 bg-[#1F1C17] text-[#FBF9F2] px-3.5 py-2.5 rounded-xl shadow-2xl border border-white/20 whitespace-nowrap min-w-[150px] max-w-[300px] pointer-events-auto"
                              onMouseEnter={() => {
                                if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                              }}
                              onMouseLeave={handleStickerMouseLeave}
                            >
                              <span className="font-display font-bold text-xs sm:text-sm text-[#F7F3E8] block mb-0.5">
                                {skill.name}
                              </span>
                              {activeProjects.length > 0 ? (
                                <div className="text-[11px] text-[#C5D8A4] font-body flex flex-wrap items-center gap-1.5 mt-1">
                                  <span className="text-white/60">Used in:</span>
                                  {activeProjects.map((p, idx) => (
                                    <button
                                      key={p.slug}
                                      type="button"
                                      onClick={(e) => handleProjectClick(e, p)}
                                      className="underline underline-offset-2 text-[#F6DE8D] hover:text-white font-medium cursor-pointer transition-colors"
                                    >
                                      {p.shortTitle}
                                      {idx < activeProjects.length - 1 ? ',' : ''}
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-[10px] text-white/50 block mt-0.5">
                                  {skill.category}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Below the tray: single line in user's voice */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mt-8 sm:mt-10">
        <p className="font-body text-base sm:text-lg text-[#1F1C17] font-medium leading-relaxed">
          I like interfaces that stay clear even when the system underneath isn't.
        </p>
      </div>
    </section>
  );
};
