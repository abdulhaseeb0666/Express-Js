import express from "express";
const app = express();

import connectDB from "./config/database.js";
import contactRoutes from "./Routes/contacts.routes.js";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT

// Database Connection
connectDB();


// Middlewares
app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"))

// Routes
app.use("/" , contactRoutes);

app.listen(PORT , () => {
    console.log(`Server started on PORT ${PORT}`);
})
