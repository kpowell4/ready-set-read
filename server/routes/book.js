import express from 'express';
import { Book } from '../models/Book.js';
const router = express.Router();
import { verifyAdmin } from '../routes/auth.js';

router.post('/add', async (req, res) => {
    try {
        const { title, author, category, level, imageUrl, description } = req.body; // Include description
        const book = await Book.findOne({ title });
        if (book) {
            return res.json({ message: "Book is already added" });
        }

        const newBook = new Book({
            title,
            author,
            category,
            level,
            imageUrl,
            description // Save description
        });

        await newBook.save();
        return res.json({ added: true });

    } catch (err) {
        return res.json({ message: "Error when adding book." });
    }
});

// Updated route to fetch all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find(); // Correct model name and method
        return res.json(books); // Return books directly
    } catch (err) {
        return res.json(err);
    }
});

// Route to fetch book details by ID
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.json(book);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export { router as bookRouter };


