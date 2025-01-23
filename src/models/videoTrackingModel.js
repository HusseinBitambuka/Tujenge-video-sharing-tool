const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VideoTracking = sequelize.define(
  'VideoTracking',
  {
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
    progress: {
      type: DataTypes.INTEGER, // Time in seconds
      allowNull: false,
      defaultValue: 0,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rewatchedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = VideoTracking;
