document.addEventListener('DOMContentLoaded', function () {
    const authForm = document.getElementById('authForm');
    const loginButton = document.getElementById('loginButton');
    const signUpButton = document.getElementById('signUpButton');

    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href = 'dashboard.html';
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        this.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Apply dark mode preference on page load
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Login functionality
    loginButton.addEventListener('click', async function (e) {
        e.preventDefault(); // Prevent form submission
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed. Please try again.');
            }

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('loggedInUser', email);
                saveResultsToUserHistory(email); // Save results to user history
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'An error occurred. Please try again.');
        }
    });

    // Sign-up functionality
    signUpButton.addEventListener('click', async function (e) {
        e.preventDefault(); // Prevent form submission
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Sign-up failed. Please try again.');
            }

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('loggedInUser', email);
                saveResultsToUserHistory(email); // Save results to user history
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Sign-up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'An error occurred. Please try again.');
        }
    });

    // Save results to user history
    async function saveResultsToUserHistory(email) {
        const carbonFootprint = localStorage.getItem('carbonFootprint');
        const recommendations = JSON.parse(localStorage.getItem('recommendations'));
        const chartData = JSON.parse(localStorage.getItem('chartData'));
    
        if (carbonFootprint && recommendations && chartData) {
            try {
                const response = await fetch('/api/save-footprint', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        footprint: parseFloat(carbonFootprint), // Convert to number
                        recommendations,
                        chartData,
                    }),
                });
                const data = await response.json();
                if (!data.success) {
                    console.error('Failed to save data to backend.');
                }
            } catch (error) {
                console.error('Error saving data:', error);
            }
        }
    }

    // Back to home button functionality
    document.getElementById('backToHomeButton').addEventListener('click', function () {
        window.location.href = 'index.html';
    });
});