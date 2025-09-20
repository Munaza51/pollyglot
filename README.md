# PollyGlot – AI Translation App

Accurate translations with a clean, Figma‑matched UI. Frontend on Cloudflare Pages, secure API calls via Cloudflare Worker.

## Features
- Text input, language radio selector (French, Spanish, Japanese)
- Translate button calls secure /api/translate
- Results view shows “Original text” and “Your translation”
- Start Over resets to initial view
- Tunable temperature and max tokens (safe defaults)

## Tech
- Static frontend (HTML/CSS/JS)
- Cloudflare Worker proxy to OpenAI (API key hidden as secret)
- Model: gpt‑4o‑mini (adjust as needed)

## Local development
Frontend is static; open `frontend/index.html` in a local server or use `npx serve`.

Worker:
```bash
cd worker
npm init -y # if needed
npx wrangler login
npx wrangler secret put OPENAI_API_KEY
npx wrangler dev
