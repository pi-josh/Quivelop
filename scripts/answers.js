document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from localStorage
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const score = localStorage.getItem('score') || 0;
    const nickname = localStorage.getItem('nickname') || 'Anonymous';
    const answersLogContainer = document.getElementById('answers-log');
    
    // Display nickname
    const nicknameDisplay = document.createElement('div');
    nicknameDisplay.className = 'nickname mt-4';
    nicknameDisplay.innerHTML = `<h4 class="text-center">Nickname: ${nickname}</h4>`;
    answersLogContainer.appendChild(nicknameDisplay);
    // Display total score
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'total-score mt-4';
    scoreDisplay.innerHTML = `
    <h4 class="text-center">Your Total Score: ${score}/${questions.length}</h4>
    `;
    answersLogContainer.appendChild(scoreDisplay);

    // Generate log items
    questions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correct;
        const logItem = document.createElement('div');
        logItem.className = `log-item ${isCorrect ? 'correct' : 'incorrect'}`;

        logItem.innerHTML = `
          <div class="question-number"><strong>Question ${index + 1}:</strong></div>
          <div class="question-text">${question.question}</div>
          <div class="user-answer">
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

});
