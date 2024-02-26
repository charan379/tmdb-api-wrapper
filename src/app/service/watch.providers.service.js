// Import axios
const axios = require("axios");
// Import TMDBAPIException
const TMDBAPIException = require("../utils/Exceptions");
// Import TmdbConfig
const TmdbConfig = require("../utils/TmdbConfig");

// Service function to fetch streaming providers of a title
// from tmdb api based on tmdb_id, title_type, country
const getWatchProviders = async ({ tmdb_id, title_type, country }) => {
    const url = `${TmdbConfig.tmdbApiUrl}${title_type}/${tmdb_id}/watch/providers?api_key=${TmdbConfig.tmdbApiKey}`;

    try {
        const { data: { results } } = await axios.get(url);
        const { link: tmdb_link, flatrate: providers } = results?.[country] || {};

        if (!providers || providers.length === 0 || !tmdb_id) {
            throw new TMDBAPIException(`No watch providers for ${tmdb_id} , ${title_type}, ${country}`, 409);
        }

        for (const provider of providers) {
            provider.logo_path = provider?.logo_path ? `${TmdbConfig.tmdbImagesUrl}w92${provider.logo_path}` : "";
        }

        return { tmdb_link, providers };
    } catch (error) {

        throw error;
    }
};

// Export service function
module.exports = { getWatchProviders };
