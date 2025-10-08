
const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  let statusCode = err.statusCode || 500;
  let message = 'Something went wrong. Please try again.';

  //  Mongoose Errors 

  // ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(e => e.message)
      .join(', ');
  }

  // CastError
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for field "${err.path}": ${err.value}`;
  }

  // Duplicate key error
  else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyPattern || {})[0];
    message = `This ${field} is already registered.`;
  }

  // JWT Errors
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please login again.';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your session has expired. Please login again.';
  }

  // Default (other errors)
  else if (!isProd) {
    message = err.message || message;
  }

  // Response
  res.status(statusCode).json({
    success: false,
    message,                   
    ...(isProd ? {} : { stack: err.stack }) // Only in dev
  });
};

module.exports = errorHandler;