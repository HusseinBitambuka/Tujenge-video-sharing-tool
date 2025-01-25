const express = require('express');
const videoController = require('../controllers/videoController'); // Fixed case sensitivity
const authenticate = require('../middlewares/authenticate');
const adminOnly = require('../middlewares/adminOnly');
const upload = require('../middlewares/multer');

const router = express.Router();

// Upload a video (Admin only)
router.post('/upload', authenticate, adminOnly, upload.single('video'), videoController.uploadVideo);

// Delete a video (Admin only)
router.delete('/:id', authenticate, adminOnly, videoController.deleteVideo);

// Get all videos
router.get('/', authenticate, videoController.getVideos);

// Track video interaction
router.post('/track', authenticate, videoController.trackVideo);

module.exports = router;