const express = require('express');
const router = express.Router();
const { login, create } = require('./authController');
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operaciones de autenticación
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "victor.huanca1999@gmail.com"
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token
 *       401:
 *         description: Contraseña incorrecta
 */
router.post('/login', login);
/**
 * @swagger
 * /auth/registro:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *             properties:
 *               usuario:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                     example: "Victor"
 *                   email:
 *                     type: string
 *                     example: "victor.huanca1999@gmail.com"
 *                   apellido:
 *                     type: string
 *                     example: "Huanca"
 *                   passwordHash:
 *                     type: string
 *                     example: "123456"
 *                   rol:
 *                     type: string
 *                     enum: [cliente, admin, chofer]
 *                     example: "admin"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente           
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Hable con el administrador"
 *                 err:
 *                   type: string
 */
router.post('/registro', create);

module.exports = router;
