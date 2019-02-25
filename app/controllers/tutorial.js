const express = require("express");

const router = express.Router();

router.get("/requesting", function(req, res) {
  res.render("tutorial/index");
});

module.exports = router;
