# Carbon Footprint Tracker

## Project Overview
The **Carbon Footprint Tracker** is a web application designed to help users calculate, track, and reduce their carbon footprint. It provides a user-friendly interface for inputting data related to home energy usage, transportation, waste, food, and shopping. The app calculates the user's carbon footprint, provides personalized recommendations for reducing it, and allows users to track their progress over time.

### Key Features
- **Carbon Footprint Calculation**: Users can input data to calculate their carbon footprint.
- **Personalized Recommendations**: The app provides actionable recommendations to reduce carbon emissions.
- **Progress Tracking**: Users can view their carbon footprint history in a line chart.
- **Leaderboard**: A community leaderboard to compare carbon footprint reductions with others.
- **Carbon Offset Projects**: Information about real-world projects to offset carbon emissions.
- **Dark Mode**: A toggleable dark mode for better user experience.

---

## Folder Structure
Here’s the folder structure of the project:
carbon-footprint-tracker/
├── public/                  # Static files (images, etc.)
│   ├── assets/              # Images and other assets
│   │   ├── amazon_rf.jpeg
│   │   ├── solarpower_india.jpeg
│   │   └── windfarm_euro.jpeg
│   └── index.html           # Main entry point
├── src/                     # Source code
│   ├── css/                 # CSS files
│   │   └── styles.css
│   ├── js/                  # JavaScript files
│   │   ├── script.js        # Logic for index.html
│   │   ├── results.js       # Logic for results.html
│   │   ├── dashboard.js     # Logic for dashboard.html
│   │   └── login.js         # Logic for login.html
│   └── data/                # JSON data (e.g., users.json)
│       └── users.json
├── server.js                # Backend server (Node.js + Express)
├── package.json             # Node.js dependencies and scripts


---

## How to Set Up the Project Locally
### Prerequisites
1. **Node.js**: Ensure Node.js is installed on your system. 
2. **Git**: Install Git to clone the repository. 

### Steps to Set Up
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/carbon-footprint-tracker.git
   cd carbon-footprint-tracker

2. **Install Dependencies**:
   ```bash
   npm init -y
   npm install
3. **Start the Server**:
   ```bash
   npm start

## User Flow
### 1. Home Page (`index.html`)
- Users land on the home page, which provides an overview of the app.
- They can navigate to the carbon footprint calculator form.
- A **Sign Up / Log In** button is available for new or returning users.

### 2. Carbon Footprint Calculator
- Users input data related to:
  - **Home Energy Usage**: Electricity, natural gas, heating oil, propane.
  - **Transportation**: Car mileage, public transport, air travel.
  - **Waste**: General waste, recycled waste, composted waste.
  - **Food**: Meat consumption, dairy consumption, plant-based food.
  - **Shopping**: Clothing purchases, electronics purchases, other purchases.
- After submitting the form, the app calculates the carbon footprint and displays the results.

### 3. Results Page (`results.html`)
- Displays the calculated carbon footprint.
- Provides personalized recommendations to reduce the footprint.
- Users can save their results by signing up or logging in.
- If already logged in, users can track their progress on the dashboard.

### 4. Dashboard (`dashboard.html`)
- **Progress Tracker**: A line chart showing the user's carbon footprint history.
- **Leaderboard**: A community leaderboard comparing carbon footprint reductions.
- **Carbon Offset Projects**: Information about real-world projects to offset carbon emissions.
- Users can log out or return to the home page.

### 5. Login / Sign Up (`login.html`)
- New users can sign up by providing their email and password.
- Returning users can log in to access their saved data and track progress.

---

## Technologies Used
### Frontend
- **HTML, CSS, JavaScript**
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Font Awesome](https://fontawesome.com/) for icons

### Backend
- **Node.js** with **Express.js**
- JSON file for user data storage (for demonstration purposes)

### Styling
- Custom CSS with dark mode support
- Google Fonts (Poppins)

---

## Future Enhancements
- **User Authentication**: Implement a proper authentication system (e.g., JWT or OAuth).
- **Database Integration**: Replace the JSON file with a database (e.g., MongoDB).
- **Responsive Design**: Improve the app's responsiveness for mobile devices.
- **Gamification**: Add badges or rewards for achieving carbon reduction milestones.
- **API Integration**: Integrate with external APIs for real-time carbon footprint data.

## Contact
For questions or feedback, feel free to reach out:

Email: shreedebleena@gmail.com

GitHub: Debleena17
