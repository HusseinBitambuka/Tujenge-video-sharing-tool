const { Video, VideoTracking } = require('../models');
const s3 = require('../config/awsConfig');
const { v4: uuidv4 } = require('uuid');

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    // Add file validation
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only video files are allowed.' });
    }

    const fileName = `videos/${uuidv4()}-${req.file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const s3Response = await s3.upload(params).promise();

    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      s3Url: s3Response.Location,
      createdBy: req.user.id,
    });

    res.status(201).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading video' });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Add ownership check
    if (video.createdBy !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this video' });
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: video.s3Url.split('/').slice(-2).join('/'),
    };

    await s3.deleteObject(params).promise();
    await video.destroy();

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting video' });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching videos' });
  }
};

exports.trackVideo = async (req, res) => {
  try {
    const { videoId, progress, completed } = req.body;
    
    // Verify video exists
    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Find or create tracking record
    const [tracking, created] = await VideoTracking.findOrCreate({
      where: { userId: req.user.id, videoId },
      defaults: {
        progress: progress || 0,
        completed: completed || false,
        rewatchedCount: 0
      }
    });

    if (!created) {
      // Update existing tracking
      if (progress > tracking.progress) {
        tracking.progress = progress;
      }
      if (completed && !tracking.completed) {
        tracking.completed = true;
        tracking.rewatchedCount += 1;
      }
      await tracking.save();
    }

    res.status(200).json(tracking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error tracking video progress' });
  }
};