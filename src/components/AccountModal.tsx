import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, HardDrive, CloudOff, Cloud, Check, Download, AlertTriangle } from 'lucide-react';
import { WorkspaceData } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspace: WorkspaceData;
  onUpdateUserName: (name: string) => void;
  onExportJson: () => void;
  onResetWorkspace: () => void;
  onShowToast: (title: string, description?: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  workspace,
  onUpdateUserName,
  onExportJson,
  onResetWorkspace,
  onShowToast
}) => {
  const [nameInput, setNameInput] = useState(workspace.userName);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    onUpdateUserName(nameInput.trim());
    setIsSaved(true);
    onShowToast('Profile updated', `Builder name set to "${nameInput.trim()}".`);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#F8F7F2] border border-black/20 rounded-xl shadow-2xl p-6 sm:p-8 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-black text-[#D4FF00] rounded-lg">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xl text-[#121212]">
                  Builder Account & Storage
                </h3>
                <p className="text-xs font-mono text-neutral-500">
                  WORKSPACE PROFILE & DATA PERSISTENCE
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-black cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Builder Profile Form */}
          <form onSubmit={handleSaveProfile} className="mb-6">
            <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
              Builder Handle / Alias
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. CyberVibecoder"
                className="flex-1 text-sm p-2.5 bg-white border border-black/10 rounded-lg outline-hidden focus:border-black font-sans"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-mono font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isSaved ? <Check className="w-3.5 h-3.5 text-[#D4FF00]" /> : null}
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </form>

          {/* Storage Architecture Breakdown (Honest Transparency) */}
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-white rounded-xl border border-black/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-neutral-800 flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-black" />
                  <span>LOCAL-FIRST ENGINE (ACTIVE)</span>
                </span>
                <span className="text-[11px] font-mono text-[#121212] font-semibold bg-[#D4FF00] px-2 py-0.5 rounded">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                All your project boards, saved prompt templates, bookmarked tools, and curriculum progress are stored directly inside this browser&apos;s LocalStorage. No account or password required.
              </p>
            </div>

            <div className="p-4 bg-neutral-100/70 rounded-xl border border-black/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-neutral-700 flex items-center gap-1.5">
                  <CloudOff className="w-4 h-4 text-neutral-500" />
                  <span>MULTI-DEVICE CLOUD SYNC</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  OPTIONAL INTEGRATION
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Notice: To keep Vibe101 100% private and tracker-free, local data does not sync automatically across multiple separate devices unless exported. Use the &quot;Backup JSON&quot; button below to transfer your workspace.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-6 p-3 bg-white rounded-xl border border-black/5 text-center text-xs font-mono">
            <div>
              <span className="text-neutral-400 block text-[10px]">PROJECTS</span>
              <span className="font-bold text-base text-[#121212]">{workspace.projects.length}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px]">BOOKMARKS</span>
              <span className="font-bold text-base text-[#121212]">{workspace.bookmarkedToolIds.length}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px]">LESSONS DONE</span>
              <span className="font-bold text-base text-[#121212]">{workspace.completedGuideStepIds.length}</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-black/10">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset your local workspace to default demo data?')) {
                  onResetWorkspace();
                  onShowToast('Workspace reset to defaults');
                  onClose();
                }
              }}
              className="text-xs font-mono text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              onClick={onExportJson}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#D4FF00] text-black font-semibold text-xs font-mono rounded-lg hover:bg-[#c5ec00] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Backup JSON</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
