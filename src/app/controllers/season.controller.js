const { getTmdbTvSeason } = require("../service/season.service");

exports.seasonController = async (req, res, next) => {
  try {
    const result = await getTmdbTvSeason({ ...req.params });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
