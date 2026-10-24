import { useState, useEffect, useCallback } from 'react';
import { UserProject, WorkspaceData, VibecodingTool } from '../types';

const STORAGE_KEY = 'vibe101_workspace_v1';

const DEFAULT_WORKSPACE: WorkspaceData = {
  projects: [
    {
      id: 'demo-p1',
      title: 'SoundPulse Studio',
      description: 'An ambient audio synthesizer for deep work sessions with visual audio frequency feedback.',
      status: 'Building',
      targetAudience: 'Knowledge workers, programmers, and students needing binaural concentration audio.',
      stack: ['React 19', 'Web Audio API', 'HTML5 Canvas', 'Tailwind CSS v4'],
      notes: 'Implemented the AudioContext oscillator and theta frequency generator. Next step: add canvas FFT visualizer.',
      promptsUsed: [
        'Create a Web Audio manager playing binaural beats at 432Hz with an adjustable difference frequency.',
        'Build a glowing neon lime canvas audio waveform responding to volume changes.'
      ],
      createdAt: '2026-10-20T10:00:00.000Z',
      updatedAt: '2026-10-22T08:30:00.000Z'
    },
    {
      id: 'demo-p2',
      title: 'VibeFlow MCP Server',
      description: 'A local Postgres MCP tool providing instant schema introspection and migration generators.',
      status: 'Prompting',
      targetAudience: 'Autonomous agents running in Cursor and Claude Dev.',
      stack: ['TypeScript', 'Model Context Protocol (MCP)', 'PostgreSQL', 'Docker'],
      notes: 'Drafted the MCP protocol handshake. Need to test with Cursor Composer.',
      promptsUsed: [
        'Architect a Model Context Protocol server exposing tools to inspect database schemas and run safe read-only queries.'
      ],
      createdAt: '2026-10-21T14:00:00.000Z',
      updatedAt: '2026-10-22T02:15:00.000Z'
    }
  ],
  bookmarkedToolIds: ['cursor', 'lovable', 'gemini-flash', 'tailwind-css', 'motion'],
  savedPromptIds: ['app-scaffolding', 'bug-debugging', 'anti-slop-ui'],
  completedGuideStepIds: ['novice-1', 'novice-2'],
  userName: 'Anonymous Vibecoder',
  lastActive: new Date().toISOString()
};

export function useWorkspace() {
  const [data, setData] = useState<WorkspaceData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_WORKSPACE,
          ...parsed,
          projects: parsed.projects || DEFAULT_WORKSPACE.projects,
          bookmarkedToolIds: parsed.bookmarkedToolIds || DEFAULT_WORKSPACE.bookmarkedToolIds,
          savedPromptIds: parsed.savedPromptIds || DEFAULT_WORKSPACE.savedPromptIds,
          completedGuideStepIds: parsed.completedGuideStepIds || DEFAULT_WORKSPACE.completedGuideStepIds
        };
      }
    } catch (e) {
      console.warn('Failed to parse workspace from localStorage:', e);
    }
    return DEFAULT_WORKSPACE;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save workspace to localStorage:', e);
    }
  }, [data]);

  // Project management
  const addProject = useCallback((project: Omit<UserProject, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: UserProject = {
      ...project,
      id: 'proj_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
      lastActive: new Date().toISOString()
    }));
    return newProject;
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Omit<UserProject, 'id' | 'createdAt'>>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      ),
      lastActive: new Date().toISOString()
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
      lastActive: new Date().toISOString()
    }));
  }, []);

  // Bookmarking tools
  const toggleBookmarkTool = useCallback((toolId: string) => {
    setData((prev) => {
      const exists = prev.bookmarkedToolIds.includes(toolId);
      const nextBookmarks = exists
        ? prev.bookmarkedToolIds.filter((id) => id !== toolId)
        : [...prev.bookmarkedToolIds, toolId];
      return {
        ...prev,
        bookmarkedToolIds: nextBookmarks,
        lastActive: new Date().toISOString()
      };
    });
  }, []);

  // Saving prompt templates
  const toggleSavePrompt = useCallback((promptId: string) => {
    setData((prev) => {
      const exists = prev.savedPromptIds.includes(promptId);
      const nextPrompts = exists
        ? prev.savedPromptIds.filter((id) => id !== promptId)
        : [...prev.savedPromptIds, promptId];
      return {
        ...prev,
        savedPromptIds: nextPrompts,
        lastActive: new Date().toISOString()
      };
    });
  }, []);

  // Guide completion toggle
  const toggleCompleteGuideStep = useCallback((stepId: string) => {
    setData((prev) => {
      const completed = prev.completedGuideStepIds.includes(stepId);
      const nextSteps = completed
        ? prev.completedGuideStepIds.filter((id) => id !== stepId)
        : [...prev.completedGuideStepIds, stepId];
      return {
        ...prev,
        completedGuideStepIds: nextSteps,
        lastActive: new Date().toISOString()
      };
    });
  }, []);

  // Update profile name
  const setUserName = useCallback((name: string) => {
    setData((prev) => ({ ...prev, userName: name }));
  }, []);

  // Export / Import
  const exportWorkspaceJson = useCallback(() => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `vibe101_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [data]);

  const importWorkspaceJson = useCallback((jsonContent: string) => {
    try {
      const parsed = JSON.parse(jsonContent);
      if (Array.isArray(parsed.projects)) {
        setData({
          projects: parsed.projects || [],
          bookmarkedToolIds: parsed.bookmarkedToolIds || [],
          savedPromptIds: parsed.savedPromptIds || [],
          completedGuideStepIds: parsed.completedGuideStepIds || [],
          customTools: parsed.customTools || [],
          userName: parsed.userName || 'Imported Vibecoder',
          lastActive: new Date().toISOString()
        });
        return { success: true, count: parsed.projects.length };
      }
      return { success: false, error: 'Invalid JSON format: missing projects array' };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }, []);

  const resetWorkspace = useCallback(() => {
    setData(DEFAULT_WORKSPACE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Custom tools management
  const addCustomTool = useCallback((tool: Omit<VibecodingTool, 'id'> & { id?: string }) => {
    const id = tool.id || 'custom_' + Math.random().toString(36).substring(2, 9);
    const newTool: VibecodingTool = {
      ...tool,
      id,
      customUserAdded: true,
      verificationStatus: tool.verificationStatus || 'community_reviewed',
      lastVerifiedDate: tool.lastVerifiedDate || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
    };
    setData((prev) => ({
      ...prev,
      customTools: [newTool, ...(prev.customTools || []).filter((t) => t.id !== id)],
      lastActive: new Date().toISOString()
    }));
    return newTool;
  }, []);

  const deleteCustomTool = useCallback((toolId: string) => {
    setData((prev) => ({
      ...prev,
      customTools: (prev.customTools || []).filter((t) => t.id !== toolId),
      bookmarkedToolIds: prev.bookmarkedToolIds.filter((id) => id !== toolId),
      lastActive: new Date().toISOString()
    }));
  }, []);

  return {
    workspace: data,
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
  };
}
