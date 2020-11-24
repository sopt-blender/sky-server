"use strict";

exports.__esModule = true;
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _postsRouter = _interopRequireDefault(require("./postsRouter"));

var _usersRouter = _interopRequireDefault(require("./usersRouter"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var indexRouter = _express.default.Router();

indexRouter.use("/users", _usersRouter.default);
indexRouter.use("/posts", _postsRouter.default);
var _default = indexRouter;
exports.default = _default;
