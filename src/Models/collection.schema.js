import mongoose from "mongoose";
// acts as middle layer between a mongodb and  app 
const collectionSchema = new mongoose.Schema(
    {
   name:{
    type:String,
    required:["true","please provide a collection name"],
    trim:true,
    maxLength:[
        120,
        "collection name shouldnot be more than 120 characters"
    ]
   }

    },
    {timestamps:true}
    )
    export  default  mongoose.model("Collection",collectionSchema);