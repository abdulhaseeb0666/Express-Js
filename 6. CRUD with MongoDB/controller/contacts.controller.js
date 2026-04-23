import User from "../models/user.models.js";

export const getContacts = async (req, res) => {
    try {
        const users = await User.find();
        res.render("home", { users });
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