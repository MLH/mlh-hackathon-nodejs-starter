const axios = require("axios");

const api_url = "https://www.googleapis.com/youtube/v3";
const authorize_url = "https://github.com/login/oauth/authorize";
const token_url = "https://github.com/login/oauth/access_token";

class YouTube {
  constructor(api_key) {
    this.api_key = api_key;
  }

  async fetch_video_info(video_id) {
    const url = api_url + '/videos';
    const config = { 
      params: { 
        id: video_id,
        key: this.api_key,
        part: 'snippet'
      }
    };
    const response = await axios.get(url, config);
    return response.data;
  }
}

module.exports = YouTube;
