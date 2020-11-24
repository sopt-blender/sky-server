"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _statusCode = _interopRequireDefault(require("./api/modules/statusCode"));

var _routes = _interopRequireDefault(require("./api/routes"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use(
  _express.default.urlencoded({
    extended: false,
  }),
);
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, "public")));
app.use("/api/v1", _routes.default); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  console.log(err);
  res.json({
    error: {
      message: err.message,
    },
  });
});
module.exports = app;
