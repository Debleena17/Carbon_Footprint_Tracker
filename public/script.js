document.addEventListener('DOMContentLoaded', function () {
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

  // Form submission
  document.getElementById('carbonForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      // Get user inputs
      const inputs = {
          electricity: parseFloat(document.getElementById('electricity').value),
          naturalGas: parseFloat(document.getElementById('naturalGas').value),
          heatingOil: parseFloat(document.getElementById('heatingOil').value),
          propane: parseFloat(document.getElementById('propane').value),
          carMileage: parseFloat(document.getElementById('carMileage').value),
          publicTransport: parseFloat(document.getElementById('publicTransport').value),
          airTravel: parseFloat(document.getElementById('airTravel').value),
          generalWaste: parseFloat(document.getElementById('generalWaste').value),
          recycledWaste: parseFloat(document.getElementById('recycledWaste').value),
          compostedWaste: parseFloat(document.getElementById('compostedWaste').value),
          meatConsumption: parseFloat(document.getElementById('meatConsumption').value),
          dairyConsumption: parseFloat(document.getElementById('dairyConsumption').value),
          plantBasedFood: parseFloat(document.getElementById('plantBasedFood').value),
          clothingPurchases: parseFloat(document.getElementById('clothingPurchases').value),
          electronicsPurchases: parseFloat(document.getElementById('electronicsPurchases').value),
          otherPurchases: parseFloat(document.getElementById('otherPurchases').value),
      };

      // Validate inputs (no negative numbers)
      if (Object.values(inputs).some(value => isNaN(value) || value < 0)) {
          alert('Please fill in all fields with valid, non-negative numbers.');
          return;
      }

      // Calculate carbon footprint
      const carbonFootprint = calculateCarbonFootprint(inputs);

      // Generate recommendations
      const recommendations = generateRecommendations(inputs, carbonFootprint);

      // Save data to localStorage
      localStorage.setItem('carbonFootprint', carbonFootprint); // Save as number, not string
      localStorage.setItem('recommendations', JSON.stringify(recommendations));
      localStorage.setItem('chartData', JSON.stringify(getChartData(inputs)));

      // Save data to backend (for logged-in users)
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
          try {
              const response = await fetch('/api/save-footprint', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      email: loggedInUser,
                      footprint: carbonFootprint, // Send as number
                      recommendations,
                      chartData: getChartData(inputs),
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

      // Redirect to results page
      window.location.href = 'results.html';
  });
});

// Helper functions
function calculateCarbonFootprint(inputs) {
  const {
      electricity,
      naturalGas,
      heatingOil,
      propane,
      carMileage,
      publicTransport,
      airTravel,
      generalWaste,
      recycledWaste,
      compostedWaste,
      meatConsumption,
      dairyConsumption,
      plantBasedFood,
      clothingPurchases,
      electronicsPurchases,
      otherPurchases,
  } = inputs;

  const homeEnergy = (electricity * 0.85) + (naturalGas * 5.3) + (heatingOil * 11.6) + (propane * 5.8);
  const transportation = (carMileage * 0.4) + (publicTransport * 0.2) + (airTravel * 0.25);
  const waste = (generalWaste * 0.1) - (recycledWaste * 0.05) - (compostedWaste * 0.03);
  const food = (meatConsumption * 6) + (dairyConsumption * 2) - (plantBasedFood * 0.5);
  const shopping = (clothingPurchases * 10) + (electronicsPurchases * 20) + (otherPurchases * 5);

  return homeEnergy + transportation + waste + food + shopping;
}

function generateRecommendations(inputs, carbonFootprint) {
  const recommendations = [];

  // Home Energy
  if (inputs.electricity > 500) recommendations.push('Switch to renewable energy sources like solar or wind power.');
  if (inputs.naturalGas > 100 || inputs.heatingOil > 100 || inputs.propane > 100) recommendations.push('Improve home insulation to reduce heating needs.');

  // Transportation
  if (inputs.carMileage > 1000) recommendations.push('Consider using an electric or hybrid vehicle.');
  if (inputs.publicTransport < 100 && inputs.carMileage > 500) recommendations.push('Use public transport or carpool to reduce emissions.');
  if (inputs.airTravel > 1000) recommendations.push('Limit air travel and opt for video conferencing when possible.');

  // Waste
  if (inputs.generalWaste > 100) recommendations.push('Reduce waste by recycling and composting.');
  if (inputs.recycledWaste < inputs.generalWaste * 0.5) recommendations.push('Increase recycling efforts to reduce landfill waste.');

  // Food
  if (inputs.meatConsumption > 50) recommendations.push('Reduce meat consumption and opt for plant-based meals.');
  if (inputs.dairyConsumption > 50) recommendations.push('Switch to plant-based dairy alternatives.');
  if (inputs.plantBasedFood < inputs.meatConsumption + inputs.dairyConsumption) recommendations.push('Increase consumption of plant-based foods.');

  // Shopping
  if (inputs.clothingPurchases > 20) recommendations.push('Buy second-hand or sustainable clothing.');
  if (inputs.electronicsPurchases > 5) recommendations.push('Repair or recycle electronics instead of buying new ones.');
  if (inputs.otherPurchases > 50) recommendations.push('Avoid unnecessary purchases and opt for sustainable products.');

  // General
  if (carbonFootprint > 5000) recommendations.push('Consider offsetting your carbon footprint by investing in carbon offset projects.');

  return recommendations;
}

function getChartData(inputs) {
  return {
      labels: ['Home Energy', 'Transportation', 'Waste', 'Food', 'Shopping'],
      data: [
          (inputs.electricity * 0.85) + (inputs.naturalGas * 5.3) + (inputs.heatingOil * 11.6) + (inputs.propane * 5.8),
          (inputs.carMileage * 0.4) + (inputs.publicTransport * 0.2) + (inputs.airTravel * 0.25),
          (inputs.generalWaste * 0.1) - (inputs.recycledWaste * 0.05) - (inputs.compostedWaste * 0.03),
          (inputs.meatConsumption * 6) + (inputs.dairyConsumption * 2) - (inputs.plantBasedFood * 0.5),
          (inputs.clothingPurchases * 10) + (inputs.electronicsPurchases * 20) + (inputs.otherPurchases * 5),
      ],
  };
}