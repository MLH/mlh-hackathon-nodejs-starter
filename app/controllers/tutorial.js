const express = require("express");
const router = express.Router();
const Twit = require("twit");

const T = new Twit({
  consumer_key: "DDeMFM82ILQz9NNHd46VW2VqO",
  consumer_secret: "HB9FzIXRQJRIw5A5c51FgG5yy7bfR4im2z6tPjIZz38umCIPPO",
  access_token: "1827972638-BcnbHDIBun9iX6qxwoYiIVv0v45M2zqi3IXDYS6",
  access_token_secret: "TOosJXubCz80a6B65NBqHNMlV0xPIhffc7qsHoDQbcFyS",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

router.get("/requesting", async function (req, res) {
  // const { query = "" } = req.query;

  // if (!req.session.access_token) {
  //   return res.render("tutorial/index");
  // }

  // const github = new GitHub({ access_token: req.session.access_token });
  // const results1 = await github.get("/user/starred");
  // let results2 = query.length > 0 ? await github.get("/search/repositories", { q: query }) : [];
  // results2 = results2.items || [];

  // return res.render("tutorial/index", {
  //   tutorial1: results1.slice(0, 5),
  //   tutorial2: results2.slice(0, 5),
  //   query: query
  // });

  const { query = "" } = req.query;

  if (!req.session.access_token) {
    return res.render("tutorial/index");
  }

  //
  //  search twitter for all tweets containing the word 'banana' since July 11, 2011
  //
  const bananaTweets = query.length > 0 ? await T.get("search/tweets", { q: "banana since:2020-05-19", count: 2 }) : [];

  console.log(bananaTweets);

  //
  // get `funny` twitter users
  //
  T.get("users/suggestions/:slug", { slug: "funny" }, function (
    err,
    data,
    response
  ) {
    console.log(data);
  });

  //
  //  filter the twitter public stream by the word 'mango'.
  //
  var stream = T.stream("statuses/filter", { track: "mango" });

  // stream.on('tweet', function (tweet) {
  //   console.log(tweet)
  // })

  return res.render("tutorial/index", {
    tutorial1: bananaTweets.slice(0, 5),
    tutorial2: results2.slice(0, 5),
    query: query,
  });
});

module.exports = router;
