const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    let items = ["Apple", "Banana", "Orange"];

    res.render("index" , {title : "EJS Introduction" , page : "Home Page" , para : "This is a paragraph" , items});
});

app.get("/form" , (req , res) => {
    res.render('form');
})

app.post("/submit" , (req , res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    res.render("submit" , {name , email , password});
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});