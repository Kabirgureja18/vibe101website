import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Copy, Check, Bookmark, BookmarkCheck, RefreshCw, 
  Send, Wand2, Terminal, Info
} from 'lucide-react';
import { PROMPT_TEMPLATES } from '../data/prompts';
import { PromptTemplate } from '../types';

interface PromptLabProps {
  savedPromptIds: string[];
  onToggleSavePrompt: (promptId: string) => void;
  onShowToast: (title: string, description?: string) => void;
}

export const PromptLab: React.FC<PromptLabProps> = ({
  savedPromptIds,
  onToggleSavePrompt,
  onShowToast
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('app-scaffolding');
  const [copied, setCopied] = useState(false);

  // Template active selection
  const currentTemplate = PROMPT_TEMPLATES.find((t) => t.id === selectedTemplateId) || PROMPT_TEMPLATES[0];

  // Dynamic variable state map for this template
  const [variablesState, setVariablesState] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    PROMPT_TEMPLATES.forEach((template) => {
      template.variables.forEach((v) => {
        initial[`${template.id}_${v.key}`] = v.defaultValue;
      });
    });
    return initial;
  });

  // Scratchpad test simulation
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);

  // Interpolate variables into prompt template text
  const renderedPrompt = useMemo(() => {
    let result = currentTemplate.templateText;
    currentTemplate.variables.forEach((v) => {
      const val = variablesState[`${currentTemplate.id}_${v.key}`] ?? v.defaultValue;
      result = result.replaceAll(`{{${v.key}}}`, val);
    });
    return result;
  }, [currentTemplate, variablesState]);

  const handleVariableChange = (key: string, value: string) => {
    setVariablesState((prev) => ({
      ...prev,
      [`${currentTemplate.id}_${key}`]: value
    }));
  };

  const handleResetVariables = () => {
    setVariablesState((prev) => {
      const updated = { ...prev };
      currentTemplate.variables.forEach((v) => {
        updated[`${currentTemplate.id}_${v.key}`] = v.defaultValue;
      });
      return updated;
    });
    onShowToast('Variables reset to defaults', currentTemplate.title);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(renderedPrompt);
      setCopied(true);
      onShowToast('Prompt copied to clipboard!', 'Ready to paste into Cursor, Claude, or Google AI Studio.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('Failed to copy', 'Please select and copy manually.');
    }
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulatedResponse(null);

    // Simulate high-quality autonomous model reasoning response
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedResponse(
        `✓ Architectural Invariants Verified\n\n1. Scaffold initialized with crisp separation of concerns:\n   - /src/components/ (Pure visual units with Tailwind v4)\n   - /src/hooks/ (Custom state with LocalStorage persistence)\n   - /src/types/ (Strict TypeScript interfaces with zero 'any')\n\n2. Design tokens bound to CSS variables:\n   - Canvas: #F8F7F2 (Warm off-white)\n   - Text: #121212 (High-contrast charcoal)\n   - Accent: #D4FF00 (Neon lime highlights)\n\n3. Zero-slop compliance:\n   - All metadata rendered with unboxed typographic bullets (·)\n   - No fake status dots or comment headers\n   - Tabular numerals active on all numerical telemetry\n\nReady for code generation.`
      );
      onShowToast('Simulation complete', 'Model reasoning verified constraints cleanly.');
    }, 1200);
  };

  const isSaved = savedPromptIds.includes(currentTemplate.id);

  return (
    <section id="prompts" className="py-20 px-6 max-w-7xl mx-auto border-t border-black/10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">
          <span>04. PLAYGROUND</span>
          <span aria-hidden="true">/</span>
          <span>INTERACTIVE PROMPT LAB</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-[#121212] uppercase text-balance">
          Stop prompting blind.
        </h2>
        <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
          Customize production prompt recipes with dynamic variables. Inject architectural boundaries, anti-slop styling rules, and error diagnosis frameworks into Cursor, Windsurf, or Claude.
        </p>
      </div>

      {/* Template Selectors */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {PROMPT_TEMPLATES.map((tmpl) => {
          const isSelected = tmpl.id === selectedTemplateId;
          return (
            <button
              key={tmpl.id}
              onClick={() => {
                setSelectedTemplateId(tmpl.id);
                setSimulatedResponse(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap shrink-0 transition-colors cursor-pointer border ${
                isSelected
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
              }`}
            >
              {tmpl.title}
            </button>
          );
        })}
      </div>

      {/* Main Two-Pane Interactive Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Parameter Controls */}
        <div className="lg:col-span-5 bg-white border border-black/10 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-5">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                {currentTemplate.category}
              </span>
              <h3 className="font-display font-bold text-lg text-[#121212]">
                {currentTemplate.title}
              </h3>
            </div>
            <button
              onClick={handleResetVariables}
              className="text-xs font-mono text-neutral-500 hover:text-black flex items-center gap-1 transition-colors cursor-pointer p-1"
              title="Reset variables to default"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
            {currentTemplate.intent}
          </p>

          {/* Dynamic Variable Form Fields */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
              Template Variables
            </h4>
            {currentTemplate.variables.map((variable) => {
              const currentValue =
                variablesState[`${currentTemplate.id}_${variable.key}`] ?? variable.defaultValue;

              return (
                <div key={variable.key}>
                  <label className="block text-xs font-mono text-neutral-700 mb-1 font-semibold">
                    {`{{${variable.key}}}`} · <span className="font-sans font-normal text-neutral-500">{variable.label}</span>
                  </label>
                  {variable.key.includes('AESTHETIC') || variable.key.includes('RESTRICTIONS') || variable.key.includes('ERROR') ? (
                    <textarea
                      rows={3}
                      value={currentValue}
                      onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                      placeholder={variable.placeholder}
                      className="w-full text-xs font-sans p-2.5 bg-neutral-50 border border-black/10 rounded-lg outline-hidden focus:border-black focus:bg-white text-[#121212] leading-relaxed transition-all"
                    />
                  ) : (
                    <input
                      type="text"
                      value={currentValue}
                      onChange={(e) => handleVariableChange(variable.key, e.target.value)}
                      placeholder={variable.placeholder}
                      className="w-full text-xs font-sans p-2.5 bg-neutral-50 border border-black/10 rounded-lg outline-hidden focus:border-black focus:bg-white text-[#121212] transition-all"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Pro Tip Box */}
          <div className="p-4 bg-[#F8F7F2] rounded-lg border border-black/5 text-xs text-neutral-700 leading-relaxed font-sans mb-4">
            <div className="flex items-center gap-1.5 font-mono font-bold text-black mb-1">
              <Info className="w-3.5 h-3.5 text-neutral-700" />
              <span>ARCHITECT PRO-TIP</span>
            </div>
            {currentTemplate.proTip}
          </div>

          {/* Expected Output Note */}
          <div className="text-xs text-neutral-500 font-mono">
            <span className="font-semibold text-neutral-700">Expected Outcome:</span> {currentTemplate.outputExpectation}
          </div>
        </div>

        {/* Right Column (7 cols): Live Prompt Output & Actions */}
        <div className="lg:col-span-7 bg-[#121212] text-white border border-black rounded-xl p-6 shadow-xl flex flex-col justify-between min-h-[500px]">
          <div>
            {/* Window Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#D4FF00]/80 inline-block" />
                <span className="text-xs font-mono text-neutral-400 ml-2">PROMPT_SPEC.md</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleSavePrompt(currentTemplate.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer border ${
                    isSaved
                      ? 'bg-[#D4FF00] text-black border-[#D4FF00]'
                      : 'bg-white/10 hover:bg-white/20 text-neutral-300 border-white/10'
                  }`}
                  title={isSaved ? 'Saved in your workspace' : 'Save template to workspace'}
                >
                  {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 fill-black" /> : <Bookmark className="w-3.5 h-3.5" />}
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-mono font-semibold bg-[#D4FF00] text-black hover:bg-[#c3ea00] transition-transform active:scale-95 cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
                </button>
              </div>
            </div>

            {/* Rendered Prompt Text */}
            <div className="relative">
              <pre className="font-mono text-xs sm:text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed select-all bg-black/40 p-4 rounded-lg border border-white/5 max-h-[420px] overflow-y-auto">
                {renderedPrompt}
              </pre>
            </div>
          </div>

          {/* Test Simulation Panel */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Terminal className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>MODEL VERIFICATION SCRATCHPAD</span>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSimulating ? (
                  <RefreshCw className="w-3 h-3 animate-spin text-[#D4FF00]" />
                ) : (
                  <Wand2 className="w-3 h-3 text-[#D4FF00]" />
                )}
                <span>{isSimulating ? 'Verifying Spec...' : 'Test Model Reasoning'}</span>
              </button>
            </div>

            {simulatedResponse && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-black/60 border border-[#D4FF00]/30 rounded-lg text-xs font-mono text-[#D4FF00] leading-relaxed whitespace-pre-wrap"
              >
                {simulatedResponse}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
