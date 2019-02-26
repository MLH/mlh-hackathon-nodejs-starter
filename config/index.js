const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

module.exports = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",
  githubClientId: process.env.GITHUB_CLIENT_ID || "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || ""
};
