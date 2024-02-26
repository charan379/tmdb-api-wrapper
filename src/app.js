const createError = require("http-errors");
const serverless = require('serverless-http');
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const indexRouter = require("./app/routes/index");
const tmdbRouter = require("./app/routes/tmdb.routes");
const ErrorResponse = require("./app/utils/ErrorResponse");
const TMDBAPIException = require("./app/utils/Exceptions");

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/health", indexRouter);
app.use("/tmdb", tmdbRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // If error is an instance of TMDBAPI Exception
  // respond with error details
  if (err instanceof TMDBAPIException) {
    res.status(err.status).json(ErrorResponse(err));
    return 0;e
  }

  if (err.status === 404) {
    res.status(404).json(ErrorResponse(err));
  } else {
    res.status(err.status || 500);
    res.json(ErrorResponse(err))
  }
});

// serverless application
module.exports.handler = serverless(app);
