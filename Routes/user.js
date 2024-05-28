const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

console.log("user.js loaded");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
}); 

router.post(
    "/signup",WrapAsync(async (req, res, next) => {
        try{
            let { username, email, password} = req.body;
            const newUser = new User({ email, username});
            const registeredUser = await User.register(newUser, password);
            console.log(registeredUser);
            req.login(registeredUser, (err) => {
                if(err) {
                    return next(err);
                }
                req.flash("success", "Welcome to wanderlust!");
                res.redirect("/listings");    
            });
           
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("/signup")
        }
    })
);  

//TA edit 
router.post("/signup", async (req, res, next) => {
    console.log("POST /signup route");
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});


router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,      
    // https://drive.google.com/file/d/1HZ5B5E2cVpdXcH_h6NcR4wm4jR7NCmf9/view?usp=sharing       
}),
    async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        res.redirect("/listings");
    }
);

//logout
router.get("/logout", (req, res,next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
})

module.exports = router;



