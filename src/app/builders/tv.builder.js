const TmdbConfig = require("../utils/TmdbConfig");
const {
  getLanguage,
  getProviders,
  getDirectors,
  getCast,
  getGenres,
  getProductionCompanies,
  getProductionCountries,
  getNetworks,
  getCreators,
  getRuntime,
} = require("../helpers/common.helpers");

const tvBuilder = (tvData) => {
  const tv = {
    title_type: "tv",

    source: "tmdb",

    imdb_id: tvData.imdb_id,

    tmdb_id: tvData.id,

    title: tvData.name,

    original_title: tvData.original_name,

    original_language: getLanguage(tvData.original_language),

    languages: tvData.languages.map((language) => getLanguage(language)),

    tagline: tvData.tagline,

    poster_path: `${TmdbConfig.tmdbImagesUrl}w500${tvData.poster_path}`,

    year: tvData.first_air_date
      ? new Date(tvData.first_air_date).getFullYear()
      : null,

    runtime: getRuntime(tvData.episode_run_time),

    ratting: tvData.vote_average || 0,

    age_ratting: null,

    genres: getGenres(tvData.genres),

    overview: tvData.overview,

    production_companies: getProductionCompanies(tvData.production_companies),

    production_countries: getProductionCountries(tvData.production_countries),

    status: tvData.status,

    release_date: tvData.first_air_date,

    providers: getProviders(tvData["watch/providers"].results.IN),

    directors: getDirectors(tvData.credits.crew),

    cast: getCast(tvData.credits),

    in_production: tvData.in_production,

    created_by: getCreators(tvData.created_by),

    last_aired_date: tvData.last_air_date,

    last_episode_aired: tvData.last_episode_to_air
      ? {
          ...tvData.last_episode_to_air,
          still_path: `${TmdbConfig.tmdbImagesUrl}w300${tvData.last_episode_to_air.still_path}`,
        }
      : null,

    next_episode_to_air: tvData.next_episode_to_air
      ? {
          ...tvData.next_episode_to_air,
          still_path: `${TmdbConfig.tmdbImagesUrl}w300${tvData.next_episode_to_air.still_path}`,
        }
      : null,

    networks: getNetworks(tvData.networks),

    number_of_seasons: tvData.number_of_seasons || 0,

    number_of_episodes: tvData.number_of_episodes || 0,

    seasons: tvData.seasons.map((season) => {
      return {
        ...season,
        poster_path: `${TmdbConfig.tmdbImagesUrl}w300${season.poster_path}`,
        tmdb_show_id: tvData.id,
      };
    }),
  };

  return tv;
};

module.exports = tvBuilder;
