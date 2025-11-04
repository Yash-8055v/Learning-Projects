const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();


const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, '/public')));


const MONGODB_URI = "mongodb://127.0.0.1:27017/airbnb";

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

app.get("/", (req, res) => {
  res.send("working");
});






app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);



app.use((req, res, next) => {
  next( new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next) => {
  let {statusCode = 500, message = "something wrong"} = err;
  res.status(statusCode).render("listings/error.ejs", {message});
});

app.listen(8080, () => {
  console.log(`App is listening on port: http://localhost:8080`);
})


























//! Route for testing
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");

// });
