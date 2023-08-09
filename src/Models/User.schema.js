import mongoose from "mongoose";
import Authroles from "../Utils/Auth";
import bcrypt from "bcryptjs"
import  Jwt  from "jsonwebtoken";
import config from "../Config";
import crypto from "crypto";
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
// Encrypt the password before saving
userschema.pre("save",async function(next){
if(!this.isModified("password")) return next()
this.password=await bcrypt.hash(this.password,10)
next()
//to do some action before sending data or saving data into database
})
userschema.methods = {
    //compare password
    // to create new userdefined methods for database so it can be used easily
    // use jsonwebtoken for implementing or sending secret data secretly between client and server such as tokens
    comparepassword : async function(enteredpassword){
    return await  bcrypt.compare(enteredpassword,this.password)
    },
    getJWToken : function(){
        Jwt.sign({_id:this._id,role:this.role},config.JWT_SECRET,{
            expiresIn:config.JWT_EXPIRY
        })
    },
    //generate forgot password token
    generateforgotpasswordtoken:function(){
        const forgottoken = crypto.randomBytes(20).toString("hex");
        // generate a token
        this.forgotPasswordToken=crypto
        .hash("sha256")
        .update(forgottoken)
        .digest("hex")
        //time for token to expire
       this.forgotPasswordExpiry=Date.now()+20*60*1000;
       return forgottoken;
    }
}
export default mongoose.model("User",userschema);