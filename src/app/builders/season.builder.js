const TmdbConfig = require("../utils/TmdbConfig");
const buildEpisode = require("../builders/episode.builder");


const seasonBuilder = (tvSeason) => {
  return {
    tmdb_id: tvSeason.id,
    season_number: tvSeason.season_number,
    name: tvSeason.name,
    release_date: tvSeason.air_date,
    poster_path: `${TmdbConfig.tmdbImagesUrl}w342${tvSeason.poster_path}`,
    overview: tvSeason.overview,
    episodes: tvSeason.episodes.map((episode) => buildEpisode(episode)),
  };
};

module.exports = seasonBuilder;
