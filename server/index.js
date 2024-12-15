import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './db.js';
import { AdminRouter } from './routes/auth.js';
import { studentRouter } from './routes/student.js';
import { bookRouter } from './routes/book.js';
import { helpRouter } from './routes/help.js';
import { postRouter } from './routes/post.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(cookieParser());

// Use Routes
app.use('/auth', AdminRouter);
app.use('/student', studentRouter);  // Removed verifyAdmin from here to avoid restricting access to student routes
app.use('/book', bookRouter);
app.use('/help', helpRouter);
app.use('/post', postRouter);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Server is running on port ${process.env.PORT || 3002}`);
});
