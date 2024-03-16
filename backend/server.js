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
      res.status(401).json({ success: false, message: 'Invalid username orpmm password' });
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



// Endpoint to add a user
app.post('/api/users', async (req, res) => {
  const {
    username,
    password,
    email,
    userRole,
    firstName,
    lastName,
    bio,
    areasOfExpertise,
    institutionName,
    institutionDescription,
    contactPerson,
    contactEmail,
    contactPhone
  } = req.body;

  try {
    // Hash the password

    // Insert user into the database based on user role
    let insertUserQuery = '';
    let insertUserData = [];
    if (userRole === 'institution') {
      insertUserQuery = 'INSERT INTO User (Username, Password, Email, UserRole, InstitutionName, InstitutionDescription, ContactPerson, ContactEmail, ContactPhone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      insertUserData = [username, password, email, userRole, institutionName, institutionDescription, contactPerson, contactEmail, contactPhone];
    } else if (userRole === 'trainer') {
      insertUserQuery = 'INSERT INTO User (Username, Password, Email, UserRole, FirstName, LastName, Bio,  AreasOfExpertise, AvailabilityStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      insertUserData = [username, password, email, userRole, firstName, lastName, bio,  areasOfExpertise, "Available"];
    }

    await pool.execute(insertUserQuery, insertUserData);

    res.status(201).json({ success: true, message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ success: false, message: 'Failed to add user' });
  }
});

// Get all institutions (users with the role 'institution')
app.get('/api/institutions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM User WHERE UserRole = ?', ['institution']);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Endpoint to fetch feedbacks
app.get('/api/feedbacks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Feedback');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to fetch formations
app.get('/api/formations', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM TrainingProgram');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to fetch users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM User');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Endpoint to add a formation
app.post('/api/formations', async (req, res) => {
  const { title, description, startDate, endDate, location, trainersID } = req.body;
  const addFormationQuery = 'INSERT INTO TrainingProgram (Title, Description, StartDate, EndDate, Location,UserID) VALUES (?, ?, ?, ?, ?, ?)';

  try {
    await pool.execute(addFormationQuery, [title, description, startDate, endDate, location, trainersID]);
    res.json({ success: true, message: 'Formation added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding formation' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
