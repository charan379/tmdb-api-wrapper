const { getWatchProviders } = require("../service/watch.providers.service");

exports.watchProvidersController = async (req, res, next) => {
  try {
    const { tmdb_id, title_type, country } = req.params;
    const flatRateLinks = await getWatchProviders({ tmdb_id, title_type, country });
    res.status(200).json(flatRateLinks);
  } catch (error) {
    next(error)
  }
};
