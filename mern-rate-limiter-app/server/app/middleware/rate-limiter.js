const rateLimit = require('express-rate-limit');

// Define the rate limiter
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window` (here, per 15 minutes)
  message: {
    message: "Too many login attempts from this IP, please try again after 15 minutes",
    success: false
  }
});

module.exports=rateLimiter;