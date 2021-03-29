const express = require("express");

const models = require("../models");
const config = require("../../config");
const YouTube = require("../services/youtube");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const isAuthorized = req.session ? req.session.user : false;
  const playlist = await models.Playlist.findOne({ where: { id: req.params.id }, include: models.Video });
  const creator = await playlist.getUser();
  const videos = [];
  playlist.Videos.forEach(v => videos.push({
    id: v.id,
    video_id: v.video_id,
    video_title: v.video_title,
    video_description: v.video_description,
    channel_title: v.channel_title,
    thumbnailUrl: v.thumbnailUrl,
    playlist_id: req.params.id,
    isAuthorized: isAuthorized ? req.session.user.id == creator.id : false
  }));
  res.render("playlist/index", {
    id: playlist.id,
    playlist_id: req.params.id,
    playlist_title: playlist.playlist_title,
    created_by: creator.username,
    videos,
    isAuthorized: isAuthorized ? req.session.user.id == creator.id : false
  });
});

router.post("/:id/add", async (req, res) => {
  const playlist = await models.Playlist.findOne({ where: { id: req.params.id } });
  const isAuthorized = req.session ? req.session.user.id == await playlist.getUser().id : false;
  if (!isAuthorized) {
    req.flash('error', 'Not authorized');
    return res.redirect("/playlist/" + req.params.id);
  };
  const yt = new YouTube(config.youtubeApiKey);
  const video_id = new URL(req.body.video_url).searchParams.get("v");
  const data = await yt.fetch_video_info(video_id)
  const video = await models.Video.create({
    video_id: video_id,
    video_title: data.items[0].snippet.title,
    video_description: data.items[0].snippet.description.substring(0, 200),
    channel_title: data.items[0].snippet.channelTitle,
    thumbnailUrl: data.items[0].snippet.thumbnails.standard.url
  });
  await playlist.addVideo(video);
  res.redirect("/playlist/" + playlist.id);
});

router.get("/:id/video/:video_id", async (req, res) => {
  const playlist = await models.Playlist.findOne({ where: { id: req.params.id } });
  const video = await models.Video.findOne({ where: { video_id: req.params.video_id } });
  const {
    id: playlist_id,
    playlist_title
  } = playlist;
  const {
    video_id,
    video_title,
    video_description
  } = video;
  res.render("playlist/video", {
    playlist_id,
    playlist_title,
    video_id,
    video_title,
    video_description
  });
});

router.post("/:id/video/delete/:video_id", async (req, res) => {
  const playlist = await models.Playlist.findOne({ where: { id: req.params.id } });
  const isAuthorized = req.session ? req.session.user : false;
  if (!isAuthorized) {
    req.flash('error', 'Not authorized');
    return res.redirect("/playlist/" + req.params.id);
  };
  const video = await models.Video.findOne({ where: { id: req.params.video_id } });
  await playlist.removeVideo(video);
  await video.destroy();
  res.redirect("/playlist/" + playlist.id);
});

module.exports = router;
