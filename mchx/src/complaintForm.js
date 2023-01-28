import React, { useState } from 'react';

function ComplaintForm() {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the data to your server to file the complaint
    console.log(restaurantName);
    console.log(restaurantAddress);
    console.log(incidentDate);
    console.log(incidentDescription);
    console.log(name);
    console.log(address);
    console.log(email);
    // reset the form
    setRestaurantName('');
    setRestaurantAddress('');
    setIncidentDate('');
    setIncidentDescription('');
    setName('');
    setAddress('');
    setEmail('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Restaurant Name:
        <input type="text" value={restaurantName} onChange={e => setRestaurantName(e.target.value)} required />
      </label>
      <label>
        Restaurant Address:
        <input type="text" value={restaurantAddress} onChange={e => setRestaurantAddress(e.target.value)} required />
      </label>
      <label>
        Incident Date:
        <input type="date" value={incidentDate} onChange={e => setIncidentDate(e.target.value)} required />
      </label>
      <label>
        Incident Description:
        <textarea value={incidentDescription} onChange={e => setIncidentDescription(e.target.value)} required />
      </label>
      <label>
        Your Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)}/>
      </label>
      <label>
        Your Address:
        <input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
      </label>
      <label>
        Your Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      </label>
      <input type="submit" value="File Complaint" />
    </form>
  );
}

export default ComplaintForm;
