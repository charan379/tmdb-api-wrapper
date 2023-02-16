const TmdbConfig = require("../utils/TmdbConfig");
const buildList = require("../builders/searchResults.builder");
const axios = require("axios");

// get movies list from tmdb
module.exports.searchTmdb = async (
  search = {
    type: "movie",
    query: "",
    year: "",
    pageNo: "",
  }
) => {
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
        if (result.data.total_results) {
          resolve(buildList(result.data, search.type || "movie"));
        } else {
          reject({
            message: "No Data Found",
            error: "No Data Found",
            errorType: "Empty Result",
          });
        }
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
