const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./Schema.js");

main().catch((err) => console.log(err));

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
}

async function main() {
 await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded( {extended: true} ));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});


//Index Route
app.get("/listings",wrapAsync( async (req, res) => {
    const allListings =  await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})


//Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params; 
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing} );
}));

//Create Route
app.post("/listings", validateListing,  wrapAsync(async (req, res, next) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
})
);

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

//UPDATE Route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {    
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
   
    res.redirect(`/listings/${id}`);
}))
//ARE YOU THERE... yeah i m searching for the error on mygpt4 ...ok 
//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
}))



// app.get("/testListing", async (req, res) => {
//     console.log("REQ AT TEST LISTING")
//     let sampleListing = new Listing({
//         title: "my new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });

//     let demoListing = await sampleListing.save();
//     console.log(demoListing)

//     console.log("sample was saved");
//     res.send("Successful Testing");
// })

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