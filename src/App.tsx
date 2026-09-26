import React, { useState, useEffect, useCallback } from 'react';
import { Hero } from './components/sections/Hero.tsx';
import { SelectedWork } from './components/sections/SelectedWork.tsx';
import { AllProjectsView } from './components/sections/AllProjectsView.tsx';
import { Experience } from './components/sections/Experience.tsx';
import { About } from './components/sections/About.tsx';
import { Contact } from './components/sections/Contact.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { FloatingIslandNav } from './components/layout/FloatingIslandNav.tsx';
import { GrainOverlay } from './components/ui/GrainOverlay.tsx';
import { CaseStudyModal } from './components/projects/CaseStudyModal.tsx';
import { Toast } from './components/ui/Toast.tsx';
import { projects } from './data/projects.ts';
import { siteConfig } from './data/site.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'projects'>('home');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Sync URL query params for view and project deep linking
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      const projectParam = params.get('project');

      if (viewParam === 'projects') {
        setCurrentView('projects');
      } else {
        setCurrentView('home');
      }

      if (projectParam && projects.some((p) => p.slug === projectParam)) {
        setSelectedProjectSlug(projectParam);
      } else {
        setSelectedProjectSlug(null);
      }
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  // Track overall page scroll progress and active section when on home
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
      setScrollProgress(progress);

      const sections = ['hero', 'work', 'experience', 'about', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navigateToAllProjects = useCallback(() => {
    setCurrentView('projects');
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('view', 'projects');
    window.history.pushState({ view: 'projects' }, '', newUrl.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToHome = useCallback((targetSection?: string) => {
    setCurrentView('home');
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('view');
    window.history.pushState({}, '', newUrl.toString());

    if (targetSection) {
      setTimeout(() => {
        scrollToSection(targetSection);
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const openCaseStudy = useCallback((slug: string) => {
    setSelectedProjectSlug(slug);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('project', slug);
    window.history.pushState({ project: slug }, '', newUrl.toString());
  }, []);

  const closeCaseStudy = useCallback(() => {
    setSelectedProjectSlug(null);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('project');
    window.history.pushState({}, '', newUrl.toString());
  }, []);

  const handleCopyEmail = useCallback(() => {
    const email = siteConfig.socials.email;
    navigator.clipboard.writeText(email).then(() => {
      setToastMessage(`Copied to clipboard: ${email}`);
      setIsToastVisible(true);
      setTimeout(() => {
        setIsToastVisible(false);
      }, 3500);
    }).catch(() => {
      setToastMessage(`Email: ${email}`);
      setIsToastVisible(true);
      setTimeout(() => {
        setIsToastVisible(false);
      }, 3500);
    });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (currentView !== 'home') {
      navigateToHome(sectionId);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 40;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [currentView, navigateToHome]);

  const activeProject = projects.find((p) => p.slug === selectedProjectSlug) || null;

  return (
    <div className="min-h-screen bg-[#F7F3E8] text-[#1F1C17] selection:bg-[#F6DE8D] selection:text-[#1F1C17] flex flex-col justify-between relative font-body">
      {/* Ambient Grain and Blobs Overlay */}
      <GrainOverlay />

      {/* Static Top Wordmark that scrolls away with the page */}
      <header className="w-full max-w-6xl mx-auto px-6 sm:px-8 pt-8 pb-4 flex items-center justify-between relative z-10">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            navigateToHome('hero');
          }}
          className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#1F1C17] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1C17] rounded py-0.5"
        >
          {siteConfig.name}
        </a>

        <div className="flex items-center gap-4">
          {currentView === 'projects' ? (
            <button
              onClick={() => navigateToHome()}
              className="text-xs font-semibold text-[#1F1C17] hover:text-[#6E685B] transition-colors"
            >
              Back to overview
            </button>
          ) : (
            <span className="label-caps hidden sm:inline-block">
              Software Engineer
            </span>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl mx-auto px-6 sm:px-8 flex-grow relative z-10">
        {currentView === 'home' ? (
          <>
            {/* 1. Hero */}
            <Hero
              onScrollToWork={() => scrollToSection('work')}
              onNavigateToContact={() => scrollToSection('contact')}
            />

            {/* 2. Work: Concise Preview of Featured Projects with Link to All Projects */}
            <SelectedWork
              projects={projects}
              onOpenCaseStudy={openCaseStudy}
              onViewAllProjects={navigateToAllProjects}
            />

            {/* 3. Changelog: Experience */}
            <Experience />

            {/* 4. About: Engineering Narrative */}
            <About />

            {/* 5. Contact: Professional Form and Channels */}
            <Contact onCopyEmail={handleCopyEmail} />
          </>
        ) : (
          /* Dedicated All Projects Page */
          <AllProjectsView
            projects={projects}
            onOpenCaseStudy={openCaseStudy}
            onBackToHome={() => navigateToHome('work')}
          />
        )}
      </main>

      {/* Quiet Single-Line Footer */}
      <Footer onNavigate={(id) => navigateToHome(id)} />

      {/* Floating Island Navigation */}
      {currentView === 'home' && (
        <FloatingIslandNav
          onNavigate={scrollToSection}
          onCopyEmail={handleCopyEmail}
          activeSection={activeSection}
          scrollProgress={scrollProgress}
        />
      )}

      {/* Deep-Dive Case Study Reader Modal */}
      <CaseStudyModal
        project={activeProject}
        allProjects={projects}
        isOpen={!!activeProject}
        onClose={closeCaseStudy}
        onSelectProject={openCaseStudy}
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}
