const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { route } = require("./review");

const userController = require("../controllers/users.js");



router.get("/signup", userController.renderSignupForm); 

router.post(
    "/signup",WrapAsync(userController.signup)
)

router.get("/login", userController.renderLoginForm);

router.post(
    "/login", 
    passport.authenticate("local", {
    flailureRedirect: "/login",
    failureFlash: true,
}),
    userController.login
);

//logout
router.get("/logout", userController.logout)

module.exports = router;

