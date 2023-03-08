const getTmdbTvSeason = require("../service/season.service");

exports.seasonController = async (req, res, next) => {
  try {
   await getTmdbTvSeason({ ...req.params })
      .then((result) => {
        res.status(200).json(result);
      })
  } catch (error) {
    next(error)
  }
};
