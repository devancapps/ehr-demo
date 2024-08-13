// This file defines the Patient model for our application.
// Since we're using PostgreSQL, we'll define the table structure here.

const { pool } = require('../config/database');

const createPatientsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      age INTEGER NOT NULL,
      gender VARCHAR(10) NOT NULL,
      medical_history TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Patients table created successfully');
  } catch (error) {
    console.error('Error creating patients table:', error);
  }
};

// Function to get all patients
const getAll = async () => {
  const query = 'SELECT * FROM patients ORDER BY created_at DESC';
  const { rows } = await pool.query(query);
  return rows;
};

// Function to get a patient by ID
const getById = async (id) => {
  const query = 'SELECT * FROM patients WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// Function to create a new patient
const create = async (name, age, gender, medicalHistory) => {
  const query = 'INSERT INTO patients (name, age, gender, medical_history) VALUES ($1, $2, $3, $4) RETURNING *';
  const { rows } = await pool.query(query, [name, age, gender, medicalHistory]);
  return rows[0];
};

// Function to update a patient
const update = async (id, name, age, gender, medicalHistory) => {
  const query = 'UPDATE patients SET name = $1, age = $2, gender = $3, medical_history = $4 WHERE id = $5 RETURNING *';
  const { rows } = await pool.query(query, [name, age, gender, medicalHistory, id]);
  return rows[0];
};

// Function to delete a patient
const remove = async (id) => {
  const query = 'DELETE FROM patients WHERE id = $1 RETURNING *';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createPatientsTable,
  getAll,
  getById,
  create,
  update,
  remove
};