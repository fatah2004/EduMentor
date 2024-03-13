import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user-data');
        setUserData(response.data); // Assuming the server sends userData directly
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>User ID: {userData.id}</p>
      <p>User Role: {userData.role}</p>
    </div>
  );
};

export default Dashboard;
