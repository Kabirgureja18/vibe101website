import React, { useState } from 'react';
import { Palette, Copy, Check, ShieldAlert, Sparkles, MoveRight, Eye } from 'lucide-react';
import { DESIGN_STYLES, COLOR_PALETTES, ANIMATION_RECIPES, ANTI_SLOP_CONSTITUTION } from '../data/references';
import { DesignStyle, ColorPalette, AnimationRecipe } from '../types';

interface DesignReferencesProps {
  onShowToast: (title: string, description?: string) => void;
}

export const DesignReferences: React.FC<DesignReferencesProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'styles' | 'palettes' | 'motion' | 'anti-slop'>('styles');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyColor = async (hex: string, name: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      onShowToast(`Copied ${hex}`, `${name} added to clipboard`);
      setTimeout(() => setCopiedHex(null), 1800);
    } catch {
      onShowToast('Copy failed', 'Please copy manually.');
    }
  };

  const copySnippet = async (code: string, label: string) => {
    try {
      await navigator.clipboard.writeText(code);
      onShowToast('Copied code snippet', label);
    } catch {
      onShowToast('Copy failed', 'Please copy manually.');
    }
  };

  return (
    <section id="references" className="py-20 px-6 max-w-7xl mx-auto border-t border-black/10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">
          <span>06. SPECIFICATION</span>
          <span aria-hidden="true">/</span>
          <span>DESIGN & REFERENCE LIBRARY</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-[#121212] uppercase text-balance">
          Steal the technique. Make it yours.
        </h2>
        <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
          Curated visual languages, tested hex palettes, physics animation formulas, and the strict Anti-Slop Constitution to make your software feel human-crafted.
        </p>
      </div>

      {/* Navigation Sub-Tabs (Functional interactive button controls) */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('styles')}
          className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer border ${
            activeTab === 'styles'
              ? 'bg-black text-white border-black'
              : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
          }`}
        >
          Design Styles ({DESIGN_STYLES.length})
        </button>
        <button
          onClick={() => setActiveTab('palettes')}
          className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer border ${
            activeTab === 'palettes'
              ? 'bg-black text-white border-black'
              : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
          }`}
        >
          Color Palettes ({COLOR_PALETTES.length})
        </button>
        <button
          onClick={() => setActiveTab('motion')}
          className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer border ${
            activeTab === 'motion'
              ? 'bg-black text-white border-black'
              : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
          }`}
        >
          Motion Recipes ({ANIMATION_RECIPES.length})
        </button>
        <button
          onClick={() => setActiveTab('anti-slop')}
          className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer border ${
            activeTab === 'anti-slop'
              ? 'bg-black text-white border-black'
              : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
          }`}
        >
          Anti-Slop Constitution
        </button>
      </div>

      {/* Tab 1: Design Styles */}
      {activeTab === 'styles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DESIGN_STYLES.map((style) => (
            <div
              key={style.id}
              className="bg-white border border-black/10 rounded-xl p-6 flex flex-col justify-between hover:border-black/30 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    AESTHETIC SPEC
                  </span>
                  <button
                    onClick={() => copySnippet(style.cssRuleSnippet, style.name)}
                    className="flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-black cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </button>
                </div>
                <h3 className="font-display font-bold text-xl text-[#121212] mb-2">
                  {style.name}
                </h3>
                <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-sans">
                  {style.vibe}
                </p>

                <div className="mb-4 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-neutral-800 uppercase block">
                    Key Characteristics:
                  </span>
                  {style.characteristics.map((char, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <span className="text-black font-bold">›</span>
                      <span>{char}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <span className="text-xs font-mono font-bold text-neutral-800 uppercase block mb-1">
                    Best Use Cases:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs text-neutral-600">
                    {style.bestUseCases.join(' · ')}
                  </div>
                </div>

                <div className="p-3 bg-[#F8F7F2] rounded-lg border border-black/5 text-xs text-neutral-700 font-sans leading-relaxed">
                  <span className="font-bold text-neutral-900 font-mono">AVOID WHEN: </span>
                  {style.avoidWhen}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-black/10">
                <pre className="text-[11px] font-mono text-neutral-700 bg-neutral-50 p-2.5 rounded border border-black/5 overflow-x-auto whitespace-pre-wrap">
                  {style.cssRuleSnippet}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Color Palettes */}
      {activeTab === 'palettes' && (
        <div className="space-y-8">
          {COLOR_PALETTES.map((palette) => (
            <div
              key={palette.id}
              className="bg-white border border-black/10 rounded-xl p-6 sm:p-8 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/10">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    {palette.theme}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#121212]">
                    {palette.name}
                  </h3>
                </div>
                <div className="text-xs font-mono text-neutral-500">
                  Click any swatch to copy Hex
                </div>
              </div>

              {/* Swatches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {palette.colors.map((color) => {
                  const isCopied = copiedHex === color.hex;
                  return (
                    <button
                      key={color.name}
                      onClick={() => copyColor(color.hex, color.name)}
                      className="group flex flex-col text-left rounded-lg p-2.5 hover:bg-neutral-50 border border-transparent hover:border-black/10 transition-all cursor-pointer"
                    >
                      <div
                        className="w-full h-20 rounded-md border border-black/10 mb-2 relative overflow-hidden transition-transform group-hover:scale-[1.02] shadow-xs flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isCopied && (
                          <div className="bg-black text-[#D4FF00] px-2 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 shadow-lg">
                            <Check className="w-3.5 h-3.5" />
                            <span>COPIED</span>
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-xs text-[#121212] block">
                        {color.name}
                      </span>
                      <span className="font-mono text-xs text-neutral-500 tabular-nums">
                        {color.hex}
                      </span>
                      <span className="text-[10px] text-neutral-400 mt-1 line-clamp-2 leading-tight">
                        {color.usage}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Motion Recipes */}
      {activeTab === 'motion' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ANIMATION_RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white border border-black/10 rounded-xl p-6 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-neutral-500 uppercase">
                    Category: {recipe.category}
                  </span>
                  <button
                    onClick={() => copySnippet(recipe.codeSnippet, recipe.name)}
                    className="flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-black cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </button>
                </div>

                <h3 className="font-display font-bold text-xl text-[#121212] mb-2">
                  {recipe.name}
                </h3>
                <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-sans">
                  {recipe.description}
                </p>
              </div>

              {/* Code Snippet */}
              <div className="mt-4">
                <pre className="p-3.5 bg-[#121212] text-[#D4FF00] rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-48 border border-black">
                  {recipe.codeSnippet}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Anti-Slop Constitution */}
      {activeTab === 'anti-slop' && (
        <div className="bg-white border border-black/10 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/10">
            <ShieldAlert className="w-6 h-6 text-[#FF4D00]" />
            <div>
              <h3 className="font-display font-black text-2xl text-[#121212]">
                The Anti-AI-Slop Constitution
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                NON-NEGOTIABLE DESIGN DIRECTIVES FOR VIBECODED PRODUCTS
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {ANTI_SLOP_CONSTITUTION.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-neutral-50 rounded-xl border border-black/5 hover:border-black/15 transition-all"
              >
                <h4 className="font-display font-bold text-base text-[#121212] mb-3">
                  {item.rule}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Banned */}
                  <div className="p-3 bg-red-50/70 border border-red-200/60 rounded-lg">
                    <span className="text-[11px] font-mono font-bold text-red-800 uppercase block mb-1">
                      ❌ BANNED (GENERIC AI CLICHÉ)
                    </span>
                    <p className="text-xs text-red-900 leading-relaxed font-sans">
                      {item.banned}
                    </p>
                  </div>

                  {/* Mandated */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-lg">
                    <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase block mb-1">
                      ✅ MANDATED (PROFESSIONAL CRAFT)
                    </span>
                    <p className="text-xs text-emerald-900 leading-relaxed font-sans">
                      {item.mandated}
                    </p>
                  </div>
                </div>

                {item.exception && (
                  <p className="text-[11px] text-neutral-500 font-mono mt-3">
                    <span className="font-semibold text-neutral-700">Exception Note:</span> {item.exception}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
