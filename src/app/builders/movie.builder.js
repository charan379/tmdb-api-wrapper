const TmdbConfig = require("../utils/TmdbConfig");
const { getLanguage, getDirectors, getCast, getProviders } = require("../helpers/common.helpers");

const movieBuilder = (movieData) => {
  const movie = {
    title_type: "movie",

    source: "tmdb",

    imdb_id: movieData.imdb_id,

    tmdb_id: movieData.id,

    title: movieData.title,

    original_title: movieData.original_title,

    original_language: getLanguage(movieData.original_language),

    languages: [getLanguage(movieData.original_language)],

    tagline: movieData.tagline,

    poster_path: `${TmdbConfig.tmdbImagesUrl}w500${movieData.poster_path}`,

    year: new Date(movieData.release_date).getFullYear() || null,

    runtime: movieData.runtime,

    genres: movieData.genres,

    overview: movieData.overview,

    production_companies: movieData.production_companies.map(
      (company) => company.name
    ),

    production_countries: movieData.production_countries.map(
      (country) => country.name
    ),

    status: movieData.status,

    release_date: movieData.release_date,

    providers: getProviders(movieData["watch/providers"].results.IN),

    directors: getDirectors(movieData.credits),

    cast: getCast(movieData.credits),
  };

  return movie;
};

module.exports = movieBuilder;
