import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  BookOpen,
  Wrench,
  Sparkles,
  Layers,
  FolderKanban,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Code2,
  ArrowUpRight,
  Copy,
  Check
} from 'lucide-react';
import { HerveHero } from './HerveHero';
import { TOOLS_DIRECTORY } from '../data/tools';
import { CURRICULUM_MODULES } from '../data/curriculumModules';
import { PROJECT_BLUEPRINTS } from '../data/blueprints';
import { PROMPT_TEMPLATES } from '../data/prompts';

gsap.registerPlugin(ScrollTrigger);

interface HomeViewProps {
  onNavigate: (path: string) => void;
  splineUrl?: string;
  onSplineUrlChange?: (url: string) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  splineUrl,
  onSplineUrlChange,
  onShowToast
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressionRef = useRef<HTMLDivElement>(null);
  const previewsRef = useRef<HTMLDivElement>(null);
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);

  // Sample prompt state for the Home preview
  const [previewAppName, setPreviewAppName] = React.useState('HyperFocus Studio');
  const [previewStack, setPreviewStack] = React.useState('React 19 + Tailwind v4 + Web Audio API');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Purposeful ScrollTrigger reveal on the 6-phase progression
      if (progressionRef.current) {
        gsap.fromTo(
          progressionRef.current.querySelectorAll('.progression-step'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: progressionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 2. Purposeful staggered reveal for module preview cards
      if (previewsRef.current) {
        gsap.fromTo(
          previewsRef.current.querySelectorAll('.module-card'),
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: previewsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById('home-progression');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopySamplePrompt = () => {
    const text = `Build a high-performance single-page application named "${previewAppName}" using ${previewStack}.
Architecture & Anti-Slop Directives:
1. Palette: Warm off-white background (#F8F7F2), near-black typography (#121212), and electric neon lime (#D4FF00) accents.
2. Zero-Pill Discipline: Do not wrap static metadata in rounded pills. Render tags as quiet unboxed text with · separators.
3. State & Memory: Manage all AudioContext oscillators safely and clean up event listeners on component unmount.
4. Output: Complete, working TypeScript code with no placeholder mock boxes.`;

    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    if (onShowToast) onShowToast('Prompt copied to clipboard', 'Ready to paste into Cursor or Claude');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div ref={scrollContainerRef} className="min-h-screen bg-[#F8F7F2] text-[#121212]">
      {/* 1. Corrected Hero Opening: Herve Baillargeon inspired, Spline background, non-looping GSAP */}
      <HerveHero
        onNavigate={onNavigate}
        onScrollDown={handleScrollDown}
        splineUrl={splineUrl}
        onSplineUrlChange={onSplineUrlChange}
      />

      {/* 2. Scroll Transition: 6-Stage Vibecoding Progression (No second hero or repeating splash) */}
      <section
        id="home-progression"
        ref={progressionRef}
        className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-black/10 font-sans"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
              <span>01. METHODOLOGY</span>
              <span aria-hidden="true">/</span>
              <span>THE 6-PHASE DISCIPLINE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-[#121212] uppercase text-balance">
              How Vibecoders Actually Ship.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
              Vibecoding is not passive auto-complete. It is active software directorship. Every successful project moves through six non-negotiable stages.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/guide')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black hover:underline cursor-pointer self-start md:self-end"
          >
            <span>Read Complete Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            {
              step: '01',
              name: 'IDEA',
              rule: 'Define Problem',
              desc: 'Frame a single specific problem. Avoid multi-tenant enterprise bloat on day one.'
            },
            {
              step: '02',
              name: 'PLAN',
              rule: 'Spec Boundaries',
              desc: 'Write the system architecture, component trees, and data models before prompting.'
            },
            {
              step: '03',
              name: 'DESIGN',
              rule: 'Anti-Slop Craft',
              desc: 'Enforce high-contrast palettes, zero-pill metadata, and strict mathematical radius nesting.'
            },
            {
              step: '04',
              name: 'BUILD',
              rule: 'Direct AI Loops',
              desc: 'Direct Cursor, Windsurf, or Claude in small, verifiable multi-file edits.'
            },
            {
              step: '05',
              name: 'DEBUG',
              rule: 'Isolate Root Cause',
              desc: 'Never accept blind hallucinated patches. Inspect network logs and compiler output.'
            },
            {
              step: '06',
              name: 'SHIP',
              rule: 'Production Live',
              desc: 'Configure environment secrets, verify SSL, test on real mobile devices, and deploy.'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="progression-step bg-white border border-black/15 rounded-xl p-4 flex flex-col justify-between hover:border-black transition-all"
            >
              <div>
                <span className="font-mono text-xs font-bold text-neutral-400 block mb-1">
                  {item.step}
                </span>
                <h3 className="font-display font-black text-xl text-[#121212] tracking-tight uppercase mb-1">
                  {item.name}
                </h3>
                <span className="text-[11px] font-mono text-[#7928CA] font-bold block mb-2">
                  {item.rule}
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Platform Module Previews: Links to Dedicated Pages */}
      <section
        ref={previewsRef}
        className="py-20 px-6 sm:px-12 max-w-7xl mx-auto font-sans space-y-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
              <span>EXPLORE THE PLATFORM</span>
              <span aria-hidden="true">/</span>
              <span>DEDICATED MODULES</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-[#121212] uppercase">
              The Vibecoding Suite.
            </h2>
          </div>
          <div className="text-xs font-mono text-neutral-500">
            Dedicated routes with comprehensive depth. Zero placeholders.
          </div>
        </div>

        {/* Module 1: Learning Guide Preview */}
        <div className="module-card bg-white border-2 border-black rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col lg:flex-row items-stretch justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-black" />
              <span>MODULE 01 · CURRICULUM</span>
            </div>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-[#121212] uppercase tracking-tight">
              Learn the craft. Not just the prompts.
            </h3>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-sans">
              A comprehensive 9-module curriculum designed for complete beginners and senior builders alike. Covers everything from mental models and prompt architecture to debugging runtime loops, database authorization, and continuous deployment.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-700">
              <span className="font-bold text-black">TOPICS:</span>
              <span>Vibecoding Fundamentals</span>
              <span aria-hidden="true">·</span>
              <span>Prompt Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Design & Accessibility</span>
              <span aria-hidden="true">·</span>
              <span>Production Debugging</span>
            </div>
            <div className="mt-8">
              <button
                onClick={() => onNavigate('/guide')}
                className="px-5 py-3 bg-black text-[#D4FF00] hover:bg-neutral-800 font-mono font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs"
              >
                <span>Open Learning Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Curriculum snapshot preview */}
          <div className="flex-1 bg-[#F8F7F2] border border-black/10 rounded-xl p-5 font-mono text-xs space-y-3">
            <span className="text-neutral-500 font-bold uppercase tracking-wider block border-b border-black/10 pb-2">
              CURRICULUM MODULES (1–9)
            </span>
            {CURRICULUM_MODULES.slice(0, 4).map((mod) => (
              <div
                key={mod.id}
                onClick={() => onNavigate('/guide')}
                className="p-3 bg-white border border-black/5 rounded-lg flex items-center justify-between hover:border-black/20 cursor-pointer transition-colors"
              >
                <div>
                  <span className="text-neutral-400 block text-[10px]">MODULE 0{mod.moduleNumber}</span>
                  <span className="font-bold text-black text-xs font-sans">{mod.title}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            ))}
            <div className="text-center pt-1">
              <button
                onClick={() => onNavigate('/guide')}
                className="text-[11px] text-neutral-600 hover:text-black underline cursor-pointer"
              >
                + 5 more advanced modules in classroom
              </button>
            </div>
          </div>
        </div>

        {/* Module 2: Tools Directory Preview */}
        <div className="module-card bg-white border-2 border-black rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col lg:flex-row items-stretch justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
              <Wrench className="w-4 h-4 text-black" />
              <span>MODULE 02 · ARSENAL</span>
            </div>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-[#121212] uppercase tracking-tight">
              Your stack starts here.
            </h3>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-sans">
              34 verified developer tools, AI code editors, autonomous agents, modern UI inspiration catalogs, 3D engines, and serverless databases. Detailed with honest limitations, verified links, and vibecoder cheat codes.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-700">
              <span className="font-bold text-black">CATEGORIES:</span>
              <span>AI Assistants & Agents</span>
              <span aria-hidden="true">·</span>
              <span>Design & Inspiration</span>
              <span aria-hidden="true">·</span>
              <span>Animation & 3D</span>
              <span aria-hidden="true">·</span>
              <span>Cloud & DB</span>
            </div>
            <div className="mt-8">
              <button
                onClick={() => onNavigate('/tools')}
                className="px-5 py-3 bg-black text-[#D4FF00] hover:bg-neutral-800 font-mono font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs"
              >
                <span>Browse All 34 Verified Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Tools Grid Snapshot */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {TOOLS_DIRECTORY.slice(0, 4).map((tool) => (
              <div
                key={tool.id}
                onClick={() => onNavigate('/tools')}
                className="p-4 bg-[#F8F7F2] border border-black/10 rounded-xl hover:border-black/30 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase mb-1">
                    {tool.category} · {tool.pricing}
                  </div>
                  <h4 className="font-display font-bold text-base text-[#121212]">{tool.name}</h4>
                  <p className="text-[11px] text-neutral-600 font-sans line-clamp-2 mt-1">
                    {tool.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500">Rating: {tool.vibeRating}/5</span>
                  <span className="text-black font-bold flex items-center gap-0.5">
                    Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 3: Prompt Lab Preview (Interactive) */}
        <div className="module-card bg-white border-2 border-black rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col lg:flex-row items-stretch justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-black" />
              <span>MODULE 03 · PLAYGROUND</span>
            </div>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-[#121212] uppercase tracking-tight">
              Stop prompting blind.
            </h3>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-sans">
              Test and edit battle-tested prompt recipes with live variable interpolation. Stop typing vague natural language that invites hallucinations and start issuing clear constraints.
            </p>

            {/* Interactive Variable Controls */}
            <div className="mt-6 space-y-3 font-mono text-xs">
              <div>
                <label className="block text-neutral-500 font-bold mb-1 uppercase">
                  App Name:
                </label>
                <input
                  type="text"
                  value={previewAppName}
                  onChange={(e) => setPreviewAppName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7F2] border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
                />
              </div>

              <div>
                <label className="block text-neutral-500 font-bold mb-1 uppercase">
                  Target Tech Stack:
                </label>
                <input
                  type="text"
                  value={previewStack}
                  onChange={(e) => setPreviewStack(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7F2] border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopySamplePrompt}
                className="px-5 py-3 bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-mono font-bold text-xs border border-black rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs"
              >
                {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPrompt ? 'Copied Prompt' : 'Copy Interpolated Prompt'}</span>
              </button>

              <button
                onClick={() => onNavigate('/prompts')}
                className="px-5 py-3 bg-black text-white hover:bg-neutral-800 font-mono font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Open Full Prompt Lab</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4FF00]" />
              </button>
            </div>
          </div>

          {/* Prompt output box */}
          <div className="flex-1 bg-[#121212] text-white border border-black rounded-xl p-5 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-neutral-400">
                <span className="text-[#D4FF00] font-bold">READY-TO-RUN RECIPE</span>
                <span>Scaffolding Spec</span>
              </div>
              <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed font-mono">
                {`Build a high-performance single-page application named "${previewAppName}" using ${previewStack}.

Architecture & Anti-Slop Directives:
1. Palette: Warm off-white background (#F8F7F2), near-black typography (#121212), and electric neon lime (#D4FF00) accents.
2. Zero-Pill Discipline: Do not wrap static metadata in rounded pills. Render tags as quiet unboxed text with · separators.
3. State & Memory: Manage all AudioContext oscillators safely and clean up event listeners on component unmount.`}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-neutral-500 flex items-center justify-between">
              <span>Variables update dynamically</span>
              <span className="text-[#D4FF00]">100% Tested</span>
            </div>
          </div>
        </div>

        {/* Module 4 & 5 Grid: References, Blueprints, Workspace, Copilot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reference Library Card */}
          <div className="module-card bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                <Code2 className="w-4 h-4 text-black" />
                <span>MODULE 04 · REFERENCES</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#121212] uppercase tracking-tight">
                Steal the technique. Make it yours.
              </h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-sans">
                Curated visual languages, tested hex palettes, physics animation formulas, and the strict Anti-Slop Constitution to make your software feel human-crafted.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">8 Anti-Slop Rules</span>
              <button
                onClick={() => onNavigate('/references')}
                className="text-xs font-mono font-bold text-black hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Project Blueprints Card */}
          <div className="module-card bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4 text-black" />
                <span>MODULE 05 · BLUEPRINTS</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#121212] uppercase tracking-tight">
                From idea to shipped.
              </h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-sans">
                Six battle-tested software blueprints. ASCII architecture diagrams, complete file trees, phase-by-phase prompt sequences, and common failure traps.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">6 Production Blueprints</span>
              <button
                onClick={() => onNavigate('/blueprints')}
                className="text-xs font-mono font-bold text-black hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View Blueprints</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Personal Workspace Card */}
          <div className="module-card bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                <FolderKanban className="w-4 h-4 text-black" />
                <span>MODULE 06 · WORKSPACE</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#121212] uppercase tracking-tight">
                Turn side quests into shipped projects.
              </h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-sans">
                Track your autonomous software builds from spark to deployment. 100% local-first storage with portable JSON exports.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">Private · Zero Trackers</span>
              <button
                onClick={() => onNavigate('/workspace')}
                className="text-xs font-mono font-bold text-black hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Open Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Copilot Card */}
          <div className="module-card bg-[#121212] text-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4FF00] uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4 fill-[#D4FF00]" />
                <span>MODULE 07 · COPILOT</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Your vibecoding copilot. Without the fluff.
              </h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-sans">
                A dedicated technical copilot for turning raw ideas into prompt checklists, auditing UI decisions against anti-slop rules, and diagnosing runtime errors.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#D4FF00]">Gemini 3.8 Flash Powered</span>
              <button
                onClick={() => onNavigate('/chat')}
                className="px-4 py-2 bg-[#D4FF00] text-black font-mono font-bold text-xs rounded-lg hover:bg-[#c2eb00] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Launch Copilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
