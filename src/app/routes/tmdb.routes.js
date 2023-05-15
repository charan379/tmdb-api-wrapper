const express = require("express");
const { movieController } = require("../controllers/movie.controller");
const { searchController } = require("../controllers/search.controller");
const { seasonController } = require("../controllers/season.controller");
const { tvController } = require("../controllers/tv.controller");
const { watchProvidersController } = require("../controllers/watchproviders.controller");
const TmdbConfig = require("../utils/TmdbConfig");
const { episodeController } = require("../controllers/episode.controller");
const router = express.Router();

router.get("/status", function (req, res, next) {
  res.status(200).json({ title: "Tmdb-api-wrapper", message: "API wrapper is Up And Running" });
});


router.get("/config", function (req, res, next) {
  res.status(200).json({
    ...TmdbConfig,
  });
});


router.get("/search", searchController);

router.get("/movie/:tmdb_id", movieController);

router.get("/tv/:tmdb_id", tvController);

router.get("/tv/:tmdb_show_id/season/:season_number", seasonController);

router.get("/tv/:tmdb_show_id/season/:season_number/episode/:episode_number", episodeController);

router.get("/providers/:title_type/:tmdb_id/:country", watchProvidersController);

module.exports = router;
