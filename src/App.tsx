import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CurriculumGuide } from './components/CurriculumGuide';
import { ToolsDirectory } from './components/ToolsDirectory';
import { PromptLab } from './components/PromptLab';
import { DesignReferences } from './components/DesignReferences';
import { ProjectBlueprints } from './components/ProjectBlueprints';
import { WorkspaceTracker } from './components/WorkspaceTracker';
import { VibecodingChat } from './components/VibecodingChat';
import { ColophonCredits } from './components/ColophonCredits';
import { CommandPalette } from './components/CommandPalette';
import { AccountModal } from './components/AccountModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { useWorkspace } from './hooks/useWorkspace';
import { useRouter, AppRoute } from './hooks/useRouter';
import { ProjectBlueprint } from './types';

export default function App() {
  const { currentPath, navigate } = useRouter();
  const {
    workspace,
    addProject,
    updateProject,
    deleteProject,
    toggleBookmarkTool,
    toggleSavePrompt,
    toggleCompleteGuideStep,
    addCustomTool,
    deleteCustomTool,
    setUserName,
    exportWorkspaceJson,
    importWorkspaceJson,
    resetWorkspace
  } = useWorkspace();

  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [splineUrl, setSplineUrl] = useState<string>(
    'https://app.spline.design/file/864e2836-2ee3-4f61-aa7d-994c8ae5b816'
  );

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Notification Manager
  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Tool Profile routing bridge
  const handleOpenToolProfile = (toolId: string) => {
    setSelectedToolId(toolId);
    navigate('/tools');
  };

  // Command Palette Item Selection Router
  const handleCommandSelectItem = (
    type: 'guide' | 'tool' | 'prompt' | 'blueprint' | 'section',
    id: string
  ) => {
    if (type === 'section') {
      navigate(id);
    } else if (type === 'guide') {
      navigate('/guide');
    } else if (type === 'tool') {
      handleOpenToolProfile(id);
    } else if (type === 'prompt') {
      navigate('/prompts');
    } else if (type === 'blueprint') {
      navigate('/blueprints');
    }
  };

  // Blueprint -> Workspace Project Creation Bridge
  const handleStartBlueprintInWorkspace = (blueprint: ProjectBlueprint) => {
    addProject({
      title: blueprint.title,
      description: blueprint.description,
      status: 'Idea',
      targetAudience: 'Early adopters & internet users',
      stack: blueprint.stack,
      notes: `Initiated from Vibe101 Blueprint. Build time: ${blueprint.timeToBuild}. Initial checkpoint: ${blueprint.phases[0]?.checkpoint || 'Start development'}`,
      promptsUsed: blueprint.phases[0]?.prompts || []
    });
    navigate('/workspace');
    showToast('Blueprint added to workspace', `Created project "${blueprint.title}".`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#121212] selection:bg-[#D4FF00] selection:text-black">
      {/* 3-Zone Strict Top Bar Header synchronized with multi-page routes */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenWorkspace={() => navigate('/workspace')}
        projectsCount={workspace.projects.length}
      />

      {/* Main Multi-Page Route Outlet */}
      <main className="flex-1">
        {currentPath === '/' && (
          <HomeView
            onNavigate={navigate}
            splineUrl={splineUrl}
            onSplineUrlChange={setSplineUrl}
            onShowToast={showToast}
          />
        )}

        {currentPath === '/guide' && (
          <CurriculumGuide
            completedLessonIds={workspace.completedGuideStepIds}
            onToggleCompleteLesson={toggleCompleteGuideStep}
            onShowToast={showToast}
          />
        )}

        {currentPath === '/tools' && (
          <ToolsDirectory
            bookmarkedToolIds={workspace.bookmarkedToolIds}
            onToggleBookmark={(toolId) => {
              toggleBookmarkTool(toolId);
              const isBookmarked = workspace.bookmarkedToolIds.includes(toolId);
              showToast(
                isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarked stack',
                undefined,
                'info'
              );
            }}
            customTools={workspace.customTools}
            onAddCustomTool={addCustomTool}
            onDeleteCustomTool={deleteCustomTool}
            selectedToolId={selectedToolId}
            onSelectTool={setSelectedToolId}
            onShowToast={showToast}
          />
        )}

        {currentPath === '/prompts' && (
          <PromptLab
            savedPromptIds={workspace.savedPromptIds}
            onToggleSavePrompt={(promptId) => {
              toggleSavePrompt(promptId);
              const isSaved = workspace.savedPromptIds.includes(promptId);
              showToast(
                isSaved ? 'Removed from saved templates' : 'Saved template to workspace',
                undefined,
                'info'
              );
            }}
            onShowToast={showToast}
          />
        )}

        {currentPath === '/references' && (
          <DesignReferences onShowToast={showToast} />
        )}

        {currentPath === '/blueprints' && (
          <ProjectBlueprints
            onStartProject={handleStartBlueprintInWorkspace}
            onShowToast={showToast}
          />
        )}

        {currentPath === '/workspace' && (
          <WorkspaceTracker
            workspace={workspace}
            onAddProject={addProject}
            onUpdateProject={updateProject}
            onDeleteProject={deleteProject}
            onToggleBookmarkTool={toggleBookmarkTool}
            onToggleSavePrompt={toggleSavePrompt}
            onExportJson={() => {
              exportWorkspaceJson();
              showToast('Backup JSON downloaded', 'Your local workspace was saved.');
            }}
            onImportJson={importWorkspaceJson}
            onResetWorkspace={resetWorkspace}
            onShowToast={showToast}
          />
        )}

        {currentPath === '/chat' && (
          <VibecodingChat />
        )}
      </main>

      {/* Site-Wide Colophon & Design Credits outside the hero */}
      <ColophonCredits
        onNavigate={navigate}
        onOpenToolProfile={handleOpenToolProfile}
      />

      {/* Global Command Menu (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectItem={handleCommandSelectItem}
      />

      {/* Optional User Accounts & Local-First Storage Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        workspace={workspace}
        onUpdateUserName={setUserName}
        onExportJson={exportWorkspaceJson}
        onResetWorkspace={resetWorkspace}
        onShowToast={showToast}
      />

      {/* Interactive Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
