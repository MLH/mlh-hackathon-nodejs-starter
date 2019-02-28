const express = require("express");

const router = express.Router();

router.get("/requesting", function(req, res) {
  const { search } = req.query;

  if (!req.session.access_token) {
    return res.render("tutorial/index");
  }

  const github = new GitHub({ access_token: req.session.access_token });

  res.render("tutorial/index");
});

module.exports = router;
