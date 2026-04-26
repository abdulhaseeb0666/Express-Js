import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/crud-api")
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
}

export default connectDB;