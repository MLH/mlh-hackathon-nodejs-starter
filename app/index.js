const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const compression = require("compression");
const logger = require("morgan");

const config = require("../config");
const paths = require("../config/paths");
const routes = require("./routes");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Will attempt to compress responses.
app.use(compression());

// Parse incoming requests data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up handlebars templating engine for layout files.
app.engine("html", handlebars({ defaultLayout: "layout", extname: ".html" }));
app.set("views", "app/templates");
app.set("view engine", "html");

// Set up session middleware
const options = { secret: config.secretKey, saveUninitialized: true, resave: true };
app.use(session(options));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

// Set up the routes for the static assets.
app.use(express.static(paths.staticEntry));

routes.registerRoutes(app);
routes.registerErrorHandlers(app);

app.listen(config.port, () => {
  console.log(`🚀 Server started on port ${config.port}.`);
});
