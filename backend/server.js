// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
  credentials: true // Allow cookies to be sent
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // Session expiry time (in milliseconds)
  }
}));

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM User WHERE Username = ?', [username]);
    if (rows.length === 1) {
      const user = rows[0];
      if (password==user.Password) {
        req.session.user = { id: user.UserID, username: user.Username, role: user.UserRole };
        res.json({ success: true, user: req.session.user });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Logout endpoint
app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Check if user is logged in
app.get('/api/me', (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({ loggedIn: true, user });
  } else {
    res.json({ loggedIn: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
