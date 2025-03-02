const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Parse JSON bodies
app.use(express.json());

// Load user data from JSON file
const usersFilePath = path.join(__dirname, '../data/users.json');

// Read user data
function readUsers() {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([])); // Create file with empty array
    }
    const data = fs.readFileSync(usersFilePath, 'utf8'); // Specify encoding
    return JSON.parse(data);
}

// Write user data
function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8'); // Specify encoding
}

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
});

// Sign-up endpoint
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Check if user already exists
    const userExists = users.some(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    // Add new user
    users.push({ email, password, footprintHistory: [] });
    writeUsers(users);
    res.json({ success: true });
});

// Save footprint endpoint
app.post('/api/save-footprint', (req, res) => {
  console.log('Save Footprint Request:', req.body); // Log the request data
  const { email, footprint, recommendations, chartData } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (user) {
      user.footprintHistory = user.footprintHistory || [];
      const isDuplicate = user.footprintHistory.some(entry => 
          entry.footprint === parseFloat(footprint) &&
          JSON.stringify(entry.recommendations) === JSON.stringify(recommendations) &&
          JSON.stringify(entry.chartData) === JSON.stringify(chartData)
      );

      if (!isDuplicate) {
          user.footprintHistory.push({
              footprint: parseFloat(footprint),
              recommendations,
              chartData,
              date: new Date().toISOString(),
          });
          writeUsers(users);
          console.log('New Entry Added:', user.footprintHistory); // Log the updated history
          res.json({ success: true });
      } else {
          console.log('Duplicate Entry Detected'); // Log duplicate detection
          res.json({ success: false, message: 'Duplicate entry detected.' });
      }
  } else {
      console.log('User Not Found'); // Log user not found
      res.status(404).json({ success: false, message: 'User not found.' });
  }
});

// Get user data endpoint
app.post('/api/get-user', (req, res) => {
    const { email } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ success: false, message: 'User not found.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
