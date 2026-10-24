import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Wrench, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { LEARNING_PATHS } from '../data/guides';
import { CURRICULUM_MODULES } from '../data/curriculumModules';
import { TOOLS_DIRECTORY } from '../data/tools';
import { PROMPT_TEMPLATES } from '../data/prompts';
import { PROJECT_BLUEPRINTS } from '../data/blueprints';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (type: 'guide' | 'tool' | 'prompt' | 'blueprint' | 'section', id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectItem
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Combine searchable items
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      // Default top suggestions
      return [
        { type: 'section' as const, id: '/guide', title: 'Learning Guide', subtitle: 'Learn the craft. Not just the prompts.', icon: BookOpen },
        { type: 'section' as const, id: '/tools', title: 'Arsenal Tools Directory', subtitle: 'Your stack starts here.', icon: Wrench },
        { type: 'section' as const, id: '/chat', title: 'Vibecoding Copilot', subtitle: 'Your vibecoding copilot. Without the fluff.', icon: Sparkles },
        { type: 'section' as const, id: '/prompts', title: 'Prompt Lab & Playground', subtitle: 'Stop prompting blind.', icon: Sparkles },
        { type: 'section' as const, id: '/blueprints', title: 'Project Blueprints', subtitle: 'From idea to shipped.', icon: Layers }
      ];
    }

    const items: { type: 'guide' | 'tool' | 'prompt' | 'blueprint' | 'section'; id: string; title: string; subtitle: string; icon: any }[] = [];

    // Search Tools
    TOOLS_DIRECTORY.forEach((t) => {
      if (t.name.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) {
        items.push({
          type: 'tool',
          id: t.id,
          title: t.name,
          subtitle: `Tool · ${t.category} · ${t.tagline}`,
          icon: Wrench
        });
      }
    });

    // Search Prompts
    PROMPT_TEMPLATES.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.intent.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
        items.push({
          type: 'prompt',
          id: p.id,
          title: p.title,
          subtitle: `Prompt · ${p.category}`,
          icon: Sparkles
        });
      }
    });

    // Search Blueprints
    PROJECT_BLUEPRINTS.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.tagline.toLowerCase().includes(q) || b.stack.join(' ').toLowerCase().includes(q)) {
        items.push({
          type: 'blueprint',
          id: b.id,
          title: b.title,
          subtitle: `Blueprint · ${b.difficulty} · ${b.timeToBuild}`,
          icon: Layers
        });
      }
    });

    // Search 9-Module Curriculum & Lessons
    CURRICULUM_MODULES.forEach((mod) => {
      if (mod.title.toLowerCase().includes(q) || mod.tagline.toLowerCase().includes(q)) {
        items.push({
          type: 'guide',
          id: mod.id,
          title: `Module ${mod.moduleNumber}: ${mod.title}`,
          subtitle: `Curriculum Module · ${mod.estimatedEffort}`,
          icon: BookOpen
        });
      }
      mod.lessons.forEach((lesson) => {
        if (
          lesson.title.toLowerCase().includes(q) ||
          lesson.learningObjective.toLowerCase().includes(q) ||
          lesson.lessonNumber.toLowerCase().includes(q)
        ) {
          items.push({
            type: 'guide',
            id: lesson.id,
            title: `Lesson ${lesson.lessonNumber}: ${lesson.title}`,
            subtitle: `Curriculum Lesson · ${lesson.estimatedDuration}`,
            icon: BookOpen
          });
        }
      });
    });

    return items.slice(0, 10);
  }, [query]);

  // Handle keyboard arrow navigation and selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          onSelectItem(results[selectedIndex].type, results[selectedIndex].id);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onSelectItem, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className="relative w-full max-w-xl bg-[#F8F7F2] border border-black/20 rounded-xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/10 bg-white">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search guides, tools, prompts, blueprints..."
              className="w-full text-base bg-transparent border-none outline-hidden text-[#121212] placeholder:text-neutral-400 font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-black cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-mono text-neutral-500 bg-neutral-100 rounded border border-neutral-300">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {results.length > 0 ? (
              <ul className="space-y-1">
                {results.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <li key={`${item.type}-${item.id}-${index}`}>
                      <button
                        onClick={() => {
                          onSelectItem(item.type, item.id);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'hover:bg-black/5 text-[#121212]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-1.5 rounded-md shrink-0 ${
                              isSelected ? 'bg-[#D4FF00] text-black' : 'bg-black/5 text-neutral-700'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold truncate leading-tight">
                              {item.title}
                            </h4>
                            <p
                              className={`text-xs truncate mt-0.5 ${
                                isSelected ? 'text-neutral-300' : 'text-neutral-500'
                              }`}
                            >
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? 'translate-x-0.5 text-[#D4FF00]' : 'opacity-0'
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="py-8 text-center text-sm text-neutral-500">
                <p>No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-neutral-400 mt-1">
                  Try searching for &quot;Cursor&quot;, &quot;Stripe&quot;, &quot;Prompt&quot;, or &quot;Tailwind&quot;
                </p>
              </div>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="px-4 py-2 bg-neutral-100 border-t border-black/10 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
            <span>Navigate: ↑ / ↓</span>
            <span>Select: ↵</span>
            <span>Close: Esc</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
