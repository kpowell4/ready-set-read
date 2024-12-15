import express from 'express';
import { Admin } from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();
import { Student } from '../models/Student.js';

router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        console.log('Login request payload:', req.body); // Log the request payload

        if (!username || !password || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (role === 'admin') {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(400).json({ message: "Admin not registered" });
            }
            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Wrong password" });
            }
            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_Key);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'admin' });
        } else if (role === 'student') {
            const student = await Student.findOne({ username });
            console.log('Student query result:', student); // Log the query result
            if (!student) {
                return res.status(400).json({ message: "Student not registered" });
            }
            const validPassword = await bcrypt.compare(password, student.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Wrong password" });
            }
            const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_Key);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'student' });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
    } catch (er) {
        console.error('Server error:', er); // Log the error for debugging
        res.status(500).json({ message: "Server error", error: er });
    }
});

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Invalid Admin" });
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

// Logout endpoint to clear the cookie
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ logout: true });
});

export { router as AdminRouter, verifyAdmin };
