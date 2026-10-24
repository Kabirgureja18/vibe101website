import { LearningPath } from '../types';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'novice',
    title: 'Complete Beginners',
    tagline: 'Zero to One: From zero coding knowledge to shipping your first live web app.',
    targetAudience: 'Anyone who has never touched a terminal, written JavaScript, or configured Git.',
    estimatedHours: '5–6 hours',
    stepsCount: 4,
    description: 'Master the mental shift from memorizing syntax to directing autonomous models. Learn how files work, how to direct AI without getting stuck in loops, and how to publish a link to the internet.',
    icon: 'Sparkles',
    steps: [
      {
        id: 'novice-1',
        title: 'The Vibecoding Mental Model',
        summary: 'Understand what programming actually is now: specifications, architectural boundaries, and feedback loops.',
        duration: '25 min',
        category: 'Mindset',
        content: [
          'In traditional coding, you spent 80% of your time memorizing syntax, commas, type systems, and library APIs.',
          'In vibecoding, you are the product director and quality control engineer. The AI model is an extraordinarily fast junior engineer with mild short-term memory loss and infinite stamina.',
          'Your job is not typing code. Your job is providing crisp constraints, verifying behavior, and catching hallucinations before they metastasize.'
        ],
        keyTakeaways: [
          'Never ask the AI to build a whole app in one prompt.',
          'Small, verifiable increments beat monolithic wall-of-text prompts every single time.',
          'The prompt is your spec. If your instructions are vague, the generated UI will be generic.'
        ],
        vibeLaw: 'Vibe Law #1: Context is Oxygen. If you do not give the AI concrete constraints, it defaults to purple gradients and fake dashboard stats.'
      },
      {
        id: 'novice-2',
        title: 'Demystifying the Modern Stack',
        summary: 'What are files, packages, local servers, and terminal windows in plain English?',
        duration: '35 min',
        category: 'Tooling',
        content: [
          'A web application is just a folder of plain text files on your computer.',
          'index.html is the skeleton. App.tsx (React/TypeScript) is the brain and visual layout. package.json is the grocery shopping list of tools your app needs.',
          'The "Terminal" is just a text conversation with your operating system. Running `npm run dev` tells your machine: "Start a miniature private website at localhost:3000 so I can preview my work."'
        ],
        keyTakeaways: [
          'You only run 3-4 standard commands: install, run dev, build, lint.',
          'Localhost:3000 means "only visible on this computer right now."',
          'Node.js is the engine that executes JavaScript outside a browser.'
        ],
        terminalSnippet: '# The universal 3-step startup dance\nnpm install\nnpm run dev\n# Press Ctrl+C in terminal whenever you want to stop the server',
        vibeLaw: 'Vibe Law #2: If the terminal prints red text, do not panic. Copy the exact red error and paste it directly into your AI editor.'
      },
      {
        id: 'novice-3',
        title: 'The 3-Sentence Prompting Rule',
        summary: 'The bulletproof prompt structure for asking AI editors to build new features.',
        duration: '30 min',
        category: 'Prompting',
        content: [
          'Great vibecoders do not write essay prompts. They use the Role-Constraint-Behavior formula:',
          '1. Role & Intent: State what we are building and what problem it solves.',
          '2. Exact Constraints: Specify the file, visual aesthetic (colors, fonts, layout), and forbidden patterns.',
          '3. Verification Criteria: Specify how you will confirm it actually works before moving to the next task.'
        ],
        keyTakeaways: [
          'State what NOT to do as explicitly as what to do.',
          'Always ask for single-file or single-component changes at first.',
          'Demand working interactivity — no placeholder mock functions.'
        ],
        suggestedPrompt: 'Create a responsive Pomodoro timer component in /src/components/Timer.tsx. Use a clean off-white background with bold black typography and neon lime accents. When the start button is clicked, count down accurately from 25:00 using a window.setInterval, play a sound when done, and provide a reset button. Do not use external UI libraries.',
        vibeLaw: 'Vibe Law #3: A prompt without constraints is an invitation for AI slop.'
      },
      {
        id: 'novice-4',
        title: 'Deploying to the Live Internet in 60 Seconds',
        summary: 'Turn your localhost project into an HTTPS link that anyone on Earth can open.',
        duration: '30 min',
        category: 'Shipping',
        content: [
          'Your app only lives on your laptop until you push it to a host like Vercel, Netlify, or Cloud Run.',
          'Connect your GitHub repository to Vercel with two clicks. Every time you push new code, Vercel automatically builds and deploys your changes to an HTTPS domain.',
          'Add a custom domain by adding two simple DNS records.'
        ],
        keyTakeaways: [
          'A project that lives only on localhost is a ghost.',
          'Automatic CI/CD means you push to GitHub and the internet updates instantly.',
          'Share your link with real humans for immediate feedback.'
        ],
        vibeLaw: 'Vibe Law #4: Shipping is the greatest debugger known to humankind.'
      }
    ]
  },
  {
    id: 'ai-web',
    title: 'AI-Assisted Web Development',
    tagline: 'Orchestrating autonomous agents, IDE Composer modes, and multi-file codebases.',
    targetAudience: 'Builders looking to maximize velocity with Cursor, Windsurf, Lovable, and Claude.',
    estimatedHours: '6–8 hours',
    stepsCount: 4,
    description: 'Learn how modern AI-native IDEs operate under the hood. Master multi-file agent edits, file scoping, dependency isolation, and context management.',
    icon: 'Cpu',
    steps: [
      {
        id: 'ai-web-1',
        title: 'Choosing and Mastering Your AI IDE',
        summary: 'Cursor vs Windsurf vs Claude Dev: Choosing the right engine for your project scope.',
        duration: '40 min',
        category: 'Tooling',
        content: [
          'Different tools excel at different stages. Lovable and v0 are unmatched for rapid frontend scaffolding.',
          'Cursor Composer is the gold standard for full-stack multi-file code editing.',
          'Windsurf Cascade is exceptional when you need deep awareness of running terminal commands and build logs.'
        ],
        keyTakeaways: [
          'Use browser sandboxes for rapid prototypes, then pull down to local Cursor for production polish.',
          'Always configure .cursorrules before writing feature code.',
          'Keep your chat thread focused on a single feature branch.'
        ],
        vibeLaw: 'Vibe Law #5: The tool is only as capable as the context boundary you feed it.'
      },
      {
        id: 'ai-web-2',
        title: 'Multi-File Agent Orchestration',
        summary: 'Directing AI agents across models, hooks, components, and route boundaries without conflicts.',
        duration: '45 min',
        category: 'Architecture',
        content: [
          'Never tell an agent: "Build authentication, payments, and dark mode all at once."',
          'Decompose features into atomic contracts: Types first, Custom hooks second, Visual components third, Integration fourth.',
          'Verify compiler output with `tsc --noEmit` after every single agent modification.'
        ],
        keyTakeaways: [
          'Contract-driven development prevents cascading broken imports.',
          'Limit agent edits to 1–2 files per turn.',
          'Check git diff before approving agent file writes.'
        ],
        terminalSnippet: '# Check for compiler and type errors across entire workspace\nnpx tsc --noEmit',
        vibeLaw: 'Vibe Law #6: If an agent writes code that breaks types, revert immediately rather than patching over patches.'
      },
      {
        id: 'ai-web-3',
        title: 'Model Context Protocol (MCP) Integration',
        summary: 'Giving your AI editor live access to Postgres schemas, browser DOMs, and GitHub PRs.',
        duration: '50 min',
        category: 'Tooling',
        content: [
          'MCP connects your AI assistant directly to external tools and data sources: Postgres databases, GitHub PRs, Puppeteer browsers, and local file systems.',
          'Instead of copy-pasting database schemas, the agent queries `information_schema` live, tests SQL queries, and generates types directly.',
          'Configure MCP servers in your editor settings with sandboxed environment variables.'
        ],
        keyTakeaways: [
          'Use Postgres MCP for instant schema awareness and migrations.',
          'Use Browser/Puppeteer MCP to let the agent inspect visual rendering and console logs automatically.',
          'Never put production API credentials into an unrestricted MCP tool.'
        ],
        terminalSnippet: '# Sample MCP configuration in Claude / Cursor\n{\n  "mcpServers": {\n    "postgres": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]\n    }\n  }\n}',
        vibeLaw: 'Vibe Law #7: An agent with live tool execution is an order of magnitude more competent than a pure text generator.'
      },
      {
        id: 'ai-web-4',
        title: 'Local-First Reactive State Architecture',
        summary: 'Building apps that boot instantly, work offline, and never show blank loading voids.',
        duration: '45 min',
        category: 'Architecture',
        content: [
          'Cloud-first apps with 10 loading spinners feel sluggish. Local-first apps store state in LocalStorage or IndexedDB immediately and sync in the background.',
          'Design an immutable state machine where actions produce predictable next states.',
          'Provide clear export/import capabilities so users own their data in portable JSON.'
        ],
        keyTakeaways: [
          'Optimistic UI updates make applications feel instantaneous.',
          'Handle hydration mismatches cleanly in React.',
          'Always provide backup JSON export for user trust.'
        ],
        vibeLaw: 'Vibe Law #8: Speed is the ultimate feature. Instant local state beats remote spinners.'
      }
    ]
  },
  {
    id: 'frontend-ui',
    title: 'UI and Frontend Development',
    tagline: 'Craft distinctive, award-worthy web interfaces with zero generic AI tropes.',
    targetAudience: 'Designers, front-of-the-frontend devs, and creators demanding high visual taste.',
    estimatedHours: '5–7 hours',
    stepsCount: 4,
    description: 'Enforce the Anti-AI-Slop Constitution: eliminate pill-badge sandwiches, dictate 60-30-10 color math, master Bricolage display typography, and add spring physics motion.',
    icon: 'Palette',
    steps: [
      {
        id: 'frontend-1',
        title: 'The Anti-Slop Visual Constitution',
        summary: 'How to forbid AI from defaulting to pill-badge sandwiches, purple gradients, and floating stats.',
        duration: '35 min',
        category: 'Mindset',
        content: [
          'AI models are trained on the median of the web — which means they default to generic SaaS tropes: rounded-2xl cards with 1px translucent borders, decorative pulsing green dots, and pill tags.',
          'As a designer, you must enforce strict typographic and spatial discipline in your system prompt.',
          'Specify the 60-30-10 color rule, forbid static metadata pill enclosures, and demand editorial typographic pairings.'
        ],
        keyTakeaways: [
          'Pills are for functional interactive filter buttons, never for static text metadata.',
          'Use natural title case prose instead of mechanical "// 01 ARCHITECTURE" prefixes.',
          'Establish a single governing visual motif across cards rather than cloning identical boxes.'
        ],
        vibeLaw: 'Vibe Law #9: Generic prompts produce generic interfaces. Your taste is the differentiator.'
      },
      {
        id: 'frontend-2',
        title: 'Tailwind v4 & Asymmetric Editorial Grids',
        summary: 'Directing complex editorial grids, fluid typography clamps, and nested radius math.',
        duration: '45 min',
        category: 'Architecture',
        content: [
          'Tailwind CSS is the native lingua franca of AI frontend generation.',
          'Learn to prompt for fluid type: `clamp(2rem, 5vw, 4.5rem)` with `text-wrap: balance` so headlines never have orphan words.',
          'Direct nested radius math: $r_{inner} = r_{outer} - padding$. If outer card has `rounded-2xl` (16px) with `p-4` (16px), inner elements must have `rounded-none` or subtle radius to prevent awkward gaps.'
        ],
        keyTakeaways: [
          'Use CSS Grid `grid-cols-12` for expressive editorial layouts that break free from 3-card boring columns.',
          'Always include `tabular-nums` for any numbers, dates, or metrics.',
          'Enforce single-line controls (`whitespace-nowrap shrink-0`) to avoid ugly wrapping buttons.'
        ],
        suggestedPrompt: 'Refactor this hero layout into an asymmetric 12-column editorial grid. Columns 1–7 contain an oversized display headline using Bricolage Grotesque with clamp(2.5rem, 5vw, 4rem) and tight negative tracking (-0.03em). Columns 8–12 contain a high-contrast dark card with nested padding and hairline borders (border-black/10). No pill badges.',
        vibeLaw: 'Vibe Law #10: Spatial math separates professional interfaces from amateur templates.'
      },
      {
        id: 'frontend-3',
        title: 'Physics-Based Micro-Motion',
        summary: 'Adding spring physics, stagger reveals, and responsive cursor interactions.',
        duration: '40 min',
        category: 'Prompting',
        content: [
          'Linear CSS transitions feel dead and robotic. Great vibecoded apps use spring physics (`stiffness: 350, damping: 25`).',
          'Only animate compositor properties (`transform`, `opacity`, `filter`). Never animate layout geometry (`width`, `height`, `margin`) during scroll or hover.',
          'Micro-interactions must settle in under 200ms; users should never feel like they are waiting for an animation to finish clicking.'
        ],
        keyTakeaways: [
          'Use Motion (Framer Motion) for UI component transitions and stagger children.',
          'Respect `prefers-reduced-motion` for accessibility.',
          'Keep interactive states snappy: hover states should respond within 100ms.'
        ],
        vibeLaw: 'Vibe Law #11: If an animation delays a user action by more than 250ms, it is an obstacle, not design.'
      },
      {
        id: 'frontend-4',
        title: 'The Design Polish Checklist',
        summary: 'The final 15-minute audit to elevate a prototype into an award-worthy product.',
        duration: '30 min',
        category: 'Debugging',
        content: [
          'Check touch target sizes on mobile (minimum 44x44px).',
          'Verify WCAG AA contrast (minimum 4.5:1 for body text, 3:1 for large display titles).',
          'Ensure optical compensation for dark mode: white text on black background requires slightly heavier weight or letter spacing.',
          'Eliminate dead clicks: every button must trigger state, an alert toast, or navigation.'
        ],
        keyTakeaways: [
          'Audit on actual mobile device, not just resized desktop window.',
          'Check empty states for lists, search results, and bookmarks.',
          'Confirm favicon, title, and social OpenGraph share images are custom.'
        ],
        vibeLaw: 'Vibe Law #12: Polish is not decoration; polish is the elimination of friction.'
      }
    ]
  },
  {
    id: 'prompt-eng',
    title: 'Prompt Engineering',
    tagline: 'Master context architecture, system directives, negative constraints, and few-shot specs.',
    targetAudience: 'Engineers who want predictable, deterministic code generation from LLMs.',
    estimatedHours: '4–6 hours',
    stepsCount: 4,
    description: 'Stop hoping and start specifying. Master role definition, few-shot contrasting examples (DO and DONT blocks), token management, and custom .cursorrules files.',
    icon: 'Terminal',
    steps: [
      {
        id: 'prompt-1',
        title: 'The Anatomy of a Production Prompt',
        summary: 'Role, Invariants, Constraints, and Acceptance Criteria: The 4 pillars of prompt engineering.',
        duration: '35 min',
        category: 'Prompting',
        content: [
          'Amateurs write prompts as questions ("Can you make a website?"). Professionals write prompts as architectural specifications.',
          'Define the technical baseline upfront (e.g. React 19, TypeScript, Tailwind v4).',
          'Specify negative constraints: what the model is strictly forbidden from doing (e.g. no any, no inline styles, no external unverified image links).'
        ],
        keyTakeaways: [
          'Models follow negative constraints best when paired with a concrete alternative.',
          'Keep your prompt under 1,000 words to prevent attention dilution.',
          'Define expected return format (e.g. "pure TSX component code in a single pristine block").'
        ],
        vibeLaw: 'Vibe Law #13: An unconstrained prompt is an invitation for random choices.'
      },
      {
        id: 'prompt-2',
        title: 'Architecting .cursorrules and GEMINI.md',
        summary: 'Codifying permanent repo invariants that govern every subsequent AI response.',
        duration: '40 min',
        category: 'Architecture',
        content: [
          'Without system instructions, agents re-invent your file structure, install duplicate dependencies, and write deprecated code.',
          'Your `.cursorrules` or system prompt should specify: framework versions, state management pattern, file naming conventions, error handling contracts, and forbidden packages.',
          'Include concrete positive and negative examples (DO and DON\'T code blocks) — LLMs follow contrasting examples 3x better than abstract instructions.'
        ],
        keyTakeaways: [
          'Place .cursorrules in your repository root.',
          'Specify exact package versions and design tokens.',
          'Mandate strict TypeScript typing with zero any.'
        ],
        suggestedPrompt: 'You are the senior architect for this repository. Invariants: 1. All state must live in custom hooks in /src/hooks/. 2. UI components in /src/components/ must be pure and receive props. 3. Zero usage of any; define explicit interfaces in /src/types/. 4. Always use Tailwind CSS; no inline style attributes.',
        vibeLaw: 'Vibe Law #14: Rules not codified in your system prompt will be violated within 3 agent turns.'
      },
      {
        id: 'prompt-3',
        title: 'Few-Shot Contrasting Examples',
        summary: 'Using DO and DON\'T code blocks to achieve 99% stylistic consistency.',
        duration: '35 min',
        category: 'Prompting',
        content: [
          'Describing an aesthetic in words ("make it modern and clean") fails because models interpret "modern" as generic SaaS cards.',
          'Providing a 5-line DO snippet and a 5-line DONT snippet anchors the model\'s token probabilities with extreme precision.',
          'Show how you want buttons, cards, and metadata laid out in exact JSX.'
        ],
        keyTakeaways: [
          'One concrete example beats three paragraphs of explanation.',
          'Highlight the exact difference between bad code and your standard.',
          'Test whether the model replicates your pattern before proceeding.'
        ],
        vibeLaw: 'Vibe Law #15: Show, don\'t just tell. Example code is the highest-bandwidth prompt.'
      },
      {
        id: 'prompt-4',
        title: 'Context Window Management & Token Hygiene',
        summary: 'Preventing context rot and catastrophic forgetting during long build sessions.',
        duration: '30 min',
        category: 'Tooling',
        content: [
          'As conversations grow beyond 30 turns, models suffer from attention dilution, forgetting early constraints and re-introducing old bugs.',
          'The antidote: Reset threads every 5–10 turns. Summarize current architectural state into a clean spec prompt and start fresh.',
          'Only attach files relevant to the active task; do not drag in 50 unrelated files.'
        ],
        keyTakeaways: [
          'Commit working code with Git before resetting chat threads.',
          'A short, clean conversation with 2 relevant files beats a 50-message marathon.',
          'Never let an agent guess what changed: supply the diff.'
        ],
        vibeLaw: 'Vibe Law #16: A long chat thread is a graveyard of forgotten rules. Reset early and often.'
      }
    ]
  },
  {
    id: 'debug-test',
    title: 'Debugging and Testing',
    tagline: 'Surgical error fixing, breaking hallucination spirals, and setting up automated CI.',
    targetAudience: 'Anyone tired of AI making code worse when trying to fix a bug.',
    estimatedHours: '5–6 hours',
    stepsCount: 4,
    description: 'Learn the exact debugging protocol that stops hallucination loops: reading DevTools console logs, creating surgical diff prompts, atomic rollbacks with Git, and CI build verification.',
    icon: 'ShieldAlert',
    steps: [
      {
        id: 'debug-1',
        title: 'The Console-First Diagnostic Protocol',
        summary: 'How to extract exact error traces and feed them to the model without guessing.',
        duration: '35 min',
        category: 'Debugging',
        content: [
          'Never tell the AI: "My button doesn\'t work." That invites the AI to guess, rewrite working code, and break unrelated features.',
          'Open DevTools Console (F12 or Cmd+Opt+I). Copy the exact red error string and file line number.',
          'Provide: 1. What action triggered it. 2. The exact error trace. 3. The specific file and line number.'
        ],
        keyTakeaways: [
          'Line numbers pinpoint the exact variable that threw undefined.',
          'Check the Network tab for failed 404 or CORS requests.',
          'Demand surgical edits rather than full-file rewrites.'
        ],
        suggestedPrompt: 'I encountered: "Uncaught TypeError: Cannot read properties of undefined (reading \'map\') at List.tsx:42". Do not rewrite unrelated components. Explain root cause in 1 sentence and provide the surgical null-safe check.',
        vibeLaw: 'Vibe Law #17: The Console never lies. Read the error before asking for a rewrite.'
      },
      {
        id: 'debug-2',
        title: 'Breaking the Hallucination Spiral with Git',
        summary: 'What to do when the AI breaks your code, apologizes, and breaks it again.',
        duration: '40 min',
        category: 'Mindset',
        content: [
          'The "Death Spiral": The AI introduces a bug, attempts to fix it, breaks two more files, and starts replacing working code with "// ...rest of code".',
          'The antidote: Git checkpoints. Commit every time a feature compiles and passes your test.',
          'If an AI fails to fix an issue twice in a row, run `git checkout .` to revert immediately. Reset the chat thread and break the problem into smaller steps.'
        ],
        keyTakeaways: [
          'Commit progress every 15 minutes of working state.',
          'Never argue with an agent for more than 2 failed attempts.',
          'Reverting is a power move, not a defeat.'
        ],
        terminalSnippet: '# Snapshot your progress before a risky change\ngit add .\ngit commit -m "Working state before refactor"\n# Revert instantly if the agent hallucinates\ngit checkout .',
        vibeLaw: 'Vibe Law #18: Never let an AI touch a working codebase without a clean git commit.'
      },
      {
        id: 'debug-3',
        title: 'Defensive Null-Safety & Error Boundaries',
        summary: 'Hardening your React components against crashes from missing data or network drops.',
        duration: '45 min',
        category: 'Architecture',
        content: [
          'Wrap critical feature modules in React Error Boundaries so that a single component failure never whitescreens the entire website.',
          'Use optional chaining (`item?.user?.name`) and defensive array defaults (`(items || []).map(...)`).',
          'Provide friendly, actionable empty states and error recovery buttons.'
        ],
        keyTakeaways: [
          'Never assume an API returns an array; default to empty array.',
          'Display clean inline fallback UI when an image or audio stream fails.',
          'Catch errors locally so the rest of the application remains functional.'
        ],
        vibeLaw: 'Vibe Law #19: Graceful degradation is the hallmark of production-grade software.'
      },
      {
        id: 'debug-4',
        title: 'Automated CI/CD Defense Pipelines',
        summary: 'Setting up automated GitHub Actions that block broken agent commits before production.',
        duration: '35 min',
        category: 'Shipping',
        content: [
          'Automated tests and linters are your bodyguard against rogue agent commits.',
          'Set up a simple GitHub Actions workflow that runs TypeScript checks, ESLint, and a Vite production build on every pull request.',
          'If the build fails, the PR cannot merge, protecting your production users.'
        ],
        keyTakeaways: [
          'Catching bugs in CI is 100x cheaper than catching bugs in customer support tickets.',
          'A simple build test takes under 60 seconds to run on GitHub.',
          'Never push untested code directly to main branch.'
        ],
        terminalSnippet: '# Run automated typecheck and build locally\nnpm run lint && npm run build',
        vibeLaw: 'Vibe Law #20: In an age of autonomous agents, automated verification is your only moat.'
      }
    ]
  },
  {
    id: 'deploy-prod',
    title: 'Deployment and Production Readiness',
    tagline: 'Ship to the live world: Custom domains, authentication, Stripe billing, and SEO.',
    targetAudience: 'Indie hackers and founders looking to turn vibecoded software into profitable SaaS.',
    estimatedHours: '6–8 hours',
    stepsCount: 4,
    description: 'Transform prototypes into commercial products. Configure custom domains, set up Supabase or Firebase authentication, wire Stripe Checkout webhooks, and craft OpenGraph social cards.',
    icon: 'Rocket',
    steps: [
      {
        id: 'deploy-1',
        title: 'Custom Domains, DNS & CDN Caching',
        summary: 'Connecting porkbun/namecheap domains to Vercel or Cloud Run with automated SSL.',
        duration: '35 min',
        category: 'Shipping',
        content: [
          'A custom domain (`yourbrand.com`) gives your project instant credibility.',
          'Configure A records and CNAME records in your domain registrar to point to Vercel or your hosting CDN.',
          'Set up automated SSL certificate renewal so your link is always secure over HTTPS.'
        ],
        keyTakeaways: [
          'Use apex domain redirects (redirect www to non-www or vice-versa).',
          'Configure edge caching for static assets (images, fonts, scripts).',
          'Test DNS propagation using dnschecker.org.'
        ],
        vibeLaw: 'Vibe Law #21: A project with a custom domain converts 3x higher than a generic subdomain.'
      },
      {
        id: 'deploy-2',
        title: 'Frictionless Authentication (Supabase / Firebase)',
        summary: 'Google 1-click OAuth, Magic Links, and Row Level Security database policies.',
        duration: '50 min',
        category: 'Tooling',
        content: [
          'Do not force users to create an account before they experience the value of your app (the "Aha!" moment).',
          'Use local-first storage for the initial session. When they want to save across devices, offer 1-click Google OAuth or Magic Link via Supabase or Firebase.',
          'Row Level Security (RLS) ensures users can only read and write their own data.'
        ],
        keyTakeaways: [
          'Offer a frictionless public playground before demanding sign-up.',
          'Google 1-click OAuth has a 75% higher conversion rate than email/password forms.',
          'Never compromise database security rules for development convenience.'
        ],
        vibeLaw: 'Vibe Law #22: Every required login field is a 20% drop-off in user conversion.'
      },
      {
        id: 'deploy-3',
        title: 'Stripe & LemonSqueezy Checkout Webhooks',
        summary: 'Charging real money with cryptographic webhook signature verification.',
        duration: '55 min',
        category: 'Shipping',
        content: [
          'Never build custom credit card forms. Use Stripe Checkout or LemonSqueezy Hosted Checkout.',
          'Your backend only needs one endpoint: a webhook listener (`/api/webhooks/stripe`) that listens for `checkout.session.completed` and upgrades the user\'s plan in your database.',
          'Test webhooks locally using the Stripe CLI before deploying to production.'
        ],
        keyTakeaways: [
          'LemonSqueezy handles global sales tax and VAT (Merchant of Record).',
          'Always verify webhook cryptographic signatures with the webhook signing secret.',
          'Give users an instant "Customer Portal" link so they can manage or cancel their subscription without bothering you.'
        ],
        terminalSnippet: '# Forward Stripe webhooks to your local server for testing\nstripe listen --forward-to localhost:3000/api/webhooks',
        vibeLaw: 'Vibe Law #23: The only true validation of product-market fit is a stranger entering their credit card number.'
      },
      {
        id: 'deploy-4',
        title: 'SEO, OpenGraph Social Cards & Launch Day',
        summary: 'Irresistible Twitter/LinkedIn preview cards and launching on Product Hunt & Hacker News.',
        duration: '45 min',
        category: 'Architecture',
        content: [
          'When someone pastes your link on Twitter or iMessage, the preview card (`og:image`, `og:title`, `og:description`) determines whether anyone clicks.',
          'Generate a high-contrast 1200x630px social share card image.',
          'Launch with a short, high-energy demo video (<60 seconds, no corporate fluff, straight to the product in action).'
        ],
        keyTakeaways: [
          'Always test your URLs on opengraph.xyz or Twitter Card Validator.',
          'Your og:title should be value-driven, not just your company name.',
          'Engage with every single comment within the first 4 hours of launching.'
        ],
        vibeLaw: 'Vibe Law #24: Launching is not a one-day event; it is a recurring habit of showing your work in public.'
      }
    ]
  }
];
