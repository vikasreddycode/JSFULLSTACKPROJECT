import mongoose from "mongoose";
import Authroles from "../Utils/Auth";
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:["true","name is required"],
        maxLength:[50,"name should be less than 50"],
        trim:true
    },
    email : {
        type:String,
        required:["true","email is required"]
    }
    ,
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[8,"pass must be >=8"],
        select:false
    },
    role:{
        type:String,
        enum:Object.values(Authroles),
        default:Authroles.USER
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{timestamps:true});

export default mongoose.model("User",userschema);