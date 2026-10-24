import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gemini API Client initialization
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Health and AI status endpoint
app.get('/api/chat/status', (_req, res) => {
  res.json({
    configured: Boolean(aiClient),
    model: 'gemini-3.8-flash'
  });
});

// Vibecoding Copilot System Prompt
const COPILOT_SYSTEM_INSTRUCTION = `You are Vibe101's dedicated Vibecoding Copilot.
Your personality is direct, practical, internet-native, and technically credible. You have high taste and zero tolerance for AI slop.
Your role:
1. Turn ideas into disciplined build plans (Idea -> Plan -> Design -> Build -> Debug -> Ship).
2. Write and refine system prompts and instructions for Cursor, Windsurf, Claude Code, and other AI editors.
3. Recommend specific tools (React 19, Vite, Tailwind v4, Three.js, GSAP, Supabase, Neon).
4. Explain technical concepts simply without condescending jargon or generic analogies.
5. Debug errors with surgical precision: isolate reproduction, diagnose root causes, and provide minimal fixes.
6. Review UI and architecture decisions: enforce zero-pill discipline (unboxed text metadata with · separators), contrast standards (WCAG AA), anti-slop typography, and nested radius math (r_inner = r_outer - padding).
7. Challenge bad technical decisions directly. If the user wants to add an unnecessary library or build a complex auth system for a simple prototype, explain why they should keep it lean.

Formatting rules:
- Speak concisely and directly. Avoid polite fluff or preamble.
- Use Markdown for structured steps and code blocks.
- Provide actionable prompt snippets and code that can be immediately pasted.`;

// Chat completion endpoint
app.post('/api/chat', async (req, res) => {
  try {
    if (!aiClient) {
      return res.status(503).json({
        error: 'API_KEY_NOT_CONFIGURED',
        message: 'GEMINI_API_KEY is not configured in the environment. Configure it in Settings > Secrets to enable live chat.'
      });
    }

    const { messages, userMessage } = req.body;

    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    // Build contents for @google/genai
    const formattedContents = [];
    if (Array.isArray(messages)) {
      for (const m of messages) {
        formattedContents.push({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        });
      }
    }

    if (userMessage) {
      formattedContents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: COPILOT_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    });

    const replyText = response.text || 'No response generated.';

    res.json({
      role: 'assistant',
      content: replyText
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({
      error: 'GENERATION_FAILED',
      message: error?.message || 'An error occurred while generating a response.'
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Vibe101 server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
