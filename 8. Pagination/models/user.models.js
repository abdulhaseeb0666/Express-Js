import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
    first_name : String ,
    last_name : String,
    email : String,
    phone : String,
    address : String
})

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);

export default User
