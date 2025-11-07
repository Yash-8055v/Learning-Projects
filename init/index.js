const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");


const MONGODB_URI = "mongodb://127.0.0.1:27017/airbnb";

//! method to connect server with db
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  })

async function main() {
  await mongoose.connect(MONGODB_URI);
}

//! method to initialized db with random data for testing
const initDB = async () => {
  await Listing.deleteMany({});  //* first delete all data present in db
  initData.data = initData.data.map((obj) => ({
    ...obj, owner: "690c1575699ec725b36b8b45"
  }));
  await Listing.insertMany(initData.data); //* then init it with sample data
  console.log("data was initialized");
};

initDB();