import express from 'express';
import { Help } from '../models/Help.js'; // Adjust the path as necessary

const router = express.Router();

// Define your route to handle comment submissions
router.post('/help', async (req, res) => {
    try {
        const newHelp = new Help(req.body);
        await newHelp.save();
        res.json({ submitted: true, message: "Comment added successfully" });
    } catch (err) {
        res.json({ submitted: false, message: "Error when adding comment", error: err });
    }
});

export { router as helpRouter };
