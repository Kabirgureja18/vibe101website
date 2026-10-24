import { ProjectBlueprint } from '../types';

export const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: 'ambient-audio-synth',
    title: 'Realtime Ambient Sound Synthesizer',
    tagline: 'A browser-based binaural drone and white noise sound generator with frequency visualizer.',
    difficulty: 'Beginner',
    timeToBuild: '2–3 hours',
    stack: ['React 19', 'Web Audio API', 'HTML5 Canvas', 'Tailwind CSS v4'],
    description: 'An elegant, zero-dependency browser synthesizer that generates ambient theta/alpha brainwave binaural beats, pink noise, and rain acoustics with live spectrum visualization.',
    architectureDiagram: `[UI Sliders / Knobs] 
       │ (frequency, gain, reverb)
       ▼
[AudioContext Engine] ──► [GainNodes] ──► [StereoPanner] ──► [Audio Destination]
       │
       ▼
[AnalyserNode (FFT)] ──► [requestAnimationFrame] ──► [Canvas 2D Waveform]`,
    fileTree: [
      '/src/audio/engine.ts (AudioContext, oscillators, noise generators)',
      '/src/components/Visualizer.tsx (Canvas FFT wave visualizer)',
      '/src/components/SoundKnob.tsx (Tactile rotary slider control)',
      '/src/components/Soundboard.tsx (Grid of ambient sound layers)',
      '/src/App.tsx (Main player & session timer)'
    ],
    phases: [
      {
        phase: '1. Web Audio Engine Setup',
        description: 'Initialize a safe singleton AudioContext that resumes on first user click (bypassing browser autoplay policies).',
        prompts: [
          'Create a Web Audio API manager in /src/audio/engine.ts. It should export functions to play binaural sine waves at 432Hz with an adjustable difference frequency (4Hz to 12Hz for theta/alpha waves), and a pink noise buffer generator. Ensure it handles AudioContext resume on user gesture.'
        ],
        checkpoint: 'Confirm audio plays cleanly through headphones with zero clipping or pops.'
      },
      {
        phase: '2. Live Canvas Visualizer',
        description: 'Hook an AnalyserNode to the master gain and render an oscillating wave in a <canvas> element.',
        prompts: [
          'Create /src/components/Visualizer.tsx that takes an AnalyserNode prop and renders a real-time glowing neon lime waveform on an HTML5 canvas using requestAnimationFrame. Clean up the animation frame on unmount.'
        ],
        checkpoint: 'Canvas draws smooth 60fps wave lines responding to volume changes.'
      },
      {
        phase: '3. Light + Neon Tactile Controls',
        description: 'Build volume sliders, sleep timer, and preset selector (e.g. "Deep Focus", "Rainy Midnight").',
        prompts: [
          'Build the master soundboard interface using Tailwind CSS v4 in a warm off-white (#F8F7F2) card layout with neon lime slider thumbs and charcoal typography. Add preset buttons that smoothly interpolate frequency values.'
        ],
        checkpoint: 'Presets transition smoothly and the sleep timer cleanly fades out master volume when it hits zero.'
      }
    ],
    pitfallsToAvoid: [
      'Forgetting to resume AudioContext on user interaction (browsers block sound until the user clicks something).',
      'Memory leaks caused by forgetting to cancel requestAnimationFrame in useEffect cleanup.',
      'Allowing multiple oscillators to multiply volume into speaker distortion (always normalize with master gain).'
    ]
  },
  {
    id: 'curated-directory-saas',
    title: 'Curated Directory with Instant Search & Local Bookmarks',
    tagline: 'A fast, high-converting directory platform with category filters, search, and CSV export.',
    difficulty: 'Beginner',
    timeToBuild: '3–4 hours',
    stack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'LocalStorage', 'Lucide Icons'],
    description: 'A production-grade directory website (e.g. best AI tools, design systems, remote companies) featuring instant sub-millisecond search, deep category filtering, bookmark collections, and zero database friction.',
    architectureDiagram: `[Raw JSON Dataset] ──► [useMemo Search / Category Filter] ──► [Virtualized Card Grid]
                                     │
                    [Bookmark Action / Click]
                                     ▼
                    [LocalStorage Persistence Engine]
                                     │
                    [Export Bookmarks as JSON / CSV]`,
    fileTree: [
      '/src/data/items.json (Curated dataset of 50+ directory entries)',
      '/src/types/directory.ts (Item schema, categories, pricing enums)',
      '/src/components/DirectorySearch.tsx (Debounced search input & active filters)',
      '/src/components/DirectoryCard.tsx (High-craft card with unboxed metadata)',
      '/src/components/BookmarkDrawer.tsx (Slide-over drawer of saved items)',
      '/src/hooks/useBookmarks.ts (LocalStorage persistence hook)'
    ],
    phases: [
      {
        phase: '1. Structured Data Schema',
        description: 'Define clean TypeScript types and populate a realistic JSON dataset of 20+ items with tags and URLs.',
        prompts: [
          'Define the TypeScript interface for DirectoryItem with id, title, tagline, category, pricing, url, and pros/cons in /src/types/directory.ts. Create a seed dataset with 20 realistic entries.'
        ],
        checkpoint: 'Data renders statically on the page with zero TypeScript errors.'
      },
      {
        phase: '2. Sub-Millisecond Search & Category Tabs',
        description: 'Build search filtering that indexes titles, tags, and descriptions without lag.',
        prompts: [
          'Implement a search and filter system in /src/components/DirectorySearch.tsx. Use useMemo to filter items across title, tagline, and category. Include a clear search button and a "No matching tools found" empty state with a reset filter button.'
        ],
        checkpoint: 'Typing instantly filters the cards without any noticeable keyboard delay.'
      },
      {
        phase: '3. Bookmarking & CSV/JSON Export',
        description: 'Allow visitors to star items, save them locally, and download their curated stack as CSV.',
        prompts: [
          'Add a useBookmarks hook storing saved item IDs in localStorage. Add a star button to each card. In /src/components/BookmarkDrawer.tsx, list saved items with a "Download as CSV" button that generates a real CSV blob and triggers browser download.'
        ],
        checkpoint: 'Starring an item persists after page refresh and the CSV download opens properly in Excel/Sheets.'
      }
    ],
    pitfallsToAvoid: [
      'Putting static metadata in pill badges on the cards (violates anti-slop rules; use unboxed text with · separators).',
      'Forgetting an empty state when search queries return 0 results.',
      'Using window.alert for bookmark notifications instead of a clean non-intrusive toast.'
    ]
  },
  {
    id: 'kinetic-portfolio-3d',
    title: 'Kinetic 3D Interactive Portfolio',
    tagline: 'An award-worthy creative developer portfolio with custom Three.js tunnel hero and editorial typography.',
    difficulty: 'Intermediate',
    timeToBuild: '4–6 hours',
    stack: ['React 19', 'Three.js / WebGL', 'Motion', 'Tailwind CSS v4'],
    description: 'An unconventional creative portfolio inspired by studio sites like Herve Baillargeon and Hot Type. Features an interactive 3D WebGL hero, kinetic scroll effects, project showcase grids, and an interactive colophon.',
    architectureDiagram: `[WebGL Canvas] ──► [Three.js Camera / Scene / Geometry Tunnel]
       ▲
       │ (Mouse X/Y parallax & scroll delta)
[Window Event Listeners]
       │
       ▼
[DOM Content Layer] ──► [Editorial Hero] ──► [Case Study Grids] ──► [Colophon]`,
    fileTree: [
      '/src/components/HeroTunnel.tsx (Three.js WebGL canvas with wireframe flight)',
      '/src/components/ProjectShowcase.tsx (Asymmetric case study grid)',
      '/src/components/InteractiveColophon.tsx (Design & technical credits)',
      '/src/components/ContactTerminal.tsx (Interactive direct message drawer)'
    ],
    phases: [
      {
        phase: '1. Three.js Procedural Canvas',
        description: 'Create an optimized WebGL canvas with forward camera motion and subtle cursor parallax.',
        prompts: [
          'Create /src/components/HeroTunnel.tsx using Three.js. Render a wireframe geometric tunnel with neon lime (#D4FF00) and electric violet (#7928CA) polygonal rings. Move the camera continuously forward along the Z-axis, with subtle mouse tilt. Include an accessible "Pause / Skip" button and clean up renderer memory on unmount.'
        ],
        checkpoint: 'Tunnel runs at a smooth 60fps with zero canvas resize distortions.'
      },
      {
        phase: '2. Asymmetric Typography Grid',
        description: 'Lay out project cases using tight Bricolage Grotesque typography and deliberate negative space.',
        prompts: [
          'Design the project case study section using an asymmetric 12-column layout. Case 01 takes columns 1–8 with bold title and year; Case 02 takes columns 7–12 with offset margin. Use hairline borders and high-contrast charcoal typography.'
        ],
        checkpoint: 'Layout looks balanced across both mobile and 1440px desktop screens.'
      },
      {
        phase: '3. Fluid Scroll & Micro-Interactions',
        description: 'Add hover spring physics to case study cards and smooth section reveals.',
        prompts: [
          'Integrate Motion for card reveals. When hovering on a project, display a floating magnetic tag showing role and stack without blocking text readability.'
        ],
        checkpoint: 'Hover states respond instantly without layout shift.'
      }
    ],
    pitfallsToAvoid: [
      'Failing to dispose of geometries and textures in Three.js on unmount (causes browser memory exhaustion).',
      'Making the 3D scene non-skippable (visitors must be able to bypass it immediately to view content).',
      'Overusing heavy blur filters that drop frame rates on low-end mobile devices.'
    ]
  },
  {
    id: 'ai-prompt-sandbox',
    title: 'AI Prompt-to-Component Live Sandbox',
    tagline: 'An in-browser interactive component generator and code preview sandbox powered by Gemini.',
    difficulty: 'Intermediate',
    timeToBuild: '4–5 hours',
    stack: ['React 19', 'TypeScript', 'Google Gemini API (@google/genai)', 'Tailwind CSS v4'],
    description: 'A focused developer playground where users type a component description, and the backend streams clean React/Tailwind code that immediately renders into an isolated live preview sandbox.',
    architectureDiagram: `[User Prompt Input] ──► [Server API /api/generate-component] ──► [Gemini 2.5 Flash]
                                                                        │
                                   [Stream Code Tokens Back] ◄──────────┘
                                              │
                                              ▼
[Regex Parser (JSX + CSS)] ──► [Live Preview Frame / Sandbox] ──► [Copy Code Button]`,
    fileTree: [
      '/server.ts (Express server proxying Gemini 2.5 API with GEMINI_API_KEY)',
      '/src/components/PromptEditor.tsx (Prompt input with preset recipes)',
      '/src/components/CodeViewer.tsx (Syntax highlighted generated code)',
      '/src/components/LivePreview.tsx (Safe component sandbox rendering)',
      '/src/types/sandbox.ts (Generation request and result types)'
    ],
    phases: [
      {
        phase: '1. Secure Server-Side Gemini Route',
        description: 'Create an Express endpoint in server.ts that calls Google Gemini using the @google/genai SDK.',
        prompts: [
          'Create an Express POST endpoint at /api/generate-component in server.ts. Use @google/genai with process.env.GEMINI_API_KEY. Instruct the model with a strict system instruction to output pure React + Tailwind TSX code wrapped in markdown blocks without conversational fluff.'
        ],
        checkpoint: 'Posting a prompt returns clean code tokens from Gemini 2.5 Flash.'
      },
      {
        phase: '2. Split-Screen Playground UI',
        description: 'Build a two-pane layout: prompt input & generated code on the left, live preview on the right.',
        prompts: [
          'Build /src/components/Sandbox.tsx with a split-screen 50/50 layout. Include preset prompts ("Bento Grid", "Newsletter Sign-up", "Metric Card"), a loading state with spinner, and a copy-code action button with toast notification.'
        ],
        checkpoint: 'Split pane resizes smoothly and code can be copied in one click.'
      },
      {
        phase: '3. Error Catching & Fallback Handling',
        description: 'Catch rendering errors in an Error Boundary and display friendly recovery tips.',
        prompts: [
          'Wrap the preview panel in a React ErrorBoundary. If generated code throws a syntax or rendering error, display a clear warning with an "Ask AI to fix error" button that feeds the error back to the generator.'
        ],
        checkpoint: 'Intentional errors are caught cleanly without crashing the entire app.'
      }
    ],
    pitfallsToAvoid: [
      'Exposing GEMINI_API_KEY on the client side (always keep keys on the server or in secure proxy routes).',
      'Allowing unsanitized eval execution (use safe template rendering or sandboxed iframe).',
      'Forgetting to specify Tailwind-only constraints to the model (otherwise it generates custom inline styles).'
    ]
  },
  {
    id: 'offline-notes-pwa',
    title: 'Offline-First Markdown Notes PWA',
    tagline: 'An ultra-fast, distraction-free markdown scratchpad that works 100% offline and installs to desktop/mobile.',
    difficulty: 'Intermediate',
    timeToBuild: '3–5 hours',
    stack: ['React 19', 'TypeScript', 'IndexedDB / LocalStorage', 'Tailwind CSS v4'],
    description: 'A lightning-fast personal writing studio with keyboard shortcuts (Cmd+S, Cmd+N), word count analytics, tag organization, instant search, and export to Markdown (.md) or plain text.',
    architectureDiagram: `[Keyboard Input] ──► [Debounced Autosave (300ms)] ──► [IndexedDB / LocalStorage]
        │                                                     │
        ▼                                                     ▼
[Split Markdown Preview]                                [Export to .md / .txt]`,
    fileTree: [
      '/src/db/notesStorage.ts (IndexedDB / LocalStorage wrapper with backup export)',
      '/src/components/NoteEditor.tsx (Textarea with line numbers and word counter)',
      '/src/components/NoteSidebar.tsx (Searchable list of past notes with tags)',
      '/src/components/ExportModal.tsx (Export all notes as zip or single markdown)',
      '/public/manifest.json (PWA install configuration with icons)'
    ],
    phases: [
      {
        phase: '1. Storage Engine & Auto-Save',
        description: 'Create an atomic storage service that writes notes to IndexedDB or LocalStorage with debounced saves.',
        prompts: [
          'Create /src/db/notesStorage.ts exporting functions: saveNote, getNotes, deleteNote, and exportAllNotesJson. Implement a 400ms debounce so rapid typing does not trigger excessive storage writes.'
        ],
        checkpoint: 'Typing saves instantly and notes persist across browser tab restarts.'
      },
      {
        phase: '2. Minimalist Distraction-Free Editor',
        description: 'Build the writing canvas with clean typography, word count, reading time, and markdown preview toggle.',
        prompts: [
          'Build /src/components/NoteEditor.tsx. Style with high-contrast typography (Plus Jakarta Sans), quiet bottom toolbar showing word count and reading time, and keyboard shortcut listeners (Cmd+N for new note, Cmd+D for delete).'
        ],
        checkpoint: 'Writing feels effortless and keyboard shortcuts trigger correct actions.'
      },
      {
        phase: '3. Full Markdown Export & Search',
        description: 'Allow instant keyword search across all notes and 1-click download as a `.md` file.',
        prompts: [
          'Add a fuzzy search bar to the sidebar. In the editor header, add a "Download .md" button that creates a Blob with the note title and text and downloads it to the user\'s computer.'
        ],
        checkpoint: 'Downloaded .md file opens cleanly in Obsidian, Notion, or VS Code.'
      }
    ],
    pitfallsToAvoid: [
      'Blocking the main thread with heavy synchronous parsing while typing.',
      'Losing unsaved changes when closing the tab (use window.onbeforeunload safeguard if dirty).',
      'Forgetting to format filenames safely (e.g. replacing special characters in titles for download).'
    ]
  },
  {
    id: 'fullstack-saas-starter',
    title: 'Full-Stack Micro-SaaS with Stripe & Auth',
    tagline: 'The complete template to charge real money for your software with authenticated accounts.',
    difficulty: 'Advanced',
    timeToBuild: '6–8 hours',
    stack: ['React 19', 'Supabase / Firebase', 'Stripe Checkout', 'Express / Node.js'],
    description: 'The end-to-end foundation for profitable software: Google OAuth authentication, tiered pricing table, Stripe Checkout redirect, secure webhook listener to update user subscription status, and a protected member dashboard.',
    architectureDiagram: `[User Clicks "Upgrade"] ──► [Create Stripe Session] ──► [Stripe Hosted Checkout]
                                                                  │
                                            [Payment Success] ◄───┘
                                                   │
                                                   ▼
[Stripe Webhook] ──► [/api/webhooks/stripe] ──► [Verify Signature] ──► [Update DB Plan: "PRO"]
                                                                             │
[Member Dashboard] ◄─────────────────────────────────────────────────────────┘`,
    fileTree: [
      '/server.ts (Express server with Stripe webhook listener and auth middleware)',
      '/src/components/PricingTable.tsx (Tiered pricing cards with billing toggle)',
      '/src/components/AuthModal.tsx (One-click Google login modal)',
      '/src/components/Dashboard.tsx (Protected customer dashboard)',
      '/src/hooks/useUserSession.ts (Authentication session state)'
    ],
    phases: [
      {
        phase: '1. User Auth & Database Schema',
        description: 'Set up user profiles with email, subscription_tier, and stripe_customer_id in Supabase or Firestore.',
        prompts: [
          'Create the database schema for users and subscriptions in Supabase with RLS enabled. Export the useUserSession hook to track whether the user is logged in, their tier ("free" vs "pro"), and auth state changes.'
        ],
        checkpoint: 'User can log in with Google and their user document appears in the database.'
      },
      {
        phase: '2. Stripe Checkout Integration',
        description: 'Build the server endpoint that creates a Stripe Checkout session with customer email metadata.',
        prompts: [
          'Create a POST /api/create-checkout-session endpoint in server.ts using the stripe npm package. It should accept priceId and userId, create a Stripe Checkout Session with success_url and cancel_url, and return the session.url.'
        ],
        checkpoint: 'Clicking "Upgrade to Pro" redirects to the live Stripe Checkout test page.'
      },
      {
        phase: '3. Webhook Listener & Pro Access Grant',
        description: 'Listen for checkout.session.completed, verify webhook signature, and upgrade the user\'s database record.',
        prompts: [
          'In server.ts, add a POST /api/webhooks/stripe endpoint using express.raw({type: "application/json"}). Verify the stripe-signature header with STRIPE_WEBHOOK_SECRET. When checkout.session.completed fires, update the user\'s record in the database to tier: "pro".'
        ],
        checkpoint: 'Completing a test payment in Stripe CLI automatically flips user tier to "pro" in your app.'
      }
    ],
    pitfallsToAvoid: [
      'Parsing JSON before the Stripe webhook endpoint (Stripe signature verification requires the raw unparsed request body buffer!).',
      'Trusting client-side claims of payment completion (never grant "pro" status until the webhook confirms it).',
      'Forgetting to configure a Customer Portal link so users can self-serve cancel subscriptions.'
    ]
  }
];
