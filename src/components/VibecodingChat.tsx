import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  Terminal,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  Code2,
  Cpu
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  {
    title: 'Turn Idea into Build Plan',
    prompt: 'I want to build a local-first audio focus app in React 19. Turn this into a disciplined 6-stage build plan (Idea -> Plan -> Design -> Build -> Debug -> Ship) with prompt guidelines.'
  },
  {
    title: 'Anti-Slop UI Audit',
    prompt: 'Review this UI design pattern: "Cards with rounded-2xl, border-l-4 neon borders, purple gradient buttons, and pill badges for all metadata." What violates anti-slop rules and how do I fix it?'
  },
  {
    title: 'Debug Infinite Loop',
    prompt: 'My React component with useEffect is triggering an infinite re-render loop when updating workspace state. How do I isolate and resolve the dependency cycle?'
  },
  {
    title: 'Stack Recommendation',
    prompt: 'I am directing Cursor Composer to build a full-stack MVP with user authentication and database persistence. Should I use Supabase, Neon Postgres, or SQLite?'
  }
];

export const VibecodingChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome_1',
        role: 'assistant',
        content: `I'm your **Vibe101 Copilot**. I help you direct AI models, architect clean software, debug broken states, and avoid generic AI slop.\n\nAsk me for an architectural plan, a prompt refactor for Cursor/Windsurf/Claude, or a surgical fix for an error log. What are you building?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check API configuration status on mount
  useEffect(() => {
    fetch('/api/chat/status')
      .then((res) => res.json())
      .then((data) => {
        setIsConfigured(Boolean(data.configured));
      })
      .catch(() => {
        setIsConfigured(false);
      });
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg_' + Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.slice(1), // omit welcome message for LLM context
          userMessage: text
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'API_KEY_NOT_CONFIGURED') {
          setIsConfigured(false);
          setErrorMessage(
            'GEMINI_API_KEY is not configured in your environment. Configure it in the AI Studio Secrets panel to enable live responses.'
          );
        } else {
          setErrorMessage(data.message || 'Server error occurred while generating response.');
        }
        setIsLoading(false);
        return;
      }

      const botReply: ChatMessage = {
        id: 'msg_' + Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err: any) {
      setErrorMessage(
        'Unable to reach server endpoint. Verify your dev server is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome_' + Date.now(),
        role: 'assistant',
        content: `Conversation reset. Ready for your next build task, architectural query, or prompt review.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto font-sans flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Header section with approved headline */}
      <div className="mb-8 pb-6 border-b border-black/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
            <span>08. COPILOT</span>
            <span aria-hidden="true">/</span>
            <span>AI ARCHITECT ASSISTANT</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#121212] uppercase tracking-tight">
            Your vibecoding copilot. Without the fluff.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl">
            Direct advice on build planning, prompt constraints, debugging runtime errors, and enforcing anti-slop design. No hollow motivational filler.
          </p>
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-2 self-start md:self-end">
          {isConfigured === true ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live AI Active (Gemini)</span>
            </div>
          ) : isConfigured === false ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded-lg text-xs font-mono">
              <Cpu className="w-3.5 h-3.5 text-amber-600" />
              <span>API Key Required for Live Mode</span>
            </div>
          ) : (
            <div className="text-xs font-mono text-neutral-400">Checking API status...</div>
          )}
        </div>
      </div>

      {/* Honest Setup Notice if API key is unconfigured */}
      {isConfigured === false && (
        <div className="mb-6 p-4 bg-amber-50/80 border border-amber-300 rounded-xl text-xs font-mono text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider block">
              Honest Setup Disclosure: GEMINI_API_KEY Not Configured
            </span>
            <p className="leading-relaxed font-sans text-neutral-700">
              Vibe101 does not fabricate simulated fake chat responses. To enable real-time replies from the Google Gemini 3.8 Flash model, add your <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">GEMINI_API_KEY</code> to your environment or configure it in AI Studio Secrets. The chat UI, prompt starters, and server architecture are fully wired.
            </p>
          </div>
        </div>
      )}

      {/* Main Chat Conversation Container */}
      <div className="flex-1 bg-white border-2 border-black rounded-2xl flex flex-col overflow-hidden shadow-xs">
        {/* Chat Toolbar */}
        <div className="px-5 py-3 bg-[#F8F7F2] border-b border-black/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-600">
            <Terminal className="w-3.5 h-3.5 text-black" />
            <span className="font-bold text-black uppercase">Copilot Console</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Slop Guardian</span>
          </div>

          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Chat</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6 max-h-[58vh]">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                {/* Role & Timestamp Kicker */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 mb-1 px-1">
                  <span className="font-bold text-neutral-700 uppercase">
                    {isUser ? 'You' : 'Vibe101 Copilot'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`relative max-w-2xl rounded-xl p-4 sm:p-5 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-black text-white rounded-tr-none'
                      : 'bg-[#F8F7F2] text-[#121212] border border-black/10 rounded-tl-none font-sans'
                  }`}
                >
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.content}
                  </div>

                  {/* Copy Button for Assistant responses */}
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="mt-3 pt-2 border-t border-black/5 flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-black transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking / Loading indicator */}
          {isLoading && (
            <div className="flex flex-col items-start animate-in fade-in">
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 mb-1 px-1">
                <span className="font-bold text-neutral-700 uppercase">Vibe101 Copilot</span>
                <span aria-hidden="true">·</span>
                <span>Thinking...</span>
              </div>
              <div className="bg-[#F8F7F2] border border-black/10 rounded-xl rounded-tl-none p-4 text-xs font-mono text-neutral-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4FF00] fill-black animate-spin" />
                <span>Synthesizing architectural direction & prompt rules...</span>
              </div>
            </div>
          )}

          {/* Error notice */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-mono text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Prompts Bar (when only initial message is present) */}
        {messages.length <= 1 && (
          <div className="px-5 py-3 border-t border-black/5 bg-[#F8F7F2]/60">
            <div className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-black" />
              <span>Quick Starter Inquiries:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STARTER_PROMPTS.map((starter, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(starter.prompt)}
                  className="p-2.5 bg-white hover:bg-neutral-50 border border-black/10 rounded-lg text-left transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-mono font-bold text-black block group-hover:text-neutral-800">
                    {starter.title}
                  </span>
                  <span className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                    {starter.prompt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input Composer */}
        <div className="p-4 bg-white border-t border-black/10">
          <div className="relative flex items-end gap-2">
            <textarea
              ref={textareaRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for an architectural plan, prompt refactor, or error log breakdown (Shift+Enter for newline)..."
              className="flex-1 p-3 text-xs sm:text-sm font-sans bg-[#F8F7F2] border border-black/15 rounded-xl text-black placeholder:text-neutral-400 outline-hidden focus:border-black focus:bg-white resize-none transition-all leading-relaxed"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="px-5 py-3.5 bg-black text-[#D4FF00] hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              title="Send message (Enter)"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>Direct technical copilot · Zero prompt slop</span>
            <span className="hidden sm:inline">Press Enter to send · Shift+Enter for newline</span>
          </div>
        </div>
      </div>
    </div>
  );
};
