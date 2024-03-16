

  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  
  const ManageUsers = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [areasOfExpertise, setAreasOfExpertise] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [institutionDescription, setInstitutionDescription] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [trainerInstitution, setTrainerInstitution] = useState('');
    const [institutions, setInstitutions] = useState([]);
  

    const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [users]);
    useEffect(() => {
      const fetchInstitutions = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/institutions');
          setInstitutions(response.data);
        } catch (error) {
          console.error('Error fetching institutions:', error);
        }
      };
  
      fetchInstitutions();
    }, [institutions]);
  
    const handleAddUser = async () => {
      try {
        await axios.post('http://localhost:5000/api/users', {
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
          contactPhone,
          trainerInstitution // Add TrainerInstitution
        });
        alert('User added successfully');
        // Optionally, update the user list after adding the user
      } catch (error) {
        console.error('Error adding user:', error);
        alert('Failed to add user');
      }
    };
  
    return (
      <div>
        <h2>Manage Users</h2>
        <div>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
            <option value="">Select User Role</option>
            <option value="trainer">Trainer</option>
            <option value="institution">Institution</option>
          </select>
          {userRole === 'trainer' && (
            <>
              {/* Additional fields for trainer */}
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
              <textarea placeholder="Areas of Expertise" value={areasOfExpertise} onChange={(e) => setAreasOfExpertise(e.target.value)} />
              {/* TrainerInstitution selection box */}
              <select value={trainerInstitution} onChange={(e) => setTrainerInstitution(e.target.value)}>
                <option value="">Select Institution</option>
                {institutions.map((institution) => (
                  <option key={institution.InstitutionID} value={institution.InstitutionID}>{institution.InstitutionName}</option>
                ))}
              </select>
            </>
          )}
          {userRole === 'institution' && (
            <>
              {/* Additional fields for institution */}
              <input type="text" placeholder="Institution Name" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} />
              <textarea placeholder="Institution Description" value={institutionDescription} onChange={(e) => setInstitutionDescription(e.target.value)} />
              <input type="text" placeholder="Contact Person" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
              <input type="email" placeholder="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
              <input type="text" placeholder="Contact Phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
            </>
          )}
          <button onClick={handleAddUser}>Add User</button>
        </div>
        {/* Display existing users */}
        <h2>Existing Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.UserID}>
              <p>Username: {user.Username}</p>
              <p>Email: {user.Email}</p>
              <p>User Role: {user.UserRole}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ManageUsers;
  