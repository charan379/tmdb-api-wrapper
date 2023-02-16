const e = require("express");
const { getTmdbMovie } = require("../service/movie.service");
const ErrorResponse = require("../utils/ErrorResponse");
const TMDBAPIException = require("../utils/Exceptions");
const SuccessResponse = require("../utils/SuccessResponse");

exports.movieController = (req, res, next) => {
  try {
    getTmdbMovie(req.params.tmdb_id)
      .then((movie) => {
        res.status(200).json(SuccessResponse(movie));
      })
      .catch((error) => {
        if (error instanceof TMDBAPIException) {
          res.status(error.httpCode).json(ErrorResponse(error));
        } else {
          res.status(404).json(ErrorResponse(error));
        }
      });
  } catch (error) {
    res.status(500).json(ErrorResponse(error));
  }
};
