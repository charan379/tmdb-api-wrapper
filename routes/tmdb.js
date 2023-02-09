const express = require("express");
const getTmdbMovie = require("../controllers/movieController");
const searchTmdb = require("../controllers/searchController");
const getTmdbTvSeason = require("../controllers/seasonController");
const getTmdbTv = require("../controllers/tvController");
const TmdbConfig = require("../utils/TmdbConfig");
const router = express.Router();

/* GET tmdb home. */
router.get("/", function (req, res, next) {
  res.render("tmdb", { title: "Tmdb-api", message: "API Up And Running" });
});

/**
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              notesID:
 *                description: Id of the new notes
 *                type: Number
 *                example: 1234
 *              name:
 *                description: Name of the person
 *                type: String
 *                example: Alex
 */



/**
 * @swagger
 * /tmdb/config:
 *  get:
 *    tags: 
 *      - tmdb
 *    summary: API to fetch configuration of tmdb
 *    description: Retirve a list of configuration variables
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *       description: No Data Avaialble
 */
router.get("/config", function (req, res, next) {
  res.status(200).json({
    ...TmdbConfig,
  });
});


/**
 * @swagger
 * /tmdb/search:
 *  get:
 *    tags: 
 *      - tmdb
 *    summary: API to fetch movies or tv shows from tmdb
 *    description: Retirve a list of movies or tv shows from tmdb
 *    parameters:
 *    - in: query
 *      name: query
 *      schema:
 *        type: String
 *      description: Movie or TV Name
 *      default : fight club
 *    - in: query
 *      name: type
 *      schema:
 *        type: String
 *        enum:
 *          - movie
 *          - tv
 *      description: Movie or TV
 *      default : movie
 *    - in: query
 *      name: year
 *      schema:
 *        type: Number
 *      description: Release year of movie or tv  show
 *      default : 1999
 *    - in: query
 *      name: pageNo
 *      schema:
 *        type: Number
 *      description: page number
 *      default : 1
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *       description: No Data Avaialble
 */
/* GET tmdb search */
router.get("/search", function (req, res, next) {
  try {
    searchTmdb({ ...req.query })
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
    res.status(500).json({
      code: 500,
      errorMessage: "Internal Server Error 500",
      status: "Request Faild at Router",
    });
  }
});



/**
 * @swagger
 * /tmdb/movie/{tmdb_id}:
 *  get:
 *    tags: 
 *      - tmdb 
 *    summary: API to fetch movie details from tmdb
 *    description: Retirve movie details from tmdb
 *    parameters:
 *    - in: path
 *      name: tmdb_id
 *      schema:
 *        type: Number
 *      description: tmdb movie id
 *      default : 550
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *       description: No Data Avaialble
 */
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
    res.status(500).json({
      code: 500,
      errorMessage: "Internal Server Error 500",
      status: "Request Faild at Router",
    });
  }
});


/**
 * @swagger
 * /tmdb/tv/{tmdb_id}:
 *  get:
 *    tags: 
 *      - tmdb 
 *    summary: API to fetch tv show details from tmdb
 *    description: Retirve tv show details from tmdb
 *    parameters:
 *    - in: path
 *      name: tmdb_id
 *      schema:
 *        type: Number
 *      description: tmdb tv show id
 *      default : 1399
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *       description: No Data Avaialble
 */
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
    res.status(500).json({
      code: 500,
      errorMessage: "Internal Server Error 500",
      status: "Request Faild at Router",
    });
  }
});

/**
 * @swagger
 * /tmdb/tv/{tmdb_tv_id}/season/{season_number}:
 *  get:
 *    tags: 
 *      - tmdb
 *    summary: API to fetch tv show season details from tmdb
 *    description: Retirve tv show season details from tmdb
 *    parameters:
 *    - in: path
 *      name: tmdb_tv_id
 *      schema:
 *        type: Number
 *      description: tmdb tv show id
 *      default : 1399
 *    - in: path
 *      name: season_number
 *      schema:
 *        type: Number
 *      description: tv show season number
 *      default : 1
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *       description: No Data Avaialble
 */
/* GET tmdb tv-season details */
router.get("/tv/:tmdb_tv_id/season/:season_number", function (req, res, next) {
  try {
    getTmdbTvSeason({ ...req.params })
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
    res.status(500).json({
      code: 500,
      errorMessage: "Internal Server Error 500",
      status: "Request Faild at Router",
    });
  }
});
module.exports = router;
