const TmdbConfig = require("../utils/TmdbConfig");
const buildList = require("../builders/searchResults.builder");
const axios = require("axios");
const TMDBAPIException = require("../utils/Exceptions");
const { NoResultsFound, QueryRequired } = require("../erros/tmdbAPI.erros");

// get movies list from tmdb
module.exports.searchTmdb =  (
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
  //url templete
  const url = `${TmdbConfig.tmdbApiUrl}
                  search/
                  ${search.type || "movie"}?
                  api_key=${TmdbConfig.tmdbApiKey}&
                  language=${TmdbConfig.tmdbLanguage}&
                  query=${encodeURIComponent(search.query)}&
                  include_adult=false&
                  region=${TmdbConfig.tmdbRegion}
                  ${
                    search.year
                      ? (search.type === "movie"
                          ? "&year="
                          : "&first_air_date_year=") + search.year
                      : ""
                  }
                  ${search.pageNo ? "&page=" + search.pageNo : ""}`
    .replace(/\n/g, "")
    .replace(/ /g, "");
  // console.log(url)
  // return moviedata promise
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        resolve(buildList(result.data, search.type || "movie"));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // do nothing
        } else {
          if (error.response.data) {
            reject(
              new TMDBAPIException(
                NoResultsFound(
                  `${JSON.stringify(search).replace(/"/g, "'")},  ${
                    error.response.data.status_message
                  }`
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
