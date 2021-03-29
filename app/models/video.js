const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    "Video",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: uuidv4(),
        primaryKey: true
      },
      video_id: { type: DataTypes.STRING, unique: true, allowNull: false },
      video_title: DataTypes.STRING,
      video_description: DataTypes.STRING,
      channel_title: DataTypes.STRING,
      thumbnailUrl: DataTypes.TEXT
    },
    { sequelize }
  );

  Video.associate = function(models) {
    // associations can be defined here
  };

  return Video;
};
