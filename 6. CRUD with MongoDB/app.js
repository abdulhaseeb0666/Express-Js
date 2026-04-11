const express = require('express')
const app = express();

// Database Connection
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/users")
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log(err);
})


// Middlewares
app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"))


// Routes
app.get('/' , (req,res) => {
    res.render("home")
})

app.get('/add-user' , (req , res) => {
    res.render('add-user')
})

app.post('/add-user' , (req , res) => {
    const {name , email , password} = req.body;
    
})

app.get('/update-user' , (req , res) => {
    res.render('update-user')
})

app.get('/delete-user' , (req , res) => {

})

app.get('/all-users' , (req , res) => {

})

 
 

app.listen(3000 , () => {
    console.log("Server started on port 3000");
})

