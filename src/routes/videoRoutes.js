const express = require('express');
const VideoController = require('../controllers/VideoController');
const authenticate = require('../middlewares/authenticate');
const adminOnly = require('../middlewares/adminOnly');
const upload = require('../middlewares/multer'); // Middleware for handling file uploads

const router = express.Router();

// Upload a video (Admin only)
router.post('/upload', authenticate, adminOnly, upload.single('video'), VideoController.uploadVideo);

// Delete a video (Admin only)
router.delete('/:id', authenticate, adminOnly, VideoController.deleteVideo);

// Get all videos
router.get('/', authenticate, VideoController.getVideos);

// Track video interaction
router.post('/track', authenticate, VideoController.trackVideo);

module.exports = router;
