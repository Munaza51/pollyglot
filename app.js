import { translateText } from './aiService.js';

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
