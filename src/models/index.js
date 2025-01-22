'use strict';

const Sequelize = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

// Initialize Sequelize
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

// Import models
const User = require('./userModel')(sequelize, Sequelize.DataTypes);
const Video = require('./videoModel')(sequelize, Sequelize.DataTypes);
const Resource = require('./resourceModel')(sequelize, Sequelize.DataTypes);
const VideoTracking = require('./videoTrackingModel')(sequelize, Sequelize.DataTypes);
const ResourceTracking = require('./resourceModel')(sequelize, Sequelize.DataTypes);

// Define relationships
User.hasMany(Video, { foreignKey: 'userId', as: 'videos' });
Video.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Resource, { foreignKey: 'userId', as: 'resources' });
Resource.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Video.hasMany(VideoTracking, { foreignKey: 'videoId', as: 'trackings' });
VideoTracking.belongsTo(Video, { foreignKey: 'videoId', as: 'video' });

User.hasMany(VideoTracking, { foreignKey: 'userId', as: 'videoTrackings' });
VideoTracking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Resource.hasMany(ResourceTracking, { foreignKey: 'resourceId', as: 'trackings' });
ResourceTracking.belongsTo(Resource, { foreignKey: 'resourceId', as: 'resource' });

User.hasMany(ResourceTracking, { foreignKey: 'userId', as: 'resourceTrackings' });
ResourceTracking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Export models and Sequelize
module.exports = {
  sequelize,
  Sequelize,
  User,
  Video,
  Resource,
  VideoTracking,
  ResourceTracking,
};
