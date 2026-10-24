import React from 'react';
import { ExternalLink, Terminal, Sparkles, Box, ArrowUpRight, FolderKanban } from 'lucide-react';

interface ColophonCreditsProps {
  onNavigate?: (section: string) => void;
  onOpenToolProfile?: (toolId: string) => void;
}

export const ColophonCredits: React.FC<ColophonCreditsProps> = ({ onNavigate, onOpenToolProfile }) => {
  const handleLinkClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToolClick = (toolId: string) => {
    if (onOpenToolProfile) {
      onOpenToolProfile(toolId);
    } else {
      handleLinkClick('tools');
    }
  };

  return (
    <footer className="w-full bg-[#111111] text-white border-t border-black py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Product Navigation Strip */}
        <div className="pb-12 mb-12 border-b border-white/10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 text-xs font-mono">
          <div>
            <span className="text-[#D4FF00] font-bold block mb-3 uppercase tracking-wider">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => handleLinkClick('/')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  00. Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/guide')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  01. Learning Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/tools')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  02. Tools Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/chat')}
                  className="hover:text-[#D4FF00] transition-colors cursor-pointer text-left font-bold"
                >
                  03. AI Copilot
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#D4FF00] font-bold block mb-3 uppercase tracking-wider">
              RESOURCES
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => handleLinkClick('/prompts')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  04. Prompt Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/blueprints')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  05. Blueprints
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/references')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  06. Design Specs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/workspace')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  07. Workspace
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#D4FF00] font-bold block mb-3 uppercase tracking-wider">
              TOP AI TOOLS
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => handleToolClick('cursor')}
                  className="hover:text-[#D4FF00] transition-colors flex items-center gap-1 cursor-pointer text-left"
                  title="Inspect Cursor profile"
                >
                  <span>Cursor</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolClick('windsurf')}
                  className="hover:text-[#D4FF00] transition-colors flex items-center gap-1 cursor-pointer text-left"
                  title="Inspect Windsurf profile"
                >
                  <span>Windsurf</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolClick('claude-code')}
                  className="hover:text-[#D4FF00] transition-colors flex items-center gap-1 cursor-pointer text-left"
                  title="Inspect Claude Code profile"
                >
                  <span>Claude Code</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolClick('lovable')}
                  className="hover:text-[#D4FF00] transition-colors flex items-center gap-1 cursor-pointer text-left"
                  title="Inspect Lovable profile"
                >
                  <span>Lovable</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolClick('v0')}
                  className="hover:text-[#D4FF00] transition-colors flex items-center gap-1 cursor-pointer text-left"
                  title="Inspect v0 profile"
                >
                  <span>v0 by Vercel</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#D4FF00] font-bold block mb-3 uppercase tracking-wider">
              MODELS & CLOUD
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => handleToolClick('gemini')}
                  className="hover:text-[#D4FF00] transition-colors flex items-center gap-1 cursor-pointer text-left"
                  title="Inspect Google Gemini profile"
                >
                  <span>Gemini 2.5 Flash</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolClick('claude')}
                  className="hover:text-[#D4FF00] transition-colors flex items-center gap-1 cursor-pointer text-left"
                  title="Inspect Claude profile"
                >
                  <span>Claude 3.7 Sonnet</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolClick('supabase')}
                  className="hover:text-[#D4FF00] transition-colors flex items-center gap-1 cursor-pointer text-left"
                  title="Inspect Supabase profile"
                >
                  <span>Supabase</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleToolClick('vercel')}
                  className="hover:text-[#D4FF00] transition-colors flex items-center gap-1 cursor-pointer text-left"
                  title="Inspect Vercel profile"
                >
                  <span>Vercel</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2">
            <span className="text-[#D4FF00] font-bold block mb-3 uppercase tracking-wider">
              LOCAL-FIRST STORAGE
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed font-sans mb-3">
              Vibe101 stores all projects, bookmarks, and prompts directly in your browser&apos;s LocalStorage. 100% private, zero analytics trackers.
            </p>
            <button
              onClick={() => handleLinkClick('workspace')}
              className="inline-flex items-center gap-1.5 text-xs text-[#D4FF00] hover:underline cursor-pointer"
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Open Personal Workspace</span>
            </button>
          </div>
        </div>

        {/* Editorial Colophon Grid (Attributions Outside Hero) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Purpose */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 bg-[#D4FF00] border border-black inline-block" />
              <span className="font-display font-black text-2xl tracking-tighter text-white">
                VIBE101
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-4">
              The ultimate field guide to vibecoding. Created as an open educational curriculum for direct, taste-driven autonomous software creation.
            </p>
            <div className="text-[11px] font-mono text-neutral-500">
              © 2026 Vibe101. Built with zero-pill discipline and genuine craft.
            </div>
          </div>

          {/* Col 2: Visual Inspirations & Attribution (Strictly Outside Hero) */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>DESIGN INSPIRATIONS</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-neutral-400">
              <li>
                <a
                  href="https://hervebaillargeon.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Hervé Baillargeon</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="text-[11px] text-neutral-500 block">Expressive opening typography & architectural grid</span>
              </li>
              <li>
                <button
                  onClick={() => handleToolClick('horizonx')}
                  className="hover:text-white transition-colors flex items-center justify-between group w-full cursor-pointer text-left"
                >
                  <span className="text-[#D4FF00] font-semibold">HorizonX 3D Showcase</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </button>
                <span className="text-[11px] text-neutral-500 block">Interactive 3D WebGL spatial choreography inspiration</span>
              </li>
              <li>
                <a
                  href="https://exat.hottype.co/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>EXAT by Hot Type</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="text-[11px] text-neutral-500 block">Experimental typography & poster layout language</span>
              </li>
              <li>
                <a
                  href="https://kabirgureja.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Kabir Gureja</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="text-[11px] text-neutral-500 block">Tactile interaction details & micro-animations</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Implementation Disclosure */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>3D & RENDERING ARCHITECTURE</span>
            </h4>
            <div className="text-xs text-neutral-400 space-y-2 font-mono leading-relaxed">
              <p>
                <strong className="text-white">Hero Tunnel:</strong> Custom hardware-accelerated{' '}
                <button
                  onClick={() => handleToolClick('threejs')}
                  className="text-[#D4FF00] underline underline-offset-2 hover:text-white cursor-pointer font-bold"
                >
                  Three.js
                </button>{' '}
                WebGL canvas running 48 octagonal procedural line loops with dual neon lime (#D4FF00) and electric violet (#8B5CF6) materials, mouse-parallax raycasting, particle dust simulation, and zero-leak memory disposal.
              </p>
              <p className="text-[11px] text-neutral-500">
                (Note: Genuinely rendered in WebGL code, not a canned video loop).
              </p>
            </div>
          </div>

          {/* Col 4: Platform Stack & Spec */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>PLATFORM SPECS</span>
            </h4>
            <div className="space-y-1.5 text-xs font-mono text-neutral-400">
              <div className="flex justify-between">
                <span className="text-neutral-500">Framework:</span>
                <span className="text-white">React 19 + TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Bundler:</span>
                <span className="text-white">Vite 6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Styling:</span>
                <span className="text-white">Tailwind CSS v4 (@theme)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Motion:</span>
                <span className="text-white">
                  <button
                    onClick={() => handleToolClick('gsap')}
                    className="text-[#D4FF00] hover:underline cursor-pointer"
                  >
                    GSAP
                  </button>
                  {' + '}
                  <button
                    onClick={() => handleToolClick('motion-primitives')}
                    className="text-[#D4FF00] hover:underline cursor-pointer"
                  >
                    Motion 12
                  </button>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Display Face:</span>
                <span className="text-white">Bricolage Grotesque</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Body Face:</span>
                <span className="text-white">Plus Jakarta Sans</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Data / Mono:</span>
                <span className="text-white">JetBrains Mono</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Storage:</span>
                <span className="text-white">100% Local-First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            Vibe101: Direct software, master the machine, never ship slop.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with autonomous engineering standards</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#D4FF00]">2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
