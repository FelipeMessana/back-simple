"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = require("../controller/users");
//archivo para manejar las rutas de usuarios

//objeto para manejo de url
var routerUsers = (0, _express.Router)();

//Enpoint para loguear usuario
/**
 * @swagger
 * /user/login:
 *  post:
 *      sumary: loguear usuario
 */
routerUsers.post("/user/login", _users.logIn);

/**
 * @swagger
 * /usersp:
 *  post:
 *      sumary: crea usuarios
 */
routerUsers.post("/user/usersp", _users.createUsers);
var _default = exports["default"] = routerUsers;