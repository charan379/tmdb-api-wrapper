const axios = require("axios");
const buildTv = require("../builders/tv.builder");
const { TitleNotFound } = require("../erros/tmdbAPI.erros");
const TMDBAPIException = require("../utils/Exceptions");
const TmdbConfig = require("../utils/TmdbConfig");

module.exports.getTmdbTv = (tmdb_id) => {
  const url = `${TmdbConfig.tmdbApiUrl}
                  tv/
                  ${tmdb_id}
                  ?api_key=${TmdbConfig.tmdbApiKey}&
                  append_to_response=watch/providers,credits,content_ratings`
    .replace(/\n/g, "")
    .replace(/ /g, "");

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(buildTv(response.data));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // do nothing
        } else {
          if (error?.response?.data) {
            reject(
              new TMDBAPIException(
                TitleNotFound(
                  `${tmdb_id}, ${error.response.data.status_message}`
                )
              )
            );
          } else {
            reject(error);
          }
        }
      });
  });
};
