// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
  credentials: true // Allow cookies to be sent
}));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['your_secret_key'], // Change this to a secure random string
  maxAge: 24 * 60 * 60 * 1000, // Session expiry time (in milliseconds)
}));

// Dummy user data (replace with your actual user authentication mechanism)
const users = [
  { id: 1, username: 'user', password: 'password' }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    console.log(req.session.user)
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// Logout endpoint
app.get('/api/logout', (req, res) => {
  req.session = null; // Clear the session data
  res.json({ success: true });
});

// Check if user is logged in
app.get('/api/me', (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({ loggedIn: true, user });
    console.log(req.session.user)
  } else {
    res.json({ loggedIn: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
