const axios = require('axios');
const buildTv = require('../builders/tv.builder')
const TmdbConfig = require('../utils/TmdbConfig');

module.exports.getTmdbTv = (tmdb_id) => {
  const url = `${TmdbConfig.tmdbApiUrl}
                  tv/
                  ${tmdb_id}
                  ?api_key=${TmdbConfig.tmdbApiKey}&
                  append_to_response=watch/providers,credits`
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
          reject(error);
        }
      });
  });
};
