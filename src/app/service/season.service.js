const axios = require("axios");
const { seasonBuilder } = require("../builders/season.builder");
const TMDBAPIException = require("../utils/Exceptions");
const TmdbConfig = require("../utils/TmdbConfig");

const getTmdbTvSeason = async ({ tmdb_show_id, season_number }) => {
  const url = `${TmdbConfig.tmdbApiUrl}` +
    `tv/${tmdb_show_id}` +
    `/season/${season_number}` +
    `?api_key=${TmdbConfig.tmdbApiKey}` +
    `&append_to_response=videos,images`;

  try {
    const result = await axios.get(url);
    return await seasonBuilder({ tmdb_show_id, ...result.data });
  } catch (error) {
    if (error?.response?.data) {
      throw new TMDBAPIException(`${JSON.stringify({ tmdb_show_id, season_number }).replace(/"/g, "'")}`, 401, "", "");
    }
    throw error;
  }
};

module.exports = { getTmdbTvSeason };
