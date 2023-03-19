const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const stylus = require("stylus");
const cors = require("cors");
require("dotenv").config();
const indexRouter = require("./app/routes/index");
const usersRouter = require("./app/routes/users");
const tmdbRouter = require("./app/routes/tmdb.routes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const ErrorResponse = require("./app/utils/ErrorResponse");
const TMDBAPIException = require("./app/utils/Exceptions");
const { domainName } = require("./app/utils/TmdbConfig");

const app = express();

app.use(cors({
  origin: '*'
}));

// view engine setup
app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "pug");

// swagger API Documentation

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "tmdb-api-wrapper",
      description:
        "This is REST API application consumes tmdb api and adds a wrapper. Basically Developed as part of  MovieBunkers Application",
      version: "1.0.5",
      contact: {
        name: "charan379",
        url: "#",
      },
      license: {
        name: "GNU Affero General Public License",
        url: "https://www.gnu.org/licenses/agpl-3.0.en.html",
      },
      servers: ["http://localhost:3000", domainName],
    },
  },
  apis: [path.join(process.cwd(), "./src/app/routes/*.js")],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public")));

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

  if (err instanceof TMDBAPIException) {
    res.status(err.httpCode).json(ErrorResponse(err));
    return 0;
  }

  if (err.status === 404) {
    res.status(404).json(ErrorResponse(err));
  } else {
    res.status(err.status || 500);
    // res.render("error");
    res.json(ErrorResponse(err))
  }
});

module.exports = app;
