const rateLimiter = require("../middleware/rate-limiter");

module.exports = app => {
    const auth = require("../controllers/auth.controller");
  
    var router = require("express").Router();

    router.post("/register", auth.register);
    router.post("/login",rateLimiter, auth.login);

    app.use("/api", router);
};