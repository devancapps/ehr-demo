import React from 'react';

const PatientDetails = ({ patient }) => (
  <div className="patient-details">
    <h2>{patient.name}</h2>
    <p>Age: {patient.age}</p>
    <p>Gender: {patient.gender}</p>
    <p>Medical History: {patient.medicalHistory}</p>
  </div>
);

export default PatientDetails;