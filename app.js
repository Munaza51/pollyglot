import { translateText } from './aiService.js';

const formView = document.getElementById('form-view');
const resultView = document.getElementById('result-view');
const translateForm = document.getElementById('translate-form');
const translateBtn = document.getElementById('translateBtn');
const startOverBtn = document.getElementById('startOverBtn');
const originalTextEl = document.getElementById('originalText');
const translatedTextEl = document.getElementById('translatedText');
const errorEl = document.getElementById('error');

// Pre-select language from URL query param
const urlParams = new URLSearchParams(window.location.search);
const targetLang = urlParams.get('targetLang');
if (targetLang) {
  const radio = document.querySelector(`input[name="targetLang"][value="${targetLang}"]`);
  if (radio) radio.checked = true;
}

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
    const translation = await translateText(text, lang);
    showResults(text, translation);
  } catch (err) {
    showError(err.message || 'Something went wrong.');
  } finally {
    setLoading(false);
  }
});

startOverBtn.addEventListener('click', resetApp);
