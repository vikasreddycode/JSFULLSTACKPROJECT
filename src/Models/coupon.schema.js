import mongoose, { Mongoose } from "mongoose";
const  couponschema  = new mongoose.Schema({
    code:{
        type:String,
        required:[true,"please provide a coupon code"]
    },
    discount:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        default:true
    }
})