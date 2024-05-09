const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,                      //where is problem ocuring do it now .... please check the localhost 8080..run it show me ok ... im getting the error when i m editing the post so i not able to reload the image... let me once show you..proced.. infect not able to your app has crashed run it again 

    // image: {
    //     type: String,
    //     default:
    //         "https://unsplash.com/photos/a-bed-room-with-a-neatly-made-bed-and-a-dresser-BJc1mj3xgeE",
    //     set: (v) => v === "" ? "https://unsplash.com/photos/a-bed-room-with-a-neatly-made-bed-and-a-dresser-BJc1mj3xgeE" : v,

    // // },

    //TA edit 
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


    // image: {
    //     type: String,     //WAIT OK I M SEARCHING FOR IT ...SURE
    //     default:
    //         "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //         set: (v) => 
    //             v === ""
    //  ? "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    //       : v,
       
    // },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
