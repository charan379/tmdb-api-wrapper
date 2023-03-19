const { default: axios } = require("axios");
const { WatchProvidersNotFound } = require("../erros/tmdbAPI.erros");
const TMDBAPIException = require("../utils/Exceptions");
const TmdbConfig = require("../utils/TmdbConfig");



module.exports.getWatchProviders = async ({ tmdb_id, title_type, country }) => {

    const url = `${TmdbConfig.tmdbApiUrl}
                  ${title_type}/
                  ${tmdb_id}/
                  watch/providers
                  ?api_key=${TmdbConfig.tmdbApiKey}`
        .replace(/\n/g, "")
        .replace(/ /g, "");

    let flatRateLinks = {};

    await axios.get(url)
        .then((response) => {
            const results = response?.data?.results;

            const tmdb_link = results?.[country]?.link;

            let providers = [];
            providers = results?.[country]?.flatrate;

            if((providers?.length <= 0) || !providers || !tmdb_id ) throw new TMDBAPIException(WatchProvidersNotFound(`${tmdb_id} , ${title_type}, ${country}`));

            providers.map(provider => {
                provider.logo_path = TmdbConfig.tmdbImagesUrl + "w92" + provider?.logo_path;
            })

            flatRateLinks = { tmdb_link, providers };

        })
        .catch(error => {
            throw error;
        })

    return flatRateLinks;
};


