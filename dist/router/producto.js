"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _producto = require("../controller/producto");
var router = (0, _express.Router)();
/**
 * @swagger
 * /publi:
 *  get:
 *      sumary: obtiene algo
 */
router.get('/pu', _producto.getPublish);
//get published for id
router.get('/publi/:id');
//get users for id
router.get('/users/:id', _producto.getUserById);
//login
router.post('/login', _producto.logIn);
router.post('/publi');
/**
 * @swagger
 * /users:
 *  post:
 *      sumary: crea usuarios
 */
router.post('/users', _producto.createUsers);
var _default = exports["default"] = router;