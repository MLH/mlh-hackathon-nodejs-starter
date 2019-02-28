const GitHub = require("../services/GitHub");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING, unqiue: true, allowNull: false },
      avatar_url: DataTypes.STRING,
      github_id: DataTypes.STRING
    },
    { sequelize }
  );

  User.associate = function(models) {
    // associations can be defined here
  };

  User.find_or_create_from_token = async function(access_token) {
    const data = await GitHub.get_user_from_token(access_token);

    /* Find existing user or create new User instances */
    const instance = await this.findOrCreate({
      where: { username: data["login"] },
      defaults: {
        username: data["login"],
        avatar_url: data["avatar_url"],
        github_id: data["id"]
      }
    });

    return instance;
  };

  return User;
};
