import express from "express";
const app = express();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/setcookie", (req, res) => {
    res.cookie("name" , "Abdul Haseeb" , {
        maxAge : 1000 * 60 * 60 * 24 , // 1 day
        httpOnly : true , // This cookie can only be accessed by the server
        secure : true , // This cookie will only be sent over HTTPS
        sameSite : "strict" // This cookie will only be sent to the same site
    })
    res.send({
        message : "Cookie set successfully"
    })
});

app.get("/getcookie", (req, res) => {
    const name = req.cookies.name;
    if(name) {
        res.send({
            message : `Cookie value is ${name}`
        })
    } else {
        res.send({
            message : "Cookie not found"
        })
    }
});

app.get("/clearcookie", (req, res) => {
    res.clearCookie("name");
    res.send({
        message : "Cookie cleared successfully"
    })
});

app.listen(3000 , ()=> {
    console.log("Server is running on port 3000");
})