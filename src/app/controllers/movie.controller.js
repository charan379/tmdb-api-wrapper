const { getTmdbMovie } = require("../service/movie.service");

exports.movieController = async (req, res, next) => {
  try {
    const movie = await getTmdbMovie(req.params.tmdb_id);
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};
