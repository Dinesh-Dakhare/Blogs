import { AppError } from "../utility/appError.js";

let duplicatedKey = (err)=>{
 let message ='email already exist Please login'
  return new AppError(message,400)
}
let errProduction =(err,res) =>{
if(err.isOperational){
  res.status(err.statusCode).json({
    status:err.status,
    message:err.message
  })
}else{
  res.status(500).json({
    status:"fail",
    message:"internal error"
  })
}
}
export const errorController = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if(process.env.NODE_ENV==='production'){
    let error = {...err}
    if(err.code == 11000) error = duplicatedKey(error)
   errProduction(error,res)
  }
  if(process.env.NODE_ENV==='development'){
    res.status(err.statusCode).json({
      status: err.status,
      error:err,
      message: err.message,
      stack:err.stack,
    });
  }
};
