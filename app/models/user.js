const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: { type: Sequelize.STRING, unique: true, allowNull: false },
        avatar_url: { type: Sequelize.STRING, allowNull: false },
        github_id: { type: Sequelize.STRING, allowNull: false }
      },
      { sequelize }
    );
  }

  static associate(models) {
    // Create associations with other models here
    // http://docs.sequelizejs.com/manual/tutorial/associations.html
    //
    // this.hasMany(models.Repository);
  }

  static async find_or_create_from_token(access_token) {
    const data = await GitHub.get_user_from_token(access_token);

    /* Find existing user or create new User instances */
  }
}

module.exports = User;
