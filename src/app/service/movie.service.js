const axios = require("axios");
const TmdbConfig = require("../utils/TmdbConfig");
const buildMovie = require("../builders/movie.builder");
const SuccessResponse = require("../utils/SuccessResponse");
const ErrorResponse = require("../utils/ErrorResponse");
const TMDBAPIException = require("../utils/Exceptions");
const { TitleNotFound } = require("../erros/tmdbAPI.erros");

module.exports.getTmdbMovie = (tmdb_id) => {
  const url = `${TmdbConfig.tmdbApiUrl}
                movie/
                ${tmdb_id}
                ?api_key=${TmdbConfig.tmdbApiKey}&
                append_to_response=watch/providers,credits`
    .replace(/\n/g, "")
    .replace(/ /g, "");

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(buildMovie(response.data));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // do nothing
        } else {
          if (error.response.data) {
            reject(
              new TMDBAPIException(
                TitleNotFound(
                  `${tmdb_id}, ${error.response.data.status_message}`
                )
              )
            );
          }else{
            reject(error);
          }
          
        }
      });
  });
};
