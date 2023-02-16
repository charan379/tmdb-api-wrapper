const { default: axios } = require("axios");
const buildTvSeason = require("../builders/season.builder");
const TmdbConfig = require("../utils/TmdbConfig");

const getTmdbTvSeason = ({ tmdb_tv_id, season_number }) => {
  const url = `${TmdbConfig.tmdbApiUrl}
                    tv/${tmdb_tv_id}
                    /season/${season_number}
                    ?api_key=${TmdbConfig.tmdbApiKey}`
    .replace(/\n/g, "")
    .replace(/ /g, "");

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        resolve(buildTvSeason(result.data));
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

module.exports = getTmdbTvSeason;
