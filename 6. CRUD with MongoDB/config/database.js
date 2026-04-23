import mongoose from "mongoose";

export default function connectDB() {
    mongoose.connect("mongodb://localhost:27017/users")
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    })
}