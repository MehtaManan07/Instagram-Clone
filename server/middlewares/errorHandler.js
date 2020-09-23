
const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  
  let error = { ...err };
  error.message = err.message;
  // Log to console...
  console.log(err.stack);

  // Mongoose bad object
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    
   const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `${value} is already taken`
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation error;
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
  
};
module.exports = errorHandler;
