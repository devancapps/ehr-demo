const { pool } = require('../config/database');

exports.getPatients = async (req, res) => {
  try {
    const patients = await pool.query('SELECT * FROM patients');
    res.json(patients.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);
    if (patient.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPatient = async (req, res) => {
  const { name, age, gender, medicalHistory } = req.body;
  try {
    const newPatient = await pool.query(
      'INSERT INTO patients (name, age, gender, medical_history) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, age, gender, medicalHistory]
    );
    res.status(201).json(newPatient.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, medicalHistory } = req.body;
  try {
    const updatedPatient = await pool.query(
      'UPDATE patients SET name = $1, age = $2, gender = $3, medical_history = $4 WHERE id = $5 RETURNING *',
      [name, age, gender, medicalHistory, id]
    );
    if (updatedPatient.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(updatedPatient.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPatient = await pool.query('DELETE FROM patients WHERE id = $1 RETURNING *', [id]);
    if (deletedPatient.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};