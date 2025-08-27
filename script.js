// Basic quiz data; replace or load dynamically as needed.
const questions = [
  {
    text: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answerIndex: 2,
    explanation: "Paris is the capital city of France."
  },
  {
    text: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Mercury"],
    answerIndex: 1,
    explanation: "Iron oxide on Mars' surface gives it a reddish appearance."
  },
  {
    text: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answerIndex: 3,
    explanation: "JavaScript is executed in the browser."
  },
  {
    text: "What is the largest ocean on Earth?",
    choices: ["Atlantic Ocean", "Arctic Ocean", "Indian Ocean", "Pacific Ocean"],
    answerIndex: 3,
    explanation: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions."
  },
  {
    text: "Who wrote 'Romeo and Juliet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "George Orwell"],
    answerIndex: 1,
    explanation: "William Shakespeare wrote the tragedy 'Romeo and Juliet'."
  },
  {
    text: "HTML stands for?",
    choices: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "HyperText Markup Language",
      "HyperText Makeup Language"
    ],
    answerIndex: 2,
    explanation: "HTML stands for HyperText Markup Language."
  },
  {
    text: "Which CSS property changes the text color?",
    choices: ["font-color", "text-color", "color", "font-style"],
    answerIndex: 2,
    explanation: "The 'color' property sets the color of text in CSS."
  },
  {
    text: "What does HTTP status code 404 mean?",
    choices: ["Moved Permanently", "Not Found", "OK", "Forbidden"],
    answerIndex: 1,
    explanation: "404 Not Found indicates the server cannot find the requested resource."
  },
  {
    text: "Which data structure uses FIFO (First In, First Out)?",
    choices: ["Stack", "Queue", "Tree", "Graph"],
    answerIndex: 1,
    explanation: "A queue processes elements in the order they were added (FIFO)."
  },
  {
    text: "Which company originally created React?",
    choices: ["Google", "Facebook (Meta)", "Microsoft", "Twitter"],
    answerIndex: 1,
    explanation: "React was developed by Facebook, now Meta."
  },
  {
    text: "Which HTML tag is used to include an external JavaScript file?",
    choices: ["script", "link", "js", "code"],
    answerIndex: 0,
    explanation: "Use the <script src=\"...\"></script> tag to include external JavaScript."
  },
  {
    text: "Which of the following numbers is a prime number?",
    choices: ["21", "51", "53", "55"],
    answerIndex: 2,
    explanation: "53 is prime; the others are divisible by 3 or 5."
  }
];

// State
let currentIndex = 0;
let selectedAnswers = Array(questions.length).fill(null); // user selections (index)
let hasSubmitted = false;

// DOM elements
const startBtn = document.getElementById("start-btn");

// Question screen
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choiceList = document.getElementById("choice-list");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const reviewBtn = document.getElementById("review-btn");

// Review screen
const reviewScreen = document.getElementById("review-screen");
const reviewList = document.getElementById("review-list");
const reviewBackBtn = document.getElementById("review-back-btn");
const reviewSubmitBtn = document.getElementById("review-submit-btn");

// Results screen
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const resultList = document.getElementById("result-list");
const restartBtn = document.getElementById("restart-btn");

// Init
attachEvents();
updateSectionVisibility("start");

function attachEvents() {
  startBtn.addEventListener("click", startQuiz);
  prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => goTo(currentIndex + 1));
  reviewBtn.addEventListener("click", openReview);

  reviewBackBtn.addEventListener("click", () => {
    updateSectionVisibility("quiz");
  });
  reviewSubmitBtn.addEventListener("click", submitQuiz);

  restartBtn.addEventListener("click", restartQuiz);

  // Optional: keyboard support for 1-9 selection and arrow nav
  document.addEventListener("keydown", (e) => {
    // Only when question screen is active
    if (questionContainer.classList.contains("hidden")) return;

    const num = Number(e.key);
    if (!Number.isNaN(num) && num >= 1 && num <= 9) {
      const idx = num - 1;
      const q = questions[currentIndex];
      if (idx < q.choices.length) {
        onChoiceClick(idx);
      }
    }
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      goTo(currentIndex - 1);
    }
    if (e.key === "ArrowRight" && currentIndex < questions.length - 1) {
      goTo(currentIndex + 1);
    }
  });
}

function startQuiz() {
  currentIndex = 0;
  selectedAnswers = Array(questions.length).fill(null);
  hasSubmitted = false;

  renderQuestion();
  updateSectionVisibility("quiz");
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, questions.length - 1));
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentIndex];
  questionText.textContent = q.text;
  progress.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

  // Render choices
  choiceList.innerHTML = "";
  q.choices.forEach((choice, idx) => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.setAttribute("data-index", String(idx));
    btn.setAttribute("aria-pressed", selectedAnswers[currentIndex] === idx ? "true" : "false");

    btn.addEventListener("click", () => onChoiceClick(idx));

    li.appendChild(btn);
    choiceList.appendChild(li);
  });

  manageNavButtons();
}

