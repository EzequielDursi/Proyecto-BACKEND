import { Router } from "express"; 
import { userModel } from "../daos/models/user.model.js";
import { createHash } from "../utils/hash.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { authorize } from "../middlewares/auth.middlewares.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   age:
 *                     type: integer
 *       500:
 *         description: Error del servidor
 */
router.get("/", authenticate, async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", details: error.message });
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 age:
 *                   type: integer
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", authenticate, authorize, async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).json({ message: "Falta información" });
    } 
    try {
        const hashPassword = await createHash(password);

        const user = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword,
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear usuario", details: error.message }); 
    }
});

export default router;