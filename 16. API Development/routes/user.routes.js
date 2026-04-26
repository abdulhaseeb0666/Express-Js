import express from 'express';
import { Router } from 'express';
import User from '../models/students.model.js';

const router = Router();

// Get All Users
router.get("/" , async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message : error.message});
    }
});

// Get User by ID
router.get("/:id" , async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if(!student){
            return res.status(404).json({message : "User not found"});
        }
        res.status(200).json(student);
    }catch (error) {
        res.status(500).json({message : error.message});
    }
});


// Add new User
router.post("/" , async(req , res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    }catch(error){
        res.status(500).json({message : error.message});
    }
})

// Update User by ID
router.put("/:id" , async(req , res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id , req.body , {new : true});
        if(!updatedUser){
            return res.status(404).json({message : "User not found"});
        }
        res.status(200).json(updatedUser);
    }catch(error){
        res.status(500).json({message : error.message});
    }
})

// Delete User by ID
router.delete("/:id" , async(req , res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            return res.status(404).json({message : "User not found"});
        }
        res.status(200).json(deletedUser);
    }catch(error){
        res.status(500).json({message : error.message});
    }
})

export default router;