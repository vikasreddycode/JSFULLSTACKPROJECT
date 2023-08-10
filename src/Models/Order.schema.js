import mongoose, { Mongoose } from "mongoose";
import config from "../Config";
const orderschema = new mongoose.Schema({
 product :{
    type:[
        {
            product_Id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            count:{
                type:Number
            },
            price:{
                type:Number
            }
        }
    ],
    required:true
 },
 user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
 },
 address:{
    type:String,
    required:true
 },
 phonenumber:{
    type:Number,
    required:true,
    maxLenght:10
 },
 amount:{
    type:Number,
    required:true
 },
 coupon:String,
 transactionId: String,
 status:{
    type:String,
    enum:config.STATUS,
    default:config.STATUS_DEFAULT
 }
},{timestamps:true})
export default mongoose.model("Order",orderschema);