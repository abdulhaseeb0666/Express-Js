import express from "express";
const app = express();

import connectDB from "./config/database.js";
import contactRoutes from "./Routes/contacts.routes.js";


// Database Connection
connectDB();


// Middlewares
app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"))

// Routes
app.use("/" , contactRoutes);

app.listen(3000 , () => {
    console.log("Server started on port 3000");
})
