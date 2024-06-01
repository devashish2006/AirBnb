
const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/WrapAsync.js");
const listings = require("../Routes/listing.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");

const multer = require('multer');

const { storage } = require("../cloudConfig.js")
// const upload = multer({ storage })
const upload = multer({ dest: 'uploads/' })


const listingController = require("../controllers/listings.js");

router
    .route("/")
    .get(wrapAsync(listingController.index))
//     .post(
//         validateListing,
//         isLoggedIn,
//         wrapAsync(listingController.createListing)
// );
.post(upload.single("listing[image]"), (req,res) => {
    console.log(req.file);
    res.send(req.file);
});

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm)

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete( 
    isLoggedIn, 
    isOwner,  
    wrapAsync(listingController.destroyListing)
);


//Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;