# 🏆 Ultimate Trivia Quiz

A fast, responsive, and accessible trivia quiz you can run in any modern browser. No build step, no dependencies — just open and play.

## ✨ Features

- Accessible and keyboard-friendly UI (semantic markup, ARIA live regions)
- Responsive layout for mobile, tablet, and desktop
- Themed design with a default Ocean palette and optional theme variants
- Review answers before submitting
- Results screen with score and per-question breakdown
- Zero dependencies, simple to host anywhere

## 📁 Project Structure

. ├── index.html # App markup (sections: Start, Questions, Review, Results) ├── style.css # Theme, layout, and component styling └── script.js # Quiz logic (state, rendering, navigation, review, results)

## 📸 Screenshot

![image](https://github.com/Mdsaif4363/Quiz-App/blob/cff2c0bb65a42d69216dc88222bbd4f2f32305f5/Screenshot%202025-08-28%20004245.png)

## 🚀 Getting Started

### Option 1: Open locally

- Double-click index.html or drag it into your browser.

### Option 2: Run a local server (recommended)

- Using Node.js:

npx serve .

or use a Live Server extension (e.g., VS Code “Open with Live Server”)

- Using Python:

Python 3
python -m http.server 8080

Then open http://localhost:8080

## 🧭 How to Use

1. Click “Start Quiz”.
2. Select an answer for each question.
3. Navigate with Previous/Next.
4. Click “Review Answers” to check selections.
5. Submit to view your score and detailed results.
6. Restart to play again.

Keyboard tips:

- Tab/Shift+Tab to move between buttons/options
- Enter/Space to activate buttons and select an option
- Focus outlines are visible for clear navigation

## 🎨 Theming and Customization

This project uses CSS variables for colors, radii, and shadows, and supports optional theme variants.

- Default theme: “Ocean”
- Optional themes: “sunset”, “forest”, “grape”

Question text visibility:

The question title uses a high-contrast color to ensure readability in both light and dark modes. To tweak it, adjust the #question-text color in style.css.

## 🔧 Where to Add Questions

Questions and quiz logic live in script.js. You can:

- Add or update the questions array
- Adjust navigation rules
- Tune review and scoring behavior
- Tip: Keep IDs in index.html (e.g., #question-text, #choice-list, #progress) as they’re used by script.js to render the UI.

## ♿ Accessibility

- Live updates: aria-live="polite" on key regions such as the quiz container and progress
- Clear focus states across interactive elements
- Color choices tuned for contrast and readability
- Motion-reduced experience via prefers-reduced-motion

## 🌐 Browser Support

- Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The app uses progressive enhancement for newer CSS features and provides sensible fallbacks.

## ☁️ Deployment

GitHub Pages: push the repository and enable Pages on the main branch
Netlify/Vercel: drag-and-drop or connect your repo (no build step required)
Any static hosting works (only three files)

🧩 Icons

This README uses an inline icon (🏆). You can also add a favicon to index.html:

<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%23F59E0B' d='M14 10h36v10a18 18 0 1 1-36 0z'/%3E%3Cpath fill='%23D97706' d='M22 46h20v6H22z'/%3E%3Ccircle cx='32' cy='26' r='6' fill='%23fff'/%3E%3C/svg%3E" />

🛡️ License

Add your preferred license here (MIT recommended for simplicity).

🤝 Contributing
Fork the repo
Create a feature branch
Commit changes with clear messages
Open a pull request

Made with ❤️ for quick demos, classrooms, and coding challenges.
