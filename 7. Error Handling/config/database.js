import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MongoDB_URL = process.env.MONGO_URL

export default function connectDB() {
    mongoose.connect(MongoDB_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    })
}