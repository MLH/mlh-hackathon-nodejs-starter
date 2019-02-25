const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const handlebars = require("express-handlebars");

const config = require("../config");
const paths = require("../config/paths");
const { registerRoutes, registerErrorHandlers } = require("./routes");

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(paths.staticEntry));

app.engine("html", handlebars({ defaultLayout: "layout", extname: ".html" }));
app.set("views", "app/templates");
app.set("view engine", "html");

registerRoutes(app);
// registerErrorHandlers(app);

app.listen(config.port, () => {
  console.log(`🚀 Server started on port ${config.port}.`);
});
