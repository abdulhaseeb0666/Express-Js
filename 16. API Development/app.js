import express from "express";
const app = express();
import cors from "cors";
import path from "path";

import userRoutes from "./routes/user.routes.js";
import connectDB from "./config/database.js";


// Database connection
connectDB();

// Middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use("/uploads" ,express.static(path.join(process.cwd(), "uploads")));


// Routes
app.use("/api/users", userRoutes);


app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
})