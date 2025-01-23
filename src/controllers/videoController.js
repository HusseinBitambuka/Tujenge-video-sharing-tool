const { Video, VideoTracking } = require('../models');

const VideoController = {
  async uploadVideo(req, res) {
    try {
      const { title, description } = req.body;
      const s3Url = req.file.location; // Assuming AWS S3 upload is integrated
      const createdBy = req.user.id;

      const video = await Video.create({ title, description, s3Url, createdBy });
      res.status(201).json({ message: 'Video uploaded successfully', video });
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload video', error });
    }
  },

  async deleteVideo(req, res) {
    try {
      const { id } = req.params;

      const video = await Video.findByPk(id);
      if (!video) return res.status(404).json({ message: 'Video not found' });

      if (req.user.role !== 'admin')
        return res.status(403).json({ message: 'Unauthorized action' });

      await video.destroy();
      res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete video', error });
    }
  },

  async getVideos(req, res) {
    try {
      const videos = await Video.findAll();
      res.status(200).json({ videos });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch videos', error });
    }
  },

  async trackVideo(req, res) {
    try {
      const { videoId, progress, completed } = req.body;
      const userId = req.user.id;

      let tracking = await VideoTracking.findOne({ where: { userId, videoId } });

      if (tracking) {
        tracking.progress = progress;
        if (completed) {
          tracking.completed = true;
          tracking.rewatchedCount += 1;
        }
        await tracking.save();
      } else {
        await VideoTracking.create({ userId, videoId, progress, completed });
      }

      res.status(200).json({ message: 'Video tracking updated' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to track video', error });
    }
  },
};

module.exports = VideoController;
