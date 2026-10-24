import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Star,
  X,
  Filter,
  Plus,
  BookOpen,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowUpDown,
  Wrench,
  Check,
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { TOOLS_DIRECTORY } from '../data/tools';
import { VibecodingTool } from '../types';
import { ToolProfileModal } from './ToolProfileModal';
import { AddToolModal } from './AddToolModal';

interface ToolsDirectoryProps {
  bookmarkedToolIds: string[];
  onToggleBookmark: (toolId: string) => void;
  customTools?: VibecodingTool[];
  onAddCustomTool?: (tool: Omit<VibecodingTool, 'id'>) => void;
  onDeleteCustomTool?: (toolId: string) => void;
  selectedToolId?: string | null;
  onSelectTool?: (toolId: string | null) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ToolsDirectory: React.FC<ToolsDirectoryProps> = ({
  bookmarkedToolIds,
  onToggleBookmark,
  customTools = [],
  onAddCustomTool,
  onDeleteCustomTool,
  selectedToolId,
  onSelectTool,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedVerification, setSelectedVerification] = useState<string>('All');
  const [selectedCapability, setSelectedCapability] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'difficulty'>('rating');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeModalToolId, setActiveModalToolId] = useState<string | null>(null);

  // Sync external selectedToolId prop to internal modal
  useEffect(() => {
    if (selectedToolId) {
      setActiveModalToolId(selectedToolId);
    }
  }, [selectedToolId]);

  // Combine static directory with user custom tools
  const allTools = useMemo(() => {
    const customList = customTools || [];
    const customIds = new Set(customList.map((c) => c.id));
    const baseWithoutDuplicates = TOOLS_DIRECTORY.filter((t) => !customIds.has(t.id));
    return [...customList, ...baseWithoutDuplicates];
  }, [customTools]);

  // Standardized categories
  const categories = [
    'All',
    'AI Assistants & App Builders',
    'Design & Inspiration',
    'Animation, 3D & Components',
    'Backend, Database & Auth',
    'Deployment & Cloud Hosting'
  ];

  const pricingModels = ['All', 'Free / Open Source', 'Freemium', 'Subscription', 'Pay-per-token'];
  const difficultyLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const verificationOptions = ['All', 'Verified Official', 'Preview / Review', 'Community Resource'];

  const quickCapabilities = [
    'All',
    'Multi-File Agent',
    'Terminal Execution',
    'Live React Artifacts',
    'Generative Vector SVG',
    '3D WebGL Canvas',
    'GLSL Fragment Shaders',
    'Timeline Sequencing',
    'Postgres Database',
    'Global Edge Network'
  ];

