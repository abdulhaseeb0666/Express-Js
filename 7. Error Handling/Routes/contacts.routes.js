import express from "express";
const router = express.Router();

// Controller Functions
import {  
    getContacts,
    addForm,
    addUser,
    updateForm,
    updateUser,
    deleteUser,
} from "../controller/contacts.controller.js";


// Get all users
router.get("/", getContacts);

// Show add form
router.get("/add-user", addForm);

// Add user
router.post("/add-user", addUser);

// Show update form
router.get("/update-user/:id", updateForm);

// Update user
router.post("/update-user/:id", updateUser);

// Delete user
router.get("/delete-user/:id", deleteUser);

export default router;