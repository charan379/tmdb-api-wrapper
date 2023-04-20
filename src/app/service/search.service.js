const TmdbConfig = require("../utils/TmdbConfig");
const buildList = require("../builders/searchResults.builder");
const axios = require("axios");
const TMDBAPIException = require("../utils/Exceptions");
const { NoResultsFound, QueryRequired } = require("../erros/tmdbAPI.erros");

// get movies list from tmdb
module.exports.searchTmdb = async (
  search = {
    type: "movie",
    query: "",
    year: "",
    pageNo: "",
  }
) => {
  if (!search.query) {
    throw new TMDBAPIException(QueryRequired("Search query not provided"));
  }

  const url = `${TmdbConfig.tmdbApiUrl}search/${search.type || "movie"}?` +
    `api_key=${TmdbConfig.tmdbApiKey}&` +
    `language=${TmdbConfig.tmdbLanguage}&` +
    `query=${encodeURIComponent(search.query)}&` +
    `include_adult=false&` +
    `region=${TmdbConfig.tmdbRegion}` +
    `${search.year ? (search.type === "movie" ? "&year=" : "&first_air_date_year=") + search.year : ""}` +
    `${search.pageNo ? "&page=" + search.pageNo : ""}`.replace(/\n/g, "").replace(/ /g, "");

  try {
    const result = await axios.get(url);
    return buildList(result.data, search.type || "movie");
  } catch (error) {
    if (error?.response?.data) {
      throw new TMDBAPIException(
        NoResultsFound(
          `${JSON.stringify(search).replace(/"/g, "'")},  ${error.response.data.status_message}`
        )
      );
    }
    throw error;
  }
};
