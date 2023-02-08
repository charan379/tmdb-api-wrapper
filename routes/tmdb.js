const express = require("express");
const getTmdbMovie = require("../controllers/movieController");
const searchTmdb = require("../controllers/searchController");
const getTmdbTvSeason = require("../controllers/seasonController");
const getTmdbTv = require("../controllers/tvController");
const TmdbConfig = require("../utils/TmdbConfig");
const router = express.Router();

/* GET tmdb home. */
router.get("/", function (req, res, next) {
  res.send("api working");
});

router.get("/config", function (req, res, next) {
  res.status(200).json({
    ...TmdbConfig,
  });
});

/* GET tmdb search */
router.get("/search", function (req, res, next) {
  try {
    searchTmdb({...req.query})
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(404).json({
          code: 404,
          errorMessage: error.message,
          stauts: "Request Failed at Controller",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      errorMessage: "Internal Server Error 500",
      status: "Request Faild at Router",
    });
  }
});

/* GET tmdb movie details */
router.get("/movie/:tmdb_id", function (req, res, next) {
    try {
        getTmdbMovie(req.params.tmdb_id)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((error) => {
          res.status(404).json({
            code: 404,
            errorMessage: error.message,
            stauts: "Request Failed at Controller",
          });
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: 500,
        errorMessage: "Internal Server Error 500",
        status: "Request Faild at Router",
      });
    }
  });

/* GET tmdb tv details */
router.get("/tv/:tmdb_id", function (req, res, next) {
    try {
        getTmdbTv(req.params.tmdb_id)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((error) => {
          res.status(404).json({
            code: 404,
            errorMessage: error.message,
            stauts: "Request Failed at Controller",
          });
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: 500,
        errorMessage: "Internal Server Error 500",
        status: "Request Faild at Router",
      });
    }
  });

/* GET tmdb tv-season details */
router.get("/tv/:tmdb_tv_id/season/:season_number", function (req, res, next) {
    console.log(req.params)
    try {
        getTmdbTvSeason({...req.params})
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((error) => {
          res.status(404).json({
            code: 404,
            errorMessage: error.message,
            stauts: "Request Failed at Controller",
          });
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: 500,
        errorMessage: "Internal Server Error 500",
        status: "Request Faild at Router",
      });
    }
  });
module.exports = router;
