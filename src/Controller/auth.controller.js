//signup a new user
import asynchandler from "../Service/asycnhandler";
import  User from "../Models/User.schema"
import Customerror from "./Customerror";

export const cookieOptions ={
 expies : new Date(Date.now()+3*24*60*60*1000),
 httpOnly : true
}

export const Signup = asynchandler(async(req,res) => {
//get data from user
const {name,email,password}= req.body;
// validation
 if(!name || !password ||!email){
             throw new Customerror("please add all fields",400);
 }
 //adding data to database
 //checking if id already exists to avoid duplicates 
const exist =  await User.findOne({email:email});
if(exist){
   throw new Customerror("User already exists",400);
}
const user = await User.create({
   name:name,
   email:email,
   password:password
})
const token = user.getJWToken();
//safety
user.password = undefined;
//store this token in users cookie
res.cookie("token",token,cookieOptions);
//send back a response to user
res.status(200).json({
   success:true,
   token,
   user,
})
 })
 export const login = asynchandler(async(req,res) => {
   const {email,password} = req.body;
   if(!email || !password){
      throw new Customerror("please fill all the details",400)
   }
   const user = User.findOne({email}).select("+password")
   if(!user){
      throw new Customerror("Invalid crdentials",400)
   }
   const ispasswordmatched = user.comparepassword(password);
   if(ispasswordmatched){
      const token = user.getJWToken()
      user.password = undefined;
      res.cookie("token",token,cookieOptions)
      return res.status(200).json({
         success:true,
         token,
         user
      })
   }
   throw new Customerror("password is incorrect",400)

 })
 export const logout = asynchandler(asynchandler(async (req,res) => {
   res.cookie("token",null,{
      expires: new Date(Date.now()),
      httpOnly:true
   });
   res.status(200).json({
      success:true,
      message:"Logout"
 })
}))