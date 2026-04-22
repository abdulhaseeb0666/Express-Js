import express from "express";
import mongoose from "mongoose";
import contactRoutes from "./Routes/contacts.routes.js";

const app = express();


// Database Connection
mongoose.connect("mongodb://localhost:27017/users")
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log(err);
})


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
