import { useState, useEffect, useCallback } from 'react';

export type AppRoute =
  | '/'
  | '/guide'
  | '/tools'
  | '/prompts'
  | '/references'
  | '/blueprints'
  | '/workspace'
  | '/chat';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Vibe101 — Less tutorial hell. More things you actually build.',
  '/guide': 'Vibe101 Guide — Learn the craft. Not just the prompts.',
  '/tools': 'Vibe101 Tools — Your stack starts here.',
  '/prompts': 'Vibe101 Prompt Lab — Stop prompting blind.',
  '/references': 'Vibe101 References — Steal the technique. Make it yours.',
  '/blueprints': 'Vibe101 Blueprints — From idea to shipped.',
  '/workspace': 'Vibe101 Workspace — Turn side quests into shipped projects.',
  '/chat': 'Vibe101 Copilot — Your vibecoding copilot. Without the fluff.'
};

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      // Normalize path
      if (pathname === '/guide' || pathname === '/guides') return '/guide';
      if (pathname === '/tools') return '/tools';
      if (pathname === '/prompts') return '/prompts';
      if (pathname === '/references') return '/references';
      if (pathname === '/blueprints') return '/blueprints';
      if (pathname === '/workspace') return '/workspace';
      if (pathname === '/chat' || pathname === '/copilot') return '/chat';
      return '/';
    }
    return '/';
  });

  const navigate = useCallback((path: AppRoute | string) => {
    let normalized = path.toLowerCase();
    if (normalized === '/guides') normalized = '/guide';
    if (normalized === '/copilot') normalized = '/chat';

    const validRoutes: AppRoute[] = [
      '/',
      '/guide',
      '/tools',
      '/prompts',
      '/references',
      '/blueprints',
      '/workspace',
      '/chat'
    ];

    const targetRoute = validRoutes.includes(normalized as AppRoute)
      ? (normalized as AppRoute)
      : '/';

    setCurrentPath(targetRoute);

    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', targetRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update document title
      document.title = ROUTE_TITLES[targetRoute] || ROUTE_TITLES['/'];
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.toLowerCase();
      if (pathname === '/guide' || pathname === '/guides') {
        setCurrentPath('/guide');
        document.title = ROUTE_TITLES['/guide'];
      } else if (pathname === '/tools') {
        setCurrentPath('/tools');
        document.title = ROUTE_TITLES['/tools'];
      } else if (pathname === '/prompts') {
        setCurrentPath('/prompts');
        document.title = ROUTE_TITLES['/prompts'];
      } else if (pathname === '/references') {
        setCurrentPath('/references');
        document.title = ROUTE_TITLES['/references'];
      } else if (pathname === '/blueprints') {
        setCurrentPath('/blueprints');
        document.title = ROUTE_TITLES['/blueprints'];
      } else if (pathname === '/workspace') {
        setCurrentPath('/workspace');
        document.title = ROUTE_TITLES['/workspace'];
      } else if (pathname === '/chat' || pathname === '/copilot') {
        setCurrentPath('/chat');
        document.title = ROUTE_TITLES['/chat'];
      } else {
        setCurrentPath('/');
        document.title = ROUTE_TITLES['/'];
      }
    };

    window.addEventListener('popstate', handlePopState);
    // Initial title set
    document.title = ROUTE_TITLES[currentPath] || ROUTE_TITLES['/'];

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPath]);

  return { currentPath, navigate };
}
