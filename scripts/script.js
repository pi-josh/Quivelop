document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default form submission
        const nickname = document.getElementById('nickname').value;
        if (nickname) {
            // Store the nickname in the local storage
            localStorage.setItem('nickname', nickname);
            // Redirect to the quiz page
            window.location.href = './pages/start-quiz.html';
        } else {
            alert('Please enter your nickname.');
        }
    });
});