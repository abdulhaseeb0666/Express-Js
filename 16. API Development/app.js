import express from "express";
const app = express();

// Database connection
import connectDB from "./config/database.js";
connectDB();

// Middleware
app.use(express.json());
app.set("view engine", "ejs");

// Routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);


app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
})