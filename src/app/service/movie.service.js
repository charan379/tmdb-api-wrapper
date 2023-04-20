const axios = require("axios");
const TmdbConfig = require("../utils/TmdbConfig");
const buildMovie = require("../builders/movie.builder");
const TMDBAPIException = require("../utils/Exceptions");
const { TitleNotFound } = require("../erros/tmdbAPI.erros");

const getTmdbMovie = async (tmdb_id) => {
  const url = `${TmdbConfig.tmdbApiUrl}movie/${tmdb_id}?api_key=${TmdbConfig.tmdbApiKey}&append_to_response=watch/providers,credits,release_dates`;

  try {
    const response = await axios.get(url);
    return buildMovie(response.data);
  } catch (error) {
    if (error?.response?.data) {
      throw new TMDBAPIException(
        TitleNotFound(`${tmdb_id}, ${error.response.data.status_message}`)
      );
    }
    throw error;
  }
};

module.exports = { getTmdbMovie };
