import React, { useState,useEffect } from 'react';
import axios from 'axios';

const ManageFormations = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [institutionID, setInstitutionID] = useState('');
  const [trainerID, setTrainerID] = useState('');
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/formations');
        setFormations(response.data);
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };

    fetchFormations();
  }, []);


  const handleAddFormation = async () => {
    try {
      await axios.post('http://localhost:5000/api/formations', {
        title,
        description,
        startDate,
        endDate,
        location,
        status,
        institutionID,
        trainerID
      });
      alert('Formation added successfully');
      // Optionally, update the formation list after adding the formation
    } catch (error) {
      console.error('Error adding formation:', error);
      alert('Failed to add formation');
    }
  };

  return (
    <div>
      <h2>Manage Formations</h2>
      <div>
      <div>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" placeholder="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <input type="text" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} />
        <input type="number" placeholder="Institution ID" value={institutionID} onChange={e => setInstitutionID(e.target.value)} />
        <input type="number" placeholder="Trainer ID" value={trainerID} onChange={e => setTrainerID(e.target.value)} />
        <button onClick={handleAddFormation}>Add Formation</button>
      </div>
      </div>
      <div>
      <h2>Manage Formations</h2>
      <ul>
        {formations.map(formation => (
          <li key={formation.ProgramID}>
            <p>Title: {formation.Title}</p>
            <p>Description: {formation.Description}</p>
            <p>Start Date: {formation.StartDate}</p>
            <p>End Date: {formation.EndDate}</p>
            <p>Status: {formation.Status}</p>
            <hr />
          </li>
        ))}
      </ul>
      </div>
     
    </div>
  );
};

export default ManageFormations;
