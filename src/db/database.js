
import { connect } from "mongoose" ;
import "dotenv/config"
;

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1/coder69900"

export const initMongoDB = async () => {

  try {
    await connect(MONGO_URL)
    console.log("Conectado a la base de datos MongoDB")
  } catch (error) {
    console.log(error)
  }
}


