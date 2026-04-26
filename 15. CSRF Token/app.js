import express from "express";
import cookieParser from "cookie-parser";
import csrf from "csurf";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

app.get("/", csrfProtection, (req, res) => {
    res.render("form", { csrfToken: req.csrfToken() });
});

app.post("/submit" , csrfProtection, (req, res) => {
    res.send(req.body);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});