const express = require('express');
const ResourceController = require('../controllers/resourceController');
const authenticate = require('../middlewares/authenticate');
const adminOnly = require('../middlewares/adminOnly');

const router = express.Router();

// Upload a resource (Admin only)
router.post('/upload', authenticate, adminOnly, ResourceController.uploadResource);

// Delete a resource (Admin only)
router.delete('/:id', authenticate, adminOnly, ResourceController.deleteResource);

// Track resource interaction
router.post('/track', authenticate, ResourceController.trackResource);

module.exports = router;
