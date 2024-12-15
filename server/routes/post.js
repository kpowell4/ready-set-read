import express from 'express';
import { Post } from '../models/Post.js'; // Adjust the path as necessary
const router = express.Router();

// Define your route to handle fetching a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching post details', error: err });
    }
});

// Define your routes to handle post approval and rejection
router.post('/approve/:id', async (req, res) => {
    try {
        // Logic to approve the post (e.g., setting a status field)
        res.json({ message: 'Post approved' });
    } catch (err) {
        res.status(500).send({ message: 'Error approving post', error: err });
    }
});

router.post('/reject/:id', async (req, res) => {
    try {
        // Logic to reject the post (e.g., setting a status field)
        res.json({ message: 'Post rejected' });
    } catch (err) {
        res.status(500).send({ message: 'Error rejecting post', error: err });
    }
});

export { router as postRouter };
