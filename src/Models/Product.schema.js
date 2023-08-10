import mongoose, { Mongoose } from "mongoose";
const productschema = new mongoose.Schema({
name : {
    type:String,
    required:["true","please provide product name"],
    trim:true,
    maxLength:[120,"product name shouldnot be less than 120 chars"]
},
price:{
    type:Number,
    required:["true","please provide product price"],
    maxLength:[5,"not greater than 5"]
},
description:{
    type:String
},
photos:[
    {
        secure_url:{
            type:String,
            required:true
        }
    }
],
stock:{
    type:Number,
    default:0
},
sold:{
    type:Number,
    default:0
},
collection_id:{
    type:mongoose.Schema.Types.ObjectId,
ref:"Collection"
}
},{timestamps:true})
export default mongoose.model("Product",productschema)