import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../Daos/models/user.model.js";
import local from "passport-local";
import jwt from "jsonwebtoken";
import jwtStrategy from "passport-jwt";

const LocalStrategy = local.Strategy;       
const JWTStrategy = jwtStrategy.Strategy;   
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {

    passport.use("login", new LocalStrategy({ usernameField: "email" , passReqToCallback: true}, async (req, email, password, done ) => {
            try {
                const user = await userModel.findOne({ email });

                if (!user) {
                    return done(null, false, { message: "No se encontro el usuario" });
                }
              if (!comparePassword(password, user.password)) {
                    return done(null, false, { message: "Contraseña incorrecta" });
                }
                 return done(null, user);
            } catch (error) {
                done(error);
            }
        }   
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    }); 
}

passport.use( "jwt", new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: "s3cr3t",

} , 
async (payload, done) => {try {
    return done(null, payload);
} catch (error) {
    return done(error);
}}
)); function cookieExtractor(req) {let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}


export default initializePassport;