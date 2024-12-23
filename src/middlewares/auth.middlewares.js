import { userModel } from "../daos/models/user.model.js";
import { verifyToken } from "../utils/jwt.js";

export async function authenticate(req, res, next) {
    const token = req.cookies.currentUser;

    if(!token) {
        return res.status(401).json({
            error: "No autorizado"});
    }

    try{
        const decoded = verifyToken(token);

        const user = await userModel.findOne({email: decoded.email});

        if(!user) {
            return res.status(404).json({ error: "No se encontro el usuario"});
        }

        req.user = {
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            id:user.id
        };
        next();
    } catch(error) {
        res.status(500).json({ error: "Error al obtener el usuario", details: error.message});
    }
}


export async function authorize(req, res, next) {

    const {role} = req.user;

    if (role === "admin") { 
        next();
    }else {
        res.status(401).json({
            error: "No autorizado"});
    }
}

export function authorization(roles) {
    return async (req, res, next) => {
      if (!req.user) return res.status(401).json({ message: "No autorizado" });
  
      if (!roles.includes(req.user.role)) {
        return res.status(401).json({ message: "No tienes permisos" });
      }
  
      next();
    };
  }