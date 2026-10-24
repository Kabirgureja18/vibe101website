import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Search, CheckCircle2, Circle, Clock, Check, 
  ExternalLink, ChevronRight, ChevronLeft, ArrowLeft, Copy, 
  Lightbulb, AlertTriangle, Terminal, Code, HelpCircle, HardDrive,
  ShieldCheck, ArrowUpRight, Filter, Sparkles
} from 'lucide-react';
import { CURRICULUM_MODULES } from '../data/curriculumModules';
import { CurriculumModule, DetailedLesson } from '../types/curriculum';

interface CurriculumGuideProps {
  completedLessonIds: string[];
  onToggleCompleteLesson: (lessonId: string) => void;
  onShowToast: (title: string, description?: string) => void;
}

export const CurriculumGuide: React.FC<CurriculumGuideProps> = ({
  completedLessonIds,
  onToggleCompleteLesson,
  onShowToast
}) => {
  // Navigation State
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<number | 'all'>('all');
  const [isExerciseSolutionVisible, setIsExerciseSolutionVisible] = useState(false);

  // Flatten all lessons for lookup & linear next/prev navigation
  const allLessons = useMemo(() => {
    const list: DetailedLesson[] = [];
    CURRICULUM_MODULES.forEach((mod) => {
      mod.lessons.forEach((l) => list.push(l));
    });
    return list;
  }, []);

  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const overallPercentage = Math.round((completedCount / Math.max(1, totalLessons)) * 100);

  // Active lesson object
  const activeLesson = useMemo(() => {
    if (!activeLessonId) return null;
    return allLessons.find((l) => l.id === activeLessonId) || null;
  }, [activeLessonId, allLessons]);

  const activeLessonIndex = useMemo(() => {
    if (!activeLessonId) return -1;
    return allLessons.findIndex((l) => l.id === activeLessonId);
  }, [activeLessonId, allLessons]);

  // Filtered modules for index view
  const filteredModules = useMemo(() => {
    return CURRICULUM_MODULES.filter((mod) => {
      if (selectedModuleFilter !== 'all' && mod.moduleNumber !== selectedModuleFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesModule = mod.title.toLowerCase().includes(q) || mod.tagline.toLowerCase().includes(q);
        const matchesLessons = mod.lessons.some(
          (l) => l.title.toLowerCase().includes(q) || l.learningObjective.toLowerCase().includes(q)
        );
        return matchesModule || matchesLessons;
      }
      return true;
    });
  }, [selectedModuleFilter, searchQuery]);

  const copySnippet = async (content: string, title: string) => {
    try {
      await navigator.clipboard.writeText(content);
      onShowToast('Copied to clipboard!', title);
    } catch {
      onShowToast('Copy failed', 'Please select and copy text manually.');
    }
  };

  // Navigate to previous or next lesson
  const goToLesson = (direction: 'next' | 'prev') => {
    if (activeLessonIndex === -1) return;
    const targetIndex = direction === 'next' ? activeLessonIndex + 1 : activeLessonIndex - 1;
    if (targetIndex >= 0 && targetIndex < allLessons.length) {
      setActiveLessonId(allLessons[targetIndex].id);
      setIsExerciseSolutionVisible(false);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="guides" className="py-20 px-6 max-w-7xl mx-auto border-t border-black/10">
      {/* If currently viewing a lesson, render the Classroom Reader View */}
      {activeLesson ? (
        <div className="space-y-8">
          {/* Back & Breadcrumb Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/10 text-xs font-mono">
            <button
              onClick={() => {
                setActiveLessonId(null);
                setIsExerciseSolutionVisible(false);
              }}
              className="flex items-center gap-1.5 text-neutral-600 hover:text-black font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Curriculum Index</span>
            </button>

            {/* Breadcrumb Info */}
            <div className="flex items-center gap-2 text-neutral-500">
              <span className="text-black font-bold">LESSON {activeLesson.lessonNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{activeLesson.estimatedDuration}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#111111]">
                {completedLessonIds.includes(activeLesson.id) ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
                  </span>
                ) : (
                  'In Progress'
                )}
              </span>
            </div>
          </div>

          {/* Main Lesson Split Layout: Sidebar Outline (Left) + Content (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Outline Navigation (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-black/10 rounded-xl p-5 shadow-xs sticky top-24 max-h-[82vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-800">
                  <BookOpen className="w-4 h-4 text-black" />
                  <span>CURRICULUM TREE</span>
                </div>
                <span className="text-xs font-mono text-neutral-500 tabular-nums">
                  {completedCount}/{totalLessons} done
                </span>
              </div>

              <div className="space-y-4">
                {CURRICULUM_MODULES.map((mod) => (
                  <div key={mod.id}>
                    <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Module {mod.moduleNumber}: {mod.title}
                    </h5>
                    <ul className="space-y-1">
                      {mod.lessons.map((lesson) => {
                        const isCurrent = lesson.id === activeLesson.id;
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <li key={lesson.id}>
                            <button
                              onClick={() => {
                                setActiveLessonId(lesson.id);
                                setIsExerciseSolutionVisible(false);
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                              }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                                isCurrent
                                  ? 'bg-black text-[#D4FF00] font-semibold'
                                  : 'hover:bg-neutral-100 text-neutral-700'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`font-mono text-[11px] ${isCurrent ? 'text-[#D4FF00]' : 'text-neutral-400'}`}>
                                  {lesson.lessonNumber}
                                </span>
                                <span className="truncate">{lesson.title}</span>
                              </div>
                              {isDone ? (
                                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-[#D4FF00]' : 'text-emerald-600'}`} />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Lesson Content (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-black/10 rounded-2xl p-6 sm:p-10 shadow-xs">
              {/* Lesson Title Header */}
              <div className="pb-6 border-b border-black/10 mb-8">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                  LESSON {activeLesson.lessonNumber} · {activeLesson.estimatedDuration}
                </span>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-[#111111] leading-tight">
                  {activeLesson.title}
                </h2>

                {/* Learning Objective Callout */}
                <div className="mt-4 p-4 bg-[#F8F7F2] rounded-xl border border-black/5 text-xs font-sans text-neutral-800 leading-relaxed flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-[#7928CA] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-mono text-black uppercase block mb-0.5">LEARNING OBJECTIVE:</strong>
                    <span>{activeLesson.learningObjective}</span>
                  </div>
                </div>
              </div>

              {/* Plain-Language Explanation */}
              <div className="mb-10 space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  CONCEPT EXPLANATION
                </h4>
                {activeLesson.plainLanguageExplanation.map((p, idx) => (
                  <p key={idx} className="text-sm text-neutral-700 leading-relaxed font-sans">
                    {p}
                  </p>
                ))}
              </div>

              {/* Example Concept (Good vs Bad) */}
              {activeLesson.exampleConcept && (
                <div className="mb-10 p-5 bg-neutral-50 rounded-xl border border-black/10">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 mb-2">
                    {activeLesson.exampleConcept.title}
                  </h4>
                  <p className="text-xs text-neutral-600 mb-4 font-sans leading-relaxed">
                    {activeLesson.exampleConcept.explanation}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    {activeLesson.exampleConcept.badExample && (
                      <div className="p-3 bg-red-50 text-red-900 rounded-lg border border-red-200">
                        <span className="font-bold text-red-800 block mb-1">❌ AMATEUR APPROACH</span>
                        <div className="whitespace-pre-wrap">{activeLesson.exampleConcept.badExample}</div>
                      </div>
                    )}
                    {activeLesson.exampleConcept.goodExample && (
                      <div className="p-3 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200">
                        <span className="font-bold text-emerald-800 block mb-1">✅ VIBECODER STANDARD</span>
                        <div className="whitespace-pre-wrap">{activeLesson.exampleConcept.goodExample}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Practical Steps */}
              <div className="mb-10">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-4">
                  PRACTICAL ACTION STEPS
                </h4>
                <div className="space-y-3">
                  {activeLesson.practicalSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-4 bg-white border border-black/10 rounded-xl flex items-start gap-3.5 shadow-xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-black text-[#D4FF00] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h5 className="font-display font-bold text-sm text-[#111111] mb-1">
                          {step.title}
                        </h5>
                        <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                          {step.instruction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copyable Prompt / Code Snippet */}
              {activeLesson.copyableSnippet && (
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                      {activeLesson.copyableSnippet.type === 'terminal' ? (
                        <Terminal className="w-3.5 h-3.5 text-neutral-600" />
                      ) : (
                        <Code className="w-3.5 h-3.5 text-neutral-600" />
                      )}
                      <span>{activeLesson.copyableSnippet.title}</span>
                    </span>

                    <button
                      onClick={() => copySnippet(activeLesson.copyableSnippet!.content, activeLesson.copyableSnippet!.title)}
                      className="flex items-center gap-1.5 text-xs font-mono text-neutral-700 hover:text-black font-semibold cursor-pointer transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </button>
                  </div>

                  <pre className="p-4 bg-[#111111] text-[#D4FF00] rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed border border-black shadow-xs">
                    {activeLesson.copyableSnippet.content}
                  </pre>
                </div>
              )}

              {/* Hands-On Exercise Box */}
              <div className="mb-10 p-5 bg-[#F8F7F2] rounded-xl border border-black/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-black uppercase mb-2">
                  <Sparkles className="w-4 h-4 text-[#7928CA]" />
                  <span>HANDS-ON EXERCISE</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-neutral-800 mb-2 font-sans">
                  {activeLesson.handsOnExercise.task}
                </p>
                <p className="text-xs text-neutral-500 mb-4 font-sans">
                  <strong>Hint:</strong> {activeLesson.handsOnExercise.hint}
                </p>

                <div className="pt-3 border-t border-black/10">
                  <button
                    onClick={() => setIsExerciseSolutionVisible(!isExerciseSolutionVisible)}
                    className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-700 hover:text-black cursor-pointer"
                  >
                    <span>{isExerciseSolutionVisible ? 'Hide Solution Prompt' : 'Reveal Solution Prompt'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExerciseSolutionVisible ? 'rotate-90' : ''}`} />
                  </button>

                  {isExerciseSolutionVisible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 p-3.5 bg-white rounded-lg border border-black/10 text-xs font-mono text-neutral-800 whitespace-pre-wrap leading-relaxed"
                    >
                      {activeLesson.handsOnExercise.solutionPrompt}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="mb-10 p-5 bg-red-50/50 rounded-xl border border-red-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-900 uppercase mb-3">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>COMMON MISTAKES BEGINNERS MAKE</span>
                </div>
                <ul className="space-y-2">
                  {activeLesson.commonMistakes.map((mistake, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2 text-xs text-red-950 font-sans leading-relaxed">
                      <span className="text-red-600 font-bold">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Completion Checklist */}
              <div className="mb-10 p-5 bg-white rounded-xl border border-black/15 shadow-xs">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>COMPLETION CRITERIA CHECKLIST</span>
                </h4>
                <ul className="space-y-2">
                  {activeLesson.completionChecklist.map((item, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-2 text-xs text-neutral-700 font-sans">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official Documentation Links */}
              {activeLesson.officialDocLinks.length > 0 && (
                <div className="mb-10 pt-4 border-t border-black/10">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-3">
                    VERIFIED OFFICIAL DOCUMENTATION
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeLesson.officialDocLinks.map((doc, dIdx) => (
                      <a
                        key={dIdx}
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-mono transition-colors"
                      >
                        <span>{doc.title} ({doc.source})</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Lesson Completion Action & Pagination */}
              <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onToggleCompleteLesson(activeLesson.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    completedLessonIds.includes(activeLesson.id)
                      ? 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
                      : 'bg-black text-[#D4FF00] hover:bg-neutral-800 shadow-md'
                  }`}
                >
                  {completedLessonIds.includes(activeLesson.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Lesson Completed (Click to undo)</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-[#D4FF00]" />
                      <span>Mark Lesson as Complete</span>
                    </>
                  )}
                </button>

                {/* Previous / Next buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToLesson('prev')}
                    disabled={activeLessonIndex === 0}
                    className="flex items-center gap-1 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-mono transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => goToLesson('next')}
                    disabled={activeLessonIndex === allLessons.length - 1}
                    className="flex items-center gap-1 px-4 py-2 bg-black text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-mono transition-colors cursor-pointer"
                  >
                    <span>Next Lesson</span>
                    <ChevronRight className="w-4 h-4 text-[#D4FF00]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Curriculum Index / Catalog View */
        <div>
          {/* Header & Metrics */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">
                <span>02. CURRICULUM</span>
                <span aria-hidden="true">/</span>
                <span>STRUCTURED LEARNING PATHS (MODULES 1–9)</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-[#111111] uppercase text-balance">
                Learn the craft. Not just the prompts.
              </h2>
              <p className="mt-3 text-base text-neutral-600 max-w-2xl font-sans leading-relaxed">
                A structured 9-module curriculum for builders who want to author real software instead of relying on luck. Master technical planning, prompt architecture, design systems, debugging, and production shipping.
              </p>
            </div>

            {/* Progress Gauge */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-black/10 shrink-0 shadow-xs">
              <div className="text-right">
                <span className="text-2xl font-mono font-bold text-[#111111] tabular-nums block">
                  {overallPercentage}%
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {completedCount} OF {totalLessons} LESSONS
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-black/10 relative flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-4 border-[#D4FF00]"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${overallPercentage > 25 ? '100% 0%,' : ''} ${
                      overallPercentage > 50 ? '100% 100%,' : ''
                    } ${overallPercentage > 75 ? '0% 100%,' : ''} 0% 0%)`
                  }}
                />
                <BookOpen className="w-5 h-5 text-neutral-700" />
              </div>
            </div>
          </div>

          {/* Local Storage Transparency Notice (Anti-Slop honest communication) */}
          <div className="p-4 bg-white border border-black/10 rounded-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-600 shadow-xs">
            <div className="flex items-center gap-3">
              <HardDrive className="w-4 h-4 text-black shrink-0" />
              <span>
                <strong>Guest Learning Persistence:</strong> Your lesson completions are saved directly in this browser&apos;s LocalStorage. No account required. If you clear browser cache or switch devices, use &quot;Backup JSON&quot; in Workspace to export your progress.
              </span>
            </div>
          </div>

          {/* Search & Module Filter Toolbar */}
          <div className="bg-white border border-black/10 rounded-xl p-4 sm:p-5 mb-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lessons by topic (e.g. Prompt, DevTools, Console, RLS, Stripe)..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-black/10 rounded-lg text-[#111111] placeholder:text-neutral-400 outline-hidden focus:border-black focus:bg-white font-sans transition-all"
                />
              </div>

              {/* Module Filter */}
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-4 h-4 text-neutral-400 hidden sm:block" />
                <select
                  value={selectedModuleFilter}
                  onChange={(e) => setSelectedModuleFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="px-3 py-2 text-xs font-mono bg-neutral-50 border border-black/10 rounded-lg text-neutral-800 outline-hidden focus:border-black cursor-pointer"
                >
                  <option value="all">All Modules (1 to 9)</option>
                  {CURRICULUM_MODULES.map((m) => (
                    <option key={m.id} value={m.moduleNumber}>
                      Module {m.moduleNumber}: {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Module Catalog Grid */}
          <div className="space-y-6">
            {filteredModules.map((module) => {
              const moduleLessons = module.lessons;
              const moduleCompleted = moduleLessons.filter((l) => completedLessonIds.includes(l.id)).length;
              const isModuleDone = moduleLessons.length > 0 && moduleCompleted === moduleLessons.length;

              return (
                <div
                  key={module.id}
                  className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 hover:border-black/30 transition-all shadow-xs"
                >
                  {/* Module Header Bar */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-black/10 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-1">
                        <span className="font-bold text-black uppercase">MODULE 0{module.moduleNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{module.estimatedEffort}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{moduleCompleted}/{moduleLessons.length} done</span>
                      </div>

                      <h3 className="font-display font-black text-xl sm:text-2xl text-[#111111]">
                        {module.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                        {module.tagline}
                      </p>
                    </div>

                    {isModuleDone && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-mono font-semibold shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  {/* Prerequisites & Outcomes Strip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#F8F7F2] rounded-xl border border-black/5 mb-6 text-xs font-sans">
                    <div>
                      <span className="font-mono font-bold text-neutral-700 uppercase block mb-1">
                        PREREQUISITES:
                      </span>
                      <p className="text-neutral-600">{module.prerequisites.join(' · ')}</p>
                    </div>
                    <div>
                      <span className="font-mono font-bold text-neutral-700 uppercase block mb-1">
                        CORE OUTCOMES:
                      </span>
                      <p className="text-neutral-600">{module.learningOutcomes.slice(0, 2).join(' · ')}</p>
                    </div>
                  </div>

                  {/* Lessons List in Module */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                      LESSONS IN THIS MODULE:
                    </span>
                    {moduleLessons.map((lesson) => {
                      const isDone = completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            setActiveLessonId(lesson.id);
                            setIsExerciseSolutionVisible(false);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className="p-3.5 sm:p-4 rounded-xl border border-black/5 hover:border-black/20 hover:bg-neutral-50 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Checkpoint Icon */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleCompleteLesson(lesson.id);
                              }}
                              className="text-neutral-300 hover:text-black transition-colors cursor-pointer p-0.5 shrink-0"
                              title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-black fill-[#D4FF00]" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                                <span>{lesson.lessonNumber}</span>
                                <span aria-hidden="true">·</span>
                                <span>{lesson.estimatedDuration}</span>
                              </div>
                              <h4
                                className={`text-sm font-bold truncate group-hover:text-black transition-colors ${
                                  isDone ? 'line-through text-neutral-400' : 'text-[#111111]'
                                }`}
                              >
                                {lesson.title}
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-mono text-neutral-400 group-hover:text-black transition-colors hidden sm:inline">
                              Start Lesson
                            </span>
                            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:text-black transition-all" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
