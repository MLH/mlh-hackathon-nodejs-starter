"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../../config");
const databases = require("../../config/databases");

const settings = databases[config.env];
const sequelize = new Sequelize(settings.database, settings.username, settings.password, settings);

// Initialize each model file in /models
const models = fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .map(file => {
    const model = require(path.join(__dirname, file));
    return { [model.name]: model.init(sequelize) };
  });

// Load model associations
for (const model of Object.keys(models)) {
  typeof models[model].associate === "function" && models[model].associate(models);
}

module.exports = models;
