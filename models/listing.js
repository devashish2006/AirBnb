const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,                      

   
    image: {
        filename: {
          type: String,
          default:
            "listingimage",
        },
        url: {
            type: String,
              default:
                     "https://unsplash.com/photos/a-bed-room-with-a-neatly-made-bed-and-a-dresser-BJc1mj3xgeE",
                 set: (v) => v === "" ? "https://unsplash.com/photos/a-bed-room-with-a-neatly-made-bed-and-a-dresser-BJc1mj3xgeE" : v,
        },
      },


    
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      }
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: { $in: listing.reviews } });
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
