const { getTmdbMovie } = require("../service/movie.service");

exports.movieController = (req, res, next) => {
  try {
    getTmdbMovie(req.params.tmdb_id)
      .then((movie) => {
        res.status(200).json({ success: true, movie: { ...movie } });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
