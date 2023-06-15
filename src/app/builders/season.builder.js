const TmdbConfig = require("../utils/TmdbConfig");
const { getVideos, getImages } = require("../helpers/common.helpers");
const { getTmdbTvSeasonEpisode } = require("../service/episode.service");

/**
 * Builds a season object from the TMDB API response.
 * @param {Object} tvSeason - The season data from the TMDB API.
 * @returns {Object} - The built season object.
 */
const seasonBuilder = async (tvSeason) => {
  let episodes = [];

  try {
    // Loop through each episode in the season and fetch its data.
    if (tvSeason?.episodes instanceof Array && tvSeason?.episodes?.length > 0) {
      for (const episode of tvSeason.episodes) {
        try {
          const ep = await getTmdbTvSeasonEpisode({ tmdb_show_id: episode?.show_id, season_number: episode?.season_number, episode_number: episode?.episode_number });
          episodes.push(ep);
        } catch (error) {
          console.log(error?.message)
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  // Build and return the season object.
  return {
    tmdb_id: tvSeason.id,
    tmdb_show_id: tvSeason?.tmdb_show_id,
    air_date: tvSeason.air_date,
    name: tvSeason.name,
    season_number: tvSeason.season_number,
    episode_count: tvSeason?.episodes?.length ?? 0,
    poster_path: tvSeason?.poster_path ? `${TmdbConfig.tmdbImagesUrl}w342${tvSeason.poster_path}` : "",
    overview: tvSeason.overview,
    episodes: episodes,
    videos: getVideos({ videosObject: tvSeason?.videos }),
    images: getImages({ imagesObject: tvSeason?.images }),
  };
};

module.exports = { seasonBuilder };