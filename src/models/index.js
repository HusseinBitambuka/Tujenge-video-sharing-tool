'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import all models
db.User = require('./userModel')(sequelize, Sequelize.DataTypes);
db.Video = require('./videoModel')(sequelize, Sequelize.DataTypes);
db.Resource = require('./resourceModel')(sequelize, Sequelize.DataTypes);
db.VideoTracking = require('./videoTrackingModel')(sequelize, Sequelize.DataTypes);
db.ResourceTracking = require('./resourceTrackingModel')(sequelize, Sequelize.DataTypes);

// Define associations
db.User.hasMany(db.Video, { foreignKey: 'createdBy', as: 'videos' });
db.Video.belongsTo(db.User, { foreignKey: 'createdBy', as: 'user' });

db.User.hasMany(db.Resource, { foreignKey: 'createdBy', as: 'resources' });
db.Resource.belongsTo(db.User, { foreignKey: 'createdBy', as: 'user' });

db.Video.hasMany(db.VideoTracking, { foreignKey: 'videoId', as: 'trackings' });
db.VideoTracking.belongsTo(db.Video, { foreignKey: 'videoId', as: 'video' });

db.User.hasMany(db.VideoTracking, { foreignKey: 'userId', as: 'videoTrackings' });
db.VideoTracking.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Resource.hasMany(db.ResourceTracking, { foreignKey: 'resourceId', as: 'trackings' });
db.ResourceTracking.belongsTo(db.Resource, { foreignKey: 'resourceId', as: 'resource' });

db.User.hasMany(db.ResourceTracking, { foreignKey: 'userId', as: 'resourceTrackings' });
db.ResourceTracking.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;