const TmdbConfig = require("../utils/TmdbConfig");
const buildEpisode = require("../builders/episode.builder");


const seasonBuilder = (tvSeason) => {
  return {
    tmdb_id: tvSeason.id,
    air_date: tvSeason.air_date,
    name: tvSeason.name,
    season_number: tvSeason.season_number,
    episode_count: tvSeason?.episodes?.length - 1 ?? 0,
    poster_path: `${TmdbConfig.tmdbImagesUrl}w342${tvSeason.poster_path}`,
    overview: tvSeason.overview,
    episodes: tvSeason.episodes.map((episode) => buildEpisode(episode)),
  };
};

module.exports = seasonBuilder;
