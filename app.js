const express = require("express");
//const router = express.Router({ mergeParams: true});
const Listing = require("./Data/listing.js");
const mongoose = require("mongoose");
const app = express();
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const path = require("path");
const { Console } = require("console");
/*
async function printData() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hotelApp");
    console.log("Connected to MongoDB");

    const listings = await Listing.find({});
    console.log("All Listings:");
    console.log(listings); 

    mongoose.connection.close();
  } catch (err) {
    console.log(err);
    mongoose.connection.close();
  }
}
printData();
*/
async function callMongo() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hotelApp");
    console.log("Connected to MongoDB");
}

callMongo();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine('ejs', ejsMate);

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

app.get("/listing", async (req, res) => {

    const allListings = await Listing.find({});
    console.log(0);
    res.render("home", {allListings});
});

app.get("/listing/:id", async (req, res) => {

  console.log(1)
  let {id} = req.params;
    const listing = await Listing.findById(id);
    //console.log(listing);
   res.render("edit", {listing});
}
);

app.put("/listing/:id",async (req, res)=> {
   console.log(2)
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing });
    res.redirect("/listing");
  
});

app.delete("/listing/:id", async (req, res) => {
    let {id} = req.params;
    const deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listing")
});


app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
