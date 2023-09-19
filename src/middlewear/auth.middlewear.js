import User from "../Models/User.schema"
import  Jwt  from "jsonwebtoken"
import asyncHandler from "../Service/asycnhandler"
import config from "../Config"
import CustomError from "../Controller/Customerror"

export  const  isLoggedin = asyncHandler(async(req,res,next) => {
    let token;
    if(req.cookies.token||(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))){
        token = req.cookies.token || req.cookies.authorization.split(" ")[1];
    }
    if(!token){
   throw new CustomError("You are not authorised to access the resource",401)
    }
    try{
        const decodedjwt = Jwt.verify(token,config.JWT_SECRET);
                req.user = await User.findById(decodedjwt,"name email role");
                next();
          }
          catch(error){
         throw new CustomError("You are not authorised to access the resource",401)
          }
    next();
}) 
 
export const authorize = (...requiredroles) => asyncHandler(async(req,res,next) => {
if(!requiredroles.includes(req.user.role)){

}
next()
})