document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html';
        return;
    }

    // Fetch user data
    fetch('/api/get-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loggedInUser }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user data.');
        }
        return response.json();
    })
    .then(user => {
        console.log('User Data:', user); // Log the user data
        if (user && user.footprintHistory) {
            renderChart(user.footprintHistory);
        } else {
            alert('User data not found or invalid.');
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        alert('An error occurred while fetching user data. Please try again.');
    });

    // Render chart from footprint history
    function renderChart(footprintHistory) {
        console.log('Footprint History:', footprintHistory); // Log the footprint history

        // Ensure footprintHistory is an array and not empty
        if (!Array.isArray(footprintHistory) || footprintHistory.length === 0) {
            alert('No footprint history found.');
            return;
        }

        // Ensure all footprint values are numbers
        const validHistory = footprintHistory.map(entry => ({
            ...entry,
            footprint: parseFloat(entry.footprint), // Convert footprint to a number
        }));

        // Extract labels (dates) and data (footprint values)
        const labels = validHistory.map(entry => new Date(entry.date).toLocaleDateString());
        const data = validHistory.map(entry => entry.footprint);

        console.log('Chart Labels:', labels); // Log the chart labels
        console.log('Chart Data:', data); // Log the chart data

        // Get the canvas element
        const ctx = document.getElementById('progressChart').getContext('2d');

        // Render the chart
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Carbon Footprint (kg CO2e)',
                    data: data,
                    borderColor: '#00796b',
                    fill: false,
                }],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
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

    // Logout button functionality
    document.getElementById('logoutButton').addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    // Back to home button functionality
    document.getElementById('backToHomeButton').addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // Render leaderboard (example data)
    const leaderboardData = [
        { rank: 1, username: 'EcoWarrior', reduction: 1200 },
        { rank: 2, username: 'GreenGuru', reduction: 1100 },
        { rank: 3, username: 'PlanetSaver', reduction: 1000 },
        { rank: 4, username: 'EcoFriendly', reduction: 950 },
        { rank: 5, username: 'NatureLover', reduction: 900 },
    ];

    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.rank}</td>
            <td>${user.username}</td>
            <td>${user.reduction}</td>
        `;
        leaderboardBody.appendChild(row);
    });

    // Display carbon offset projects (example data)
    const projects = [
        {
            title: 'Reforestation in the Amazon',
            description: 'This project plants trees to restore the Amazon rainforest, offsetting 100 tons of CO2 per year.',
            image: 'assets/amazon_rf.jpeg',
            link: 'https://example.com/donate',
        },
        {
            title: 'Solar Energy in India',
            description: 'This project installs solar panels in rural areas, reducing reliance on fossil fuels.',
            image: 'assets/solarpower_india.jpg',
            link: 'https://example.com/donate',
        },
        {
            title: 'Wind Farms in Europe',
            description: 'This project builds wind turbines to generate clean energy, offsetting 200 tons of CO2 per year.',
            image: 'assets/windfarm_euro.jpg',
            link: 'https://example.com/donate',
        },
    ];

    const projectsContainer = document.querySelector('.projects');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="donate-button">Donate Now</a>
        `;
        projectsContainer.appendChild(projectCard);
    });
});