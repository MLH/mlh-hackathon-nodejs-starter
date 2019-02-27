const tablename = "Users";

module.exports.up = (queryInterface, Sequelize) => {
  return queryInterface.createTable(tablename, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    avatar_url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    github_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
};

module.exports.down = (queryInterface, Sequelize) => {
  return queryInterface.dropTable("Users");
};
