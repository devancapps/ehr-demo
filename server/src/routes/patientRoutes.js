const express = require('express');
const router = express.Router();
const { getPatients, getPatientById, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/patients
// @desc    Get all patients
// @access  Private
router.get('/', auth, getPatients);

// @route   GET api/patients/:id
// @desc    Get patient by ID
// @access  Private
router.get('/:id', auth, getPatientById);

// @route   POST api/patients
// @desc    Create a new patient
// @access  Private
router.post('/', auth, createPatient);

// @route   PUT api/patients/:id
// @desc    Update a patient
// @access  Private
router.put('/:id', auth, updatePatient);

// @route   DELETE api/patients/:id
// @desc    Delete a patient
// @access  Private
router.delete('/:id', auth, deletePatient);

module.exports = router;