import express from 'express';
import { Router } from 'express';
import User from '../models/students.model.js';
import multer from 'multer';
import path from 'path';
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({
    destination : (req, file , cb) =>{
        cb(null , './uploads');
    },
    filename: (req, file , cb) =>{
        cb(null , Date.now() + path.extname(file.originalname));
    }
})

const limits = {
    fileSize : 1024 * 1024 * 5
}

const fileFilter = (req, file , cb) =>{
    if(file.mimetype.startsWith("image")){
        cb(null , true);
    }else{
        cb(null , false);
    }
}

const uploads = multer({
    storage,
    limits,
    fileFilter,
})


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
router.post("/" , uploads.single('image') , async(req , res) => {
    try {
        const user = await User.create(req.body);
        if(req.file){
            user.image = req.file.filename;
        }
        await user.save();
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message : error.message});
    }
})

// Update User by ID
router.put("/:id" , uploads.single('image') , async(req , res) => {
    try {
        const existingUser = await User.findById(req.params.id);
        if(!existingUser){
            if(req.file){
                const filePath = path.join("./uploads" , req.file.filename);
                fs.unlink(filePath, (err) => {
                    if(err){
                        console.error("Error deleting image file:", err);
                    }
                });
            }
            return res.status(404).json({message : "User not found"});
        }
        if(req.file){
            if(existingUser.image){
                const filePath = path.join("./uploads" , existingUser.image);
                fs.unlink(filePath, (err) => {
                    if(err){
                        console.error("Error deleting image file:", err);
                    }
                });
            }
            req.body.image = req.file.filename;
        } 

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
        if(deletedUser.image){
            const filePath = path.join("./uploads" , deletedUser.image);
            fs.unlink(filePath, (err) => {
                if(err){
                    console.error("Error deleting image file:", err);
                }
            });
        }
        res.status(200).json(deletedUser);
    }catch(error){
        res.status(500).json({message : error.message});
    }
})

export default router;