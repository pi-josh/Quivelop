document.addEventListener('DOMContentLoaded', function () {
    const scoreDisplay = document.getElementById('score-quiz-display');
    const nicknameDisplay = document.querySelector('.geomgraphic');
    const seeBtn = document.getElementById('see-btn');
    const correctAnswers = document.getElementById('correct-answer');
    const wrongAnswers = document.getElementById('wrong-answer');
    const wrongPercent = document.getElementById('percentage-wrong');
    const correctPercent = document.getElementById('percentage-correct');

    // Retrieve the score and nickname
    const score = localStorage.getItem('score');
    const nickname = localStorage.getItem('nickname'); // Optional: Add if using nickname

    // Update the HTML
    if (score) scoreDisplay.textContent = `${score}/20`;
    if (nickname) nicknameDisplay.textContent = nickname;

    // Calculate the percentage of correct and wrong answers
    let correct =  Number(score);
    let wrong = 20 - correct;
    let correctPercentage = parseFloat((correct / 20) * 100).toFixed(NaN);
    let wrongPercentage = parseFloat(100).toFixed(NaN);

    // Display calculated values
    correctAnswers.textContent = `${correct} Correct`;
    wrongAnswers.textContent = `${wrong} Incorrect`;
    correctPercent.textContent = `${correctPercentage}%`;
    wrongPercent.textContent = `${wrongPercentage}%`;

    seeBtn.addEventListener('click', function () {
        window.location.href = '../pages/answers.html';
    });

});
