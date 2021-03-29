const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define(
    "Playlist",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: uuidv4(),
        primaryKey: true
      },
      playlist_title: DataTypes.STRING
    },
    { sequelize }
  );

  Playlist.associate = function(models) {
    // associations can be defined here
  };

  return Playlist;
};
