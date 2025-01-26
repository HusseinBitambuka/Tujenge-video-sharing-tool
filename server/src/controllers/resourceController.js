const s3 = require('../config/awsConfig');
const { Resource } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.uploadResource = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file provided' });

    const fileName = `resources/${uuidv4()}-${req.file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const s3Response = await s3.upload(params).promise();

    const resource = await Resource.create({
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      s3Url: s3Response.Location,
      createdBy: req.user.id,
    });

    res.status(201).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading resource' });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: resource.s3Url.split('/').slice(-2).join('/'), // Extract S3 key from URL
    };

    await s3.deleteObject(params).promise();
    await resource.destroy();

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting resource' });
  }
};
// ... existing code ...

exports.trackResource = async (req, res) => {
  try {
    const { resourceId, action } = req.body;
    
    // Verify resource exists
    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const tracking = await ResourceTracking.create({
      userId: req.user.id,
      resourceId,
      action
    });

    res.status(201).json(tracking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error tracking resource interaction' });
  }
};
