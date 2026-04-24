const express = require("express");
const app = express();
const {body , validationResult} = require("express-validator");


app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}));
app.use(express.json());

var formValidations = [
    body("name")
        .isLength({min : 3}).withMessage("Name must be at least 3 characters long")
        .isAlpha().withMessage("Name must contain only alphabets")
        .trim()
        .escape()
        .notEmpty().withMessage("Name cannot be empty"),
    body("email")
        .isEmail().withMessage("Enter a valid email")
        .trim()
        .normalizeEmail()
        .escape()
        .notEmpty().withMessage("Name cannot be empty"),
    body("password")
        .isLength({min : 8}).withMessage("Password must be at least 8 characters long")
]


app.get("/" , (req , res) => {
    res.render("form")
})

app.post("/submit", formValidations, (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json(error.array()); // important: return
    }

    res.send(req.body);
});

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