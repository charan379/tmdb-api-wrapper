// get release year based on movie or tv show
exports.getYear = (movie, type) => {
  switch (type) {
    case "movie":
      return new Date(movie.release_date).getFullYear() || 0;
    case "tv":
      return new Date(movie.first_air_date).getFullYear() || 0;
    default:
      break;
  }
};

// get title based on movie or tv show
exports.getTitle = (movie, type) => {
  switch (type) {
    case "movie":
      return movie.title;
    case "tv":
      return movie.name;
    default:
      break;
  }
};
