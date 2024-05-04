const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");



main().catch((err) => console.log(err));

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
app.get("/listings", async (req, res) => {
    const allListings =  await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})


//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params; 
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing} );
});

//Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//Edit Route
app.get("/listings/:id/edit", async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//UPDATE Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
})



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

app.listen(8080, () => {
    console.log("server is listening to Port 8080");
});