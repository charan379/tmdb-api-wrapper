const axios = require("axios");
const { tvBuilder } = require("../builders/tv.builder");
const TMDBAPIException = require("../utils/Exceptions");
const TmdbConfig = require("../utils/TmdbConfig");

// Service function to get tv show data based on tmdb_id
const getTmdbTv = async (tmdb_id) => {
  const url = `${TmdbConfig.tmdbApiUrl}` +
    `tv/` + `${tmdb_id}` +
    `?api_key=${TmdbConfig.tmdbApiKey}` +
    `&append_to_response=watch/providers,credits,content_ratings,external_ids,images,videos`;

  try {
    const { data } = await axios.get(url);
    return tvBuilder(data);
  } catch (error) {
    if (axios.isCancel(error)) {
      // do nothing
    } else {
      if (error?.response?.data) {
        throw new TMDBAPIException(`${tmdb_id}, ${error.response.data.status_message}`, 409, "", "");
      } else {
        throw error;
      }
    }
  }
};

// export service funtion
module.exports = { getTmdbTv };