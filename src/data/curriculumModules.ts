import { CurriculumModule } from '../types/curriculum';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Vibecoding Fundamentals',
    tagline: 'Understand what vibecoding is, how AI coding models reason, and the boundary between toys and software.',
    description: 'A friendly, non-technical introduction to the paradigm shift of directing AI models. Learn the mental models that separate frustrated beginners from productive builders.',
    prerequisites: ['None. No prior coding, math, or computer science experience required.'],
    estimatedEffort: '1.5 hours',
    learningOutcomes: [
      'Explain how large language models generate code using token prediction.',
      'Identify what AI code editors excel at and where they predictably fail.',
      'Distinguish a fragile proof-of-concept from a resilient production application.',
      'Adopt the role of product director and quality controller.'
    ],
    lessons: [
      {
        id: 'lesson-1-1',
        moduleId: 'mod-1',
        lessonNumber: '1.1',
        title: 'What Is Vibecoding and How Do AI Models Think?',
        learningObjective: 'Understand how AI models predict code tokens and why acting as a director beats trying to memorize syntax.',
        estimatedDuration: '25 min',
        plainLanguageExplanation: [
          'In traditional coding, you had to memorize thousands of arbitrary rules: where to put curly braces, commas, and semicolons. If you missed a single symbol, the computer threw an error.',
          'Vibecoding flips this model upside down. Modern AI models (like Claude, Gemini, and GPT-4) were trained on millions of public open-source code repositories. They know every syntax rule, library, and programming language.',
          'However, the AI does not have human consciousness. It is a probabilistic prediction engine: given the text you typed (your prompt) and the files in your project, it calculates what code characters most logically come next.',
          'Your job as a vibecoder is not typing code. Your job is giving the AI precise context, crisp boundaries, visual taste, and reviewing its output to ensure it matches real-world human requirements.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Stop trying to memorize syntax',
            instruction: 'Accept that you do not need to memorize how React hooks or CSS grid layouts are written character-by-character. Focus on understanding concepts instead.'
          },
          {
            step: 2,
            title: 'Think in inputs and outputs',
            instruction: 'Whenever you want a feature, describe: 1. What the user does (input). 2. What the screen should show (output). 3. What constraints must be respected.'
          },
          {
            step: 3,
            title: 'Adopt the Director Mindset',
            instruction: 'Treat your AI editor like a talented, hyper-fast intern who has never seen your application before and has a short memory.'
          }
        ],
        exampleConcept: {
          title: 'The Director vs The Typist',
          explanation: 'Typists ask for code and paste it without thinking. Directors state architectural rules and verify results.',
          badExample: 'Prompt: "Make me an app for tracking workouts."',
          goodExample: 'Prompt: "Create a workout timer component in /src/components/Timer.tsx. It needs 3 buttons: 30s rest, 60s rest, and custom input. Use high-contrast black typography on warm white. Do not use external libraries."'
        },
        copyableSnippet: {
          type: 'prompt',
          title: 'The Director Baseline Prompt',
          content: 'You are the senior frontend engineer. We are building a minimal habit tracker. Before writing any code, list the 3 files we need to create and their responsibilities. Keep the scope minimal.'
        },
        handsOnExercise: {
          task: 'Write a 3-sentence director prompt for a simple tip calculator app.',
          hint: 'Specify the input (bill amount, tip percentage), the output (total per person), and visual style.',
          solutionPrompt: 'Build a tip calculator in /src/components/TipCalc.tsx. The user enters a bill total, selects 15%, 18%, or 20% tip, and enters party size. Display the final per-person amount in large monospace font. Prevent division by zero.'
        },
        commonMistakes: [
          'Assuming the AI "knows what you mean" without specifying details.',
          'Asking for an entire multi-page application in your very first prompt.',
          'Never inspecting the browser preview between prompts.'
        ],
        completionChecklist: [
          'I understand that LLMs generate code via probabilistic token prediction.',
          'I know my role is specifying constraints and verifying behavior.',
          'I have written my first 3-sentence director prompt.'
        ],
        officialDocLinks: [
          { title: 'Google AI Studio Overview', url: 'https://ai.google.dev/docs', source: 'Google' },
          { title: 'Anthropic Prompt Engineering Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', source: 'Anthropic' }
        ]
      },
      {
        id: 'lesson-1-2',
        moduleId: 'mod-1',
        lessonNumber: '1.2',
        title: 'What AI Tools Can and Cannot Do',
        learningObjective: 'Recognize the predictable boundaries of AI models so you avoid common traps and hallucination loops.',
        estimatedDuration: '30 min',
        plainLanguageExplanation: [
          'AI coding tools are superpowers, but they have distinct mathematical limits that catch beginners off guard.',
          'WHAT AI EXCELS AT: Writing boilerplate code, translating ideas into UI components, explaining errors, refactoring messy code, generating SQL queries, and writing test cases.',
          'WHAT AI STRUGGLES WITH: Long-term spatial reasoning (remembering that a change in file A broke a button in file Z), subtle state race conditions, and knowing when to say "I don\'t know."',
          'When an AI model does not know an answer, it frequently hallucinates — inventing non-existent package names, making up fake API functions, or replacing your working code with comments like "// ...rest of code remains same."'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Verify package names before installing',
            instruction: 'If the AI suggests running `npm install some-random-library`, check npmjs.com to verify the package actually exists and has active downloads.'
          },
          {
            step: 2,
            title: 'Keep edits atomic',
            instruction: 'Direct the AI to change one component or file at a time. Multi-file broad sweeps are where hallucinations spike.'
          },
          {
            step: 3,
            title: 'Watch for the "// ...rest of code" trap',
            instruction: 'If an AI returns truncated code, explicitly instruct it: "Output the complete, pristine file contents with zero placeholders."'
          }
        ],
        exampleConcept: {
          title: 'Hallucinated API vs Real API',
          explanation: 'AI models often invent convenient methods that feel plausible but do not exist in the official specification.',
          badExample: 'AI output: `supabase.auth.instantMagicLoginWithOneClick()` (Fake fabricated method)',
          goodExample: 'Real output: `supabase.auth.signInWithOtp({ email })` (Verified SDK method)'
        },
        copyableSnippet: {
          type: 'prompt',
          title: 'Anti-Hallucination Directive',
          content: 'Strict rule: Only use verified, modern APIs from React 19 and Tailwind CSS v4. Do not invent non-existent helper methods. Output complete file code with no placeholder comments.'
        },
        handsOnExercise: {
          task: 'Identify why asking an AI "Fix all bugs in my app" fails, and formulate a better prompt.',
          hint: 'The AI cannot see what bug you experienced unless you provide the error text.',
          solutionPrompt: 'When clicking the "Save" button in /src/components/Form.tsx, the console shows: "TypeError: onSubmit is not a function". Fix Form.tsx by ensuring onSubmit prop has an optional check before firing.'
        },
        commonMistakes: [
          'Trusting an AI blindly without testing the live button clicks.',
          'Letting the AI install 10 different npm packages to solve a problem that takes 5 lines of JavaScript.',
          'Continuing to chat in a thread that has become confused.'
        ],
        completionChecklist: [
          'I can list 3 things AI does well and 3 things it struggles with.',
          'I know how to identify and prevent truncated code placeholders.',
          'I always verify whether proposed libraries actually exist.'
        ],
        officialDocLinks: [
          { title: 'MDN Web Docs: JavaScript Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps', source: 'MDN' }
        ]
      },
      {
        id: 'lesson-1-3',
        moduleId: 'mod-1',
        lessonNumber: '1.3',
        title: 'Prototypes vs Production Software',
        learningObjective: 'Learn the architectural differences between a disposable visual prototype and robust production software.',
        estimatedDuration: '30 min',
        plainLanguageExplanation: [
          'It is easy to generate a prototype in 5 minutes with AI that looks beautiful on your screen. But 90% of beginner prototypes crash as soon as a real user touches them.',
          'What makes a prototype fragile? 1. Fake hardcoded mock data. 2. No loading or empty states. 3. Zero error handling when the internet drops. 4. Unprotected secrets.',
          'Production software handles the "Unhappy Path": What happens if the database is down? What happens if the user enters special characters in their name? What happens on a slow 3G mobile phone?',
          'Vibecoding is not about stopping at a pretty mockup. It is about steering the AI to build real error boundaries, defensive null checks, and secure endpoints.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Audit your UI for empty states',
            instruction: 'Look at every list, search bar, and card in your app. What does the screen show before the user adds any items? Never leave an empty blank void.'
          },
          {
            step: 2,
            title: 'Test input validation',
            instruction: 'Try typing 500 characters into your text inputs. Try entering numbers into text fields. Does the app gracefully show a warning or crash?'
          },
          {
            step: 3,
            title: 'Check offline resilience',
            instruction: 'Turn off your Wi-Fi for 5 seconds. Does the application show a helpful notice or throw an unhandled white-screen crash?'
          }
        ],
        exampleConcept: {
          title: 'The Prototype vs The Production Component',
          explanation: 'Prototypes assume data is always present. Production components handle missing data safely.',
          badExample: '`return <div>{user.profile.items.map(...)}</div>` (Crashes instantly if items is undefined)',
          goodExample: '`const items = user?.profile?.items || []; if (items.length === 0) return <EmptyState />; return <div>{items.map(...)}</div>`'
        },
        copyableSnippet: {
          type: 'code',
          title: 'Production Defensive Array Check',
          content: '{items && items.length > 0 ? (\n  items.map(item => <Card key={item.id} item={item} />)\n) : (\n  <div className="p-8 text-center text-neutral-500 font-mono text-xs">\n    No items created yet. Click "Add New" above.\n  </div>\n)}'
        },
        handsOnExercise: {
          task: 'Write a prompt instructing an AI to add an empty state and loading skeleton to an existing user list.',
          hint: 'Describe what to show when items.length === 0, and what to show while isLoading === true.',
          solutionPrompt: 'Update /src/components/UserList.tsx: 1. If isLoading is true, show 3 pulsating skeleton placeholder bars. 2. If users array is empty, show a centered empty state with an icon, title "No team members yet", and an "Invite Member" button.'
        },
        commonMistakes: [
          'Thinking a project is complete just because the desktop screenshot looks nice.',
          'Neglecting mobile touch targets and slow connection states.',
          'Hardcoding API secrets directly into client-side files.'
        ],
        completionChecklist: [
          'I understand the 4 failure points of fragile prototypes.',
          'I can write defensive fallback checks for data lists.',
          'I always demand loading, empty, and error states in my UI.'
        ],
        officialDocLinks: [
          { title: 'React Documentation: Error Boundaries', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary', source: 'React.dev' }
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Ideas and Planning',
    tagline: 'Define problems, identify real users, choose sensible scopes, and turn ideas into specs.',
    description: 'Learn how to translate vague brainstorms into concrete, buildable specifications that AI models can execute without confusion.',
    prerequisites: ['Module 1: Vibecoding Fundamentals.'],
    estimatedEffort: '2 hours',
    learningOutcomes: [
      'Scope a project to a single core user workflow (The 1-Feature Rule).',
      'Identify target user personas and their friction points.',
      'Write clear functional specifications and acceptance criteria.',
      'Construct a project blueprint before opening an AI editor.'
    ],
    lessons: [
      {
        id: 'lesson-2-1',
        moduleId: 'mod-2',
        lessonNumber: '2.1',
        title: 'Defining the Single Core Problem',
        learningObjective: 'Learn how to isolate the primary value proposition of an application and eliminate distraction features.',
        estimatedDuration: '35 min',
        plainLanguageExplanation: [
          'The number one reason beginner vibecoding projects fail is "Scope Creep". A user starts wanting a simple notes app, but within 10 minutes they want tags, folders, cloud collaboration, AI summaries, markdown charts, and payment subscriptions.',
          'When you ask an AI model to build 10 complex features at once, it spreads its attention thinly across all of them, producing shallow, half-broken stubs for everything.',
          'The secret to shipping is The 1-Feature Rule: Identify the single most important action a user takes in your app (the "Core Loop"). Build and polish that action until it feels magical, before touching secondary features.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Write your 1-Sentence Value Statement',
            instruction: 'Complete this formula: "My app helps [target user] accomplish [specific outcome] without [common frustration]."'
          },
          {
            step: 2,
            title: 'Identify the Core Action Loop',
            instruction: 'What is the main button the user presses? For Uber, it is "Request Ride". For Google, it is "Search". For a Pomodoro timer, it is "Start 25:00".'
          },
          {
            step: 3,
            title: 'Draw the "Must-Have" vs "Later" line',
            instruction: 'Place user profiles, social sharing, and dark mode toggles into the "Later" bucket. Focus 100% of your energy on the Core Action.'
          }
        ],
        exampleConcept: {
          title: 'Scope Creep vs Ruthless Scoping',
          explanation: 'Narrow scopes succeed; bloated scopes get stuck in debugging hell.',
          badExample: '"I am building an all-in-one productivity suite with calendar, email client, habit tracker, and AI assistant."',
          goodExample: '"I am building a 1-click ambient rain audio generator that plays when I open the browser tab and stops when I close it."'
        },
        copyableSnippet: {
          type: 'prompt',
          title: 'Project Inception Specification Prompt',
          content: 'I want to build a lightweight web tool. Primary user: Freelancers tracking billable hours. Single core action: A stopwatch timer with 1-click client tagging and CSV export. Prohibit: Do not add user authentication, teams, or billing tiers yet. Outline the simplest 2-screen user flow.'
        },
        handsOnExercise: {
          task: 'Pick a tool you use daily. Strip away 80% of its features to define its irreducible core loop.',
          hint: 'Think of Twitter: at its core, it is a text box that posts 280 characters to a chronological feed.',
          solutionPrompt: 'Define the irreducible core loop of an invoicing tool: The user types line items, adds an hourly rate, clicks "Generate PDF", and downloads an invoice. Zero database, zero login, 100% client-side.'
        },
        commonMistakes: [
          'Trying to build a competitor to a $10B company on day one.',
          'Starting with user login and sign-up before proving the app does anything useful.',
          'Changing your project requirements midway through building.'
        ],
        completionChecklist: [
          'I have written a 1-sentence value statement for my project.',
          'I have identified the single core action loop.',
          'I have moved all non-essential features to a "Phase 2" list.'
        ],
        officialDocLinks: [
          { title: 'Shape Up: Stop Running in Circles', url: 'https://basecamp.com/shapeup/1.2-chapter-03', source: 'Basecamp' }
        ]
      },
      {
        id: 'lesson-2-2',
        moduleId: 'mod-2',
        lessonNumber: '2.2',
        title: 'Writing a Build Specification for AI Agents',
        learningObjective: 'Learn how to write a structured product requirements document (PRD) that guides AI models deterministically.',
        estimatedDuration: '45 min',
        plainLanguageExplanation: [
          'If you give an architect an unlabelled sketch on a napkin, you will get a house you did not expect. The same happens with AI agents.',
          'An AI specification is not an essay. It is a structured checklist composed of: 1. Goal. 2. Data inputs and outputs. 3. Screen layout and visual style. 4. Acceptance criteria (how we know it works).',
          'When you feed a clean build spec to an AI editor like Cursor or Claude, it makes zero random architectural guesses. It generates the exact files you asked for.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Define the Data Schema',
            instruction: 'What information does your app save? (e.g. A task has an id, text title, completed boolean, and createdAt timestamp).'
          },
          {
            step: 2,
            title: 'List the Component Tree',
            instruction: 'Break the screen into 3–4 visual pieces: Header, InputBar, ItemList, and Footer.'
          },
          {
            step: 3,
            title: 'Define Acceptance Criteria',
            instruction: 'Write 3 verifiable test statements: "When I click delete, the item disappears. When I refresh the page, items remain."'
          }
        ],
        exampleConcept: {
          title: 'Vague Request vs Structured Spec',
          explanation: 'Structured specs prevent AI models from choosing random libraries or patterns.',
          badExample: '"Make a recipe app with search."',
          goodExample: 'Goal: Recipe search by ingredient. Data: recipe { id, title, ingredients[], prepMinutes }. Layout: Search input at top, 3-column card grid below. Style: Warm white canvas (#F8F7F2), charcoal text. Verification: Typing "egg" filters cards in <100ms.'
        },
        copyableSnippet: {
          type: 'prompt',
          title: 'Master Architecture Blueprint Prompt',
          content: 'You are the lead software architect. Here is our build spec:\n- APP: SoundPulse (Ambient audio generator)\n- TECH STACK: React 19, TypeScript, Tailwind CSS v4, Web Audio API\n- DATA: Presets { id, name, frequency, noiseType }\n- CONSTRAINTS: 100% local in-browser execution. No external audio CDNs.\n- DELIVERABLE: Produce the file tree and /src/types/sound.ts interface first.'
        },
        handsOnExercise: {
          task: 'Write a complete build specification for a 1-page bookmark manager.',
          hint: 'Include Tech Stack, Data Fields, Component Names, and Acceptance Criteria.',
          solutionPrompt: 'SPEC: Bookmark Manager. Stack: React 19, Tailwind v4, LocalStorage. Data: Bookmark { id, title, url, category, createdAt }. Components: AddBookmarkModal, CategoryFilterTabs, BookmarkGrid, EmptyState. Criteria: Adding a URL validates format; clicking bookmark opens in new tab; state persists on refresh.'
        },
        commonMistakes: [
          'Writing paragraphs of descriptive prose instead of bulleted requirements.',
          'Forgetting to specify the tech stack and framework version.',
          'Not defining how state should persist (LocalStorage vs memory).'
        ],
        completionChecklist: [
          'I can write data interfaces before generating UI.',
          'I know how to break a screen into a component tree.',
          'I write measurable acceptance criteria for every feature.'
        ],
        officialDocLinks: [
          { title: 'GitHub PRD Template Guide', url: 'https://docs.github.com', source: 'GitHub' }
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Prompt Engineering',
    tagline: 'Master context architecture, constraints, examples, acceptance criteria, and agent directives.',
    description: 'Learn the exact science of communicating with LLMs. Discover why contrasting examples work better than adjectives, and how to configure system prompts that prevent code rot.',
    prerequisites: ['Module 1 & 2.'],
    estimatedEffort: '2.5 hours',
    learningOutcomes: [
      'Construct prompts using the 4 Pillars (Role, Invariants, Constraints, Output).',
      'Use the DO and DONT contrasting example technique.',
      'Manage context windows and know when to reset chat threads.',
      'Author a production-grade .cursorrules and system instructions file.'
    ],
    lessons: [
      {
        id: 'lesson-3-1',
        moduleId: 'mod-3',
        lessonNumber: '3.1',
        title: 'The 4 Pillars of a Production Prompt',
        learningObjective: 'Structure prompts with deterministic engineering rigor rather than conversational hope.',
        estimatedDuration: '40 min',
        plainLanguageExplanation: [
          'When beginners prompt AI models, they talk to them like a genie: "Please make it modern, responsive, and really clean!"',
          'Words like "modern" and "clean" are subjective. To an AI model, "modern" might mean a purple gradient with rounded pill badges, which is the exact definition of generic AI slop.',
          'Production prompt engineering relies on 4 concrete pillars: 1. ROLE (Who the AI acts as). 2. INVARIANTS (What must always be true in the code). 3. NEGATIVE CONSTRAINTS (What the AI is strictly forbidden from doing). 4. ACCEPTANCE CRITERIA (How output is formatted and verified).'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Assign a precise Senior Engineering Role',
            instruction: 'Example: "You are the principal frontend architect specialized in React 19, accessible design systems, and Tailwind CSS v4."'
          },
          {
            step: 2,
            title: 'Define your Invariants',
            instruction: 'State technical invariants: "All state must live in custom hooks in /src/hooks/. All numbers must use font-mono tabular-nums."'
          },
          {
            step: 3,
            title: 'Specify Negative Constraints',
            instruction: 'List forbidden patterns: "Do not use inline style attributes. Do not wrap metadata in rounded pill badges. Do not use external unverified image URLs."'
          },
          {
            step: 4,
            title: 'Demand Clean Output Formatting',
            instruction: 'End with: "Provide the complete, production-ready component in one pristine block. Do not omit existing code."'
          }
        ],
        exampleConcept: {
          title: 'Adjective Prompt vs 4-Pillar Spec',
          explanation: 'Adjectives produce generic templates; concrete constraints produce distinctive software.',
          badExample: '"Make the cards look super nice and modern with cool animations."',
          goodExample: '"Style cards using an asymmetric 12-column grid. Canvas: #F8F7F2. Text: #111111. Hairline borders: border-black/10. Add hover spring physics with Motion: stiffness 350, damping 25. Forbid drop shadows with blur > 4px."'
        },
        copyableSnippet: {
          type: 'prompt',
          title: 'The 4-Pillar Universal Prompt Template',
          content: 'ROLE: Principal React/TypeScript Architect.\nTASK: Create /src/components/CheckoutModal.tsx.\nINVARIANTS: Use strict TypeScript interfaces exported in /src/types/. Handle loading, error, and success states.\nNEGATIVE CONSTRAINTS: Zero usage of "any". No pill badges for static text. No external CSS files.\nOUTPUT: Provide the single complete TSX file with clean imports.'
        },
        handsOnExercise: {
          task: 'Transform a vague prompt ("Make a profile card") into a 4-Pillar production specification.',
          hint: 'Define Role, Invariants (data fields), Negative Constraints (no pill badges), and Output.',
          solutionPrompt: 'ROLE: Senior UI Engineer. TASK: Build /src/components/ProfileCard.tsx. INVARIANTS: Displays avatar, name, handle, bio, and follower count using tabular-nums. CONSTRAINTS: Metadata must be unboxed text separated by bullets (·). No green pulsing dots. OUTPUT: Complete pristine TSX component.'
        },
        commonMistakes: [
          'Using vague adjectives like "beautiful", "fast", or "innovative".',
          'Not specifying negative constraints (what NOT to do).',
          'Writing prompts longer than 1,000 words that dilute the model\'s attention.'
        ],
        completionChecklist: [
          'I understand the 4 Pillars of production prompting.',
          'I always include negative constraints in my prompts.',
          'I specify exact file paths and component names.'
        ],
        officialDocLinks: [
          { title: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', source: 'OpenAI' }
        ]
      },
      {
        id: 'lesson-3-2',
        moduleId: 'mod-3',
        lessonNumber: '3.2',
        title: 'Contrasting Examples: The DO and DONT Pattern',
        learningObjective: 'Use few-shot contrasting code snippets to achieve 99% stylistic and architectural compliance.',
        estimatedDuration: '40 min',
        plainLanguageExplanation: [
          'Large language models learn patterns much faster through contrast than through abstract rules.',
          'If you say "Don\'t use pill badges", the model might still output a rounded capsule because "pill" is mentioned. But if you provide a 4-line "BAD CODE" snippet and a 4-line "GOOD CODE" snippet, the model\'s probability distribution locks into your exact preferred pattern.',
          'This is known as Contrasting Few-Shot Prompting. It is the single most effective tool for killing generic AI slop.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Isolate the pattern you dislike',
            instruction: 'Take a piece of bad code the AI generated previously (e.g. static category badge in a rounded-full chip).'
          },
          {
            step: 2,
            title: 'Write your ideal human version',
            instruction: 'Rewrite that specific line into clean, editorial unboxed text separated by typographic bullets.'
          },
          {
            step: 3,
            title: 'Provide both in your prompt',
            instruction: 'Label them clearly: `// ❌ DONT: [bad code]` and `// ✅ DO: [good code]`.'
          }
        ],
        exampleConcept: {
          title: 'The DO and DONT Code Contract',
          explanation: 'Contrasting examples anchor the model on precise JSX patterns.',
          badExample: '// ❌ DONT: <span className="bg-slate-100 rounded-full px-2 py-0.5 text-xs">Analytics</span>',
          goodExample: '// ✅ DO: <div className="text-xs text-neutral-500 font-mono"><span>Analytics</span> · <span>Updated 2h ago</span></div>'
        },
        copyableSnippet: {
          type: 'prompt',
          title: 'Contrasting Example Prompt Block',
          content: 'Follow this exact visual pattern:\n\n// ❌ DONT: Static pill badges\n<span className="bg-purple-100 text-purple-700 rounded-full px-2 py-1 text-xs">Tech</span>\n\n// ✅ DO: Clean unboxed editorial metadata\n<div className="flex items-center gap-2 text-xs font-mono text-neutral-500">\n  <span>Tech</span>\n  <span aria-hidden="true">·</span>\n  <span>5 min read</span>\n</div>'
        },
        handsOnExercise: {
          task: 'Create a DO and DONT contrasting example for button styling (avoiding neon hover glows and using snappy spring physics).',
          hint: 'Show the bad inline transition and the good Motion spring props.',
          solutionPrompt: '// ❌ DONT: Generic shadow glow\n<button className="shadow-lg shadow-purple-500/50 hover:opacity-80 transition-all">Submit</button>\n\n// ✅ DO: Tactile editorial button\n<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-4 py-2 bg-[#D4FF00] text-black font-semibold rounded-lg border border-black/20">Submit</motion.button>'
        },
        commonMistakes: [
          'Providing DO and DONT examples that are 100 lines long (keep them under 6 lines each).',
          'Inconsistent formatting between the bad and good snippet.',
          'Not enforcing the pattern in your permanent .cursorrules.'
        ],
        completionChecklist: [
          'I understand why contrasting examples outperform verbal descriptions.',
          'I know how to format DO and DONT snippets.',
          'I use contrasting pairs when steering visual design.'
        ],
        officialDocLinks: [
          { title: 'Google Gemini Prompting Guide', url: 'https://ai.google.dev', source: 'Google' }
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    moduleNumber: 4,
    title: 'Design and UI Craft',
    tagline: 'Master editorial layouts, typography hierarchy, 60-30-10 color allocation, and micro-motion.',
    description: 'Elevate your software above the generic AI startup aesthetic. Learn how to dictate professional design systems using Tailwind CSS and physics-based motion.',
    prerequisites: ['Module 1 & 2.'],
    estimatedEffort: '2.5 hours',
    learningOutcomes: [
      'Apply the 60-30-10 color discipline to prevent overwhelming palettes.',
      'Enforce zero-pill metadata discipline and clean typographic hierarchy.',
      'Implement nested radius mathematics ($r_{inner} = r_{outer} - padding$).',
      'Integrate responsive touch targets (minimum 44x44px) and WCAG AA contrast.'
    ],
    lessons: [
      {
        id: 'lesson-4-1',
        moduleId: 'mod-4',
        lessonNumber: '4.1',
        title: 'The 60-30-10 Color Discipline',
        learningObjective: 'Allocate colors with deliberate mathematical restraint to avoid chaotic, unprofessional interfaces.',
        estimatedDuration: '35 min',
        plainLanguageExplanation: [
          'When beginners build with AI, they often ask for "bright neon colors" or "electric vibes". The AI responds by painting every card background, button, and header in saturated green, purple, and blue. The result looks like a carnival poster rather than professional software.',
          'Professional design systems follow the 60-30-10 Color Rule:',
          '60% DOMINANT CANVAS: The quiet background field. In Vibe101, this is a warm, architectural off-white (`#F8F7F2`) with less than 3% saturation.',
          '30% STRUCTURAL SURFACES: High-contrast near-black typography (`#111111`), card containers, and hairline borders (`border-black/10`).',
          '10% ACCENT BUDGET: High-intent signal colors reserved strictly for primary interactive focal points (active tabs, main CTA buttons, and highlighted keywords).'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Audit your accent color footprint',
            instruction: 'Look at your screen. Is more than 10% of the surface area covered in neon lime or violet? If so, remove the color from large card backgrounds and reserve it for button outlines and active pills.'
          },
          {
            step: 2,
            title: 'Verify WCAG AA Text Contrast',
            instruction: 'Black text on neon lime has high contrast (>10:1). White text on neon lime is unreadable (<1.8:1) and fails accessibility. Never put white text on bright lime or yellow.'
          },
          {
            step: 3,
            title: 'Use Hairline Dividers instead of Heavy Shadows',
            instruction: 'Separate content using subtle hairline borders (`border border-black/10`) rather than 20px blurred drop shadows.'
          }
        ],
        exampleConcept: {
          title: 'Color Budgeting',
          explanation: 'Restraining accent colors makes primary buttons impossible to miss.',
          badExample: 'Card with green background, purple border, yellow button, and red title.',
          goodExample: 'Warm off-white card, near-black title, hairline border, single neon lime CTA button.'
        },
        copyableSnippet: {
          type: 'code',
          title: 'Vibe101 Cohesive Surface Palette',
          content: '/* 60% Canvas */\nbg-[#F8F7F2] text-[#111111]\n\n/* 30% Structural */\nbg-white border border-black/10 text-neutral-800\n\n/* 10% Accent */\nbg-[#D4FF00] text-black font-semibold hover:bg-[#c5ec00]'
        },
        handsOnExercise: {
          task: 'Review a component and refactor its colors to comply with the 60-30-10 rule.',
          hint: 'Make the background neutral, body text charcoal, and only color the "Submit" action.',
          solutionPrompt: 'Refactor /src/components/Newsletter.tsx to 60-30-10 discipline: Canvas background must be neutral white with 1px border. Heading in #111111 font-display. Email input in neutral-50 with black/10 border. The single accent is the Subscribe button with bg-[#D4FF00] text-black.'
        },
        commonMistakes: [
          'Using white text on neon lime or yellow backgrounds (violates accessibility contrast).',
          'Giving every single button on a screen a saturated accent background.',
          'Mixing warm cream backgrounds with cool blue-gray containers.'
        ],
        completionChecklist: [
          'My canvas represents ~60% of visual weight.',
          'My accent color is reserved strictly for primary actions (<10%).',
          'All text passes WCAG AA contrast (minimum 4.5:1).'
        ],
        officialDocLinks: [
          { title: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/', source: 'WebAIM' }
        ]
      },
      {
        id: 'lesson-4-2',
        moduleId: 'mod-4',
        lessonNumber: '4.2',
        title: 'Typography Hierarchy and Nested Radius Math',
        learningObjective: 'Master fluid headline clamps, zero orphan words, and geometric border-radius alignment.',
        estimatedDuration: '40 min',
        plainLanguageExplanation: [
          'Amateur websites feel disjointed because their font sizes are arbitrary and their corners look misaligned.',
          'Professional UI adheres to two geometric mathematical laws:',
          '1. THE 2+1 FONT RULE: Never use more than 2 font families (1 expressive display face like Bricolage Grotesque + 1 readable body face like Plus Jakarta Sans) plus 1 monospace outlier strictly for data tables and code.',
          '2. NESTED RADIUS MATH: When a container has rounded corners and contains a child element with padding, the inner element\'s radius must equal the outer radius minus the padding ($r_{inner} = r_{outer} - padding$). If outer is 16px (`rounded-2xl`) with 16px padding (`p-4`), the inner element should have 0px radius (`rounded-none`) or a subtle 4px radius. Otherwise, an awkward gap appears in the corners.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Use text-wrap: balance on headlines',
            instruction: 'Always add `text-wrap: balance` to your display headlines. This prevents ugly single-word orphan trailing lines on mobile screens.'
          },
          {
            step: 2,
            title: 'Use tabular numbers for metrics and stats',
            instruction: 'Add `font-mono tabular-nums` to every number, price, date, or timer. This prevents numbers from jittering and jumping when they change.'
          },
          {
            step: 3,
            title: 'Verify nested corner radii',
            instruction: 'Check cards with inner images or buttons. Ensure inner corners follow $r_{inner} = r_{outer} - padding$.'
          }
        ],
        exampleConcept: {
          title: 'Headline Orphan Prevention',
          explanation: 'Balanced text prevents lonely words on line breaks.',
          badExample: 'Headline with one trailing word:\n"Directing Autonomous Software\nCreation\nToday"',
          goodExample: 'Balanced headline with text-wrap: balance:\n"Directing Autonomous Software\nCreation Today"'
        },
        copyableSnippet: {
          type: 'code',
          title: 'Fluid Balanced Headline Snippet',
          content: '<h1 className="font-display font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] tracking-tighter uppercase text-[#111111] text-balance">\n  Build Fast. Direct Well.\n</h1>'
        },
        handsOnExercise: {
          task: 'Calculate the correct inner radius for a card with rounded-2xl (16px) and 12px padding.',
          hint: 'Subtract padding from outer radius: 16px - 12px = 4px.',
          solutionPrompt: 'Outer card has `rounded-2xl p-3` (16px outer, 12px padding). The inner image container must use `rounded-xs` or `rounded-[4px]` to achieve mathematical harmony.'
        },
        commonMistakes: [
          'Using 4 different font families across one page.',
          'Allowing single-word orphan lines in large hero headlines.',
          'Rendering numbers in proportional fonts that misalign table columns.'
        ],
        completionChecklist: [
          'I limit my typography to at most two font families plus monospace.',
          'I apply text-wrap: balance to all primary headlines.',
          'I apply nested radius math to all card containers.'
        ],
        officialDocLinks: [
          { title: 'Tailwind CSS Typography Documentation', url: 'https://tailwindcss.com/docs/typography', source: 'Tailwind' }
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    moduleNumber: 5,
    title: 'Building Applications',
    tagline: 'Understand frontends, backends, APIs, databases, authentication, and state management.',
    description: 'Demystify the moving parts of full-stack software. Learn what each layer does, how data travels across the wire, and how to direct agents across file boundaries.',
    prerequisites: ['Module 1, 2 & 3.'],
    estimatedEffort: '3 hours',
    learningOutcomes: [
      'Explain the difference between client-side code and server-side code.',
      'Understand how REST and GraphQL APIs pass JSON data over HTTP.',
      'Configure environment variables (.env) securely without leaking credentials.',
      'Manage application state with custom React hooks and LocalStorage persistence.'
    ],
    lessons: [
      {
        id: 'lesson-5-1',
        moduleId: 'mod-5',
        lessonNumber: '5.1',
        title: 'Frontend vs Backend vs Database: The Restaurant Analogy',
        learningObjective: 'Understand how the three tiers of a web app collaborate using an intuitive real-world mental model.',
        estimatedDuration: '35 min',
        plainLanguageExplanation: [
          'Software architecture sounds intimidating, but it functions exactly like a restaurant:',
          'THE FRONTEND (The Dining Room): What the customer sees, touches, and interacts with. The menu, tables, and ambient lighting. In software, this is your HTML, CSS, React components, and buttons.',
          'THE API / BACKEND (The Waiter): The customer cannot walk into the kitchen and grab raw ingredients. Instead, they tell the waiter: "I want pasta." The waiter takes the order, checks if the customer paid, delivers the request to the kitchen, and brings back the cooked meal. In software, your API endpoint (`/api/todos`) receives requests, verifies authentication, and returns JSON data.',
          'THE DATABASE (The Kitchen Pantry): The secure storage vault where all ingredients (user accounts, passwords, posts, and transactions) are stored permanently in organized shelves (tables and columns).'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Identify where logic belongs',
            instruction: 'Visual interactions (button hover, animations, form inputs) belong in the Frontend. Sensitive operations (charging credit cards, verifying passwords) MUST live in the Backend.'
          },
          {
            step: 2,
            title: 'Understand JSON data format',
            instruction: 'APIs pass plain text formatted like JavaScript objects: `{"name": "Alex", "plan": "pro"}`. Inspect the Network tab in DevTools to watch JSON fly between frontend and backend.'
          },
          {
            step: 3,
            title: 'Choose the simplest stack for your stage',
            instruction: 'Start local-first (LocalStorage in Frontend). Only add a remote backend and database when you need multi-device syncing or user accounts.'
          }
        ],
        exampleConcept: {
          title: 'Frontend Only vs Full-Stack',
          explanation: 'Local-first tools run 100% in the frontend; SaaS requires backend and database.',
          badExample: 'Putting a secret database connection string into a client-side React component.',
          goodExample: 'Client calls `fetch("/api/data")`, and the server securely queries the database.'
        },
        copyableSnippet: {
          type: 'code',
          title: 'Standard Fetch Request Pattern',
          content: 'async function loadData() {\n  try {\n    const response = await fetch("/api/items");\n    if (!response.ok) throw new Error("Network request failed");\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Fetch error:", error);\n    return [];\n  }\n}'
        },
        handsOnExercise: {
          task: 'Explain where a user\'s password should be checked: frontend or backend, and why.',
          hint: 'Anyone can view frontend source code by pressing Inspect in their browser.',
          solutionPrompt: 'Passwords must NEVER be checked in the frontend because any visitor can view the code, inspect network tabs, or bypass client-side if-statements. Passwords must be sent over HTTPS to a secure backend that verifies cryptographic hashes.'
        },
        commonMistakes: [
          'Storing private API keys (like Stripe Secret Key or OpenAI Key) in client-side code.',
          'Assuming client-side form validation is enough security (attackers bypass frontend forms with curl).',
          'Adding a complex SQL database when a simple LocalStorage hook would solve the problem.'
        ],
        completionChecklist: [
          'I can explain the frontend, API, and database roles using the restaurant analogy.',
          'I know why sensitive operations must run on a server.',
          'I understand how JSON data moves across HTTP requests.'
        ],
        officialDocLinks: [
          { title: 'MDN Web Docs: Client-Server Overview', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview', source: 'MDN' }
        ]
      },
      {
        id: 'lesson-5-2',
        moduleId: 'mod-5',
        lessonNumber: '5.2',
        title: 'Environment Variables and Secret Hygiene',
        learningObjective: 'Safely configure API keys using .env files without accidentally publishing secrets to GitHub.',
        estimatedDuration: '30 min',
        plainLanguageExplanation: [
          'Every year, thousands of beginner programmers leak their credit card-backed API keys to public GitHub repositories. Automated bots scrape GitHub 24/7, find leaked keys within 3 seconds, and run up $5,000 bills on cloud servers.',
          'The solution is Environment Variables stored in a `.env` file.',
          'A `.env` file lives on your computer and is listed in `.gitignore`. Git completely ignores it and NEVER uploads it to the internet.',
          'Alongside your `.env`, you commit a `.env.example` file that contains fake placeholder values so collaborators know what keys are needed without exposing your real secret.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Verify your .gitignore file',
            instruction: 'Open `/.gitignore` in your project root. Ensure `.env`, `.env.local`, and `.env.*.local` are clearly listed.'
          },
          {
            step: 2,
            title: 'Understand Client vs Server Prefix Rules',
            instruction: 'In Vite, only variables starting with `VITE_` (e.g. `VITE_APP_TITLE`) are bundled into client code. Variables without `VITE_` remain private to server-side Node.js.'
          },
          {
            step: 3,
            title: 'Never hardcode keys in prompt instructions',
            instruction: 'If you paste a secret key directly into an AI chat prompt, it can be cached or logged in conversation history. Always pass variables via process.env.'
          }
        ],
        exampleConcept: {
          title: '.env vs .env.example',
          explanation: '.env has real keys and stays private. .env.example has dummy placeholders and is shared on GitHub.',
          badExample: '// In .env.example\nSTRIPE_SECRET_KEY="sk_live_981273918273918273" (LEAKED REAL SECRET!)',
          goodExample: '// In .env.example\nSTRIPE_SECRET_KEY="your_stripe_secret_key_here"'
        },
        copyableSnippet: {
          type: 'code',
          title: 'Standard .env.example Template',
          content: '# Server-side secrets (never expose to browser)\nGEMINI_API_KEY="your_api_key_here"\nDATABASE_URL="postgresql://user:pass@localhost:5432/mydb"\n\n# Client-side public configurations\nVITE_APP_URL="http://localhost:3000"'
        },
        handsOnExercise: {
          task: 'Check your repository root to confirm if .env is properly ignored.',
          hint: 'Run git status in your terminal and ensure .env does not show up under "Untracked files".',
          solutionPrompt: 'Run: `git status`. If .env appears in red, open .gitignore and add `.env`. Save .gitignore, run `git status` again, and confirm .env has vanished from tracking.'
        },
        commonMistakes: [
          'Committing .env files to GitHub public repositories.',
          'Naming a secret key with VITE_ prefix, causing Vite to expose it to the public browser inspector.',
          'Hardcoding secrets in source files instead of referencing process.env.'
        ],
        completionChecklist: [
          'My .gitignore contains `.env` and `.env.local`.',
          'I keep all real credentials in `.env` and placeholders in `.env.example`.',
          'I understand that VITE_ prefixes expose variables to client browsers.'
        ],
        officialDocLinks: [
          { title: 'Vite Guide: Env Variables and Modes', url: 'https://vite.dev/guide/env-and-mode.html', source: 'Vite' }
        ]
      }
    ]
  },
  {
    id: 'mod-6',
    moduleNumber: 6,
    title: 'Debugging',
    tagline: 'Learn error reproduction, reading logs, isolating problems, and writing surgical prompts.',
    description: 'Transform debugging from a terrifying mystery into a predictable diagnostic process. Master DevTools, isolate root causes, and break the hallucination loop.',
    prerequisites: ['Module 1, 2, 3 & 5.'],
    estimatedEffort: '2.5 hours',
    learningOutcomes: [
      'Extract exact error messages and stack traces from the browser DevTools console.',
      'Differentiate between compile-time TypeScript errors and runtime JavaScript crashes.',
      'Write surgical debugging prompts that fix bugs without breaking working code.',
      'Use Git checkpoints to revert hallucinated changes in 10 seconds.'
    ],
    lessons: [
      {
        id: 'lesson-6-1',
        moduleId: 'mod-6',
        lessonNumber: '6.1',
        title: 'The Console-First Diagnostic Protocol',
        learningObjective: 'Extract precise line numbers and stack traces instead of guessing why a page is broken.',
        estimatedDuration: '40 min',
        plainLanguageExplanation: [
          'When something goes wrong in a web app, beginners often stare at the screen in panic and tell the AI: "It is broken, fix it!"',
          'This forces the AI to guess. 90% of the time, the AI will guess wrong, rewrite parts of your code that were perfectly fine, and introduce two brand new bugs.',
          'Your computer already knows exactly what went wrong, which file caused it, and on which line number. It wrote all of this down in the Browser Console.',
          'By pressing `F12` (or Right-Click -> Inspect -> Console), you can see the exact red error string. Feeding that line directly to the AI turns a 2-hour nightmare into a 15-second surgical fix.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Open DevTools Console',
            instruction: 'Press `Cmd + Opt + I` on Mac or `F12` on Windows. Click the "Console" tab.'
          },
          {
            step: 2,
            title: 'Trigger the bug',
            instruction: 'Click the button or perform the action that broke the page. Watch for bright red error text appearing in the console.'
          },
          {
            step: 3,
            title: 'Copy the Error and File Line',
            instruction: 'Look at the right side of the error line. It will say something like `Timer.tsx:42:18`. That means file `Timer.tsx`, line 42.'
          },
          {
            step: 4,
            title: 'Construct the Surgical Fix Prompt',
            instruction: 'Feed the exact error and file path to the AI with strict preservation rules.'
          }
        ],
        exampleConcept: {
          title: 'Vague Bug Report vs Surgical Diagnostic',
          explanation: 'Supplying the exact error stack lets the model locate the undefined variable instantly.',
          badExample: '"The submit button does nothing when I click it. Please fix the whole app."',
          goodExample: '"When clicking Submit in /src/components/Form.tsx, the console throws: `Uncaught TypeError: Cannot read properties of undefined (reading \'email\') at Form.tsx:38`. Fix line 38 with a null-check without altering other working handlers."'
        },
        copyableSnippet: {
          type: 'prompt',
          title: 'Surgical Bug Fix Prompt Template',
          content: 'I encountered the following runtime error when clicking [ACTION]:\n\n```\n[PASTE RED CONSOLE ERROR HERE]\n```\n\nTARGET FILE: [FILE_PATH]\n\nPRESERVATION CONSTRAINTS:\n- Do not rewrite unrelated components.\n- Explain the root cause in 2 sentences.\n- Add defensive null-safety so this edge case never throws again.'
        },
        handsOnExercise: {
          task: 'Diagnose what caused `TypeError: user.todos.map is not a function`.',
          hint: 'What happens when user.todos is undefined or null instead of an array?',
          solutionPrompt: 'The error occurs because `user.todos` is null or undefined (e.g. while data is still loading from an API), so calling `.map()` crashes. Fix by defaulting: `const todos = user?.todos || []; todos.map(...)`.'
        },
        commonMistakes: [
          'Saying "it is broken" without opening the browser console.',
          'Pasting the error but forgetting to tell the AI which file caused it.',
          'Letting the AI rewrite an entire 500-line file to fix a single missing null check.'
        ],
        completionChecklist: [
          'I know how to open the browser DevTools Console in under 3 seconds.',
          'I can identify the file name and line number in an error stack trace.',
          'I always supply the exact error string in my debug prompts.'
        ],
        officialDocLinks: [
          { title: 'Chrome DevTools Console Documentation', url: 'https://developer.chrome.com/docs/devtools/console', source: 'Google Chrome' }
        ]
      },
      {
        id: 'lesson-6-2',
        moduleId: 'mod-6',
        lessonNumber: '6.2',
        title: 'Breaking the Hallucination Loop with Git Checkpoints',
        learningObjective: 'Use git commits as atomic save points to prevent AI models from wrecking working codebases.',
        estimatedDuration: '35 min',
        plainLanguageExplanation: [
          'Every vibecoder eventually encounters the "Hallucination Death Spiral":',
          'The AI introduces a tiny bug. You ask it to fix the bug. It apologizes, writes new code, breaks two more components, and starts replacing working sections with comments like `// ...rest of code remains same`. You panic, ask it to fix that, and within 10 minutes your working app is completely destroyed.',
          'The antidote to the death spiral is Git Checkpoints.',
          'Think of Git like a video game quick-save. Every time a feature works, you make a commit ("Quick-save"). If the AI goes rogue on the next turn, you run one single command (`git checkout .`) and your code instantly snaps back to the pristine working state.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Commit every working milestone',
            instruction: 'Whenever a button works, run `git add .` and `git commit -m "Working timer component"`. Takes 5 seconds.'
          },
          {
            step: 2,
            title: 'Apply the 2-Attempt Rule',
            instruction: 'If an AI fails to fix an issue twice in a row, STOP. Do not send a third message in that chat thread.'
          },
          {
            step: 3,
            title: 'Revert and Reset',
            instruction: 'Run `git checkout .` to erase the bad changes. Open a brand new conversation thread, summarize the problem with the exact console error, and try again with smaller scope.'
          }
        ],
        exampleConcept: {
          title: 'The Infinite Argument vs The Clean Revert',
          explanation: 'Arguing in a degraded context thread makes the model dumber; reverting resets reasoning.',
          badExample: 'Turn 12 in the same thread: "No, that broke the navigation! Revert that! Wait now the footer is gone! Why did you do that?!"',
          goodExample: 'Terminal: `git checkout .` -> Start clean thread with fresh context and atomic scope.'
        },
        copyableSnippet: {
          type: 'terminal',
          title: 'The Universal Git Quick-Save & Revert Commands',
          content: '# 1. Save your progress when a feature works:\ngit add .\ngit commit -m "Working state: completed feature X"\n\n# 2. If the AI messes up, discard all changes and revert:\ngit checkout .\n\n# 3. Clean untracked garbage files:\ngit clean -fd'
        },
        handsOnExercise: {
          task: 'Simulate a rollback in your local repository using git checkout.',
          hint: 'Make a temporary edit in App.tsx, check git status, and revert it.',
          solutionPrompt: 'Run: `git status` (shows App.tsx modified). Run: `git checkout App.tsx`. Open App.tsx: your previous clean working version is restored!'
        },
        commonMistakes: [
          'Coding for 4 hours without making a single git commit.',
          'Arguing with an AI in a 40-message chat thread where context has degraded.',
          'Accepting truncated files that delete your existing business logic.'
        ],
        completionChecklist: [
          'I commit working progress to git every 15–20 minutes.',
          'I know the exact command to discard bad changes (`git checkout .`).',
          'I follow the 2-Attempt Rule and reset chat threads when stuck.'
        ],
        officialDocLinks: [
          { title: 'Git Documentation: Undoing Things', url: 'https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things', source: 'Git-SCM' }
        ]
      }
    ]
  },
  {
    id: 'mod-7',
    moduleNumber: 7,
    title: 'Testing and Security',
    tagline: 'Cover functional tests, input sanitization, secret management, and AI code risks.',
    description: 'Protect your users and yourself. Learn how to verify that AI-generated code is safe, validate user inputs, and prevent security vulnerabilities.',
    prerequisites: ['Module 1 through 6.'],
    estimatedEffort: '2 hours',
    learningOutcomes: [
      'Understand common security vulnerabilities in AI-generated code.',
      'Sanitize user inputs to prevent Cross-Site Scripting (XSS) and injection.',
      'Audit dependencies with npm audit.',
      'Set up automated linting and typecheck verification.'
    ],
    lessons: [
      {
        id: 'lesson-7-1',
        moduleId: 'mod-7',
        lessonNumber: '7.1',
        title: 'Common Security Vulnerabilities in AI-Generated Code',
        learningObjective: 'Identify and patch security vulnerabilities frequently introduced by AI code generators.',
        estimatedDuration: '35 min',
        plainLanguageExplanation: [
          'AI models are trained to write code that *works*, not necessarily code that is *secure*. When asked to build a feature quickly, AI models routinely cut corners on security.',
          'THE TOP 3 AI SECURITY RISKS:',
          '1. Insecure Deserialization / dangerouslySetInnerHTML: AI models sometimes render raw user input as unescaped HTML, opening your visitors up to Cross-Site Scripting (XSS) attacks.',
          '2. Unchecked Database Access: Forgetting to enable Row Level Security (RLS) in Supabase/Firebase, allowing any anonymous user on the internet to read or delete all database rows.',
          '3. Permissive CORS Headers: Setting `Access-Control-Allow-Origin: *` on private authenticated endpoints.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Audit for dangerouslySetInnerHTML',
            instruction: 'Search your codebase for `dangerouslySetInnerHTML`. Never render unescaped text from external users directly into the DOM.'
          },
          {
            step: 2,
            title: 'Always enable Row Level Security (RLS)',
            instruction: 'In Postgres/Supabase, verify every table has `ALTER TABLE my_table ENABLE ROW LEVEL SECURITY;`.'
          },
          {
            step: 3,
            title: 'Run automated vulnerability audits',
            instruction: 'Run `npm audit` in your terminal to check if any third-party packages contain known public security exploits.'
          }
        ],
        exampleConcept: {
          title: 'Unsanitized HTML vs Safe React Rendering',
          explanation: 'React safely escapes strings by default; never bypass it without sanitization.',
          badExample: '<div dangerouslySetInnerHTML={{ __html: userComment }} /> (Vulnerable to XSS)',
          goodExample: '<div className="text-neutral-800">{userComment}</div> (Automatically escaped and safe)'
        },
        copyableSnippet: {
          type: 'terminal',
          title: 'Security Audit & Typecheck Command',
          content: '# Check for known npm security vulnerabilities:\nnpm audit\n\n# Check for strict TypeScript type violations:\nnpx tsc --noEmit'
        },
        handsOnExercise: {
          task: 'Explain why Row Level Security (RLS) is required in Supabase even if your frontend code only queries the current user\'s data.',
          hint: 'Can an attacker open their browser console and run custom Supabase queries directly?',
          solutionPrompt: 'Because any user can open their browser DevTools and call `supabase.from("orders").select("*")` directly with their public API key. Without RLS enabled on the server, the database returns all orders across all customers.'
        },
        commonMistakes: [
          'Trusting that AI-generated database schemas are secure by default.',
          'Using dangerouslySetInnerHTML on user-submitted markdown without DOMPurify.',
          'Leaving test API keys with billing enabled active in public code.'
        ],
        completionChecklist: [
          'I searched my codebase for dangerouslySetInnerHTML.',
          'I know why Row Level Security (RLS) must be enabled on every table.',
          'I regularly run `npm audit` to check dependency health.'
        ],
        officialDocLinks: [
          { title: 'OWASP Top 10 Web Application Security Risks', url: 'https://owasp.org/www-project-top-ten/', source: 'OWASP' }
        ]
      }
    ]
  },
  {
    id: 'mod-8',
    moduleNumber: 8,
    title: 'Deployment and Production',
    tagline: 'Production builds, environment configuration, custom domains, hosting, and rollbacks.',
    description: 'Take your code out of the localhost sandbox. Learn how to configure production builds, connect custom domains, set up automated CI, and handle rollbacks.',
    prerequisites: ['Module 1 through 7.'],
    estimatedEffort: '2 hours',
    learningOutcomes: [
      'Execute clean production builds with `npm run build`.',
      'Deploy applications to Vercel, Netlify, or Cloud Run with automated CI/CD.',
      'Configure custom domain DNS records (A and CNAME records).',
      'Perform instant 1-click rollbacks if a bad release reaches production.'
    ],
    lessons: [
      {
        id: 'lesson-8-1',
        moduleId: 'mod-8',
        lessonNumber: '8.1',
        title: 'Production Builds and 1-Click Hosting on Vercel',
        learningObjective: 'Understand how Vite compiles JSX into static assets and publish to a global CDN.',
        estimatedDuration: '35 min',
        plainLanguageExplanation: [
          'When you are developing locally with `npm run dev`, Vite runs a miniature development server that reloads files on the fly.',
          'You cannot run `npm run dev` on a production server for real users — it is unoptimized, uncompressed, and slow.',
          'Running `npm run build` triggers Vite\'s compiler (Rollup/esbuild). It takes all your TypeScript, React components, and CSS, strips out unused code, minifies file sizes by 70%, and outputs a pristine `/dist` folder of static HTML, CSS, and JS.',
          'Hosts like Vercel and Netlify take this `/dist` folder and replicate it across 100+ data centers worldwide (a Content Delivery Network, or CDN) so your website loads in under 200ms anywhere in the world.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Test your build locally first',
            instruction: 'Always run `npm run build` in your terminal before pushing to GitHub. If the build succeeds locally, it will succeed on Vercel.'
          },
          {
            step: 2,
            title: 'Connect your GitHub repository to Vercel',
            instruction: 'Go to vercel.com -> New Project -> Select your GitHub repo -> Click "Deploy".'
          },
          {
            step: 3,
            title: 'Set Environment Variables in the Host Dashboard',
            instruction: 'Add all values from your `.env` file into Vercel Project Settings -> Environment Variables.'
          }
        ],
        exampleConcept: {
          title: 'Dev Server vs Production Build',
          explanation: 'Dev servers are for fast editing; production builds are minified for global speed.',
          badExample: 'Pushing untested code with TypeScript errors and wondering why Vercel deployment failed.',
          goodExample: 'Running `npm run lint && npm run build` locally, seeing green success, and pushing with confidence.'
        },
        copyableSnippet: {
          type: 'terminal',
          title: 'Local Build Verification Commands',
          content: '# Test TypeScript types:\nnpx tsc --noEmit\n\n# Run production build:\nnpm run build\n\n# Preview the production build locally at localhost:4173:\nnpm run preview'
        },
        handsOnExercise: {
          task: 'Run a production build in your terminal and inspect the generated dist/ folder.',
          hint: 'Run npm run build and check dist/assets to see minified files.',
          solutionPrompt: 'Run: `npm run build`. Inspect the terminal output: it shows output files like `dist/index.html` and `dist/assets/index-[hash].js` with their minified gzip sizes.'
        },
        commonMistakes: [
          'Pushing code that has TypeScript errors, causing Vercel builds to fail.',
          'Forgetting to enter environment variables in the hosting dashboard.',
          'Committing the `/dist` or `/node_modules` folders to Git (they belong in .gitignore).'
        ],
        completionChecklist: [
          'I understand what `npm run build` actually does.',
          'My build passes locally with zero errors before pushing.',
          'I know how to add environment variables in my hosting dashboard.'
        ],
        officialDocLinks: [
          { title: 'Vercel Deployment Guide', url: 'https://vercel.com/docs/deployments/overview', source: 'Vercel' }
        ]
      }
    ]
  },
  {
    id: 'mod-9',
    moduleNumber: 9,
    title: 'Build and Ship',
    tagline: 'Complete end-to-end projects with specifications, implementation plans, and release checklists.',
    description: 'Put all previous 8 modules into action. Build two complete production projects from scratch: an ambient audio synthesizer and a full-stack micro-SaaS with Stripe.',
    prerequisites: ['Modules 1 through 8.'],
    estimatedEffort: '4 hours',
    learningOutcomes: [
      'Execute a complete zero-to-one build following the 6-stage lifecycle.',
      'Deploy a fully functioning web tool with zero placeholder code.',
      'Test all happy and unhappy paths before public release.',
      'Publish a launch post with compelling video proof.'
    ],
    lessons: [
      {
        id: 'lesson-9-1',
        moduleId: 'mod-9',
        lessonNumber: '9.1',
        title: 'Capstone Project 1: The Ambient Audio Synthesizer',
        learningObjective: 'Build and ship an interactive Web Audio synthesizer from scratch in under 3 hours.',
        estimatedDuration: '90 min',
        plainLanguageExplanation: [
          'Now it is time to build a real product. We are creating "SoundPulse": a zero-dependency browser synthesizer that generates binaural theta waves (432Hz) and pink noise for deep focus.',
          'Why this project? 1. It requires real Web Audio API integration (no fake mock code). 2. It has an interactive HTML5 canvas frequency visualizer. 3. It runs 100% locally with zero backend costs.',
          'Follow the step-by-step phased execution sequence below to direct your AI editor.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Phase 1: Audio Context Engine',
            instruction: 'Prompt the AI to build `/src/audio/engine.ts` with singleton AudioContext, binaural oscillator, and noise buffer.'
          },
          {
            step: 2,
            title: 'Phase 2: Live Canvas Waveform',
            instruction: 'Connect an AnalyserNode to a canvas element in `/src/components/Visualizer.tsx` that draws smooth 60fps wave oscillations.'
          },
          {
            step: 3,
            title: 'Phase 3: Light + Neon Master Controls',
            instruction: 'Build the master player with warm off-white canvas (#F8F7F2), neon lime sliders, and sleep timer fadeout.'
          },
          {
            step: 4,
            title: 'Phase 4: Build & Deploy',
            instruction: 'Run `npm run build` and deploy to Vercel.'
          }
        ],
        exampleConcept: {
          title: 'The Capstone Architecture',
          explanation: 'Oscillators feed into GainNodes, which feed into AnalyserNode and Audio Destination.',
          goodExample: '[AudioContext] -> [GainNode] -> [AnalyserNode] -> [Speakers]'
        },
        copyableSnippet: {
          type: 'prompt',
          title: 'Capstone Step 1 Prompt: Audio Engine',
          content: 'You are the lead audio engineer. Create /src/audio/engine.ts using Web Audio API. Export functions: startBinauralBeat(carrierFreq = 432, beatFreq = 6), startPinkNoise(), setMasterVolume(val), and stopAll(). Ensure AudioContext safely resumes on first user click.'
        },
        handsOnExercise: {
          task: 'Build and verify Phase 1 of SoundPulse in your workspace.',
          hint: 'Remember that browsers block sound until the user clicks an initial button.',
          solutionPrompt: 'Create a Start/Stop button in your UI wired to `startBinauralBeat()` and verify sound plays through your headphones.'
        },
        commonMistakes: [
          'Trying to play audio immediately on page load without waiting for user click.',
          'Forgetting to cancel requestAnimationFrame in visualizer cleanup.',
          'Allowing multiple oscillators to multiply volume into speaker distortion.'
        ],
        completionChecklist: [
          'Sound plays cleanly through headphones with zero clipping.',
          'Canvas draws real-time glowing neon wave lines.',
          'Deployed live to an HTTPS URL on Vercel.'
        ],
        officialDocLinks: [
          { title: 'Web Audio API Basics on MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API', source: 'MDN' }
        ]
      },
      {
        id: 'lesson-9-2',
        moduleId: 'mod-9',
        lessonNumber: '9.2',
        title: 'Capstone Project 2: Micro-SaaS with Stripe & Auth',
        learningObjective: 'Connect user authentication, database persistence, and Stripe checkout payments.',
        estimatedDuration: '120 min',
        plainLanguageExplanation: [
          'The ultimate milestone for any vibecoder is charging real money for software.',
          'In this capstone, you connect: 1. Google 1-click OAuth via Supabase or Firebase. 2. A tiered pricing table. 3. A Stripe Hosted Checkout redirect. 4. A secure webhook listener that upgrades user status in the database.',
          'When completed, you have a repeatable template to launch and monetize any software idea in 48 hours.'
        ],
        practicalSteps: [
          {
            step: 1,
            title: 'Set up Supabase or Firebase project',
            instruction: 'Create users table with email and subscription_tier ("free" | "pro").'
          },
          {
            step: 2,
            title: 'Configure Stripe Test Products',
            instruction: 'Create a "Pro Plan ($19/mo)" in your Stripe dashboard under Test Mode and copy the Price ID.'
          },
          {
            step: 3,
            title: 'Build the Checkout Endpoint',
            instruction: 'Create `/api/create-checkout-session` using the official stripe SDK.'
          },
          {
            step: 4,
            title: 'Test Webhook Verification with Stripe CLI',
            instruction: 'Run `stripe listen --forward-to localhost:3000/api/webhooks` and trigger a test payment.'
          }
        ],
        exampleConcept: {
          title: 'The Payment Lifecycle',
          explanation: 'Never grant pro access until the cryptographically signed webhook fires from Stripe.',
          goodExample: 'User Clicks Upgrade -> Stripe Checkout -> Stripe Webhook -> Update DB: tier="pro" -> User Unlocks Pro UI'
        },
        copyableSnippet: {
          type: 'code',
          title: 'Stripe Webhook Listener Signature Verification',
          content: 'import Stripe from "stripe";\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);\n\nexport async function handleStripeWebhook(req: Request) {\n  const sig = req.headers.get("stripe-signature")!;\n  const rawBody = await req.text();\n  const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);\n  \n  if (event.type === "checkout.session.completed") {\n    const session = event.data.object as Stripe.Checkout.Session;\n    // Upgrade user in database using session.client_reference_id\n  }\n}'
        },
        handsOnExercise: {
          task: 'Complete a test purchase using Stripe test card 4242 4242 4242 4242.',
          hint: 'Use Stripe test mode with any future expiry date and 3-digit CVC.',
          solutionPrompt: 'Open test checkout, fill card 4242..., submit, verify webhook receives checkout.session.completed, and confirm user flips to pro tier in your database.'
        },
        commonMistakes: [
          'Parsing the request body as JSON before passing it to Stripe webhook constructEvent (breaks signature verification).',
          'Testing Stripe webhooks with live credit cards instead of Stripe Test Mode.',
          'Forgetting to configure a Customer Portal link so users can cancel self-serve.'
        ],
        completionChecklist: [
          'User can sign in with 1-click Google OAuth.',
          'Checkout redirects to Stripe Test Mode and completes cleanly.',
          'Webhook automatically upgrades customer tier in database.',
          'Customer Portal allows subscription management.'
        ],
        officialDocLinks: [
          { title: 'Stripe Checkout Quickstart', url: 'https://docs.stripe.com/checkout/quickstart', source: 'Stripe' },
          { title: 'Supabase Auth Documentation', url: 'https://supabase.com/docs/guides/auth', source: 'Supabase' }
        ]
      }
    ]
  }
];
