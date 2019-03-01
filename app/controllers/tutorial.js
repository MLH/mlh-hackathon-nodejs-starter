const express = require("express");
const GitHub = require("../services/github");

const router = express.Router();

router.get("/requesting", async function(req, res) {
  const { search = "" } = req.query;

  if (!req.session.access_token) {
    return res.render("tutorial/index");
  }

  const github = new GitHub({ access_token: req.session.access_token });
  const results1 = await github.get("/user/starred");
  const results2 = search.length > 0 ? await github.get("/search/repositories", { q: search }) : [];

  return res.render("tutorial/index", {
    tutorial1: results1,
    tutorial2: results2,
    query: search
  });
});

module.exports = router;
