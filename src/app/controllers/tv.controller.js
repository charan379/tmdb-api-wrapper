const { getTmdbTv } = require("../service/tv.service");
const ErrorResponse = require("../utils/ErrorResponse");
const TMDBAPIException = require("../utils/Exceptions");
const SuccessResponse = require("../utils/SuccessResponse");

exports.tvController = (req, res, next) => {
  try {
    getTmdbTv(req.params.tmdb_id)
      .then((tv) => {
        res.status(200).json(SuccessResponse(tv));
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
