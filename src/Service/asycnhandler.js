const asynchandler = (func) => async(req,res,next) => {
    //next middleware flag used to stop in between
try{
await func(req,res,next)
}
catch(error){
res.status(error.code||500).json({
    success:false,
    message:error.message
})
}
}
export default asynchandler;