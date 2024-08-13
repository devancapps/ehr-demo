import React from 'react';

const PatientList = ({ patients }) => (
  <div className="patient-list">
    <h2>Patient List</h2>
    <ul>
      {patients.map(patient => (
        <li key={patient.id}>{patient.name}</li>
      ))}
    </ul>
  </div>
);

export default PatientList;