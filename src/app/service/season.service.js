const axios = require("axios");
const buildTvSeason = require("../builders/season.builder");
const { NoResultsFound } = require("../erros/tmdbAPI.erros");
const TMDBAPIException = require("../utils/Exceptions");
const TmdbConfig = require("../utils/TmdbConfig");

const getTmdbTvSeason = async ({ tmdb_tv_id, season_number }) => {
  const url = `${TmdbConfig.tmdbApiUrl}tv/${tmdb_tv_id}/season/${season_number}?api_key=${TmdbConfig.tmdbApiKey}`;

  try {
    const result = await axios.get(url);
    return buildTvSeason(result.data);
  } catch (error) {
    if (error?.response?.data) {
      throw new TMDBAPIException(
        NoResultsFound(`${JSON.stringify({ tmdb_tv_id, season_number }).replace(/"/g, "'")}`)
      );
    }
    throw error;
  }
};

module.exports = getTmdbTvSeason;
