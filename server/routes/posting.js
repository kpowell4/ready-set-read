import express from 'express';
import { PostDetails } from '../models/PostDetails'; // Adjust the path as needed

const router = express.Router();

// Fetch all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await PostDetails.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});

// Fetch a specific post by ID
router.get('/post/:id', async (req, res) => {
    try {
        const post = await PostDetails.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
});

// Update post status
router.post('/post/updateStatus/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const post = await PostDetails.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post status', error });
    }
});

export { router as PostDetails };
