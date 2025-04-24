const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Get stored progress if it exists
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Function to render questions
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
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore selected answer
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save progress to sessionStorage
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

// Submit handler
submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const correctAnswer = questions[i].answer;
    if (userAnswers[i] === correctAnswer) {
      score++;
    }
  }

  // Show score and store it in localStorage
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Show previous score on load if exists
const previousScore = localStorage.getItem("score");
if (previousScore !== null) {
  scoreElement.textContent = `Your score is ${previousScore} out of ${questions.length}.`;
}

// Render questions on load
renderQuestions();
