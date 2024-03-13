// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Home from './components/Home';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/me', { withCredentials: true })
      .then(response => {
        if (response.data.loggedIn) {
          setUser(response.data.user);
        }
      })
      .catch(error => console.error('Error checking logged in status:', error));
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    axios.get('http://localhost:5000/api/logout', { withCredentials: true })
      .then(() => {
        setUser(null);
      })
      .catch(error => console.error('Logout failed:', error));
  };

  return (
    <div>
      {user ? (
        <Home user={user} onLogout={handleLogout} /> 
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
