import mongoose from "mongoose";
import { connect } from "mongoose" ;

const connectionString = "mongodb+srv://admin:admin@ezecoder.e9svv8b.mongodb.net/coder69900?retryWrites=true&w=majority&appName=Ezecoder"

export const initMongoDB = async () => {

  try {
    await mongoose.connect(connectionString)
    console.log("Conectado a la base de datos MongoDB")
  } catch (error) {
    console.log(error)
  }
}


