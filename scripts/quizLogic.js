document.addEventListener('DOMContentLoaded', function () {
    fetch('../data/questions.json')
        .then(response => response.json())
        .then(questions => {
            let currentQuestionIndex = 0;
            let score = 0;

            const questionElement = document.getElementById('question-quiz');
            const choiceElements = [
                document.getElementById('choice1'),
                document.getElementById('choice2'),
                document.getElementById('choice3'),
                document.getElementById('choice4')
            ];
            const counterElement = document.getElementById('counter');
            const nextButton = document.getElementById('next-button');
            const exitButton = document.getElementById('btn-exit');

            function loadQuestion() {
                const currentQuestion = questions[currentQuestionIndex];
                questionElement.textContent = currentQuestion.question;
                choiceElements.forEach((element, index) => {
                    element.textContent = currentQuestion.choices[index];
                    element.parentElement.classList.remove('selected', 'correct', 'incorrect');
                });
                counterElement.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
            }

            choiceElements.forEach((element, index) => {
                element.parentElement.addEventListener('click', () => {
                    choiceElements.forEach(el => el.parentElement.classList.remove('selected'));
                    element.parentElement.classList.add('selected');
                    if (index === questions[currentQuestionIndex].correct) {
                        element.parentElement.classList.add('correct');
                        score++;
                    } else {
                        element.parentElement.classList.add('incorrect');
                    }
                });
            });

            nextButton.addEventListener('click', () => {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    loadQuestion();
                } else {
                    alert(`Quiz finished! Your score is ${score}/${questions.length}`);
                    // Optionally, redirect to a results page or restart the quiz
                    // TODO: REDIRECT TO THE RESULTS PAGE
                }
            });
            
            exitButton.addEventListener('click', () => {
                // TODO: Add a confirmation dialog
                window.location.replace('../index.html');
            });
            loadQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
});