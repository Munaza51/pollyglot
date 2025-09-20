const formView = document.getElementById('form-view');
const resultView = document.getElementById('result-view');
const translateForm = document.getElementById('translate-form');
const translateBtn = document.getElementById('translateBtn');
const startOverBtn = document.getElementById('startOverBtn');
const originalTextEl = document.getElementById('originalText');
const translatedTextEl = document.getElementById('translatedText');
const errorEl = document.getElementById('error');

function setLoading(loading) {
  translateBtn.disabled = loading;
  translateBtn.textContent = loading ? 'Translating…' : 'Translate';
}

function showError(msg) {
  errorEl.textContent = msg || '';
}

function showResults(original, translated) {
  originalTextEl.textContent = original;
  translatedTextEl.textContent = translated;
  formView.classList.add('hidden');
  resultView.classList.remove('hidden');
}

function resetApp() {
  translateForm.reset();
  showError('');
  resultView.classList.add('hidden');
  formView.classList.remove('hidden');
}

translateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  showError('');

  const text = document.getElementById('sourceText').value.trim();
  const lang = document.querySelector('input[name="targetLang"]:checked')?.value;

  if (!text) return showError('Please enter text to translate.');
  if (!lang) return showError('Please choose a target language.');

  setLoading(true);
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        targetLanguage: lang,
        // Optional: override defaults from UI if you add controls
        temperature: 0.4,
        maxTokens: 256
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Request failed: ${res.status}`);
    }

    const data = await res.json();
    showResults(text, data.translation);
  } catch (err) {
    console.error(err);
    showError(err.message || 'Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
});

startOverBtn.addEventListener('click', resetApp);
