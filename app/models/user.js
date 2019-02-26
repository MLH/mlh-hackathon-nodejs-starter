const GitHub = require("../services/github");

class User {
  constructor(username, avatar_url, github_id) {
    this.username = username;
    this.avatar_url = avatar_url;
    this.github_id = github_id;
  }

  static async find_or_create_from_token(access_token) {
    try {
      const data = await GitHub.get_user_from_token(access_token);
    } catch (error) {
      console.log("ERROR", error);
    }

    /* Find existing user or create new User instances */
  }
}

module.exports = User;
