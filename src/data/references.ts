import { DesignStyle, ColorPalette, AnimationRecipe } from '../types';

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: 'light-neon',
    name: 'Light + Neon (Vibe101 Signature)',
    vibe: 'Warm off-white background (#F8F7F2), deep charcoal typography (#121212), and electric high-voltage neon lime (#D4FF00) and electric violet (#7928CA) accents.',
    characteristics: [
      'Warm architectural canvas (tinted with <3% saturation) rather than stark hospital-white',
      'High-contrast near-black typography with tight tracking (-0.02em to -0.04em)',
      'High-intent neon accents reserved strictly for active states, CTA borders, and kinetic highlights',
      'Hairline dividers (border-black/10) rather than thick drop shadows'
    ],
    bestUseCases: ['Modern developer tools', 'High-energy educational guides', 'Creative engineering studios', 'Avant-garde SaaS'],
    avoidWhen: 'Corporate banking or traditional conservative medical apps where neon is perceived as non-serious.',
    cssRuleSnippet: `bg-[#F8F7F2] text-[#121212] selection:bg-[#D4FF00] selection:text-black border-black/10 hover:border-[#D4FF00]`
  },
  {
    id: 'high-type',
    name: 'High-Type Editorial (EXAT & Hervé Inspired)',
    vibe: 'Oversized display typography, architectural grid collisions, deliberate asymmetric offsets, and tight ink-trapped letterforms.',
    characteristics: [
      'Hero headlines set at clamp(2.5rem, 5vw, 5.5rem) with text-wrap: balance',
      'Asymmetric 12-column layout splits (e.g. 7-column typography + 5-column compact card)',
      'Natural editorial numbering: "01. First Principle", "02. Systematic Execution"',
      'Zero decorative pulsing dots or floating pill tags'
    ],
    bestUseCases: ['Design portfolios', 'Agency showcases', 'Typographic manifestos', 'Cultural & artistic web tools'],
    avoidWhen: 'Dense data-entry spreadsheets where vertical screen real estate must be tightly minimized.',
    cssRuleSnippet: `font-display font-extrabold tracking-tighter leading-[0.92] text-balance text-[clamp(2.5rem,5vw,5.5rem)]`
  },
  {
    id: 'neo-brutalist',
    name: 'Neo-Brutalist High Density',
    vibe: 'High-contrast black 2px borders, hard drop shadows with zero blur (e.g. shadow-[4px_4px_0px_#111111]), and bold punchy surfaces.',
    characteristics: [
      'Zero border-radius or minimal 4px radius on containers',
      'Solid hard-edge shadows (box-shadow: 4px 4px 0px #000) that translate on active click',
      'Monospace tabular numerals for all telemetry and data points',
      'High tactile feedback: buttons visually press down by 2px on click'
    ],
    bestUseCases: ['Hacker tools', 'Crypto / Web3 analytics', 'Indie game interfaces', 'Creative coding playgrounds'],
    avoidWhen: 'Gentle mindfulness apps or corporate enterprise software with conservative executive buyers.',
    cssRuleSnippet: `border-2 border-black bg-white shadow-[4px_4px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#121212]`
  },
  {
    id: 'swiss-minimal',
    name: 'Swiss International Editorial',
    vibe: 'Mathematical grid alignment, generous whitespace margins, quiet typography, and functional clarity inspired by Josef Müller-Brockmann.',
    characteristics: [
      'Strict adherence to baseline grid math (4px / 8px spacing increments)',
      'Subdued neutral surfaces (slate-50 / slate-100) with a single bold international orange (#FF4D00) focal accent',
      'Clean unboxed text metadata with typographic bullets (·) and slashes (/)',
      'Zero-elevation flat aesthetic with hair-thin 1px borders'
    ],
    bestUseCases: ['Scientific tools', 'Documentation archives', 'Architecture studios', 'Publishing platforms'],
    avoidWhen: 'Apps targeting young gaming audiences who expect flashy 3D particles and bright animations.',
    cssRuleSnippet: `border border-black/8 bg-white/70 backdrop-blur-sm p-6 text-sm tracking-tight text-neutral-800`
  }
];

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'palette-vibe-core',
    name: 'Vibe101 Electric Studio',
    theme: 'Warm Off-White & Neon Lime',
    colors: [
      { name: 'Canvas Warm', hex: '#F8F7F2', usage: '60% Dominant canvas and viewport background' },
      { name: 'Charcoal Deep', hex: '#121212', usage: '30% Typography, solid headers, and high-contrast cards' },
      { name: 'Electric Lime', hex: '#D4FF00', usage: '10% Focal accents, active tabs, CTA buttons, neon glows' },
      { name: 'Electric Violet', hex: '#7928CA', usage: 'Secondary highlights, hover rings, badges' },
      { name: 'Vibrant Orange', hex: '#FF4D00', usage: 'Alert states, action prompts, special badges' },
      { name: 'Hairline Stroke', hex: '#E2DEC9', usage: 'Structural borders and subtle card dividers' }
    ]
  },
  {
    id: 'palette-dark-cyber',
    name: 'Midnight Terminal Matrix',
    theme: 'Deep Obsidian & Radioactive Green',
    colors: [
      { name: 'Void Black', hex: '#0A0A0C', usage: '60% Background canvas' },
      { name: 'Surface Slate', hex: '#151518', usage: '30% Card container surfaces' },
      { name: 'Radioactive Green', hex: '#00FF66', usage: '10% High-intent accents and prompt cursor' },
      { name: 'Cyan Glow', hex: '#00F0FF', usage: 'Links and secondary affordances' },
      { name: 'Muted Ghost', hex: '#71717A', usage: 'Secondary metadata and comments' }
    ]
  },
  {
    id: 'palette-swiss-paper',
    name: 'Zurich Paper & International Orange',
    theme: 'Editorial Cream & Warm Gray',
    colors: [
      { name: 'Pure Chalk', hex: '#FFFFFF', usage: '60% Canvas' },
      { name: 'Paper Mist', hex: '#F4F4F0', usage: '30% Section backgrounds' },
      { name: 'International Orange', hex: '#FF4500', usage: '10% Primary CTA and focal anchors' },
      { name: 'Graphite', hex: '#1C1C1E', usage: 'Body prose and titles' },
      { name: 'Rule Line', hex: '#E5E5DF', usage: 'Hairline grid dividers' }
    ]
  }
];

