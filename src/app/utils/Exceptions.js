
// Custom Error object to store error response from TMDB API
class TMDBAPIException extends Error {

  constructor(message, status, reason, stack) {
    super(message);
    this.name = "TMDBAPIException";
    this.status = status;
    this.reason = reason;
    this.stack = stack;
  }


}

// exports TMDBAPIException
module.exports = TMDBAPIException;
