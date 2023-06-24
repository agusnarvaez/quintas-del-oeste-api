import mongoose, { Schema } from "mongoose"


const userSchema = new Schema({
    name: {type: String, required: true, trim:true},
    lastName: {type: String, required: true},
    email: {type: String, required: true,unique:true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
},{timestamps: true})
export default mongoose.model('User',userSchema)
