export type LearningPathId = 
  | 'novice' 
  | 'ai-web' 
  | 'frontend-ui' 
  | 'prompt-eng' 
  | 'debug-test' 
  | 'deploy-prod';

export interface GuideStep {
  id: string;
  title: string;
  summary: string;
  duration: string;
  category: 'Mindset' | 'Tooling' | 'Prompting' | 'Architecture' | 'Debugging' | 'Shipping';
  content: string[];
  keyTakeaways: string[];
  vibeLaw?: string;
  suggestedPrompt?: string;
  terminalSnippet?: string;
}

export interface LearningPath {
  id: LearningPathId;
  title: string;
  tagline: string;
  targetAudience: string;
  estimatedHours: string;
  stepsCount: number;
  description: string;
  icon: string;
  steps: GuideStep[];
}

export type ToolCategory =
  | 'AI Assistants & App Builders'
  | 'Design & Inspiration'
  | 'Animation, 3D & Components'
  | 'Backend, Database & Auth'
  | 'Deployment & Cloud Hosting'
  | 'AI IDE & Code Editor'
  | 'Autonomous Agent'
  | 'Frontend Generator'
  | 'Model & Provider'
  | 'Backend & DB'
  | 'Deployment & Infra'
  | 'Design & Creative';

export type ToolVerificationStatus = 'verified' | 'preview' | 'community_reviewed';

export interface VibecodingTool {
  id: string;
  name: string;
  tagline: string;
  category: ToolCategory | string;
  pricing: 'Free / Open Source' | 'Freemium' | 'Subscription' | 'Pay-per-token' | 'Commercial License';
  pricingDetail?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  websiteUrl: string;
  docsUrl?: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  bestUseCases?: string[];
  capabilities?: string[];
  integrations?: string[];
  limitations?: string[];
  alternatives?: string[]; // IDs or names of alternative tools
  vibeRating: number; // 1 to 5
  quickTip: string;
  verificationStatus?: ToolVerificationStatus;
  lastVerifiedDate?: string;
  isBuiltWith?: boolean;
  isInspiredBy?: boolean;
  builtWithDescription?: string;
  inspiredByDescription?: string;
  customUserAdded?: boolean;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Architecture & Scaffolding' | 'Bug Fixing & Debug' | 'Anti-Slop UI Styling' | 'System & Cursor Rules' | 'Auth & Databases' | 'Refactoring';
  intent: string;
  variables: {
    key: string;
    label: string;
    placeholder: string;
    defaultValue: string;
  }[];
  templateText: string;
  proTip: string;
  outputExpectation: string;
}

export interface DesignStyle {
  id: string;
  name: string;
  vibe: string;
  characteristics: string[];
  bestUseCases: string[];
  avoidWhen: string;
  cssRuleSnippet: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  theme: string;
  colors: {
    name: string;
    hex: string;
    usage: string;
  }[];
}

export interface AnimationRecipe {
  id: string;
  name: string;
  category: 'Reveal' | 'Interaction' | 'Background' | 'Typography';
  description: string;
  codeSnippet: string;
  previewType: 'button' | 'stagger' | 'marquee' | 'wireframe';
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToBuild: string;
  stack: string[];
  description: string;
  architectureDiagram: string;
  fileTree: string[];
  phases: {
    phase: string;
    description: string;
    prompts: string[];
    checkpoint: string;
  }[];
  pitfallsToAvoid: string[];
}

export interface UserProject {
  id: string;
  title: string;
  description: string;
  status: 'Idea' | 'Prompting' | 'Building' | 'Debugging' | 'Shipped';
  targetAudience: string;
  stack: string[];
  notes: string;
  promptsUsed: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceData {
  projects: UserProject[];
  bookmarkedToolIds: string[];
  savedPromptIds: string[];
  completedGuideStepIds: string[];
  customTools?: VibecodingTool[];
  userName: string;
  lastActive: string;
}
