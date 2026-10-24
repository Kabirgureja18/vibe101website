import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderKanban, Plus, Download, Upload, Trash2, CheckCircle2, 
  ExternalLink, Copy, Bookmark, BookmarkCheck, ArrowRight, X, Sparkles, AlertCircle
} from 'lucide-react';
import { UserProject, WorkspaceData } from '../types';
import { TOOLS_DIRECTORY } from '../data/tools';
import { PROMPT_TEMPLATES } from '../data/prompts';

interface WorkspaceTrackerProps {
  workspace: WorkspaceData;
  onAddProject: (project: Omit<UserProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateProject: (id: string, updates: Partial<Omit<UserProject, 'id' | 'createdAt'>>) => void;
  onDeleteProject: (id: string) => void;
  onToggleBookmarkTool: (toolId: string) => void;
  onToggleSavePrompt: (promptId: string) => void;
  onExportJson: () => void;
  onImportJson: (content: string) => { success: boolean; error?: string; count?: number };
  onResetWorkspace: () => void;
  onShowToast: (title: string, description?: string) => void;
}

const STAGES: ('Idea' | 'Prompting' | 'Building' | 'Debugging' | 'Shipped')[] = [
  'Idea',
  'Prompting',
  'Building',
  'Debugging',
  'Shipped'
];

export const WorkspaceTracker: React.FC<WorkspaceTrackerProps> = ({
  workspace,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onToggleBookmarkTool,
  onToggleSavePrompt,
  onExportJson,
  onImportJson,
  onResetWorkspace,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'bookmarks' | 'prompts'>('projects');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState<'Idea' | 'Prompting' | 'Building' | 'Debugging' | 'Shipped'>('Idea');
  const [newAudience, setNewAudience] = useState('');
  const [newStack, setNewStack] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      onShowToast('Title required', 'Please provide a project name.');
      return;
    }

    onAddProject({
      title: newTitle.trim(),
      description: newDescription.trim() || 'No description provided.',
      status: newStatus,
      targetAudience: newAudience.trim() || 'General web users',
      stack: newStack.split(',').map((s) => s.trim()).filter(Boolean),
      notes: newNotes.trim(),
      promptsUsed: []
    });

    onShowToast('Project created', `"${newTitle}" added to your workspace tracker.`);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewAudience('');
    setNewStack('');
    setNewNotes('');
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = onImportJson(content);
      if (res.success) {
        onShowToast('Workspace imported successfully', `Loaded ${res.count} projects into your workspace.`);
      } else {
        onShowToast('Import failed', res.error || 'Could not parse JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Resolved bookmarked tools
  const allAvailableTools = [...(workspace.customTools || []), ...TOOLS_DIRECTORY];
  const bookmarkedTools = allAvailableTools.filter((t) =>
    workspace.bookmarkedToolIds.includes(t.id)
  );

  // Resolved saved prompts
  const savedPrompts = PROMPT_TEMPLATES.filter((p) =>
    workspace.savedPromptIds.includes(p.id)
  );

  return (
    <section id="workspace" className="py-20 px-6 max-w-7xl mx-auto border-t border-black/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">
            <span>07. WORKSPACE</span>
            <span aria-hidden="true">/</span>
            <span>PERSONAL VIBECODING TRACKER</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-[#121212] uppercase text-balance">
            Turn side quests into shipped projects.
          </h2>
          <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
            Track your autonomous software builds from spark to deployment. 100% local-first storage with portable JSON exports.
          </p>
        </div>

        {/* Action Buttons: Add Project & Data Operations */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4FF00] text-black font-semibold rounded-lg hover:bg-[#c5ec00] transition-transform active:scale-95 cursor-pointer shadow-xs text-xs font-mono"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>New Project</span>
          </button>

          <button
            onClick={onExportJson}
            className="flex items-center gap-1.5 px-3 py-2 bg-white text-neutral-700 hover:text-black border border-black/10 rounded-lg hover:border-black/30 transition-colors cursor-pointer text-xs font-mono"
            title="Download workspace backup as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup JSON</span>
          </button>

          <label className="flex items-center gap-1.5 px-3 py-2 bg-white text-neutral-700 hover:text-black border border-black/10 rounded-lg hover:border-black/30 transition-colors cursor-pointer text-xs font-mono">
            <Upload className="w-3.5 h-3.5" />
            <span>Import JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Local-First Architecture Notice (Anti-slop, honest disclosure) */}
      <div className="p-4 bg-[#F8F7F2] border border-black/10 rounded-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-600">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] border border-black shrink-0" />
          <span>
            <strong>Local-First Storage:</strong> Saved strictly on this browser. Zero telemetry or server syncing.
          </span>
        </div>
        <div className="text-neutral-500">
          Last active: {new Date(workspace.lastActive).toLocaleDateString()}
        </div>
      </div>

      {/* Sub-Tabs: Projects | Bookmarked Stack | Saved Prompts */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer border ${
            activeTab === 'projects'
              ? 'bg-black text-white border-black'
              : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
          }`}
        >
          My Projects ({workspace.projects.length})
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer border ${
            activeTab === 'bookmarks'
              ? 'bg-black text-white border-black'
              : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
          }`}
        >
          Bookmarked Tools ({bookmarkedTools.length})
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer border ${
            activeTab === 'prompts'
              ? 'bg-black text-white border-black'
              : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
          }`}
        >
          Saved Prompts ({savedPrompts.length})
        </button>
      </div>

      {/* Tab 1: Project Kanban Tracker */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {workspace.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspace.projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-black/10 rounded-xl p-6 flex flex-col justify-between hover:border-black/30 transition-all shadow-xs"
                >
                  <div>
                    {/* Header with Stage Dropdown */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <select
                        value={project.status}
                        onChange={(e) =>
                          onUpdateProject(project.id, {
                            status: e.target.value as any
                          })
                        }
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border outline-hidden cursor-pointer ${
                          project.status === 'Shipped'
                            ? 'bg-[#121212] text-[#D4FF00] border-black'
                            : project.status === 'Debugging'
                            ? 'bg-red-50 text-red-900 border-red-200'
                            : project.status === 'Building'
                            ? 'bg-[#F8F7F2] text-[#121212] border-black/20'
                            : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                        }`}
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${project.title}"?`)) {
                            onDeleteProject(project.id);
                            onShowToast('Project deleted', project.title);
                          }
                        }}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#121212] mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Stack */}
                    {project.stack.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-neutral-500 mb-4">
                        {project.stack.map((s, idx) => (
                          <span key={idx} className="flex items-center gap-1.5">
                            <span>{s}</span>
                            {idx < project.stack.length - 1 && <span>·</span>}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Editable Notes Field */}
                    <div className="mt-3">
                      <span className="text-[11px] font-mono font-bold uppercase text-neutral-400 block mb-1">
                        Dev Notes & Next Prompt:
                      </span>
                      <textarea
                        rows={3}
                        value={project.notes}
                        onChange={(e) =>
                          onUpdateProject(project.id, { notes: e.target.value })
                        }
                        placeholder="Log what you are currently directing the AI to do..."
                        className="w-full text-xs font-mono p-2.5 bg-[#F8F7F2] border border-black/5 rounded-lg text-neutral-800 outline-hidden focus:border-black/20 focus:bg-white resize-none transition-all leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>Target: {project.targetAudience}</span>
                    <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white border border-black/10 rounded-xl p-8">
              <FolderKanban className="w-10 h-10 mx-auto text-neutral-400 mb-3" />
              <h3 className="font-display font-bold text-lg text-[#121212]">
                Your workspace is empty
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 mb-5">
                Add your first vibecoding project or clone one of the production blueprints above.
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Create First Project
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Bookmarked Tools */}
      {activeTab === 'bookmarks' && (
        <div>
          {bookmarkedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white border border-black/10 rounded-xl p-6 flex flex-col justify-between hover:border-black/30 transition-all shadow-xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="text-xs font-mono text-neutral-500">
                        {tool.category} · {tool.pricing}
                      </div>
                      <button
                        onClick={() => onToggleBookmarkTool(tool.id)}
                        className="text-[#121212] hover:text-neutral-500 transition-colors cursor-pointer p-1"
                        title="Remove bookmark"
                      >
                        <BookmarkCheck className="w-4 h-4 fill-[#D4FF00]" />
                      </button>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#121212]">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1 mb-3 leading-relaxed">
                      {tool.tagline}
                    </p>
                    <p className="text-xs text-neutral-500 font-mono mb-4">
                      {tool.bestFor}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-500">Vibe Rating: {tool.vibeRating}/5</span>
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-black font-semibold hover:underline"
                    >
                      <span>Open Tool</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white border border-black/10 rounded-xl p-8">
              <Bookmark className="w-10 h-10 mx-auto text-neutral-400 mb-3" />
              <h3 className="font-display font-bold text-lg text-[#121212]">
                No bookmarked tools yet
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
                Browse the Tools Directory and star the editors and frameworks you use in your workflow.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Prompts */}
      {activeTab === 'prompts' && (
        <div>
          {savedPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedPrompts.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="bg-white border border-black/10 rounded-xl p-6 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-neutral-400 uppercase">
                        {tmpl.category}
                      </span>
                      <button
                        onClick={() => onToggleSavePrompt(tmpl.id)}
                        className="text-[#121212] hover:text-neutral-500 cursor-pointer p-1"
                        title="Remove from saved prompts"
                      >
                        <BookmarkCheck className="w-4 h-4 fill-[#D4FF00]" />
                      </button>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#121212] mb-1.5">
                      {tmpl.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-sans">
                      {tmpl.intent}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(tmpl.templateText);
                        onShowToast('Prompt copied!', tmpl.title);
                      }}
                      className="flex items-center gap-1.5 text-xs font-mono font-semibold text-black bg-[#D4FF00] px-3 py-1.5 rounded hover:bg-[#c4eb00] cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white border border-black/10 rounded-xl p-8">
              <Sparkles className="w-10 h-10 mx-auto text-neutral-400 mb-3" />
              <h3 className="font-display font-bold text-lg text-[#121212]">
                No saved prompts yet
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
                Open the Prompt Lab to save your customized prompt recipes for instant access.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create New Project Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#F8F7F2] border border-black/20 rounded-xl shadow-2xl p-6 sm:p-8 z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
                <h3 className="font-display font-extrabold text-xl text-[#121212]">
                  Add New Vibecoding Project
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-neutral-400 hover:text-black cursor-pointer p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. AmbientSynth Studio"
                    className="w-full text-sm p-2.5 bg-white border border-black/10 rounded-lg outline-hidden focus:border-black font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                      Current Stage
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-white border border-black/10 rounded-lg outline-hidden focus:border-black font-mono"
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      value={newAudience}
                      onChange={(e) => setNewAudience(e.target.value)}
                      placeholder="e.g. Designers, Students"
                      className="w-full text-xs p-2.5 bg-white border border-black/10 rounded-lg outline-hidden focus:border-black font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="What problem does this app solve?"
                    className="w-full text-xs p-2.5 bg-white border border-black/10 rounded-lg outline-hidden focus:border-black font-sans resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newStack}
                    onChange={(e) => setNewStack(e.target.value)}
                    placeholder="React, TypeScript, Tailwind, Supabase"
                    className="w-full text-xs p-2.5 bg-white border border-black/10 rounded-lg outline-hidden focus:border-black font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                    Initial Dev Notes
                  </label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Next steps, prompts to feed, or known bugs..."
                    className="w-full text-xs p-2.5 bg-white border border-black/10 rounded-lg outline-hidden focus:border-black font-mono resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono text-neutral-600 hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#D4FF00] text-black font-semibold text-xs font-mono rounded-lg hover:bg-[#c5ec00] transition-colors cursor-pointer"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
