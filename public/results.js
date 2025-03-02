document.addEventListener('DOMContentLoaded', function () {
  const carbonFootprint = localStorage.getItem('carbonFootprint');
  const recommendations = JSON.parse(localStorage.getItem('recommendations'));
  const chartData = JSON.parse(localStorage.getItem('chartData'));

  // Display carbon footprint
  document.getElementById('footprintValue').innerText = carbonFootprint;

  // Display recommendations
  const recommendationsList = document.getElementById('recommendations');
  if (recommendations && recommendations.length > 0) {
      recommendationsList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
  } else {
      recommendationsList.innerHTML = "<li>Great job! Your carbon footprint is already low. Keep it up!</li>";
  }

  // Render chart
  const ctx = document.getElementById('footprintChart').getContext('2d');
  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: chartData.labels,
          datasets: [{
              data: chartData.data,
              backgroundColor: ['#00796b', '#4caf50', '#ff5722', '#ffc107', '#9c27b0'],
          }],
      },
  });

  // Back button functionality
  document.getElementById('backButton').addEventListener('click', function () {
      window.location.href = 'index.html';
  });

  // Save results button functionality
  const saveResultsButton = document.getElementById('saveResultsButton');
  saveResultsButton.addEventListener('click', function () {
      window.location.href = 'login.html';
  });

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

  // Check if user is signed in
  const loggedInUser = localStorage.getItem('loggedInUser');
  const trackProgressButton = document.getElementById('trackProgressButton');

  if (loggedInUser) {
      // User is signed in: Show "Track your progress" button and hide "Sign Up / Log In" button
      trackProgressButton.style.display = 'block';
      saveResultsButton.style.display = 'none';

      // Redirect to dashboard when the button is clicked
      trackProgressButton.addEventListener('click', function () {
          window.location.href = 'dashboard.html';
      });
  } else {
      // User is not signed in: Show "Sign Up / Log In" button and hide "Track your progress" button
      trackProgressButton.style.display = 'none';
      saveResultsButton.style.display = 'block';
  }
});