import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    first_name : String ,
    last_name : String,
    email : String,
    phone : String,
    address : String
})

const User = mongoose.model("User", userSchema);

module.exports = User
