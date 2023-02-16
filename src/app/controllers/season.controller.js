const getTmdbTvSeason = require("../service/season.service");

exports.seasonController = (req, res, next) => {
  try {
    getTmdbTvSeason({ ...req.params })
      .then((result) => {
        res.status(200).json({ success: true, result: { ...result } });
      })
      .catch((error) => {
        res.status(404).json({ success: false, error: error.message });
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
