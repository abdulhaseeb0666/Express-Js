import express from "express";
const app = express();
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/" , (req, res) => {
    res.render("index.ejs");
});

app.post("/send-sms", (req, res) => {
    const to = req.body.to;
    const message = req.body.message;

    try{
        const result = client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });

        res.status(200).json({ success: true, message: "SMS sent successfully" , result });
    }catch(error){
        console.error("Error sending SMS:", error);
        res.status(500).json({ success: false, message: "Failed to send SMS" });
    }
});

app.post("/send-sms", (req, res) => {
    
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});