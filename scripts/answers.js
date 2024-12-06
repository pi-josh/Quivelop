document.addEventListener('DOMContentLoaded', function () {

  // Fetch data from localStorage
  const questions = JSON.parse(localStorage.getItem('questions')) || [];
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
  const score = localStorage.getItem('score') || 0;
  const nickname = localStorage.getItem('nickname') || 'Anonymous';
  const answersLogContainer = document.getElementById('answers-log');
  const finishButton = document.getElementById('finish-button');
  
  // Display nickname
  const nicknameDisplay = document.getElementById('nickname-display');

  const textNode = document.createTextNode(`Hello, ${nickname}!`);
  nicknameDisplay.appendChild(textNode);
  
  // Display total score
  const scoreDisplay = document.getElementById('final-score-display');
  scoreDisplay.innerHTML = `
    <h4 class="text-center">Your Total Score: ${score}/${questions.length}</h4>`;

  // Generate log items
  // TODO: Refactor this to use template strings
 questions.forEach((question, index) => {
    const isCorrect = userAnswers[index] === question.correct;
    const logItem = document.createElement('div');
    logItem.className = `log-item ${isCorrect ? 'correct' : 'incorrect'}`;

    logItem.innerHTML = `                     
          <div class="question-number"><strong>Question ${index + 1}:</strong></div>
          <div class="question-text">${question.question}</div>
          <div class="user-answer">
          <div class="choices">
            <strong>Choices:</strong>
            <ul>
              ${question.choices.map((choice, i) => `
                <li class="${i === question.correct ? 'correct' : ''}">
                  ${choice}
                </li>
              `).join('')} 
          </div>
            <strong>Your Answer:</strong> ${question.choices[userAnswers[index]] || 'No answer'}
          </div>
          <div class="correct-answer">
            <strong>Correct Answer:</strong> ${question.choices[question.correct]}
          </div>
          <div class="result ${isCorrect ? 'text-success' : 'text-danger'}">
            ${isCorrect ? 'Correct' : 'Incorrect'}
          </div>
        `;
    answersLogContainer.appendChild(logItem);
  }); 

  // Finish button
  finishButton.addEventListener('click', function () {
    window.location.href = '../pages/finish-page.html';
  });
});
