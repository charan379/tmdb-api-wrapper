const axios = require("axios");
const TMDBAPIException = require("../utils/Exceptions");
const TmdbConfig = require("../utils/TmdbConfig");
const { episodeBuilder } = require("../builders/episode.builder");

/**
 * Get details of a specific episode of a TV show from TMDB API.
 * 
 * @param {Object} params - An object containing the parameters to fetch a TV show episode.
 * @param {number} params.tmdb_show_id - The TMDB ID of the TV show.
 * @param {number} params.season_number - The season number of the TV show.
 * @param {number} params.episode_number - The episode number of the TV show.
 * 
 * @returns {Object} An object containing the details of the requested TV show episode.
 * 
 * @throws {TMDBAPIException} If there's an error with the TMDB API.
 */
const getTmdbTvSeasonEpisode = async ({ tmdb_show_id, season_number, episode_number }) => {
    try {
        const url = `${TmdbConfig.tmdbApiUrl}` +
            `tv/${tmdb_show_id}` +
            `/season/${season_number}` +
            `/episode/${episode_number}` +
            `?api_key=${TmdbConfig.tmdbApiKey}` +
            `&append_to_response=videos,images`;

        const { data } = await axios.get(url);

        return episodeBuilder({ tmdb_show_id, ...data });

    } catch (error) {
        if (error?.response?.data) {
            // Throw a custom exception if there's an error with the TMDB API.
            throw new TMDBAPIException(`${JSON.stringify({ tmdb_show_id, season_number, episode_number }).replace(/"/g, "'")}`, 401, "", "");
        }
        throw error;
    }
};

module.exports = { getTmdbTvSeasonEpisode };