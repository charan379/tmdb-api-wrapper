class TMDBAPIException extends Error {
  constructor(errorObject) {
    super(errorObject.message);
    this.name = "TMDBAPIException";
    this.code = errorObject.code;
    this.reason = errorObject.reason;
    this.httpCode = errorObject.httpCode;
  }
}

module.exports = TMDBAPIException;
