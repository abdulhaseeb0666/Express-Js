const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");


app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}));
app.use(express.json());


const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , "./uploads/");
    },
    filename : (req , file , cb) => {
        cb(null , Date.now() + path.extname(file.originalname));
    }
});

const limit = {
    fileSize : 1024 * 1024 * 3
}

const fileFilter = (req, file, cb) => {

        // IMAGE FIELD
        if (file.fieldname === "image") {
            const imageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!imageTypes.includes(file.mimetype)) {
                return cb(new Error("Only jpeg, png, gif allowed for image"), false);
            }
        }

        // DOCUMENT FIELD
        if (file.fieldname === "documents") {
            const docTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];

            if (!docTypes.includes(file.mimetype)) {
                return cb(new Error("Only PDF or Word documents allowed"), false);
            }
        }

        cb(null, true);
    }

const upload = multer({
    storage : storage,
    limits : limit,
    fileFilter : fileFilter
});

app.get("/" , (req , res) => {
    res.render("form" , { errors: [] });
})

app.post("/submit", upload.single("image"), (req, res) => {
    if(!req.file) {
        return res.status(400).send("No file uploaded");
    }
    res.send(req.file);
});

app.post("/multiple-submit", upload.array("multiple-images" , 5), (req, res) => {
    if(!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded");
    }
    res.send(req.files);
});
        
app.post("/user-submit", upload.fields([{ name: "image", maxCount: 1 }, { name: "documents", maxCount: 5 }]), (req, res) => {
    if(!req.files.image) {
        return res.status(400).send("No profile image uploaded");
    }
    if(!req.files.documents || req.files.documents.length === 0) {
        return res.status(400).send("No documents uploaded");
    }
    res.send({
        profileImage : req.files.image[0],
        documents : req.files.documents
    });
});
        
app.use((err , req  , res , next) => {
    if(err instanceof multer.MulterError) {
        return res.status(400).send(`Multer Error: ${err.message}`);
    }
    if (err) {
        console.log(err)
        res.status(500).send("Something went wrong")
    }
    next();
});

app.listen(3000 , () => {
    console.log("Server started on port 3000")
});