import React, { useState } from 'react';

function Trainer() {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    email: '',
    qualifications: '',
    AreasOfExpertise: '',
    AvailabilityStatus: ''
  });

  const handleChange = (e) => {
    const { FirstName, value } = e.target;
    setFormData({ ...formData, FirstName: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="First Name"
          value={formData.FirstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="Last Name"
          value={formData.LastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Qualifications:</label>
        <input
          type="text"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Areas Expertise:</label>
        <input
          type="text"
          name="Areas Of Expertise"
          value={formData.AreasOfExpertise}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Availability Status</label>
        <select
          name="AvailabilityStatus"
          value={formData.AvailabilityStatus}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez...</option>
          <option value="Disponible">Disponible</option>
          <option value="Non disponible">Non disponible</option>
        </select>
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
}

export default Trainer;
