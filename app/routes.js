const controllers = require("./controllers");
const config = require("../config");

module.exports.registerRoutes = app => {
  app.use("/", controllers.home);
  app.use("/auth", controllers.auth);
  app.use("/tutorial", controllers.tutorial);
};

module.exports.registerErrorHandlers = app => {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: config.env === "development" ? err : {}
    });
  });
};
