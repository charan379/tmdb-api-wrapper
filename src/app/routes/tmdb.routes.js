const express = require("express");
const { movieController } = require("../controllers/movie.controller");
const { searchController } = require("../controllers/search.controller");
const { seasonController } = require("../controllers/season.controller");
const { tvController } = require("../controllers/tv.controller");
const { watchProvidersController } = require("../controllers/watchproviders.controller");
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
// search
/* GET tmdb search */
router.get("/search", searchController);

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
// movieDetails
/* GET tmdb movie details */
router.get("/movie/:tmdb_id", movieController);

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
// tvDetails
/* GET tmdb tv details */
router.get("/tv/:tmdb_id", tvController);

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
// tvSeasonDetails
/* GET tmdb tv-season details */
router.get("/tv/:tmdb_tv_id/season/:season_number", seasonController);

/**
 * @swagger
 * /tmdb/providers/{title_type}/{tmdb_id}/{country}:
 *  get:
 *    tags:
 *      - tmdb
 *    summary: API to fetch watch providers from tmdb
 *    description: Retirve watch providers from tmdb
 *    parameters:
 *    - in: path
 *      name: title_type
 *      schema:
 *        type: String
 *      description: tmdb title type
 *      default : movie
 *    - in: path
 *      name: tmdb_id
 *      schema:
 *        type: String
 *      description: tmdb id
 *      default : 550
 *    - in: path
 *      name: country
 *      schema:
 *        type: String
 *      description: country iso 369_1 code
 *      default : IN
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *       description: No Data Avaialble
 */
// watch providers
/* GET tmdb watch providers */
router.get("/providers/:title_type/:tmdb_id/:country", watchProvidersController);

module.exports = router;
