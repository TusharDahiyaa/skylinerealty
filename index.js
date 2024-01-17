require("./public/crons/cron");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

const app = express();

// Set up middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like HTML, CSS, and JavaScript
app.use(express.static(path.join(__dirname, "/")));
app.use(express.static(path.join(__dirname, "/public")));

const DB_Url = process.env.MongoDBURI;

mongoose
  .connect(DB_Url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

// Define routes and server logic as needed
require("./public/routes/userSignUpAndNotification.route")(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});
app.get("/buyer", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "buyer.html"));
});
app.get("/seller", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "seller.html"));
});

app.get("/listings", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "listings.html"));
});
app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});

// Start the Express application by listening on the defined port
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

module.exports = app;