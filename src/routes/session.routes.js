import { Router } from "express";
import { userModel } from "../Daos/models/user.model.js";
import passport from "passport";
import { verifyToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/hash.js";
 import { generateToken } from "../utils/jwt.js";
 import cookieParser from 'cookie-parser';


const router = Router ();
router.use(cookieParser());

router.post("/login" , passport.authenticate("login", { session: false }), async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Falta el email o la contraseña" });
    }
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        const isPasswordCorrect = await comparePassword(password, user.password);

        if(!isPasswordCorrect) { 
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = generateToken({email: user.email, role: user.role});

        res.cookie("currentUser", token, {maxAge: 100000});
        res.status(200).json({ message: "Sesión iniciada" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", details: error.message });
    }
});

router.get("/current",passport.authenticate("jwt", { session: false }), async (req, res) => {
    const token = req.cookies.currentUser;

    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }
    try {
        const user = verifyToken(token);

        const userDB = await userModel.findOne({ email: user.email });

        if (!userDB) {
            return res.status(404).json({ error: "No se encontró el usuario" });
        }

        res.status(200).json(userDB);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener usuario", details: error.message });
    }
});

router.get("/logout", async (req, res) => {
    res.clearCookie("currentUser");
    res.status(200).json({ message: "Sesión cerrada" });
});
 
export default router;

//  router.get("/github", (req, res) => {});

// router.get("/githubCallback", passport.authenticate("github", {failureRedirect:"/login"}), async (req, res) => {

   // if (req.user) {
     //   req.session.user = req.user;
       // return res.redirect("/");
    //}

    //res.redirect("/login")
// }) 
