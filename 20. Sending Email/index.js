import express from "express";
const app = express();
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


app.get("/", async (req, res) => {
    res.render("index");
});

app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const info = await transporter.sendMail({
            from: `"Abdul Haseeb" <${process.env.EMAIL}>`,
            to,
            subject,
            text,
            attachments:[
                {
                    filename: "data.pdf",
                    path: path.join(__dirname, "files", "data.pdf")
                }
            ]
        });

        res.json({ message: "Email sent successfully!", info });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
    }
});

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
})