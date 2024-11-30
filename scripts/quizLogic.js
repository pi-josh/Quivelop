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

            // Create Dialog Overlay
            const dialogOverlay = document.createElement('div');
            dialogOverlay.className = 'dialog-overlay';
            dialogOverlay.innerHTML = `
                <div class="dialog-box">
                    <div class="dialog-title">Leaving so Soon?</div>
                    <button class="dialog-btn-close">X</button>
                    <img src="../assets/img/QUIVELOP-sad.png" alt="Quivelop Cry" class="dialog-image" />
                    <div class="line-divider two"></div>
                    <div class="dialog-message">If you exit now, your progress will not be saved. Do you want to continue?</div>
                    <div class="line-divider one"></div>
                    <div class="dialog-buttons">
                    <button class="dialog-btn cancel">Cancel</button>
                    <button class="dialog-btn confirm">Exit</button>
                    </div>
                </div>
            `;
            document.body.appendChild(dialogOverlay);

            // Event Listener for Exit Button
            exitButton.addEventListener('click', () => {
                dialogOverlay.style.display = 'flex';
                document.body.classList.add('dialog-active');
            });

            // Event Listener for Confirm Button
            dialogOverlay.querySelector('.confirm').addEventListener('click', () => {
                dialogOverlay.style.display = 'none';
                document.body.classList.remove('dialog-active');
                window.location.href = '../index.html'; // Redirect to index
            });

            // Event Listener for Cancel Button
            dialogOverlay.querySelector('.cancel').addEventListener('click', () => {
                dialogOverlay.style.display = 'none';
                document.body.classList.remove('dialog-active');
            });

            // Event Listener for Close Button (X)
            dialogOverlay.querySelector('.dialog-btn-close').addEventListener('click', () => {
                dialogOverlay.style.display = 'none';
                document.body.classList.remove('dialog-active');
            });

            // Load First Question
            function loadQuestion() {
                const currentQuestion = questions[currentQuestionIndex];
                questionElement.textContent = currentQuestion.question;
                choiceElements.forEach((element, index) => {
                    element.textContent = currentQuestion.choices[index];
                    element.parentElement.classList.remove('selected', 'correct', 'incorrect');
                });
                counterElement.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
            }

            // Handle Question Choices
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

            // Handle Next Button
            nextButton.addEventListener('click', () => {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    loadQuestion();
                } else {
                    alert(`Quiz finished! Your score is ${score}/${questions.length}`);
                }
            });

            loadQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
});