function onChoiceClick(idx) {
  selectedAnswers[currentIndex] = idx;

  // Update selection UI
  Array.from(choiceList.querySelectorAll(".choice-btn")).forEach((btn) => {
    const i = Number(btn.getAttribute("data-index"));
    btn.setAttribute("aria-pressed", selectedAnswers[currentIndex] === i ? "true" : "false");
  });

  manageNavButtons();
}

function manageNavButtons() {
  // Prev visible if not first
  prevBtn.classList.toggle("hidden", currentIndex === 0);

  // Next visible when not last
  const isLast = currentIndex === questions.length - 1;
  nextBtn.classList.toggle("hidden", isLast);

  // Review visible only on last question
  reviewBtn.classList.toggle("hidden", !isLast);

  // You can still open review with unanswered items; we visually hint later
}

function openReview() {
  buildReview({ preSubmit: true });
  updateSectionVisibility("review");
}

function buildReview({ preSubmit }) {
  const container = preSubmit ? reviewList : resultList;
  container.innerHTML = "";

  const unanswered = [];
  questions.forEach((q, i) => {
    const li = document.createElement("li");
    li.className = "review-item";

    const qTitle = document.createElement("p");
    qTitle.className = "review-question";
    qTitle.textContent = q.text;

    const your = document.createElement("p");
    const selIdx = selectedAnswers[i];
    const yourAns = selIdx != null ? q.choices[selIdx] : "No answer";
    your.innerHTML = `<strong>Your answer:</strong> ${yourAns}`;

    li.appendChild(qTitle);
    li.appendChild(your);

    if (preSubmit) {
      // Pre-submit: provide Edit button, do not reveal correctness
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      edit.type = "button";
      edit.textContent = "Edit";
      edit.addEventListener("click", () => {
        currentIndex = i;
        renderQuestion();
        updateSectionVisibility("quiz");
      });
      actions.appendChild(edit);
      li.appendChild(actions);

      if (selIdx == null) {
        unanswered.push(i);
        const warn = document.createElement("p");
        warn.style.color = "var(--warning, #d97706)";
        warn.textContent = "Unanswered";
        li.appendChild(warn);
      }
    } else {
      // Post-submit: show correctness and correct answer
      const correctAns = q.choices[q.answerIndex];
      const isCorrect = selIdx === q.answerIndex;
      const correct = document.createElement("p");
      correct.innerHTML = `<strong>Correct:</strong> ${correctAns} ${selIdx != null ? (isCorrect ? "✅" : "❌") : ""}`;
      li.appendChild(correct);

      if (q.explanation) {
        const expl = document.createElement("p");
        expl.className = "review-explanation";
        expl.textContent = `Explanation: ${q.explanation}`;
        li.appendChild(expl);
      }
    }

    container.appendChild(li);
  });

  // In review (preSubmit), disable submit if anything unanswered and update label
  if (preSubmit) {
    if (unanswered.length > 0) {
      reviewSubmitBtn.disabled = true;
      reviewSubmitBtn.textContent = `Submit Quiz (${unanswered.length} unanswered)`;
    } else {
      reviewSubmitBtn.disabled = false;
      reviewSubmitBtn.textContent = "Submit Quiz";
    }
  }
}

function submitQuiz() {
  // Compute score
  const score = selectedAnswers.reduce((acc, sel, i) => {
    return acc + (sel === questions[i].answerIndex ? 1 : 0);
  }, 0);

  scoreElement.textContent = `Score: ${score} / ${questions.length}`;
  hasSubmitted = true;

  // Build results with correctness
  buildReview({ preSubmit: false });

  // Show results
  updateSectionVisibility("result");
}

function restartQuiz() {
  // Reset state
  currentIndex = 0;
  selectedAnswers = Array(questions.length).fill(null);
  hasSubmitted = false;

  // Reset UI
  reviewList.innerHTML = "";
  resultList.innerHTML = "";
  scoreElement.textContent = "0";

  updateSectionVisibility("start");
}

// Section visibility helper
function updateSectionVisibility(section) {
  // section: "start" | "quiz" | "review" | "result"
  const isStart = section === "start";
  const isQuiz = section === "quiz";
  const isReview = section === "review";
  const isResult = section === "result";

  startBtn.classList.toggle("hidden", !isStart);
  questionContainer.classList.toggle("hidden", !isQuiz);
  reviewScreen.classList.toggle("hidden", !isReview);
  resultContainer.classList.toggle("hidden", !isResult);

  if (isQuiz) {
    // Ensure the current question is rendered and nav buttons set
    renderQuestion();
  }
}