import express from 'express';
import { Student } from '../models/Student.js';
import bcrypt from 'bcrypt';
const router = express.Router();
import { verifyAdmin } from './auth.js';

// Register a new student
router.post('/register', verifyAdmin, async (req, res) => {
    try {
        const { username, studentid, grade, status, password } = req.body;
        const student = await Student.findOne({ username });
        if (student) {
            console.log("Student already exists");
            return res.json({ message: "Student already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            username,
            password: hashPassword,
            grade,
            status,
            studentid
        });

        await newStudent.save();
        console.log("Student registered successfully");
        return res.json({ registered: true });

    } catch (err) {
        console.error("Error in registering student:", err);
        return res.json({ message: "Error in registering student." });
    }
});

// Fetch all students
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        console.log("Students fetched successfully");
        return res.json(students);
    } catch (err) {
        console.error("Error fetching students:", err);
        return res.status(500).json({ error: err.message });
    }
});

// Fetch a specific student by ID
router.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.json(student);
    } catch (err) {
        console.error("Error fetching student:", err);
        return res.status(500).json({ error: err.message });
    }
});

// Update a student by ID
router.put('/students/:id', async (req, res) => {
    try {
        const { username, grade, status } = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { username, grade, status }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        console.log("Student updated successfully");
        return res.json({ updated: true });
    } catch (err) {
        console.error("Error updating student:", err);
        return res.status(500).json({ error: err.message });
    }
});

// Delete a student by ID
router.delete('/students/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        console.log("Student deleted successfully");
        return res.json({ deleted: true });
    } catch (err) {
        console.error("Error deleting student:", err);
        return res.status(500).json({ error: err.message });
    }
});

export { router as studentRouter };

