module.exports = (sequelize, DataTypes) => {
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

  return ResourceTracking;
};