export const ANIMATION_RECIPES: AnimationRecipe[] = [
  {
    id: 'spring-hover',
    name: 'Tactile Spring Button Hover',
    category: 'Interaction',
    description: 'A snappy, responsive hover with subtle scale and spring physics that settles in under 150ms.',
    previewType: 'button',
    codeSnippet: `// Motion (Framer Motion)
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.97, y: 0 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="px-5 py-2.5 bg-[#D4FF00] text-black font-semibold rounded-lg shadow-sm"
>
  Start Vibecoding
</motion.button>`
  },
  {
    id: 'stagger-reveal',
    name: 'Staggered Card Entrance',
    category: 'Reveal',
    description: 'Sequentially animates children cards into view with a 60ms stagger interval for smooth choreographic rhythm.',
    previewType: 'stagger',
    codeSnippet: `// Container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
  }
};`
  },
  {
    id: 'infinite-marquee',
    name: 'Kinetic High-Speed Marquee',
    category: 'Typography',
    description: 'An infinitely looping ticker for tools, keywords, or live logs with hardware-accelerated CSS transforms.',
    previewType: 'marquee',
    codeSnippet: `@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
  will-change: transform;
}`
  },
  {
    id: 'wireframe-tunnel',
    name: 'Three.js Geometric Tunnel Flight',
    category: 'Background',
    description: 'Procedural polygonal rings moving along the Z-axis towards the camera to create infinite hypnotic depth.',
    previewType: 'wireframe',
    codeSnippet: `// Three.js Ring Tunnel Loop
const ringCount = 40;
const rings: THREE.LineLoop[] = [];

for (let i = 0; i < ringCount; i++) {
  const geometry = new THREE.BufferGeometry();
  // Generate regular n-gon points
  const points = [];
  const segments = 8; // Octagonal tunnel
  const radius = 6;
  for (let j = 0; j <= segments; j++) {
    const theta = (j / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
  }
  geometry.setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: i % 2 === 0 ? 0xD4FF00 : 0x7928CA,
    transparent: true,
    opacity: 0.7
  });
  const ring = new THREE.LineLoop(geometry, material);
  ring.position.z = -i * 5;
  scene.add(ring);
  rings.push(ring);
}`
  }
];

export const ANTI_SLOP_CONSTITUTION = [
  {
    rule: '1. Zero-Pill Metadata Discipline',
    banned: 'Wrapping categories, tags, timestamps, read times, or scores in colored pill boxes or bordered chips on cards.',
    mandated: 'Render informational metadata as clean, unboxed plain text separated by typographic bullets (·) or slashes (/).',
    exception: 'Interactive filter buttons or segmented controls (functional buttons with click handlers) are allowed to have pill shapes.'
  },
  {
    rule: '2. No Mechanical Pseudo-Technical Clutter',
    banned: 'Prefixing headers with code comments (// 01 ARCHITECTURE, /* PIPELINE */, >_ DISCOVER) or uppercase snake_case identifiers.',
    mandated: 'Use natural, human editorial title-case prose (e.g. "01. Automated Pipeline Engineering").'
  },
  {
    rule: '3. No Fake Compiler Status or Cockpit Telemetry',
    banned: 'Inventing fake status tickers ("ONLINE // LATENCY: 1.4s"), fake scores ("92/100 INNOVATION SCORE"), or version tags ("SYNTHEX v4.8").',
    mandated: 'Only render real metrics, genuine user data, or actual application state.'
  },
  {
    rule: '4. No Decorative Pulsing Dots',
    banned: 'Placing pulsing green or emerald dots (bg-emerald-500 rounded-full animate-pulse) next to static titles or logos.',
    mandated: 'Status dots are reserved exclusively for live WebSocket streams, running audio engines, or active real-time connections.'
  },
  {
    rule: '5. Single-Elevation Card Depth',
    banned: 'Nesting rounded bordered boxes inside larger bordered boxes (cards within cards).',
    mandated: 'Separate content using generous whitespace (2rem–3rem) and subtle hairline dividers (border-black/10).'
  },
  {
    rule: '6. Strict Typography & Containment',
    banned: 'Lazy default fonts (Inter, Roboto) and headlines with lonely single-word orphan trailing lines.',
    mandated: 'Pair characterful display fonts with complementary body fonts. Always use text-wrap: balance on headlines.'
  },
  {
    rule: '7. Tabular Numerals for All Data',
    banned: 'Rendering numbers, currencies, dates, or prices in variable-width proportional fonts that jitter and misalign.',
    mandated: 'Always use font-mono tabular-nums for aligned columns and reliable numeric presentation.'
  },
  {
    rule: '8. 60-30-10 Color Discipline',
    banned: 'Splashing primary accent colors across large background cards, borders, and text indiscriminately.',
    mandated: '60% neutral canvas, 30% structural surfaces and typography, 10% high-intent accent budget at primary action points.'
  }
];
