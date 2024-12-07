document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from localStorage
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  const userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
  const score = localStorage.getItem("score") || 0;
  const nickname = localStorage.getItem("nickname") || "Anonymous";
  const answersLogContainer = document.getElementById("answers-log-container");
  const finishButton = document.getElementById("finish-button");

  // Display nickname
  const nicknameDisplay = document.getElementById("nickname-display");

  const textNode = document.createTextNode(`Hello, ${nickname}!`);
  nicknameDisplay.appendChild(textNode);

  // Display total score
  const scoreDisplay = document.getElementById("final-score-display");
  scoreDisplay.innerHTML = `
    <h3 class="text-center total-score">Score: ${score} / ${questions.length}</h3>`;

  // Generate log items
  // Loop through questions and dynamically generate the content
  questions.forEach((question, index) => {
    const isCorrect = userAnswers[index] === question.correct;

    // Create the main container for the answer key
    const answerKeyContainer = document.createElement("div");
    answerKeyContainer.className = "answer-key-container container mt-5 center";

    // Big Box Section (Question and Index)
    const bigBoxContainer = document.createElement("div");
    bigBoxContainer.className = "big-box-container center";

    // Define the background color pattern
    const colorPattern = ["#EC70AF", "#40B5E0", "#FCE154", "#F8A840"];

    // Set the background color based on the index
    bigBoxContainer.style.backgroundColor =
      colorPattern[index % colorPattern.length];

    // Question Container
    const questionContainer = document.createElement("div");
    questionContainer.className = "question-container center";
    questionContainer.innerHTML = `
    <p class="question">${question.question}</p>
  `;

    // Index Container
    const indexContainer = document.createElement("div");
    indexContainer.className = "index-container";
    indexContainer.innerHTML = `
    <p class="index">${index + 1}</p>
  `;

    // Append question and index containers to the big box
    bigBoxContainer.appendChild(questionContainer);
    bigBoxContainer.appendChild(indexContainer);

    // Small Boxes Container (Choices)
    const smallBoxesContainer = document.createElement("div");
    smallBoxesContainer.className = "small-boxes-container";

    // Loop through choices and generate each small box
    question.choices.forEach((choice, choiceIndex) => {
      const isChoiceCorrect = choiceIndex === question.correct; // Check if choice is correct
      const isUserChoice = choiceIndex === userAnswers[index]; // Check if user selected this choice

      // Create the small box
      const smallBox = document.createElement("div");
      smallBox.className = `small-box small-box-${choiceIndex + 1}-container ${
        isChoiceCorrect ? "correct" : isUserChoice ? "incorrect" : ""
      }`;

      // Create the answer container inside the small box
      const answerContainer = document.createElement("div");
      answerContainer.className = `answer-container answer-${
        choiceIndex + 1
      }-container`;

      // Use textContent to render the choice as plain text
      const answerText = document.createElement("p");
      answerText.className = `answer answer-${choiceIndex + 1}`;
      answerText.textContent = choice;

      // Append answer text container to the answer container
      answerContainer.appendChild(answerText);
      // Append answer container to small box
      smallBox.appendChild(answerContainer);
      // Append small box to small boxes container
      smallBoxesContainer.appendChild(smallBox);
    });

    // Append everything to the main container
    answerKeyContainer.appendChild(bigBoxContainer);
    answerKeyContainer.appendChild(smallBoxesContainer);

    // Add the final result to the placeholder container in the HTML
    answersLogContainer.appendChild(answerKeyContainer);

    // Add the horizontal line after each answer-key-container
    const horizontalLineContainer = document.createElement("div");
    horizontalLineContainer.className = "horizontal-line-container center";
    horizontalLineContainer.innerHTML = `
    <div class="horizontal-line"></div>
  `;

    answersLogContainer.appendChild(horizontalLineContainer);
  });

  // Finish button
  finishButton.addEventListener("click", function () {
    window.location.href = "../pages/closing.html";
  });
});
