import { PromptTemplate } from '../types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'app-scaffolding',
    title: 'The Ironclad Zero-to-One App Blueprint',
    category: 'Architecture & Scaffolding',
    intent: 'Kick off a brand new application with crisp boundaries, modern libraries, and zero placeholder code.',
    variables: [
      { key: 'APP_NAME', label: 'App Name', placeholder: 'e.g. SonicVibe', defaultValue: 'SoundPulse' },
      { key: 'CORE_PURPOSE', label: 'Core Purpose', placeholder: 'What does it do?', defaultValue: 'an ambient audio frequency generator with customizable wave oscillation' },
      { key: 'TECH_STACK', label: 'Tech Stack', placeholder: 'Frameworks', defaultValue: 'React 19, TypeScript, Tailwind CSS v4, Motion, Lucide icons' },
      { key: 'DESIGN_VIBE', label: 'Design Vibe', placeholder: 'Visual style', defaultValue: 'Light + Neon aesthetic: warm off-white canvas (#F8F7F2), bold charcoal text (#111111), electric lime (#D4FF00) accents, tight Bricolage Grotesque typography' }
    ],
    templateText: `You are the lead product architect and senior frontend engineer building {{APP_NAME}}: {{CORE_PURPOSE}}.

TECH STACK:
- {{TECH_STACK}}

VISUAL DIRECTION & AESTHETIC:
- {{DESIGN_VIBE}}
- Anti-slop discipline: No pill badge sandwiches on cards, no fake compiler status bars, no decorative pulsing dots, no thick left border callouts.
- All numbers must use tabular figures (font-mono tabular-nums).
- All interactive controls (buttons, tabs, inputs) must be single-line (whitespace-nowrap shrink-0).

FUNCTIONAL INVARIANTS:
1. Every interactive element must be fully wired with real state. Zero placeholder stubs or empty onClick handlers.
2. Store state in clean custom hooks with LocalStorage persistence so page refreshes do not erase data.
3. Handle empty states, loading states, and edge cases gracefully.

STEP 1: Provide a concise 3-bullet plan of the architecture.
STEP 2: Write the complete, production-ready implementation in pristine files.`,
    proTip: 'Never leave the design aesthetic unspecified. Specifying exact hex codes and typography rules in prompt #1 prevents the AI from defaulting to generic purple cards.',
    outputExpectation: 'A working, high-fidelity application scaffold with zero syntax errors, real state hooks, and cohesive typography.'
  },
  {
    id: 'bug-debugging',
    title: 'The "Fix My Weird Console Bug" Surgical Prompt',
    category: 'Bug Fixing & Debug',
    intent: 'Fix a gnarly runtime or compiler error without causing the AI to rewrite unrelated working code.',
    variables: [
      { key: 'ERROR_MESSAGE', label: 'Console Error Text', placeholder: 'Paste exact red error', defaultValue: 'Uncaught TypeError: Cannot read properties of undefined (reading "map") at RenderList (List.tsx:42:18)' },
      { key: 'USER_ACTION', label: 'What were you doing?', placeholder: 'User trigger', defaultValue: 'clicking the "Filter by Category" button when the search query was cleared' },
      { key: 'FILE_PATH', label: 'File Path', placeholder: 'Target file', defaultValue: '/src/components/List.tsx' },
      { key: 'RESTRICTIONS', label: 'Preserve Rules', placeholder: 'Constraints', defaultValue: 'Do not change the prop interface of List.tsx; preserve existing animation state' }
    ],
    templateText: `I encountered the following runtime error when {{USER_ACTION}}:

\`\`\`
{{ERROR_MESSAGE}}
\`\`\`

TARGET FILE:
{{FILE_PATH}}

PRESERVATION CONSTRAINTS:
- {{RESTRICTIONS}}
- Do not rewrite the entire file or alter unrelated working components.
- Make the minimum surgical edit required to fix the root cause.
- Add defensive null-safety and defensive fallbacks so this edge case never throws again.

Diagnose the root cause in 2 sentences, then provide the exact diff or replacement block.`,
    proTip: 'Paste the entire stack trace including file line numbers. Agents use line numbers to locate the exact variable causing the null pointer exception.',
    outputExpectation: 'A concise explanation of why the variable was undefined and a surgical fix with defensive fallbacks.'
  },
  {
    id: 'anti-slop-ui',
    title: 'The Anti-Slop UI Styling Directive',
    category: 'Anti-Slop UI Styling',
    intent: 'Elevate an existing generic interface into a distinctive, editorial, human-designed experience.',
    variables: [
      { key: 'TARGET_COMPONENT', label: 'Target Component', placeholder: 'Component name', defaultValue: '/src/components/PricingTable.tsx' },
      { key: 'PRIMARY_ACCENT', label: 'Accent Color', placeholder: 'Hex or Tailwind', defaultValue: 'Neon Lime (#D4FF00) and Electric Violet (#7928CA)' },
      { key: 'TYPOGRAPHY_PAIRING', label: 'Typography Pairing', placeholder: 'Font faces', defaultValue: 'Bricolage Grotesque display + Plus Jakarta Sans body + JetBrains Mono data' },
      { key: 'LAYOUT_STYLE', label: 'Layout Math', placeholder: 'Layout type', defaultValue: 'Asymmetric 12-column editorial grid with hairline borders and single-elevation cards' }
    ],
    templateText: `Refactor {{TARGET_COMPONENT}} to completely eliminate generic AI aesthetic tropes and apply high-end editorial frontend craftsmanship.

APPLY THESE NON-NEGOTIABLE DESIGN DIRECTIVES:
1. Zero-Pill Metadata Discipline:
   - Eliminate all rounded pill badges, chips, and capsules used for static metadata.
   - Render metadata as clean, unboxed text separated by typographic bullets (·) or slashes (/).
   - Pills are permitted ONLY for functional, clickable segmented filter buttons.

2. Eradicate Pseudo-Technical Clutter:
   - Remove any "// 01 ARCHITECTURE" code-comment headers, fake status tickers, or pulsing green dots.
   - Use clean, natural title-case editorial headers.

3. Typographic Hierarchy & Containment:
   - Fonts: {{TYPOGRAPHY_PAIRING}}.
   - Headlines must have text-wrap: balance to prevent lonely orphan single words.
   - Use tabular figures (font-mono tabular-nums) for all pricing, numbers, and stats.

4. Color & Spatial System:
   - Accent: {{PRIMARY_ACCENT}}.
   - 60% warm canvas, 30% structural surfaces, 10% high-intent accent budget.
   - Layout: {{LAYOUT_STYLE}}. Container outer padding must be greater than or equal to inner gaps.

Provide the refactored component code in one pristine block.`,
    proTip: 'Run this prompt whenever an agent gives you a generic template with purple gradients and floating stat bubbles.',
    outputExpectation: 'A refined, award-caliber interface with tight typography, editorial grid structure, and zero generic tropes.'
  },
  {
    id: 'cursor-rules',
    title: 'The Master .cursorrules / System Prompt Generator',
    category: 'System & Cursor Rules',
    intent: 'Generate an authoritative instructions file for Cursor, Claude Dev, or Windsurf that governs all future turns.',
    variables: [
      { key: 'PROJECT_TITLE', label: 'Project Name', placeholder: 'Project', defaultValue: 'Vibe101' },
      { key: 'STACK_VERSIONS', label: 'Stack & Versions', placeholder: 'Versions', defaultValue: 'React 19, TypeScript 5.8, Tailwind CSS v4, Motion 12, Vite 6' },
      { key: 'FORBIDDEN_PATTERNS', label: 'Strictly Forbidden', placeholder: 'Banned things', defaultValue: 'Any usage of "any", inline style tags, external unverified image URLs, dummy mock buttons without working handlers' },
      { key: 'STATE_MANAGEMENT', label: 'State Pattern', placeholder: 'State strategy', defaultValue: 'Custom React hooks with persistent localStorage backing and immutable state updates' }
    ],
    templateText: `# {{PROJECT_TITLE}} — SYSTEM ARCHITECTURE & CODING DIRECTIVES

## 1. Technical Baseline
- Framework & Tools: {{STACK_VERSIONS}}.
- State Architecture: {{STATE_MANAGEMENT}}.
- Strict Type Safety: Zero usage of \`any\`. All interfaces must be cleanly exported in \`/src/types/\`.

## 2. Universal Code Constraints
- FORBIDDEN: {{FORBIDDEN_PATTERNS}}.
- Every interactive element must be functional. Never render non-functional fake affordances.
- Always check and verify types with \`tsc --noEmit\` before declaring a task complete.

## 3. UI & Design Standards
- Never use pill badges for static metadata; reserve rounded buttons strictly for active filter controls.
- Never use code comments as section headers (e.g. "// 01_CORE"). Use natural human prose.
- Numbers, currencies, metrics, and dates MUST use \`font-mono tabular-nums\`.
- All buttons and nav controls must be single-line with \`whitespace-nowrap shrink-0\`.

## 4. Execution Protocol
- Always inspect existing files before making edits.
- Make atomic, testable edits. Do not overwrite multiple unrelated files in a single sweep.`,
    proTip: 'Save this file as `.cursorrules` in your project root or paste it into your AI assistant project settings.',
    outputExpectation: 'A battle-tested system prompt that prevents the AI from drifting, breaking types, or installing random dependencies.'
  },
  {
    id: 'db-schema',
    title: 'Supabase / Firebase Schema & Security Rules Prompt',
    category: 'Auth & Databases',
    intent: 'Architect relational tables or collections with rock-solid Row Level Security (RLS) rules.',
    variables: [
      { key: 'DB_TYPE', label: 'Database Type', placeholder: 'Supabase or Firebase', defaultValue: 'Supabase PostgreSQL' },
      { key: 'ENTITIES', label: 'Core Entities', placeholder: 'Entities', defaultValue: 'users, projects, prompt_snippets, bookmarks' },
      { key: 'AUTH_RULES', label: 'Permissions Policy', placeholder: 'Rules', defaultValue: 'Anyone can read public prompt_snippets; only authenticated owners can create, update, or delete their own projects and bookmarks' }
    ],
    templateText: `Write the complete database schema and security configuration for {{DB_TYPE}}.

ENTITIES & FIELDS:
{{ENTITIES}}

PERMISSIONS & ACCESS CONTROL:
{{AUTH_RULES}}

REQUIREMENTS:
1. Provide the complete SQL migration (or Firestore rules) with:
   - Primary keys (UUIDs with uuid_generate_v4() or gen_random_uuid()), foreign keys, and cascading deletes.
   - Timestamps: created_at and updated_at with an automated trigger for updated_at.
   - Indexes on frequently queried foreign keys and category columns.
2. Enable Row Level Security (RLS) on all tables.
3. Write precise RLS policies for SELECT, INSERT, UPDATE, and DELETE enforcing the permissions above.
4. Provide the corresponding TypeScript interfaces matching this schema exactly.`,
    proTip: 'Always request RLS policies upfront. Adding security rules after your app is built often breaks queries because queries without proper filter matching get rejected by Postgres.',
    outputExpectation: 'Ready-to-run SQL migration script with automated triggers, foreign keys, RLS security policies, and TypeScript interfaces.'
  },
  {
    id: 'refactoring-prompt',
    title: 'Complex Multi-File Refactor Without Breaking Things',
    category: 'Refactoring',
    intent: 'Safely migrate or split an oversized component into clean modular sub-components.',
    variables: [
      { key: 'TARGET_MODULE', label: 'Target Component', placeholder: 'File to refactor', defaultValue: '/src/App.tsx (600 lines)' },
      { key: 'GOAL', label: 'Refactoring Goal', placeholder: 'Goal', defaultValue: 'Split into dedicated components: Header, Hero, ToolsDirectory, PromptLab, and Workspace' },
      { key: 'SHARED_STATE', label: 'State to Extract', placeholder: 'State hook', defaultValue: 'Move search query, bookmarks, and active tab state into a dedicated useWorkspace hook' }
    ],
    templateText: `We are refactoring {{TARGET_MODULE}}.

GOAL:
{{GOAL}}

STATE EXTRACTION:
{{SHARED_STATE}}

INVARIANTS:
1. Zero breaking changes: The application must compile cleanly with \`npm run build\` after this refactor.
2. Do not lose any existing feature, click handler, or CSS styling during the migration.
3. Keep each new sub-component focused on a single responsibility.
4. Export clear TypeScript interfaces for all component props.

Proceed step-by-step:
First, create the extracted state hook.
Next, create the modular child components.
Finally, update the main parent entry point to compose them.`,
    proTip: 'Refactor state first, then leaf components, and finally the parent container. This ensures all props are known before connecting them.',
    outputExpectation: 'Cleanly split, modular components with shared state cleanly encapsulated in a custom hook.'
  }
];
