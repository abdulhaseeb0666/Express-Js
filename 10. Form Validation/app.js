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
        .isStrongPassword().withMessage("Password must be strong")
        .trim()
        .escape()
        .notEmpty().withMessage("Password cannot be empty"),
    body("age")
        .isNumeric().withMessage("Age must be a number")
        .isInt().withMessage("Age must be an integer")
        .toInt()
        .trim()
        .escape()
        .notEmpty().withMessage("Age cannot be empty")
        .custom((vakue) => {
            if (vakue < 18) {
                throw new Error("Age must be Greater than 18");
            }
            return true;
        })
]

app.get("/" , (req , res) => {
    res.render("form" , { errors: [] });
})

app.post("/submit", formValidations, (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.render("form" , { errors: result.array() });
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