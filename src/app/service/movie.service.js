const axios = require("axios");
const TmdbConfig = require("../utils/TmdbConfig");
const buildMovie = require("../builders/movie.builder");

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
          reject(error);
        }
      });
  });
};
