const express = require('express');
const app = express();
const axios = require('axios');
const helmet = require('helmet');
const PORT = process.env.PORT || 5000;

// Serve static files from the 'client' directory
app.use(express.static('client'));

// Parse JSON request bodies
app.use(express.json());

// Add security headers using Helmet
app.use(helmet());

// Enable CORS to allow requests from the frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint to fetch user details from GitHub API
app.get('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://api.github.com/users/${username}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
