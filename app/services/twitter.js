const Twit = require('twit');

const T = new Twit({
  consumer_key:         'DDeMFM82ILQz9NNHd46VW2VqO',
  consumer_secret:      'HB9FzIXRQJRIw5A5c51FgG5yy7bfR4im2z6tPjIZz38umCIPPO',
  access_token:         '1827972638-BcnbHDIBun9iX6qxwoYiIVv0v45M2zqi3IXDYS6',
  access_token_secret:  'TOosJXubCz80a6B65NBqHNMlV0xPIhffc7qsHoDQbcFyS',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

module.exports = T;