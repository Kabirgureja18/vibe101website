import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Clock, Copy, Plus, ChevronRight, CheckCircle2, 
  AlertTriangle, FolderTree, Code, ArrowUpRight 
} from 'lucide-react';
import { PROJECT_BLUEPRINTS } from '../data/blueprints';
import { ProjectBlueprint } from '../types';

interface ProjectBlueprintsProps {
  onStartProject: (blueprint: ProjectBlueprint) => void;
  onShowToast: (title: string, description?: string) => void;
}

export const ProjectBlueprints: React.FC<ProjectBlueprintsProps> = ({
  onStartProject,
  onShowToast
}) => {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(PROJECT_BLUEPRINTS[0].id);

  const currentBlueprint =
    PROJECT_BLUEPRINTS.find((b) => b.id === selectedBlueprintId) || PROJECT_BLUEPRINTS[0];

  const copyPromptText = async (text: string, title: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onShowToast('Prompt copied!', title);
    } catch {
      onShowToast('Copy failed', 'Please copy manually.');
    }
  };

  return (
    <section id="blueprints" className="py-20 px-6 max-w-7xl mx-auto border-t border-black/10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">
          <span>05. ARCHITECTURE</span>
          <span aria-hidden="true">/</span>
          <span>PRODUCTION-GRADE BLUEPRINTS</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-[#121212] uppercase text-balance">
          From idea to shipped.
        </h2>
        <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
          Six battle-tested software blueprints. ASCII architecture diagrams, complete file trees, phase-by-phase prompt sequences, and common failure traps.
        </p>
      </div>

      {/* Blueprint Selector Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {PROJECT_BLUEPRINTS.map((bp) => {
          const isSelected = bp.id === selectedBlueprintId;
          return (
            <button
              key={bp.id}
              onClick={() => setSelectedBlueprintId(bp.id)}
              className={`p-5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white hover:bg-neutral-50 text-[#121212] border-black/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className={isSelected ? 'text-[#D4FF00]' : 'text-neutral-500'}>
                    {bp.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-neutral-400">
                    <Clock className="w-3 h-3" />
                    <span>{bp.timeToBuild}</span>
                  </span>
                </div>
                <h3 className="font-display font-bold text-base leading-tight mb-1.5">
                  {bp.title}
                </h3>
                <p
                  className={`text-xs line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-500'
                  }`}
                >
                  {bp.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono">
                <span className={isSelected ? 'text-neutral-400' : 'text-neutral-500'}>
                  {bp.phases.length} Phases
                </span>
                <span className={`font-semibold flex items-center gap-1 ${isSelected ? 'text-[#D4FF00]' : 'text-black'}`}>
                  <span>Inspect Spec</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Blueprint Spec Display */}
      <div className="bg-white border border-black/10 rounded-xl p-6 sm:p-8 shadow-xs">
        {/* Top Details Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-1">
              <span>Difficulty: {currentBlueprint.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>Build Time: {currentBlueprint.timeToBuild}</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#121212]">
              {currentBlueprint.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 max-w-3xl leading-relaxed">
              {currentBlueprint.description}
            </p>

            {/* Stack Tags (Unboxed text with bullets) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-700 mt-3">
              <span className="font-bold text-black">Stack:</span>
              {currentBlueprint.stack.map((item, idx) => (
                <span key={item} className="flex items-center gap-2">
                  <span>{item}</span>
                  {idx < currentBlueprint.stack.length - 1 && <span aria-hidden="true" className="text-neutral-300">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Action: Send to My Workspace */}
          <button
            onClick={() => {
              onStartProject(currentBlueprint);
              onShowToast(`Added "${currentBlueprint.title}" to Workspace`, 'Track this build in your personal workspace!');
            }}
            className="shrink-0 flex items-center gap-2 px-5 py-3 bg-[#D4FF00] text-black font-semibold rounded-lg hover:bg-[#c5ec00] transition-transform active:scale-95 cursor-pointer shadow-xs whitespace-nowrap text-xs font-mono"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Track in My Workspace</span>
          </button>
        </div>

        {/* Architecture Diagram (ASCII Wireframe) */}
        <div className="my-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-neutral-600" />
              <span>SYSTEM ARCHITECTURE DIAGRAM</span>
            </span>
          </div>
          <pre className="p-4 bg-[#121212] text-[#D4FF00] rounded-xl text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed border border-black shadow-xs">
            {currentBlueprint.architectureDiagram}
          </pre>
        </div>

        {/* Target File Tree */}
        <div className="mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5 mb-2">
            <FolderTree className="w-4 h-4 text-neutral-600" />
            <span>RECOMMENDED FILE STRUCTURE</span>
          </span>
          <div className="bg-[#F8F7F2] p-4 rounded-xl border border-black/5 space-y-1.5 font-mono text-xs text-neutral-800">
            {currentBlueprint.fileTree.map((file, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2">
                <span className="text-neutral-400">├──</span>
                <span>{file}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase-by-Phase Prompt Execution Instructions */}
        <div className="mb-8">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-4">
            PHASED BUILD EXECUTION SPEC
          </h4>
          <div className="space-y-4">
            {currentBlueprint.phases.map((phase, pIdx) => (
              <div
                key={pIdx}
                className="p-5 bg-neutral-50 rounded-xl border border-black/10 hover:border-black/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-display font-bold text-base text-[#121212]">
                    {phase.phase}
                  </h5>
                  <span className="text-xs font-mono text-neutral-500">
                    Step 0{pIdx + 1}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-sans">
                  {phase.description}
                </p>

                {/* Prompt block */}
                <div className="space-y-2 mb-3">
                  {phase.prompts.map((promptText, promptIdx) => (
                    <div key={promptIdx} className="relative">
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1">
                        <span>PROMPT TO FEED YOUR AI EDITOR:</span>
                        <button
                          onClick={() => copyPromptText(promptText, `${phase.phase} prompt`)}
                          className="flex items-center gap-1 text-black font-semibold hover:underline cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </button>
                      </div>
                      <pre className="p-3 bg-white rounded-lg border border-black/10 text-xs font-mono text-neutral-800 whitespace-pre-wrap leading-relaxed">
                        {promptText}
                      </pre>
                    </div>
                  ))}
                </div>

                {/* Verification Checkpoint */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-700 bg-white p-2.5 rounded-lg border border-black/5">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>
                    <strong className="text-black">Checkpoint:</strong> {phase.checkpoint}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pitfalls & Failure Traps */}
        <div className="p-5 bg-[#121212] text-white rounded-xl border border-black shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF4D00] mb-3">
            <AlertTriangle className="w-4 h-4 text-[#FF4D00]" />
            <span>COMMON VIBECODER PITFALLS TO AVOID</span>
          </div>
          <ul className="space-y-2">
            {currentBlueprint.pitfallsToAvoid.map((pitfall, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-sans leading-relaxed">
                <span className="text-[#FF4D00] font-bold">›</span>
                <span>{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
