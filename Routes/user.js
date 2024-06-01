const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { route } = require("./review");

const userController = require("../controllers/users.js");


router.route("/signup")
.get(
     userController.renderSignupForm)
.post(
    WrapAsync(userController.signup)
)

router.route("/login")
.get( userController.renderLoginForm)
.post(
    passport.authenticate("local", {
    flailureRedirect: "/login",
    failureFlash: true,
}),
    userController.login
);



//logout
router.get("/logout", userController.logout)

module.exports = router;

