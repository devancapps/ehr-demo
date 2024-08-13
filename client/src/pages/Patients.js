import React, { useState, useEffect } from 'react';
import PatientList from '../components/PatientList';
import PatientDetails from '../components/PatientDetails';
import { getPatients } from '../services/api';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  return (
    <div className="patients-page">
      <PatientList patients={patients} onSelectPatient={setSelectedPatient} />
      {selectedPatient && <PatientDetails patient={selectedPatient} />}
    </div>
  );
};

export default Patients;