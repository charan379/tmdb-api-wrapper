const { getTmdbTv } = require("../service/tv.service");

exports.tvController = async (req, res, next) => {
  try {
    const tv = await getTmdbTv(req.params.tmdb_id);
    res.status(200).json(tv);
  } catch (error) {
    next(error);
  }
};
