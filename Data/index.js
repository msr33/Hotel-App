/*

const mongoose = require("mongoose");
const NewListing = require("./listing.js");
const initData = require("./data.js");


main()
.then(() => {
    console.log("connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const initDB = async () => {
    let data = initData.data;
    await NewListing.deleteMany({});
    await NewListing.insertMany({data});
    console.log("Data was initialized");
}

initDB();
*/

const mongoose = require("mongoose");
const Listing = require("./listing.js");
const initData = require("./data.js");

mongoose.connect("mongodb://127.0.0.1:27017/hotelApp")
  .then(() => {
    console.log(" MongoDB connected");
  })
  .then(async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data Intilized");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
  });

