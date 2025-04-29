const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "Berlin", "Rome", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific"
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "22"],
    answer: "4"
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare"
  }
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Get stored progress if it exists
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous questions if re-rendering
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.style.marginBottom = "16px";

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const label = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore selected answer
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save progress
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Score submission
submitButton.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Display previous score if it exists
const previousScore = localStorage.getItem("score");
if (previousScore !== null) {
  scoreElement.textContent = `Your score is ${previousScore} out of ${questions.length}.`;
}

// Load questions
renderQuestions();