  // Filtering Logic
  const filteredTools = useMemo(() => {
    return allTools
      .filter((tool) => {
        // Bookmarks
        if (onlyBookmarks && !bookmarkedToolIds.includes(tool.id)) {
          return false;
        }

        // Category
        if (selectedCategory !== 'All') {
          // Flexible category matching for legacy / subcategory strings
          if (selectedCategory === 'AI Assistants & App Builders') {
            const isMatch =
              tool.category === 'AI Assistants & App Builders' ||
              tool.category === 'AI IDE & Code Editor' ||
              tool.category === 'Autonomous Agent' ||
              tool.category === 'Frontend Generator' ||
              tool.category === 'Model & Provider';
            if (!isMatch) return false;
          } else if (selectedCategory === 'Design & Inspiration') {
            const isMatch =
              tool.category === 'Design & Inspiration' ||
              tool.category === 'Design & Creative';
            if (!isMatch) return false;
          } else if (selectedCategory === 'Animation, 3D & Components') {
            const isMatch =
              tool.category === 'Animation, 3D & Components' ||
              tool.category === 'Animation' ||
              tool.category === '3D';
            if (!isMatch) return false;
          } else if (selectedCategory === 'Backend, Database & Auth') {
            const isMatch =
              tool.category === 'Backend, Database & Auth' ||
              tool.category === 'Backend & DB';
            if (!isMatch) return false;
          } else if (selectedCategory === 'Deployment & Cloud Hosting') {
            const isMatch =
              tool.category === 'Deployment & Cloud Hosting' ||
              tool.category === 'Deployment & Infra';
            if (!isMatch) return false;
          } else if (tool.category !== selectedCategory) {
            return false;
          }
        }

        // Pricing
        if (selectedPricing !== 'All' && tool.pricing !== selectedPricing) {
          return false;
        }

        // Skill Level
        if (selectedDifficulty !== 'All' && tool.difficulty !== selectedDifficulty) {
          return false;
        }

        // Verification Status
        if (selectedVerification !== 'All') {
          const status = tool.verificationStatus || 'verified';
          if (selectedVerification === 'Verified Official' && status !== 'verified') return false;
          if (selectedVerification === 'Preview / Review' && status !== 'preview') return false;
          if (selectedVerification === 'Community Resource' && status !== 'community_reviewed') return false;
        }

        // Capability Tag
        if (selectedCapability !== 'All') {
          const caps = (tool.capabilities || []).map((c) => c.toLowerCase());
          if (!caps.some((c) => c.includes(selectedCapability.toLowerCase()))) {
            return false;
          }
        }

        // Text Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = tool.name.toLowerCase().includes(q);
          const matchesTagline = tool.tagline.toLowerCase().includes(q);
          const matchesDesc = tool.description.toLowerCase().includes(q);
          const matchesCategory = tool.category.toLowerCase().includes(q);
          const matchesBestFor = (tool.bestFor || '').toLowerCase().includes(q);
          const matchesCaps = (tool.capabilities || []).some((c) => c.toLowerCase().includes(q));
          const matchesIntegrations = (tool.integrations || []).some((i) => i.toLowerCase().includes(q));
          const matchesTip = tool.quickTip.toLowerCase().includes(q);
          return (
            matchesName ||
            matchesTagline ||
            matchesDesc ||
            matchesCategory ||
            matchesBestFor ||
            matchesCaps ||
            matchesIntegrations ||
            matchesTip
          );
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return (b.vibeRating || 0) - (a.vibeRating || 0);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'difficulty') {
          const diffMap: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return (diffMap[a.difficulty] || 2) - (diffMap[b.difficulty] || 2);
        }
        return 0;
      });
  }, [
    allTools,
    onlyBookmarks,
    bookmarkedToolIds,
    selectedCategory,
    selectedPricing,
    selectedDifficulty,
    selectedVerification,
    selectedCapability,
    searchQuery,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPricing('All');
    setSelectedDifficulty('All');
    setSelectedVerification('All');
    setSelectedCapability('All');
    setOnlyBookmarks(false);
  };

  const handleOpenTool = (toolId: string) => {
    setActiveModalToolId(toolId);
    if (onSelectTool) onSelectTool(toolId);
  };

  const handleCloseModal = () => {
    setActiveModalToolId(null);
    if (onSelectTool) onSelectTool(null);
  };

  const activeToolObject = useMemo(() => {
    return allTools.find((t) => t.id === activeModalToolId) || null;
  }, [allTools, activeModalToolId]);

