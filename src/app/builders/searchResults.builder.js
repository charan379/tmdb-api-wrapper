const { getTitle, getYear } = require("../helpers/search.helpers");
const TmdbConfig = require("../utils/TmdbConfig");

// build movieslist and return data
const searchResultsBuilder = (tmdbdata, type) => {
  //return result with required data
  const movieList = tmdbdata.results.map((movie) => {
    return {
      tmdb_id: movie.id,

      link: `/view/tmdb/${type}/${movie.id}/${encodeURIComponent(
        (getTitle(movie, type) + "-" + getYear(movie, type)).replace(
          /[^a-zA-Z0-9]/g,
          "-"
        )
      )}`,

      poster_path: `${TmdbConfig.tmdbImagesUrl}w500${movie.poster_path}`,

      title: getTitle(movie, type),

      year: getYear(movie, type),

      ratting: Math.round((parseFloat(movie?.vote_average) ?? 0) * 10) / 10 || 0,

      title_type: type,

      source: "tmdb",
    };
  });

  return {
    page: tmdbdata.page,
    list: movieList,
    total_pages: tmdbdata.total_pages,
    total_results: tmdbdata.total_results,
    source: "tmdb",
  };
};

module.exports = searchResultsBuilder;
