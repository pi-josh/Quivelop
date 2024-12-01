document.addEventListener('DOMContentLoaded', function () {
    const scoreDisplay = document.getElementById('score-quiz-display');
    const nicknameDisplay = document.querySelector('.geomgraphic');
    const seeBtn = document.getElementById('see-btn');

    // Retrieve the score and nickname
    const score = localStorage.getItem('score');
    const nickname = localStorage.getItem('nickname'); // Optional: Add if using nickname

    // Update the HTML
    if (score) scoreDisplay.textContent = `${score}/20`;
    if (nickname) nicknameDisplay.textContent = nickname;

    seeBtn.addEventListener('click', function () {
        window.location.href = '../pages/answers.html';
    });

});
