PollyGlot – AI Translation Web App

PollyGlot is a simple, responsive, frontend-only web application that uses OpenRouter's GPT-4o-mini model to provide accurate translations in multiple languages. Users can enter text, select a target language, and instantly get a translation—all in the browser.

🔗 Live Demo

[https://celebrated-lolly-adb935.netlify.app/](https://celebrated-lolly-adb935.netlify.app/)

You can pre-select a language via URL query parameter:

https://celebrated-lolly-adb935.netlify.app/?targetLang=French

🚀 Features

Translate text to French, Spanish, or Japanese

Responsive and clean UI with cards and sections

Real-time translation using OpenRouter API

Automatic pre-selection of language via URL query params

Start over / reset functionality

No backend required — fully frontend, ready for Netlify

🗂️ Project Structure
pollyglot/
├── index.html      # Main HTML page
├── styles.css      # CSS styles
├── app.js          # Main frontend logic
├── aiService.js    # Handles OpenRouter API calls
└── README.md       # Project documentation

⚡ Usage

Clone or download the repository:

git clone <repo-url>


Open index.html in your browser OR deploy on Netlify.

Important: Replace the placeholder API key in aiService.js with your own OpenRouter API key:

const API_KEY = 'YOUR_OPENROUTER_KEY_HERE';


Enter text, select a language, and click Translate.

🔧 Deployment on Netlify

Drag and drop your pollyglot folder into Netlify (or connect your Git repository).

Add a _redirects file (optional, for SPA routing):

/*    /index.html   200


Your app is ready! Access it via your Netlify URL.

⚠️ Notes

This is a frontend-only app, so the API key is visible in the browser. Do not use this key in production.

Max tokens and temperature are configurable in aiService.js.

💻 Tech Stack

HTML, CSS, JavaScript

ES Modules (import/export)

OpenRouter GPT-4o-mini for translations

✨ Credits

Built for Week 10 – PollyGlot Project
Design inspired by modern minimalist UIs, focused on usability and simplicity.
