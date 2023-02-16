const getTmdbTvSeason = require("../service/season.service");
const ErrorResponse = require("../utils/ErrorResponse");
const TMDBAPIException = require("../utils/Exceptions");
const SuccessResponse = require("../utils/SuccessResponse");

exports.seasonController = (req, res, next) => {
  try {
    getTmdbTvSeason({ ...req.params })
      .then((result) => {
        res.status(200).json(SuccessResponse(result));
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
