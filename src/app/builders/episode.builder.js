const { getDirectors, getVideos, getImages } = require("../helpers/common.helpers");
const TmdbConfig = require("../utils/TmdbConfig");

const episodeBuilder = (episode) => {
  return {
    tmdb_id: episode.id,
    tmdb_show_id: episode.tmdb_show_id,
    air_date: episode.air_date,
    season_number: episode.season_number,
    episode_number: episode.episode_number,
    name: episode.name,
    still_path: episode?.still_path ? `${TmdbConfig.tmdbImagesUrl}w300${episode.still_path}` : "",
    overview: episode.overview,
    runtime: episode.runtime,
    directors: getDirectors(episode),
    videos: getVideos({ videosObject: episode?.videos }),
    images: getImages({ imagesObject: episode?.images }),
  };
};

module.exports = { episodeBuilder };
