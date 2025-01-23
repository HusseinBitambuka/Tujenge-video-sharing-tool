const s3 = require('../config/awsConfig');
const { Video } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file provided' });

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
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: video.s3Url.split('/').slice(-2).join('/'), // Extract S3 key from URL
    };

    await s3.deleteObject(params).promise();
    await video.destroy();

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting video' });
  }
};
