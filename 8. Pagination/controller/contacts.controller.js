import User from "../models/user.models.js";
import mongoose from "mongoose";


export const getContacts = async (req, res) => {
    try {

        const {page = 1 , limit = 5} = req.query;

        const options = {
            page : Number(page) ,
            limit : Number(limit)
        }

        const result = await User.paginate({} , options);

        res.render("home", { 
            users : result.docs ,
            totalDocs : result.totalDocs,
            limit : result.limit,
            totalPages : result.totalPages,
            page : result.page,
            Counter : result.pagingCounter,
            hasPrevPage : result.hasPrevPage,
            hasNextPage : result.hasNextPage,
            prevPage : result.prevPage,
            nextPage : result.nextPage,
        });
    } catch (err) {
        res.status(500).send("Error fetching users");
    }
}

// Add User form
export const addForm = async (req, res) => {
    res.render("add-user");
}

// Add USER 
export const addUser  = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, address } = req.body;

        await User.create({
            first_name,
            last_name,
            email,
            phone,
            address,
        });

        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error adding user");
    }
}


// Update Form
export const updateForm = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render("update-user", { user });
    } catch (err) {
        res.status(500).send("Error fetching user");
    }
}

// Update User
export const updateUser = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, address } = req.body;

        await User.findByIdAndUpdate(req.params.id, {
            first_name,
            last_name,
            email,
            phone,
            address,
        });

        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error updating user");
    }
}

// Delete User
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error deleting user");
    }
}