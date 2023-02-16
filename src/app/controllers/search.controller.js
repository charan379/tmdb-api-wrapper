const { searchTmdb } = require("../service/search.service");
const ErrorResponse = require("../utils/ErrorResponse");
const TMDBAPIException = require("../utils/Exceptions");
const SuccessResponse = require("../utils/SuccessResponse");

exports.searchController = (req, res, next) => {
  try {
    searchTmdb((search = { ...req.query }))
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
