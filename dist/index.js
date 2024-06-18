"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//archivo base de nuestro proyecto

var PORT = process.env.PORT || 3000;
_app["default"].listen(PORT, function () {
  console.log("Corriendo en el puerto: ".concat(PORT));
});