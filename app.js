const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./Routes/listing.js");
const reviews = require("./Routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");


main().catch((err) => console.log(err));

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
};






async function main() {
 await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded( {extended: true} ));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true
};

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res. locals.success = req.flash("success");
    next();
});





app.use("/listings", listings);
app.use("/listings/:id/reviews" , reviews);




app.all("*", (req,res, next) => {
    next(new ExpressError(404, "page Not Found!"));
})

app.use ((err, req, res, next) => { 
    let { statusCode=500, message="something went wrong!"} = err;
    res.status(statusCode).render("Error.ejs", {err});
    // res.status(statusCode).send( message);
});

app.listen(8080, () => {
    console.log("server is listening to Port 8080");
});