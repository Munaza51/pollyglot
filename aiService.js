export async function translateText(text, targetLanguage) {
  const API_KEY = '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'; // 👈 put your OpenRouter API key

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a professional translator. Output only the translated text, preserve formatting.'
      },
      {
        role: 'user',
        content: `Translate the following text into ${targetLanguage}: """${text}"""`
      }
    ],
    temperature: 0.4,
    max_tokens: 256
  };

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Request failed: ${res.status}`);
    }

    const data = await res.json();
    const translation = data?.choices?.[0]?.message?.content?.trim();

    if (!translation) throw new Error('No translation returned.');

    return translation;
  } catch (err) {
    console.error(err);
    throw new Error(err.message || 'AI service error.');
  }
}
