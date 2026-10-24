import React, { useState, useEffect } from 'react';
import { Search, FolderKanban, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenCommandPalette: () => void;
  onOpenWorkspace: () => void;
  projectsCount: number;
}

interface NavItem {
  path: string;
  label: string;
  isSpecial?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/guide', label: 'Guide' },
  { path: '/tools', label: 'Tools' },
  { path: '/prompts', label: 'Prompt Lab' },
  { path: '/references', label: 'References' },
  { path: '/blueprints', label: 'Blueprints' },
  { path: '/workspace', label: 'Workspace' },
  { path: '/chat', label: 'Copilot', isSpecial: true },
];

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenCommandPalette,
  onOpenWorkspace,
  projectsCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F7F2]/95 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('/')}
          className="font-display font-black text-xl tracking-tighter text-[#111111] whitespace-nowrap shrink-0 flex items-center gap-2 group cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#D4FF00]"
          aria-label="Vibe101 Home"
        >
          <span className="w-2.5 h-2.5 bg-[#D4FF00] border border-black inline-block transform group-hover:rotate-45 transition-transform" />
          <span>VIBE101</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono font-medium text-neutral-600">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 hover:text-black flex items-center gap-1.5 ${
                  isActive ? 'text-black font-bold' : ''
                } ${item.isSpecial ? 'text-[#7928CA] font-bold' : ''}`}
              >
                <span>{item.label}</span>
                {item.isSpecial && (
                  <span className="text-[10px] bg-[#D4FF00] text-black px-1.5 py-0.2 rounded border border-black font-bold">
                    AI
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4FF00] border-b border-black"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary action area & Search shortcut */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Global Search Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-neutral-700 bg-black/5 hover:bg-black/10 rounded-md border border-black/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Open search command palette (⌘K or Ctrl+K)"
            aria-label="Open search command palette"
          >
            <Search className="w-3.5 h-3.5 text-neutral-600" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white rounded border border-black/10 font-mono">⌘K</kbd>
          </button>

          {/* Workspace Button */}
          <button
            onClick={onOpenWorkspace}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-black bg-[#D4FF00] border border-black/20 rounded-md hover:bg-[#c6ef00] transition-transform active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FolderKanban className="w-3.5 h-3.5 text-black" />
            <span>Workspace</span>
            <span className="text-[10px] bg-black text-[#D4FF00] px-1.5 py-0.2 rounded-full tabular-nums">
              {projectsCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-800 hover:bg-black/5 transition-colors cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-black/10 bg-[#F8F7F2] px-6 py-6 overflow-hidden shadow-xl"
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center justify-between p-3 rounded-lg text-left text-sm font-mono transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-black text-[#D4FF00] font-bold'
                        : 'text-neutral-800 hover:bg-black/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.isSpecial && (
                        <span className="text-[10px] bg-[#D4FF00] text-black px-1.5 py-0.2 rounded border border-black font-bold">
                          AI
                        </span>
                      )}
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[#D4FF00]' : 'text-neutral-400'}`} />
                  </button>
                );
              })}

              <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    onOpenCommandPalette();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-neutral-100 rounded-lg text-xs font-mono text-neutral-700 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search (⌘K)</span>
                </button>

                <button
                  onClick={() => {
                    handleNavClick('/workspace');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#D4FF00] text-black font-mono font-semibold rounded-lg text-xs cursor-pointer"
                >
                  <FolderKanban className="w-4 h-4" />
                  <span>Workspace ({projectsCount})</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
