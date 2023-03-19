const TmdbConfig = {
  tmdbApiKey: process.env.APP_TMDB_API,
  tmdbApiUrl: process.env.APP_TMDB_API_URL,
  tmdbImagesUrl: process.env.APP_TMDB_API_IMAGES_URL,
  tmdbLanguage: process.env.APP_TMDB_API_LANGUAGE,
  tmdbRegion: process.env.APP_TMDB_API_REGION,
  domainName: process.env.APP_DOMAIN_NAME,
};

module.exports = TmdbConfig;
