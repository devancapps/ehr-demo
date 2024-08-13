// This file defines the User model for our application.
// Since we're using PostgreSQL, we'll define the table structure here.

const { pool } = require('../config/database');

const createUsersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

// Function to find a user by email
const findByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

// Function to create a new user
const create = async (name, email, password) => {
  const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
  const { rows } = await pool.query(query, [name, email, password]);
  return rows[0];
};

module.exports = {
  createUsersTable,
  findByEmail,
  create
};