  return (
    <section id="tools" className="py-24 px-6 max-w-7xl mx-auto border-t border-black/10 font-sans">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">
            <span>03. ARSENAL</span>
            <span aria-hidden="true">/</span>
            <span>VERIFIED TOOLS DIRECTORY</span>
            <span aria-hidden="true">/</span>
            <span className="text-black font-semibold">{allTools.length} CANONICAL ENTRIES</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#121212] uppercase text-balance">
            Your stack starts here.
          </h2>
          <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
            Searchable, categorized directory of verified AI assistants, autonomous agents, modern UI inspiration, 3D engines, and cloud backends. Direct links, capabilities, and honest limitations without marketing hype.
          </p>
        </div>

        {/* Action Buttons: Add Tool & My Stack */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-white hover:bg-neutral-100 text-neutral-800 border border-black/15 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tool Record</span>
          </button>

          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
              onlyBookmarks
                ? 'bg-black text-[#D4FF00] border-black shadow-xs'
                : 'bg-white text-neutral-800 border-black/15 hover:border-black/30'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-[#D4FF00] text-[#D4FF00]' : ''}`} />
            <span>My Saved Stack ({bookmarkedToolIds.length})</span>
          </button>
        </div>
      </div>

      {/* Main Filter & Search Control Panel */}
      <div className="bg-white border-2 border-black rounded-2xl p-5 sm:p-6 mb-10 shadow-xs">
        {/* Search Input and Primary Dropdowns */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-5">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, capability, stack, or tip (e.g. Cursor, Postgres, Three.js, Claude Code)..."
              className="w-full pl-10 pr-10 py-3 text-sm bg-[#F8F7F2] border border-black/15 rounded-xl text-[#121212] placeholder:text-neutral-400 outline-hidden focus:border-black focus:bg-white transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer p-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Secondary Filter Dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 text-xs font-mono">
            {/* Pricing Filter */}
            <div>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F8F7F2] border border-black/15 rounded-lg text-neutral-800 outline-hidden focus:border-black cursor-pointer"
                title="Filter by pricing model"
              >
                <option value="All">All Pricing</option>
                {pricingModels.filter((p) => p !== 'All').map((price) => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
            </div>

            {/* Skill Level Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F8F7F2] border border-black/15 rounded-lg text-neutral-800 outline-hidden focus:border-black cursor-pointer"
                title="Filter by skill level"
              >
                <option value="All">All Skill Levels</option>
                {difficultyLevels.filter((d) => d !== 'All').map((diff) => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            {/* Verification Status */}
            <div>
              <select
                value={selectedVerification}
                onChange={(e) => setSelectedVerification(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F8F7F2] border border-black/15 rounded-lg text-neutral-800 outline-hidden focus:border-black cursor-pointer"
                title="Filter by verification status"
              >
                <option value="All">All Verification</option>
                {verificationOptions.filter((v) => v !== 'All').map((ver) => (
                  <option key={ver} value={ver}>{ver}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-[#F8F7F2] border border-black/15 rounded-lg text-neutral-800 outline-hidden focus:border-black cursor-pointer font-semibold"
                title="Sort directory order"
              >
                <option value="rating">Top Vibe Rating</option>
                <option value="name">Name (A-Z)</option>
                <option value="difficulty">Beginner First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs (Interactive Segmented Filter Buttons) */}
        <div className="pt-4 border-t border-black/10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
              CATEGORY:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black text-[#D4FF00] shadow-xs'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Capabilities Filter Row */}
        <div className="mt-3 pt-3 border-t border-black/5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          <span className="text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
            CAPABILITY:
          </span>
          {quickCapabilities.map((cap) => {
            const isSelected = selectedCapability === cap;
            return (
              <button
                key={cap}
                onClick={() => setSelectedCapability(cap)}
                className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#121212] text-white font-bold'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                }`}
              >
                {cap}
              </button>
            );
          })}
        </div>

        {/* Active Filters Summary & Reset */}
        {(selectedCategory !== 'All' ||
          selectedPricing !== 'All' ||
          selectedDifficulty !== 'All' ||
          selectedVerification !== 'All' ||
          selectedCapability !== 'All' ||
          searchQuery ||
          onlyBookmarks) && (
          <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="text-black font-semibold">{filteredTools.length}</span> tools found
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400">Filters applied</span>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-black font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Directory Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => {
            const isBookmarked = bookmarkedToolIds.includes(tool.id);
            const isFeatured = idx === 0 && selectedCategory === 'All' && !searchQuery;

            return (
              <div
                key={tool.id}
                className={`bg-white border-2 border-black rounded-2xl p-6 flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-lg transition-all group relative overflow-hidden ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-radial from-neutral-50 to-white' : ''
                }`}
              >
                {/* Top Accent line if built-with */}
                {tool.isBuiltWith && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4FF00]" />
                )}

                <div>
                  {/* Card Header: Unboxed metadata (zero-pill discipline) */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500 mb-1">
                        <span className="text-black font-semibold uppercase">{tool.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{tool.pricing}</span>
                        <span aria-hidden="true">·</span>
                        <span>{tool.difficulty}</span>
                      </div>

                      <h3
                        onClick={() => handleOpenTool(tool.id)}
                        className="font-display font-black text-2xl text-[#121212] group-hover:text-black transition-colors cursor-pointer uppercase tracking-tight flex items-center gap-2"
                      >
                        <span>{tool.name}</span>
                        {tool.isBuiltWith && (
                          <span className="text-[11px] font-mono text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 normal-case font-normal">
                            Built with Vibe101
                          </span>
                        )}
                        {tool.customUserAdded && (
                          <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 normal-case font-normal">
                            Custom Record
                          </span>
                        )}
                      </h3>
                    </div>

                    {/* Bookmark Action */}
                    <button
                      onClick={() => onToggleBookmark(tool.id)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                        isBookmarked
                          ? 'bg-[#121212] text-[#D4FF00] border-black'
                          : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500 border-black/10 hover:text-black'
                      }`}
                      title={isBookmarked ? 'Remove from My Stack' : 'Bookmark to My Stack'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 fill-[#D4FF00]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs font-medium text-neutral-800 mb-3 leading-snug">
                    {tool.tagline}
                  </p>

                  {/* Capabilities Tags (Unboxed text with · separators) */}
                  {tool.capabilities && tool.capabilities.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-neutral-600 mb-3">
                      <span className="font-semibold text-black">Stack:</span>
                      {tool.capabilities.slice(0, 4).map((cap, i) => (
                        <React.Fragment key={cap}>
                          {i > 0 && <span className="text-neutral-300" aria-hidden="true">·</span>}
                          <span>{cap}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* Description snippet */}
                  <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-sans line-clamp-2">
                    {tool.description}
                  </p>

                  {/* Key Strengths list (2 items) */}
                  <div className="mb-4 space-y-1.5">
                    {tool.pros.slice(0, 2).map((pro, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                        <span className="text-black font-bold">✓</span>
                        <span className="leading-snug line-clamp-1">{pro}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Tip Pill Box */}
                  {tool.quickTip && (
                    <div className="p-3 bg-[#F8F7F2] rounded-xl border border-black/10 mb-4 text-xs font-mono text-neutral-700 leading-relaxed">
                      <span className="text-black font-bold block mb-0.5">VIBE TIP:</span>
                      <p className="line-clamp-2">{tool.quickTip}</p>
                    </div>
                  )}
                </div>

                {/* Card Footer: Rating, Inspect Profile Button, and External Link */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono">
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-neutral-700">
                    <span className="text-neutral-400">Vibe:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < tool.vibeRating
                              ? 'text-black fill-[#D4FF00]'
                              : 'text-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenTool(tool.id)}
                      className="text-black font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-neutral-600 hover:text-black font-semibold transition-colors underline underline-offset-2"
                      title="Open verified website in new tab"
                    >
                      <span>Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-white border-2 border-black rounded-2xl p-8 max-w-xl mx-auto shadow-xs">
          <div className="w-14 h-14 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
            <Search className="w-6 h-6 text-black" />
          </div>
          <h3 className="font-display font-black text-2xl text-[#121212] uppercase tracking-tight">
            No matching tools found
          </h3>
          <p className="text-xs font-mono text-neutral-600 mt-2 mb-6 leading-relaxed">
            We couldn&apos;t find any verified tools matching &quot;{searchQuery || selectedCategory}&quot; with your active filter criteria.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 text-xs font-bold bg-black text-[#D4FF00] rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 text-xs font-bold bg-[#D4FF00] text-black border border-black rounded-xl hover:bg-[#bce400] transition-colors cursor-pointer"
            >
              Add This Tool
            </button>
          </div>
        </div>
      )}

      {/* Tool Profile Modal Dialog */}
      <ToolProfileModal
        tool={activeToolObject}
        isOpen={Boolean(activeModalToolId && activeToolObject)}
        onClose={handleCloseModal}
        isBookmarked={activeModalToolId ? bookmarkedToolIds.includes(activeModalToolId) : false}
        onToggleBookmark={onToggleBookmark}
        allTools={allTools}
        onSelectAlternative={(altId) => handleOpenTool(altId)}
        onShowToast={onShowToast}
      />

      {/* Add Tool Modal Dialog */}
      <AddToolModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddTool={(newTool) => {
          if (onAddCustomTool) onAddCustomTool(newTool);
        }}
        onShowToast={onShowToast}
      />
    </section>
  );
};
