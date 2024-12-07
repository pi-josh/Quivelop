document.addEventListener('DOMContentLoaded', function () {
    const yesButton = document.getElementById('btn-yes');
    const noButton = document.getElementById('btn-no');

    yesButton.addEventListener('click', function () {
      window.location.href = '../pages/start-quiz.html'; 
    });

    noButton.addEventListener('click', function () {
        localStorage.clear();
        window.location.href = '../';
    });
});
