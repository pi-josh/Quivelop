document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the nickname from localStorage
    const nickname = localStorage.getItem('nickname');
    if (nickname) {
        // Display the nickname
        document.getElementById('nickname-display').textContent = `Hello, ${nickname}!`;
    }
});