import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, ArrowUpRight, Sparkles, BookOpen, Wrench, MessageSquare, FastForward } from 'lucide-react';
import { SplineSceneBackground } from './SplineSceneBackground';

interface HerveHeroProps {
  onNavigate: (route: string) => void;
  onScrollDown: () => void;
  splineUrl?: string;
  onSplineUrlChange?: (url: string) => void;
}

export const HerveHero: React.FC<HerveHeroProps> = ({
  onNavigate,
  onScrollDown,
  splineUrl,
  onSplineUrlChange
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine3Ref = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationCompleted(true);
      return;
    }

    const ctx = gsap.context(() => {
      // Deliberate GSAP entrance playing ONCE per page visit
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimationCompleted(true);
        }
      });

      // 1. Meta kicker reveal
      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.15
      );

      // 2. Staggered oversized headline lines
      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
        { opacity: 0, y: 48, skewY: 1.5 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power4.out'
        },
        0.3
      );

      // 3. Supporting copy reveal
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.8
      );

      // 4. Action buttons reveal
      tl.fromTo(
        actionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.95
      );

      // 5. Bottom bar reveal
      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        1.1
      );
    }, heroRef);

    // Escape or Space skip key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Escape' || e.code === 'Space') && !animationCompleted) {
        setAnimationCompleted(true);
        gsap.set(
          [
            kickerRef.current,
            headlineLine1Ref.current,
            headlineLine2Ref.current,
            headlineLine3Ref.current,
            descriptionRef.current,
            actionsRef.current,
            bottomBarRef.current
          ],
          { opacity: 1, y: 0, skewY: 0 }
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [animationCompleted]);

  const handleSkip = () => {
    setAnimationCompleted(true);
    gsap.set(
      [
        kickerRef.current,
        headlineLine1Ref.current,
        headlineLine2Ref.current,
        headlineLine3Ref.current,
        descriptionRef.current,
        actionsRef.current,
        bottomBarRef.current
      ],
      { opacity: 1, y: 0, skewY: 0 }
    );
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-between px-6 sm:px-12 py-10 overflow-hidden font-sans border-b border-black/10 bg-[#F8F7F2]"
    >
      {/* Background: Spline 3D Scene / Architectural WebGL Canvas */}
      <SplineSceneBackground
        sceneUrl={splineUrl}
        onSceneUrlChange={onSplineUrlChange}
      />

      {/* Top Architectural Meta Grid (Hervé Baillargeon inspired) */}
      <div
        ref={kickerRef}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-600 pb-6 border-b border-black/10"
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-black uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#D4FF00] border border-black inline-block" />
            VIBE101 // SPEC 01
          </span>
          <span aria-hidden="true" className="text-neutral-400">/</span>
          <span>AUTONOMOUS SOFTWARE FIELD GUIDE</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-neutral-500 hidden md:inline">EDITION 2026.10</span>
          <span aria-hidden="true" className="text-neutral-400 hidden md:inline">/</span>
          <span className="text-black font-semibold">ZERO-SLOP DISCIPLINE</span>

          {!animationCompleted && (
            <button
              onClick={handleSkip}
              className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 bg-white border border-black/10 hover:border-black rounded text-neutral-600 hover:text-black transition-colors cursor-pointer ml-2"
              title="Skip entrance animation (Space / Esc)"
            >
              <FastForward className="w-3 h-3" />
              <span>Skip</span>
            </button>
          )}
        </div>
      </div>

      {/* Center Typographic Master Composition */}
      <div className="relative z-10 max-w-6xl my-auto py-12 sm:py-16">
        <div className="space-y-1 sm:space-y-2">
          {/* Approved Starting Headline: "Less tutorial hell. More things you actually build." */}
          <h1
            ref={headlineLine1Ref}
            className="font-display font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight text-[#121212] uppercase leading-[0.92]"
          >
            Less tutorial hell.
          </h1>
          <h1
            ref={headlineLine2Ref}
            className="font-display font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight text-[#121212] uppercase leading-[0.92]"
          >
            More things you
          </h1>
          <h1
            ref={headlineLine3Ref}
            className="font-display font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight text-[#121212] uppercase leading-[0.92] flex flex-wrap items-center gap-x-4"
          >
            <span>actually build.</span>
            <span className="text-base sm:text-xl font-mono text-black font-normal bg-[#D4FF00] px-3 py-1 border border-black rounded-sm tracking-normal normal-case self-center mt-2 lg:mt-0">
              v1.0
            </span>
          </h1>
        </div>

        {/* Written Concise Supporting Copy */}
        <p
          ref={descriptionRef}
          className="mt-8 text-base sm:text-xl text-neutral-700 max-w-2xl leading-relaxed font-sans"
        >
          Stop collecting prompt templates and start architecting software. Vibe101 teaches you how to direct frontier AI editors, make disciplined design decisions, debug broken codebases, and ship real products.
        </p>

        {/* Action Directives */}
        <div
          ref={actionsRef}
          className="mt-10 flex flex-wrap items-center gap-4 text-xs font-mono"
        >
          <button
            onClick={() => onNavigate('/guide')}
            className="px-6 py-3.5 bg-black text-[#D4FF00] hover:bg-neutral-800 font-bold border-2 border-black rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Learning Guide</span>
            <ArrowUpRight className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={() => onNavigate('/tools')}
            className="px-6 py-3.5 bg-white text-black hover:bg-neutral-100 font-bold border-2 border-black rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <Wrench className="w-4 h-4 text-neutral-700" />
            <span>Discover Arsenal Tools</span>
          </button>

          <button
            onClick={() => onNavigate('/chat')}
            className="px-6 py-3.5 bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-bold border-2 border-black rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <MessageSquare className="w-4 h-4 fill-black text-black" />
            <span>Launch Copilot</span>
          </button>
        </div>
      </div>

      {/* Bottom Status Bar with Scroll Transition Callout */}
      <div
        ref={bottomBarRef}
        className="relative z-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-600"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-black font-bold">FOUNDATIONS:</span>
          <span>Idea</span>
          <span aria-hidden="true" className="text-neutral-400">→</span>
          <span>Plan</span>
          <span aria-hidden="true" className="text-neutral-400">→</span>
          <span>Design</span>
          <span aria-hidden="true" className="text-neutral-400">→</span>
          <span>Build</span>
          <span aria-hidden="true" className="text-neutral-400">→</span>
          <span>Debug</span>
          <span aria-hidden="true" className="text-neutral-400">→</span>
          <span className="text-black font-bold">Ship</span>
        </div>

        <button
          onClick={onScrollDown}
          className="flex items-center gap-2 text-black font-bold hover:text-neutral-700 transition-colors cursor-pointer group"
        >
          <span>Scroll to explore platform</span>
          <ArrowDown className="w-4 h-4 text-black group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
