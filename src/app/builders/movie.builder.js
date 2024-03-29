const TmdbConfig = require("../utils/TmdbConfig");
const {
  getLanguage,
  getDirectors,
  getCast,
  getProviders,
  getProductionCompanies,
  getProductionCountries,
  getGenres,
  getAgeRattings,
  getVideos,
  getImages,
} = require("../helpers/common.helpers");

const movieBuilder = (movieData) => {
  const movie = {
    title_type: "movie",

    source: "tmdb",

    imdb_id: movieData?.imdb_id ?? movieData?.external_ids?.imdb_id,

    tmdb_id: movieData.id,

    title: movieData.title,

    original_title: movieData.original_title,

    original_language: getLanguage(movieData.original_language),

    languages: [getLanguage(movieData.original_language)],

    tagline: movieData.tagline,

    poster_path: movieData?.poster_path ? `${TmdbConfig.tmdbImagesUrl}w500${movieData.poster_path}` : "",

    year: new Date(movieData.release_date).getFullYear() || null,

    runtime: movieData.episode_run_time,

    age_rattings: getAgeRattings({ title_type: "movie", certifications: movieData?.release_dates }),

    ratting: Math.round((movieData?.vote_average ?? 0) * 10) / 10 || 0,

    runtime: movieData.runtime,

    genres: getGenres(movieData.genres),

    overview: movieData.overview,

    production_companies: getProductionCompanies(
      movieData.production_companies
    ),

    production_countries: getProductionCountries(
      movieData.production_countries
    ),

    status: movieData.status,

    release_date: movieData.release_date,

    providers: getProviders(movieData["watch/providers"].results.IN),

    directors: getDirectors(movieData.credits),

    cast: getCast(movieData.credits),

    videos: getVideos({ videosObject: movieData?.videos }),

    images: getImages({ imagesObject: movieData?.images }),

    external_ids: movieData?.external_ids,
  };

  return movie;
};

module.exports = { movieBuilder };
