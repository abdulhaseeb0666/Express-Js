import express from "express";
const app = express();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/User.model.js";

mongoose.connect("mongodb://localhost:27017/authentication")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}));
app.use(express.json());



app.get("/" , (req , res) => {
    res.render("form")
})


app.post("/register" , async (req , res) =>{
    const { username , password } = req.body;
    const hashedPassword = await bcrypt.hash(password , 10);

    User.create({
        username,
        password : hashedPassword
    });

    res.redirect("/");
})

app.get("/login" , (req , res) => {
    res.render("login")
});

app.post("/login" , async (req , res) => {
    const { username , password } = req.body;
    const user = await User.findOne({ username });

    if(!user){
        return res.send("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        return res.send("Invalid username or password");
    }

    res.send("Login successful");
});

app.listen(3000 , ()=> {
    console.log("Server is running on port 3000");
});