const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResourceTracking = sequelize.define('ResourceTracking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  resourceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  action: {
    type: DataTypes.ENUM('Opened', 'Downloaded'),
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
});

module.exports = ResourceTracking;
