import React, { useState, useEffect } from 'react';
import { X, Plus, AlertCircle, Sparkles, Check } from 'lucide-react';
import { ToolCategory, VibecodingTool } from '../types';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (tool: Omit<VibecodingTool, 'id'>) => void;
  initialTool?: VibecodingTool | null;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AddToolModal: React.FC<AddToolModalProps> = ({
  isOpen,
  onClose,
  onAddTool,
  initialTool,
  onShowToast
}) => {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<ToolCategory>('AI Assistants & App Builders');
  const [pricing, setPricing] = useState<'Free / Open Source' | 'Freemium' | 'Subscription' | 'Pay-per-token' | 'Commercial License'>('Freemium');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [docsUrl, setDocsUrl] = useState('');
  const [description, setDescription] = useState('');
  const [bestFor, setBestFor] = useState('');
  const [bestUseCases, setBestUseCases] = useState('');
  const [capabilities, setCapabilities] = useState('');
  const [integrations, setIntegrations] = useState('');
  const [limitations, setLimitations] = useState('');
  const [quickTip, setQuickTip] = useState('');
  const [vibeRating, setVibeRating] = useState<number>(5);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTool) {
      setName(initialTool.name);
      setTagline(initialTool.tagline);
      setCategory(initialTool.category as ToolCategory);
      setPricing(initialTool.pricing);
      setDifficulty(initialTool.difficulty);
      setWebsiteUrl(initialTool.websiteUrl);
      setDocsUrl(initialTool.docsUrl || '');
      setDescription(initialTool.description);
      setBestFor(initialTool.bestFor);
      setBestUseCases((initialTool.bestUseCases || []).join('\n'));
      setCapabilities((initialTool.capabilities || []).join(', '));
      setIntegrations((initialTool.integrations || []).join(', '));
      setLimitations((initialTool.limitations || initialTool.cons || []).join('\n'));
      setQuickTip(initialTool.quickTip);
      setVibeRating(initialTool.vibeRating || 5);
    } else {
      setName('');
      setTagline('');
      setCategory('AI Assistants & App Builders');
      setPricing('Freemium');
      setDifficulty('Beginner');
      setWebsiteUrl('');
      setDocsUrl('');
      setDescription('');
      setBestFor('');
      setBestUseCases('');
      setCapabilities('');
      setIntegrations('');
      setLimitations('');
      setQuickTip('');
      setVibeRating(5);
      setError(null);
    }
  }, [initialTool, isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide a tool name.');
      return;
    }

    if (!websiteUrl.trim() || (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://'))) {
      setError('Please provide a valid website URL starting with https:// or http://');
      return;
    }

    if (!tagline.trim()) {
      setError('Please provide a short one-line tagline.');
      return;
    }

    if (!description.trim()) {
      setError('Please provide an overview description.');
      return;
    }

    const parsedUseCases = bestUseCases
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedCapabilities = capabilities
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedIntegrations = integrations
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedLimitations = limitations
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const newRecord: Omit<VibecodingTool, 'id'> = {
      name: name.trim(),
      tagline: tagline.trim(),
      category,
      pricing,
      difficulty,
      websiteUrl: websiteUrl.trim(),
      docsUrl: docsUrl.trim() || undefined,
      description: description.trim(),
      bestFor: bestFor.trim() || tagline.trim(),
      bestUseCases: parsedUseCases.length > 0 ? parsedUseCases : [bestFor.trim() || tagline.trim()],
      capabilities: parsedCapabilities,
      integrations: parsedIntegrations,
      limitations: parsedLimitations,
      pros: ['User contributed tool record in local directory', 'Fast workflow integration'],
      cons: parsedLimitations.length > 0 ? parsedLimitations : ['Review official documentation for complete constraints'],
      alternatives: [],
      vibeRating,
      quickTip: quickTip.trim() || 'Direct the AI with clear negative constraints and high-contrast styling.',
      verificationStatus: 'community_reviewed',
      lastVerifiedDate: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      customUserAdded: true
    };

    onAddTool(newRecord);
    if (onShowToast) {
      onShowToast(
        initialTool ? 'Tool record updated' : 'New tool added to directory',
        `${name} is saved in your local workspace.`,
        'success'
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#F8F7F2] border-2 border-black rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-black/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1">
              <span>CONTRIBUTE</span>
              <span aria-hidden="true">/</span>
              <span>DIRECTORY RECORD</span>
            </div>
            <h2 className="font-display font-black text-2xl text-[#121212] tracking-tight uppercase">
              {initialTool ? 'Edit Tool Record' : 'Add Tool to Directory'}
            </h2>
            <p className="text-xs text-neutral-600 mt-0.5">
              Added tools are persisted in your local workspace and instantly filterable.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-black/10 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs font-mono">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Row 1: Name and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
                Tool Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Claude Code"
                className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ToolCategory)}
                className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black cursor-pointer"
              >
                <option value="AI Assistants & App Builders">AI Assistants & App Builders</option>
                <option value="Design & Inspiration">Design & Inspiration</option>
                <option value="Animation, 3D & Components">Animation, 3D & Components</option>
                <option value="Backend, Database & Auth">Backend, Database & Auth</option>
                <option value="Deployment & Cloud Hosting">Deployment & Cloud Hosting</option>
              </select>
            </div>
          </div>

          {/* Row 2: Website URL and Docs URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
                Official Website URL *
              </label>
              <input
                type="url"
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
                Documentation URL
              </label>
              <input
                type="url"
                value={docsUrl}
                onChange={(e) => setDocsUrl(e.target.value)}
                placeholder="https://docs.example.com"
                className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
              />
            </div>
          </div>

          {/* Row 3: Pricing and Skill Level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
                Pricing Model
              </label>
              <select
                value={pricing}
                onChange={(e) => setPricing(e.target.value as any)}
                className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black cursor-pointer"
              >
                <option value="Free / Open Source">Free / Open Source</option>
                <option value="Freemium">Freemium</option>
                <option value="Subscription">Subscription</option>
                <option value="Pay-per-token">Pay-per-token</option>
                <option value="Commercial License">Commercial License</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
                Skill Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black cursor-pointer"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
                Vibe Rating (1-5)
              </label>
              <select
                value={vibeRating}
                onChange={(e) => setVibeRating(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black cursor-pointer"
              >
                <option value={5}>5 ★★★★★ (Top tier)</option>
                <option value={4}>4 ★★★★☆ (High quality)</option>
                <option value={3}>3 ★★★☆☆ (Solid)</option>
                <option value={2}>2 ★★☆☆☆ (Niche)</option>
                <option value={1}>1 ★☆☆☆☆ (Experimental)</option>
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
              Tagline (1 crisp sentence) *
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Autonomous terminal agent executing shell loops and git diffs."
              className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
              Overview Description *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed explanation of what the tool is, how it works, and how vibecoders use it."
              className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black leading-relaxed"
            />
          </div>

          {/* Best For */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
              Ideal Audience & Sweet Spot
            </label>
            <input
              type="text"
              value={bestFor}
              onChange={(e) => setBestFor(e.target.value)}
              placeholder="e.g. Full-stack developers wanting autonomous terminal refactors."
              className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
            />
          </div>

          {/* Capabilities and Integrations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
                Capabilities (comma-separated)
              </label>
              <input
                type="text"
                value={capabilities}
                onChange={(e) => setCapabilities(e.target.value)}
                placeholder="CLI Agent, Git Automation, Node.js"
                className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
                Integrations (comma-separated)
              </label>
              <input
                type="text"
                value={integrations}
                onChange={(e) => setIntegrations(e.target.value)}
                placeholder="GitHub, VS Code, Terminal"
                className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
              />
            </div>
          </div>

          {/* Limitations */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
              Known Limitations & Gotchas (1 per line)
            </label>
            <textarea
              rows={2}
              value={limitations}
              onChange={(e) => setLimitations(e.target.value)}
              placeholder="High token consumption on long commands&#10;Requires careful git review before running"
              className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black leading-relaxed"
            />
          </div>

          {/* Quick Tip */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5 uppercase">
              Vibecoder Pro Tip / Cheat Code
            </label>
            <input
              type="text"
              value={quickTip}
              onChange={(e) => setQuickTip(e.target.value)}
              placeholder="e.g. Always run 'git status' before starting a multi-step agent edit session."
              className="w-full px-3 py-2 text-xs font-sans bg-white border border-black/15 rounded-lg text-black outline-hidden focus:border-black"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-black/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-black bg-[#D4FF00] hover:bg-[#bce400] border border-black rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{initialTool ? 'Save Changes' : 'Add to Directory'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
