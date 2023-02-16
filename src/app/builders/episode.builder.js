const { getDirectors } = require("../helpers/common.helpers");
const TmdbConfig = require("../utils/TmdbConfig");

const episodeBuilder = (episode) => {
  return {
    tmdb_id: episode.id,
    episode_number: episode.episode_number,
    name: episode.name,
    overview: episode.overview,
    season_number: episode.season_number,
    tmdb_show_id: episode.show_id,
    still_path: `${TmdbConfig.tmdbImagesUrl}w300${episode.still_path}`,
    air_date: episode.air_date,
    runtime: episode.runtime,
    directors: getDirectors(episode.crew),
  };
};

module.exports = episodeBuilder;
