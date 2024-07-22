import { Router } from "express"; 
import { userModel } from "../Daos/models/user.model.js";
import { createHash } from "../utils/hash.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { authorize } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", authenticate, async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", details: error.message });
    }
    })

    router.post("/",authenticate, authorize, async (req, res) => {

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

        export default router 
