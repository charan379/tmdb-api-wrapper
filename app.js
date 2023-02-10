const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const stylus = require("stylus");
require("dotenv").config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tmdbRouter = require("./routes/tmdb");
const mylogger = require("./utils/myLogger");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// swagger API Documentation

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "tmdb-api-wrapper",
      description:
        "This is REST API application consumes tmdb api and adds a wrapper. Basically Developed as part of  MovieBunkers Application",
      version: "1.0.0",
      contact: {
        name: "charan379",
        url: "#",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis : ['./routes/tmdb.js' ]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// logger
// app.use(mylogger);

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
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

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
