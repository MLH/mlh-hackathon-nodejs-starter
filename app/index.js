const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");

const config = require("../config");
const { registerRoutes, registerErrorHandlers } = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

registerRoutes(app);
registerErrorHandlers(app);

app.listen(config.port, () => {
  console.log(`🚀 Server started on port ${config.port}.`);
});
