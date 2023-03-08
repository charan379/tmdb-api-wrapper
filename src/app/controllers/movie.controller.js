const { getTmdbMovie } = require("../service/movie.service");


exports.movieController = async (req, res, next) => {
  try {
    await getTmdbMovie(req.params.tmdb_id)
      .then((movie) => {
        res.status(200).json(movie);
      })
  } catch (error) {
    next(error)
  }
};
