// src/components/Home.js
import React from 'react';

const Home = ({ user }) => {
  // const handleLogout = () => {
  //   onLogout(); // Call the onLogout function passed from the App component
  // };

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <h4>Youre role is: {user.role}</h4>
      {/* <button onClick={handleLogout}>Logout</button> Call handleLogout when the button is clicked */}
    </div>
  );
};

export default Home;
