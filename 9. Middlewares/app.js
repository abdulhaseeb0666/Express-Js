const express = require("express");
const app = express();

app.use((req , res , next) => {
    const d = new Date();
    console.log(`Time: ${(d.getHours())%12} : ${d.getMinutes()} : ${d.getSeconds()}`)
    console.log(`Date: ${d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()}`)
    next();
})

// This middle is only specific for About Page
const aboutMiddleWare = (req , res , next) => {
    console.log("This is About Page middleware")
    next();
}

app.get("/" , (req , res) => {
    res.send("Hello World")
})

app.get("/about" , aboutMiddleWare , (req , res) => {
    res.send("About Page")
})

app.use((req , res) => {
    res.status(404).send("Page not found")
})

app.use((err , req  , res , next) => {
    console.log(err)
    res.status(500).send("Something went wrong")
})

app.listen(3000 , () => {
    console.log("Server started on port 3000")
})