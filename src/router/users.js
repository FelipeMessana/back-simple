//archivo para manejar las rutas de usuarios

import { Router } from "express";
import {
  auth,
  createUsers,
  getData,
  // getToken,
  logIn,
  addMateria,
  cursar,
  getMateriaById,
  // privado,
  // publico,
} from "../controller/users";

//objeto para manejo de url
const routerUsers = Router();

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Loguear usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 description: DNI del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Usuario no existe
 *       401:
 *         description: Contraseña incorrecta
 *       500:
 *         description: Error del servidor
 */
routerUsers.post("/user/login", logIn);

/**
 * @swagger
 * /user/usersp:
 *   post:
 *     summary: Crear usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               dni:
 *                 type: string
 *                 description: DNI del usuario
 *               correo:
 *                 type: string
 *                 description: Correo del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       500:
 *         description: Error del servidor
 */
routerUsers.post("/user/usersp", createUsers);

/**
 * @swagger
 * /user/getData:
 *   get:
 *     summary: Obtener lista de materias
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de materias
 *       400:
 *         description: Sin token
 *       500:
 *         description: Error del servidor
 */
routerUsers.get("/user/getData", auth, getData);

/**
 * @swagger
 * /user/addMateria:
 *   post:
 *     summary: Agregar una nueva materia
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la materia
 *     responses:
 *       200:
 *         description: Materia agregada exitosamente
 *       500:
 *         description: Error del servidor
 */
routerUsers.post("/user/addMateria", addMateria);

/**
 * @swagger
 * /user/cursar:
 *   post:
 *     summary: Relacionar un usuario con una materia
 *     tags: [Usuarios, Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 description: DNI del usuario
 *               idMateria:
 *                 type: integer
 *                 description: ID de la materia
 *     responses:
 *       200:
 *         description: Materia asignada exitosamente
 *       500:
 *         description: Error del servidor
 */
routerUsers.post("/user/cursar", cursar);

/**
 * @swagger
 * /user/getMateriaById/{dni}:
 *   get:
 *     summary: Obtener materias cursadas por un alumno
 *     tags: [Usuarios, Materias]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: DNI del usuario
 *     responses:
 *       200:
 *         description: Lista de materias cursadas
 *       404:
 *         description: No se encontraron materias
 *       500:
 *         description: Error del servidor
 */
routerUsers.get("/user/getMateriaById/:dni", getMateriaById);

export default routerUsers;
