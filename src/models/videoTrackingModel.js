const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VideoTracking = sequelize.define('VideoTracking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  videoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  watchedDuration: {
    type: DataTypes.INTEGER, // In seconds
    allowNull: false,
    defaultValue: 0,
  },
  finished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  timestamps: true,
  underscored: true,
});

module.exports = VideoTracking;
