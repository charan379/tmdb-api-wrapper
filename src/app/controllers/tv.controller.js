const { getTmdbTv } = require("../service/tv.service");

exports.tvController = async (req, res, next) => {
  try {
    await getTmdbTv(req.params.tmdb_id)
      .then((tv) => {
        res.status(200).json(tv);
      })
  } catch (error) {
    next(error)
  } 
};
