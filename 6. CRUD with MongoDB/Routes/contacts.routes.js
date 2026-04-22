import express from "express";
import User from "../models/user.models.js";

const router = express.Router();

router.get('/' , async (req,res) => {
    const users =await User.find()
    res.render('home' , {users})
})

router.get('/add-user' , (req , res) => {
    res.render('add-user')
})

router.post('/add-user' , async (req , res) => {
    const {first_name , last_name , email , phone , address} = req.body;

    await User.create({
        first_name , last_name , email , phone , address
    })
    res.redirect('/')
})

router.get('/update-user/:id' , async (req , res) => {
    const user = await User.findById({_id : req.params.id})
    res.render('update-user' , {user})
})

router.post('/update-user/:id' , async (req , res) => {
    const {first_name , last_name , email , phone , address} = req.body;

    await User.findByIdAndUpdate({_id : req.params.id} , {
        first_name , last_name , email , phone , address
    })
    
    res.redirect('/')
})

router.get('/delete-user/:id' , async (req , res) => {

    await User.findByIdAndDelete({_id : req.params.id})
    res.redirect("/")
})

export default router;