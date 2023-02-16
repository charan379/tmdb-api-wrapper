const { HttpCodes } = require("../constants/HttpCodes");

exports.NoResultsFound = (info) => {
  return {
    code: "TMDBAPI_NRF",
    message: "No Results Found",
    reason: "Query : " + info,
    httpCode: HttpCodes.NOT_FOUND.code,
  };
};

exports.TitleNotFound = (info) => {
  return {
    code: "TMDBAPI_TNF",
    message: "Requested title not found",
    reason: "tmdb_id : " + info,
    httpCode: HttpCodes.NOT_FOUND.code,
  };
};

exports.QueryRequired = (info) => {
  return {
    code: "TMDBAPI_QR",
    message: "Query String is required",
    reason: "Query not provided : " + info,
    httpCode: HttpCodes.BAD_REQUEST.code,
  };
};

exports.InternalServerError = (info) => {
  return {
    code: "TMDBAPI_ISR",
    message: "Something Went Wrong",
    reason: "Internal Server Error " + info,
    httpCode: HttpCodes.INTERNAL_SERVER_ERROR.code,
  };
};
