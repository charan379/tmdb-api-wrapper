class TMDBAPIException extends Error {

  constructor(message, status, reason, stack) {
    super(message);
    this.name = "TMDBAPIException";
    this.status = status;
    this.reason = reason;
    this.stack = stack;
  }


}

module.exports = TMDBAPIException;
