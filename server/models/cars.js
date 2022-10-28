/*
Student Number : 301272899
Student Name: Divya Agrawal
Assignment : Midterm
*/


let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// create a model class
let Car = mongoose.Schema(
  {
    Carname: String,
    Category: String,
    Carmodel: String,
    Price: Number,
  },
  {
    collection: "cars",
  }
);

module.exports = mongoose.model("Car", Car);
