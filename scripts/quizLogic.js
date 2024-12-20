document.addEventListener('DOMContentLoaded', function () {
    fetch('../data/questions.json')
        .then(response => response.json())
        .then(questions => {
            let currentQuestionIndex = 0;
            let score = 0;
            const userAnswers = [];

            const questionElement = document.getElementById('question-quiz');
            const choiceElements = [
                document.getElementById('choice1'),
                document.getElementById('choice2'),
                document.getElementById('choice3'),
                document.getElementById('choice4')
            ];
            const counterElement = document.getElementById('counter');
            const nextButton = document.getElementById('next-button');
            const previousButton = document.getElementById('previous-button');
            const exitButton = document.getElementById('btn-exit');
            const submitButton = document.getElementById('submit-button');

            const nickname = localStorage.getItem('nickname'); // Retrieve the nickname from localStorage

            function loadQuestion() {
                const currentQuestion = questions[currentQuestionIndex];
                questionElement.textContent = currentQuestion.question;
                choiceElements.forEach((element, index) => {
                    element.textContent = currentQuestion.choices[index];
                    element.parentElement.classList.remove('selected', 'correct', 'incorrect');
                });
                counterElement.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
                previousButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
                if(currentQuestionIndex === 0) {
                    console.log('none');
                } else {
                    console.log('ib');
                }
                nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
                submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
            }

            // Hardest part of the program
            choiceElements.forEach((element, index) => {
                element.parentElement.addEventListener('click', () => {
                    choiceElements.forEach(el => el.parentElement.classList.remove('selected'));
                    element.parentElement.classList.add('selected');
                    userAnswers[currentQuestionIndex] = index; // Store the user's answer
                    if (index === questions[currentQuestionIndex].correct) {
                        element.parentElement.classList.add('correct');
                        score++;
                    } else {
                        element.parentElement.classList.add('incorrect');
                    }
                    nextButton.click();
                });
            });

            nextButton.addEventListener('click', () => {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    loadQuestion();
                }
                else {
                    submitButton.click();
                }
            });

            submitButton.addEventListener('click', () => {
                // Save the score, nickname, and user answers in localStorage
                localStorage.setItem('score', score);
                localStorage.setItem('nickname', nickname);
                localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
                localStorage.setItem('questions', JSON.stringify(questions));
                window.location.href = '../pages/results.html';
            });

            previousButton.addEventListener('click', () => {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    loadQuestion();
                }
            });

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

            // Show dialog on Exit button click
            exitButton.addEventListener('click', () => {
                dialogOverlay.style.display = 'flex'; // Ensure it's visible
                setTimeout(() => {
                    dialogOverlay.classList.add('show'); // Add the 'show' class to trigger the entrance animation
                }, 10); // Slight delay to ensure styles apply
            });

            // Handle Confirm button
            dialogOverlay.querySelector('.confirm').addEventListener('click', () => {
                dialogOverlay.classList.remove('show'); // Remove the 'show' class
                setTimeout(() => {
                    dialogOverlay.style.display = 'none'; // Hide after animation
                }, 200); // Match the transition duration
                window.location.href = '../index.html'; // Redirect to the homepage
            });

            // Handle Cancel button
            dialogOverlay.querySelector('.cancel').addEventListener('click', () => {
                dialogOverlay.classList.remove('show'); // Remove the 'show' class
                setTimeout(() => {
                    dialogOverlay.style.display = 'none'; // Hide after animation
                }, 400); // Match the transition duration
            });

            // Event Listener for Close Button (X)
            dialogOverlay.querySelector('.dialog-btn-close').addEventListener('click', () => {
                dialogOverlay.classList.remove('show');
                setTimeout(() => {
                    dialogOverlay.style.display = 'none'; // Hide after animation
                }, 400); // Match the transition duration
            });

            loadQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
});