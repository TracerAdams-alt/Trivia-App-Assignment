function validateForm(type) {
    const username = document.getElementById('username')?.value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (type === 'register') {
        if (username) {
            sessionStorage.setItem('username', username);
        }
    }

    if (type === 'login') {
        const storedUsername = sessionStorage.getItem('username');
        if (!storedUsername) {
            alert('No registered username found. Please sign up first.');
            return false; 
        }
    }
    console.log("Saving username:", username);

    return true; 
}

window.onload = function () {
    const storedUsername = sessionStorage.getItem('username');
    const usernameDisplay = document.getElementById('username-display');
    if (storedUsername && usernameDisplay) {
        usernameDisplay.textContent = storedUsername;
    }
}