const express = require('express')
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user.models');

// Database Connection
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
app.get('/' , async (req,res) => {
    const users =await User.find()
    res.render('home' , {users})
})

app.get('/add-user' , (req , res) => {
    res.render('add-user')
})

app.post('/add-user' , async (req , res) => {
    const {first_name , last_name , email , phone , address} = req.body;

    await User.create({
        first_name , last_name , email , phone , address
    })
    res.redirect('/')
})

app.get('/update-user/:id' , async (req , res) => {
    const user = await User.findById({_id : req.params.id})
    res.render('update-user' , {user})
})

app.post('/update-user/:id' , async (req , res) => {
    const {first_name , last_name , email , phone , address} = req.body;

    await User.findByIdAndUpdate({_id : req.params.id} , {
        first_name , last_name , email , phone , address
    })
    
    res.redirect('/')
})

app.get('/delete-user/:id' , async (req , res) => {

    await User.findByIdAndDelete({_id : req.params.id})
    res.redirect("/")
})
 
 

app.listen(3000 , () => {
    console.log("Server started on port 3000");
})

