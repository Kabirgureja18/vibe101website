import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Star,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  Share2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Wrench,
  Sparkles
} from 'lucide-react';
import { VibecodingTool } from '../types';

interface ToolProfileModalProps {
  tool: VibecodingTool | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (toolId: string) => void;
  allTools: VibecodingTool[];
  onSelectAlternative: (toolId: string) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ToolProfileModal: React.FC<ToolProfileModalProps> = ({
  tool,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  allTools,
  onSelectAlternative,
  onShowToast
}) => {
  const [copiedTip, setCopiedTip] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
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

  if (!isOpen || !tool) return null;

  // Resolve alternative tool objects
  const relatedTools: VibecodingTool[] = (tool.alternatives || [])
    .map((altId) => allTools.find((t) => t.id === altId || t.name.toLowerCase() === altId.toLowerCase()))
    .filter((t): t is VibecodingTool => Boolean(t));

  const handleCopyTip = () => {
    if (!tool.quickTip) return;
    navigator.clipboard.writeText(tool.quickTip);
    setCopiedTip(true);
    if (onShowToast) onShowToast('Pro tip copied to clipboard', tool.name);
    setTimeout(() => setCopiedTip(false), 2000);
  };

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}#tool-${tool.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    if (onShowToast) onShowToast('Tool link copied', shareUrl, 'info');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getVerificationBadge = () => {
    const status = tool.verificationStatus || 'verified';
    if (status === 'verified') {
      return (
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified Official Domain</span>
        </div>
      );
    }
    if (status === 'preview') {
      return (
        <div className="flex items-center gap-1.5 text-xs font-mono text-amber-800">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Developer Preview / Under Review</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600">
        <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
        <span>Community Resource</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#F8F7F2] border-2 border-black rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 bg-white border-b border-black/10 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {/* Unboxed Metadata (Zero-pill discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500 mb-2">
              <span className="text-black font-semibold uppercase">{tool.category}</span>
              <span aria-hidden="true">/</span>
              <span>{tool.pricing}</span>
              <span aria-hidden="true">/</span>
              <span>{tool.difficulty} Level</span>
              {tool.lastVerifiedDate && (
                <>
                  <span aria-hidden="true">/</span>
                  <span className="text-neutral-400">Checked {tool.lastVerifiedDate}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#121212] tracking-tight uppercase">
                {tool.name}
              </h2>
              {tool.vibeRating && (
                <div className="flex items-center gap-0.5" title={`Vibe rating: ${tool.vibeRating}/5`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < tool.vibeRating ? 'text-black fill-[#D4FF00]' : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <p className="mt-1 text-sm font-medium text-neutral-700">
              {tool.tagline}
            </p>
          </div>

          {/* Action buttons (Bookmark & Close) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(tool.id)}
              className={`p-2.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                isBookmarked
                  ? 'bg-black text-[#D4FF00] border-black'
                  : 'bg-white hover:bg-neutral-100 text-neutral-700 border-black/15'
              }`}
              title={isBookmarked ? 'Remove from My Stack' : 'Save to My Stack'}
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="w-4 h-4 fill-[#D4FF00]" />
                  <span className="hidden sm:inline">In Stack</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareLink}
              className="p-2.5 rounded-lg border border-black/15 bg-white hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-lg border border-black/15 bg-white hover:bg-black hover:text-white text-neutral-600 transition-colors cursor-pointer"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-neutral-700">
          {/* Verification & Attribution Callout */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-black/10">
            {getVerificationBadge()}

            {tool.isBuiltWith && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-purple-900 font-semibold">
                <Wrench className="w-3.5 h-3.5 text-purple-700" />
                <span>Genuine Core Tech used in Vibe101</span>
              </div>
            )}

            {tool.isInspiredBy && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-900 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Design & Research Inspiration</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider mb-2">
              OVERVIEW
            </h3>
            <p className="text-base text-neutral-800 leading-relaxed font-sans">
              {tool.description}
            </p>
            {tool.builtWithDescription && (
              <p className="mt-2 text-xs font-mono text-purple-900 bg-purple-50 p-2.5 rounded-lg border border-purple-200">
                <span className="font-bold">BUILT WITH VIBE101:</span> {tool.builtWithDescription}
              </p>
            )}
            {tool.inspiredByDescription && (
              <p className="mt-2 text-xs font-mono text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                <span className="font-bold">INSPIRATION CONTEXT:</span> {tool.inspiredByDescription}
              </p>
            )}
          </div>

          {/* Best For & Real-World Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-black/10">
              <span className="text-xs font-mono font-bold text-black uppercase tracking-wider block mb-2">
                IDEAL AUDIENCE & SWEET SPOT
              </span>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {tool.bestFor}
              </p>
              {tool.pricingDetail && (
                <div className="mt-3 pt-3 border-t border-black/5 text-xs text-neutral-600">
                  <span className="font-semibold text-black">Pricing Model:</span> {tool.pricingDetail}
                </div>
              )}
            </div>

            <div className="p-4 bg-white rounded-xl border border-black/10">
              <span className="text-xs font-mono font-bold text-black uppercase tracking-wider block mb-2">
                BEST USE CASES
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {(tool.bestUseCases || [tool.bestFor]).map((uc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-black font-bold">→</span>
                    <span className="leading-snug">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Capabilities & Integrations Row (Unboxed metadata) */}
          <div className="space-y-3 p-4 bg-white rounded-xl border border-black/10">
            {tool.capabilities && tool.capabilities.length > 0 && (
              <div>
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
                  CAPABILITIES
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-700">
                  {tool.capabilities.map((cap, i) => (
                    <React.Fragment key={cap}>
                      {i > 0 && <span className="text-neutral-300" aria-hidden="true">·</span>}
                      <span className="font-medium text-[#121212]">{cap}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {tool.integrations && tool.integrations.length > 0 && (
              <div className="pt-2 border-t border-black/5">
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
                  ECOSYSTEM INTEGRATIONS
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-700">
                  {tool.integrations.map((integ, i) => (
                    <React.Fragment key={integ}>
                      {i > 0 && <span className="text-neutral-300" aria-hidden="true">·</span>}
                      <span>{integ}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pros vs Limitations (Honest engineering assessment) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-950 uppercase tracking-wider mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>GENUINE STRENGTHS</span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-950">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-700">✓</span>
                    <span className="leading-snug">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations / Cons */}
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-950 uppercase tracking-wider mb-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>LIMITATIONS & GOTCHAS</span>
              </div>
              <ul className="space-y-2 text-xs text-amber-950">
                {(tool.limitations || tool.cons).map((lim, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-amber-700">!</span>
                    <span className="leading-snug">{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Tip Box with Copy Action */}
          {tool.quickTip && (
            <div className="p-4 bg-[#121212] text-white rounded-xl border border-black flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>VIBECODER PRO TIP & CHEAT CODE</span>
                </div>
                <p className="text-xs font-mono text-neutral-300 leading-relaxed font-sans">
                  {tool.quickTip}
                </p>
              </div>

              <button
                onClick={handleCopyTip}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white rounded-lg transition-colors cursor-pointer border border-neutral-700"
              >
                {copiedTip ? <Check className="w-3.5 h-3.5 text-[#D4FF00]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTip ? 'Copied' : 'Copy Tip'}</span>
              </button>
            </div>
          )}

          {/* Alternatives & Related Tools */}
          {relatedTools.length > 0 && (
            <div>
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider block mb-2.5">
                ALTERNATIVES & COMPLEMENTARY TOOLS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedTools.map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => onSelectAlternative(alt.id)}
                    className="p-3 bg-white hover:bg-neutral-50 rounded-xl border border-black/10 hover:border-black/30 transition-all text-left flex items-start justify-between gap-2 cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-mono text-neutral-400 block mb-0.5">
                        {alt.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-[#121212] group-hover:text-black">
                        {alt.name}
                      </h4>
                      <p className="text-[11px] text-neutral-600 line-clamp-1 mt-0.5">
                        {alt.tagline}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with External Links */}
        <div className="p-4 sm:p-5 bg-white border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-neutral-500">
            Canonical identity verified. Always review official security docs.
          </div>

          <div className="flex items-center gap-3">
            {tool.docsUrl && (
              <a
                href={tool.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Docs</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-black bg-[#D4FF00] hover:bg-[#bce400] border border-black rounded-lg transition-colors shadow-xs"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
