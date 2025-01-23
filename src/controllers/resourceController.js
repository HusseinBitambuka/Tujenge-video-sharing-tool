const { Resource, ResourceTracking } = require('../models');

const ResourceController = {
  async uploadResource(req, res) {
    try {
      const { title, description, type, url } = req.body;
      const createdBy = req.user.id;

      const resource = await Resource.create({ title, description, type, url, createdBy });
      res.status(201).json({ message: 'Resource uploaded successfully', resource });
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload resource', error });
    }
  },

  async deleteResource(req, res) {
    try {
      const { id } = req.params;

      const resource = await Resource.findByPk(id);
      if (!resource) return res.status(404).json({ message: 'Resource not found' });

      if (req.user.role !== 'admin')
        return res.status(403).json({ message: 'Unauthorized action' });

      await resource.destroy();
      res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete resource', error });
    }
  },

  async trackResource(req, res) {
    try {
      const { resourceId } = req.body;
      const userId = req.user.id;

      let tracking = await ResourceTracking.findOne({ where: { userId, resourceId } });

      if (tracking) {
        tracking.interactions += 1;
        tracking.lastInteractedAt = new Date();
        await tracking.save();
      } else {
        await ResourceTracking.create({
          userId,
          resourceId,
          interactions: 1,
          lastInteractedAt: new Date(),
        });
      }

      res.status(200).json({ message: 'Resource tracking updated' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to track resource', error });
    }
  },
};

module.exports = ResourceController;
