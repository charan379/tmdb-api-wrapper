const { getWatchProviders } = require("../service/watch.providers.service");

exports.watchProvidersController = async (req, res, next) => {
  try {
    await getWatchProviders({tmdb_id: req.params.tmdb_id, title_type: req.params.title_type, country: req.params.country})
      .then((flatRateLinks) => {
        res.status(200).json(flatRateLinks);
      })
  } catch (error) {
    next(error)
  } 
};
