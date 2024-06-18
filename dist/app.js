"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOptions = require("./swaggerOptions");
var _users = _interopRequireDefault(require("./router/users"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//configuración de express

var spec = (0, _swaggerJsdoc["default"])(_swaggerOptions.options);
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());

//Rutas
app.use(_users["default"]);

//documentacion
app.use("/docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(spec));
var _default = exports["default"] = app;