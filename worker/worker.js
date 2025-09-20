export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS for Pages domain (adjust for your Pages URL if needed)
    const corsHeaders = {
      'Access-Control-Allow-Origin': url.origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/api/translate' && request.method === 'POST') {
      try {
        const { text, targetLanguage, temperature, maxTokens, model } = await request.json();

        if (!text || !targetLanguage) {
          return json({ error: 'Missing required fields: text, targetLanguage' }, 400, corsHeaders);
        }

        // Clamp and defaults
        const temp = clamp(Number(temperature ?? 0.4), 0, 1);
        const max_t = clampInt(Number(maxTokens ?? 256), 32, 800);
        const modelName = model || 'gpt-4o-mini'; // or 'gpt-4o' / 'gpt-4' as allowed by your plan

        const prompt = buildPrompt(text, targetLanguage);

        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: modelName,
            temperature: temp,
            max_tokens: max_t,
            messages: [
              {
                role: 'system',
                content: [
                  'You are a professional translator.',
                  'Output only the translated text with no extra commentary.',
                  'Preserve tone, formatting, and inline punctuation.',
                  'If the input contains URLs, code, or names, keep them intact.'
                ].join(' ')
              },
              {
                role: 'user',
                content: prompt
              }
            ]
          })
        });

        if (!openaiRes.ok) {
          const errText = await openaiRes.text();
          return json({ error: `Upstream error: ${errText}` }, 502, corsHeaders);
        }

        const payload = await openaiRes.json();
        const translation = payload?.choices?.[0]?.message?.content?.trim();

        if (!translation) {
          return json({ error: 'No translation returned from model.' }, 502, corsHeaders);
        }

        return json({ translation }, 200, corsHeaders);
      } catch (e) {
        return json({ error: e.message || 'Unexpected error' }, 500, corsHeaders);
      }
    }

    return new Response('Not found', { status: 404 });
  }
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...extraHeaders
    }
  });
}

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function clampInt(n, min, max) {
  const x = Number.isFinite(n) ? Math.round(n) : min;
  return Math.min(Math.max(x, min), max);
}

function buildPrompt(text, targetLanguage) {
  return [
    `Translate the following text into ${targetLanguage}.`,
    `- Keep meaning faithful and natural in ${targetLanguage}.`,
    `- Preserve line breaks and basic formatting.`,
    `- Do not add any explanations.`,
    `Text: """\n${text}\n"""`,
  ].join('\n');
}
